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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "INITIAL_SESSION" || nextSession) {
        subscription.unsubscribe();
        resolve();
      }
    });

    setTimeout(() => {
      subscription.unsubscribe();
      resolve();
    }, 3000);
  });
}
