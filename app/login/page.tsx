import { SignInWithGoogle } from "@/components/actions/SignInWithGoogle";
import { useAuth } from "@/context/AuthProvider";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br  from-neutral-950 to-neutral-900 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/3 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.03)_0%,_transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-10 [mask-image:linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1))]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px]" />
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-[80px]" />
      </div>

      <section className="relative z-10 w-full max-w-md p-8 bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
        <header className="p-8 pb-6 border-b border-white/10">
          <div className="bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] p-0.5 rounded-xl w-fit mx-auto mb-4">
            <div className="bg-neutral-900 p-3 rounded-xl">
              <h3 className="text-2xl  font-bold bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] bg-clip-text text-transparent">
                creactiva
              </h3>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-neutral-200 mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-center text-neutral-400">
            Inicia sesión para continuar
          </p>
        </header>

        <form className="pt-6   w-full ">
          <label className="text-sm relative flex flex-col  gap-2 font-medium text-neutral-300 ">
            <span className="font-medium text-neutral-300">
              Correo electrónico
            </span>
            <input
              type="email"
              className="w-full bg-neutral-800/50 border border-white/10 rounded-xl px-4 py-3.5 text-neutral-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              placeholder="tu@email.com"
            />
            <span className="absolute inset-y-0 top-5 right-0 flex items-center pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
          </label>

          <p className="text-sm flex items-center my-3 justify-between font-medium text-neutral-300   w-full">
            <span>Contraseña</span>
            <a
              href="#"
              className="text-xs text-cyan-400 text-right   hover:text-cyan-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </p>

          <label htmlFor="password" className="relative ">
            <input
              type="password"
              className="w-full bg-neutral-800/50 border border-white/10 rounded-xl px-4 py-3.5 text-neutral-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              placeholder="••••••••"
            />
            <span className="absolute inset-y-0 right-0  flex items-center pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </label>

          <button
            type="submit"
            className="w-full relative mt-4 overflow-hidden group px-6 py-3.5 bg-gradient-to-br from-cyan-600/80 to-cyan-500/80 border border-cyan-500/50 rounded-xl font-medium text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Iniciar sesión</span>
          </button>
        </form>

        {/* Separador */}
        <div className="relative py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-900 text-neutral-400">
              o continúa con
            </span>
          </div>
        </div>

        {/* Login Social */}
        <SignInWithGoogle />

        <footer className="p-6 pt-4 border-t border-white/10 text-center text-sm text-neutral-400">
          ¿No tienes una cuenta?{" "}
          <a
            href="#"
            className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Regístrate ahora
          </a>
        </footer>
      </section>
    </main>
  );
}
