import {
  Link as LinkIcon,
  LogOut,
  Monitor,
  Settings,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 bg-neutral-900/80 backdrop-blur-xl z-50 h-20 border-b border-white/10 transition-all duration-300 ease-in-out">
      {/* Contenedor principal */}
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8  flex items-center justify-between h-full gap-4 md:gap-8">
        <Link
          href="/"
          className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg transition-transform hover:scale-[0.98]"
        >
          <h1 className="text-2xl font-medium bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] bg-clip-text text-transparent tracking-tight">
            creactiva
          </h1>
          <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Guardado
          </span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-1 bg-neutral-900 rounded-lg p-1 border border-white/10 shadow-lg shadow-black/30">
            {["mobile", "tablet", "desktop"].map((device) => {
              const isActive = device === "desktop";
              const colors = {
                mobile: "#7DFFB2",
                tablet: "#72BAE8",
                desktop: "#C792EA",
              };

              return (
                <li key={device}>
                  <button
                    className={`relative cursor-pointer flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 ease-out group ${
                      isActive
                        ? "bg-neutral-800 shadow-inner shadow-black/20"
                        : "hover:bg-neutral-800/60"
                    }`}
                    aria-label={`Vista ${device}`}
                  >
                    {device === "desktop" && (
                      <Monitor
                        className={`w-5 h-5 transition-col ${
                          isActive
                            ? `text-[${colors[device]}]`
                            : "text-neutral-400"
                        }`}
                      />
                    )}
                    {device === "tablet" && (
                      <Tablet
                        className={`w-5 h-5 transition-col ${
                          isActive
                            ? `text-[${colors[device]}]`
                            : "text-neutral-400"
                        }`}
                      />
                    )}
                    {device === "mobile" && (
                      <Smartphone
                        className={`w-5 h-5 transition-col ${
                          isActive
                            ? `text-[${colors[device]}]`
                            : "text-neutral-400"
                        }`}
                      />
                    )}
                    {isActive && (
                      <div
                        className="absolute inset-0 border border-[rgba(114,186,232,0.3)] rounded-md"
                        style={{
                          boxShadow: `inset 0 0 8px ${colors[device]}40`,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Acciones */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50">
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Limpiar</span>
          </button>

          <button className="relative overflow-hidden group px-5 py-2 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg font-medium hover:border-neutral-600 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50">
            <div className="absolute inset-0 bg-[radial-gradient(200px_at_50%_120%,rgba(114,186,232,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2 text-neutral-200 group-hover:text-white">
              <LinkIcon className="w-4 h-4" />
              <span className="text-sm tracking-wide">Publicar</span>
            </span>
          </button>

          <div className="h-6 w-px bg-neutral-700 mx-2" />

          <div className="relative group">
            <button className="flex items-center gap-2 rounded-full p-0.5 border border-neutral-700 hover:border-neutral-600 bg-neutral-900 hover:bg-neutral-800 transition-colors">
              <img
                src="/user-avatar.png"
                className="w-8 h-8 rounded-full border border-neutral-600"
                alt="Avatar del usuario"
              />
            </button>

            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full right-0 mt-2 w-48 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl py-2 transition-all duration-200">
              <div className="px-3 py-2 border-b border-neutral-700">
                <p className="text-sm font-medium text-neutral-200">John Doe</p>
                <p className="text-xs text-neutral-400">john@creactiva.com</p>
              </div>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800/50"
              >
                <Settings className="w-4 h-4" />
                Configuración
              </Link>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-neutral-800/50">
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
