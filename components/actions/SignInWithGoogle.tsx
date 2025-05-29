"use client";
import { supabaseClient } from "@/utils/supabase/client";
export const SignInWithGoogle = () => {
  const handleSignInWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }

    if (data) {
      console.log("Inicio de sesión exitoso con Google:", data);
    }
  };

  return (
    <button
      onClick={handleSignInWithGoogle}
      className="flex px-6 py-4 mb-5 w-full cursor-pointer items-center justify-center gap-2  bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 hover:bg-neutral-800 hover:border-white/20 transition-colors"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
      <span>Google</span>
    </button>
  );
};
