"use client";

import { SignInWithGoogle } from "@/components/actions/SignInWithGoogle";
import { Separator } from "@/components/ui/form/Separator";
import { FormField } from '@/components/ui/form/FormField'; 
import { AuthLayout } from '@/components/ui/auth/AuthLayout'; 
import { login } from '../actions/loginAction';
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("¡Bienvenido de vuelta!");
        router.push("/");
      }
    });
  }

  return (
    <AuthLayout
      title="Bienvenido de vuelta"
      subtitle="Inicia sesión para continuar"
      footerContent={
        <>
          ¿No tienes una cuenta?
          <a
            href="/registro" 
            className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Regístrate ahora
          </a>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-4">
        <FormField
          id="email"
          name='email'
          label="Correo electrónico"
          type="email"
          placeholder="tu@email.com"
          icon="mail"
        />
        <FormField
          id="password"
          name='password'
          label="contraseña"
          type="password"
          placeholder="••••••••"
        />
        <a
          href="/recuperar" 
          className="text-xs text-cyan-400 text-right hover:text-cyan-300 transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </a>
        <button
          type="submit"
          className="w-full relative cursor-pointer mt-4 overflow-hidden group px-6 py-3.5 bg-gradient-to-br from-cyan-600/80 to-cyan-500/80 border border-cyan-500/50 rounded-xl font-medium text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={pending}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center gap-2">
           {pending ? "Ingresando..." : "Iniciar sesión"}
          </div>
        </button>
      </form>
      <Separator  /> 
      <SignInWithGoogle />
    </AuthLayout>
  );
}