"use client";

import React, { useState } from 'react';
import { SignInWithGoogle } from '@/components/actions/SignInWithGoogle';
import { Separator } from '@/components/ui/form/Separator';
import { FormField } from '@/components/ui/form/FormField'; 
import { Checkbox } from '@/components/ui/form/Checkbox';  
import { AuthLayout } from '@/components/ui/auth/AuthLayout'; 

export default function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms] = useState(false);


  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Comienza a construir tu sitio web"
      footerContent={
        <>
          ¿Ya tienes una cuenta?
          <a href="/login" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
            Inicia sesión
          </a>
        </>
      }
    >
      <form  className="pt-6 flex flex-col gap-4"> 
        <FormField
          id="full-name"
          label="Nombre completo"
          type="text"
          placeholder="Tu nombre"
        />

        <FormField
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="tu@email.com"
          icon="mail"
        />

        <FormField
          id="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          showPassword={showPassword}
          onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
          helperText={
            <ul className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <li className={`flex items-center gap-1.5 text-neutral-500`}>
                <div className={`w-2 h-2 rounded-full bg-neutral-700`} />
                Mínimo 8 caracteres
              </li>
              <li className={`flex items-center gap-1.5 text-neutral-500`}>
                <div className={`w-2 h-2 rounded-full bg-neutral-700`} />
                Incluir números
              </li>
            </ul>
          }
        />

        <FormField
          id="confirm-password"
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          showPassword={showConfirmPassword}
          onTogglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <Checkbox
          id="terms-checkbox"
          checked={agreedToTerms}
          label={
            <span>
              Acepto los <a href="#" className="text-cyan-400 hover:text-cyan-300">Términos de servicio</a> y la <a href="#" className="text-cyan-400 hover:text-cyan-300">Política de privacidad</a>
            </span>
          }
        />

        <button
          type="submit"
          className="w-full cursor-pointer relative overflow-hidden group px-6 py-3.5 bg-gradient-to-br from-cyan-600/80 to-cyan-500/80 border border-cyan-500/50 rounded-xl font-medium text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center gap-2">
            Registrarse
          </div>
        </button>
      </form>

      <Separator />
      <SignInWithGoogle />
    </AuthLayout>
  );
}