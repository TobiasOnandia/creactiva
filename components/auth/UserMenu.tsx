"use client";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/utils/supabase/client";
import { LogIn, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const auth = useAuth();
  const router = useRouter()
  return (
    <section className="relative group z-100">
      <button className="flex items-center gap-2 rounded-full p-2 bg-neutral-800  hover:bg-neutral-700 transition-colors">
        <User className="text-neutral-400 w-5 h-5" />
      </button>

      <article className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full right-0 mt-2 w-48 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl py-2 transition-all duration-200">
        <div className="px-3 py-2 border-b border-neutral-700">
          <p className="text-sm font-medium text-neutral-200">
            {auth?.user?.user_metadata.username}
          </p>
          <p className="text-xs text-neutral-400">
            {auth?.user?.user_metadata.email}
          </p>
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800/50"
        >
          <Settings className="w-4 h-4" />
          Configuración
        </Link>
        {auth ? (
          <button
            onClick={() => {
              supabaseClient.auth.signOut()
              router.push('/login')
            }}
            className="flex items-center cursor-pointer gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-neutral-800/50"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800/50"
          >
            <LogIn className="w-4 h-4" />
            Iniciar sesión
          </Link>
        )}
      </article>
    </section>
  );
};
