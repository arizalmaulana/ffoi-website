-- =============================================================================
-- DIAGNOSTIC QUERIES — jalankan di Supabase SQL Editor (project PRODUCTION)
-- =============================================================================

-- 1. Auth user tanpa profil (orphan users)
SELECT
  u.id,
  u.email,
  u.created_at,
  u.raw_app_meta_data->>'provider' AS provider,
  u.raw_user_meta_data
FROM auth.users u
LEFT JOIN public.profil p ON p.id = u.id
WHERE p.id IS NULL
ORDER BY u.created_at DESC;

-- 2. Trigger aktif di auth.users
SELECT
  tgname AS trigger_name,
  tgenabled AS enabled,
  pg_get_triggerdef(t.oid) AS definition
FROM pg_trigger t
JOIN pg_class c ON c.oid = t.tgrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'auth'
  AND c.relname = 'users'
  AND NOT t.tgisinternal;

-- 3. Definisi function handle_new_user
SELECT pg_get_functiondef(p.oid)
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname = 'handle_new_user';

-- 4. FK profil → auth.users
SELECT
  tc.constraint_name,
  kcu.column_name,
  ccu.table_schema AS foreign_schema,
  ccu.table_name AS foreign_table,
  ccu.column_name AS foreign_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'profil'
  AND tc.constraint_type = 'FOREIGN KEY';

-- 5. RLS policies pada profil
SELECT
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'profil';

-- 6. Bandingkan jumlah auth.users vs profil
SELECT
  (SELECT count(*) FROM auth.users) AS auth_users,
  (SELECT count(*) FROM public.profil) AS profil_rows,
  (SELECT count(*)
   FROM auth.users u
   LEFT JOIN public.profil p ON p.id = u.id
   WHERE p.id IS NULL) AS orphans;

-- 7. Metadata Google user spesifik (ganti email)
SELECT
  id,
  email,
  raw_user_meta_data->>'username' AS meta_username,
  raw_user_meta_data->>'nama_lengkap' AS meta_nama_lengkap,
  raw_user_meta_data->>'full_name' AS meta_full_name,
  raw_user_meta_data->>'name' AS meta_name,
  raw_user_meta_data->>'avatar_url' AS meta_avatar_url,
  raw_user_meta_data->>'picture' AS meta_picture
FROM auth.users
WHERE email = 'EMAIL_GOOGLE_USER@example.com';

-- =============================================================================
-- FIX: handle_new_user() — support email signup + Google OAuth
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_username text;
  v_nama_lengkap text;
  v_foto text;
BEGIN
  v_nama_lengkap := COALESCE(
    NEW.raw_user_meta_data->>'nama_lengkap',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1),
    'Pengguna'
  );

  v_username := COALESCE(
    NULLIF(trim(NEW.raw_user_meta_data->>'username'), ''),
    split_part(NEW.email, '@', 1),
    'user_' || substr(replace(NEW.id::text, '-', ''), 1, 8)
  );

  v_foto := COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture'
  );

  WHILE EXISTS (
    SELECT 1 FROM public.profil WHERE username = v_username
  ) LOOP
    v_username := v_username || '_' || substr(replace(NEW.id::text, '-', ''), 1, 6);
  END LOOP;

  INSERT INTO public.profil (
    id,
    email,
    username,
    nama_lengkap,
    foto_profil,
    bio,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    v_username,
    v_nama_lengkap,
    v_foto,
    NULL,
    'pengguna'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Pastikan trigger terpasang
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- RLS: user boleh insert profil sendiri (fallback app-side ensureProfile)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profil'
      AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
      ON public.profil
      FOR INSERT
      TO authenticated
      WITH CHECK ((SELECT auth.uid()) = id);
  END IF;
END $$;

-- Backfill orphan users yang sudah ada
INSERT INTO public.profil (
  id,
  email,
  username,
  nama_lengkap,
  foto_profil,
  bio,
  role
)
SELECT
  u.id,
  u.email,
  COALESCE(
    NULLIF(trim(u.raw_user_meta_data->>'username'), ''),
    split_part(u.email, '@', 1),
    'user_' || substr(replace(u.id::text, '-', ''), 1, 8)
  ) || '_' || substr(replace(u.id::text, '-', ''), 1, 6),
  COALESCE(
    u.raw_user_meta_data->>'nama_lengkap',
    u.raw_user_meta_data->>'full_name',
    u.raw_user_meta_data->>'name',
    split_part(u.email, '@', 1),
    'Pengguna'
  ),
  COALESCE(
    u.raw_user_meta_data->>'avatar_url',
    u.raw_user_meta_data->>'picture'
  ),
  NULL,
  'pengguna'
FROM auth.users u
LEFT JOIN public.profil p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
