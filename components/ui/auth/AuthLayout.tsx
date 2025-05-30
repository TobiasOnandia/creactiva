import React from 'react';
import { BackgroundForm } from '@/components/ui/form/BackgroundForm'; 

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerContent: React.ReactNode;
}

export const AuthLayout = ({ title, subtitle, children, footerContent }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 flex flex-col items-center justify-center p-4">
      <BackgroundForm />

      <section className="relative p-8 z-10 w-full max-w-md bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
        <header className="pb-6 border-b border-white/10">
          <div className="flex justify-center mb-4">
            <div className="bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] p-0.5 rounded-xl">
              <div className="bg-neutral-900 p-3 rounded-xl">
                <div className="text-2xl font-bold bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] bg-clip-text text-transparent">
                  creactiva
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-neutral-200 mb-2">{title}</h1>
          <p className="text-center text-neutral-400">{subtitle}</p>
        </header>

        {children}

        {footerContent && (
          <footer className="p-6 pt-4 border-t border-white/10 text-center text-sm text-neutral-400">
            {footerContent}
          </footer>
        )}
      </section>
    </main>
  );
};