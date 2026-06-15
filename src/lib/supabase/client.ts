import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();

export async function waitForAuth(): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) return;

  await new Promise<void>((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      subscription.unsubscribe();
      resolve();
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (nextSession) {
        finish();
      }
    });

    void supabase.auth.getSession().then(({ data: { session: retrySession } }) => {
      if (retrySession) {
        finish();
      }
    });

    setTimeout(finish, 3000);
  });
}
