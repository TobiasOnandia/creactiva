"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { UserMenu } from "@/components/auth/UserMenu";
import { ClearButton } from "@/components/ui/buttons/ClearButton";
import { PublishButton } from "@/components/ui/buttons/PublishButton";
import { SaveButton } from "@/components/ui/buttons/SaveButton";
import { PreviewButton } from "@/components/ui/buttons/PreviewButton";
import { UndoRedoButtons } from "@/components/ui/buttons/UndoRedoButtons";
import { useCanvasStore } from "@/store/canvasStore";
import { DEVICE_CONFIG } from "@/config";

type DeviceType = keyof typeof DEVICE_CONFIG;

export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeDevice = useCanvasStore((state) => state.activeDevice);
  const setActiveDevice = useCanvasStore((state) => state.setActiveDevice);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cerrar menú al hacer click fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest("header")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg transition-transform hover:scale-[0.98]"
          >
            <h1 className="text-xl font-medium bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] bg-clip-text text-transparent tracking-tight">
              creactiva
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-10 h-10 rounded-md bg-neutral-800/60 hover:bg-neutral-800 transition-colors"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-neutral-200" />
          ) : (
            <Menu className="w-5 h-5 text-neutral-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="bg-neutral-900 border-t border-white/10 animate-fadeIn">
          {/* Device Switcher */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-xs text-neutral-400 mb-2">
              Vista del dispositivo
            </p>
            <div className="flex items-center gap-2">
              {Object.entries(DEVICE_CONFIG).map(([device, config]) => {
                const currentDeviceType = device as DeviceType;
                const isActive = currentDeviceType === activeDevice;
                const IconComponent = config.icon;

                return (
                  <button
                    key={currentDeviceType}
                    onClick={() => setActiveDevice(currentDeviceType)}
                    className={`relative flex flex-1 items-center justify-center gap-2 p-2 rounded-md transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "bg-neutral-800 shadow-inner shadow-black/20"
                          : "hover:bg-neutral-800/60"
                      }`}
                    aria-label={`Vista ${currentDeviceType}`}
                  >
                    <IconComponent
                      className={`w-4 h-4 transition-colors ${
                        isActive ? config.colorClass : "text-neutral-400"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {currentDeviceType.charAt(0).toUpperCase() +
                        currentDeviceType.slice(1)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Undo/Redo */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-xs text-neutral-400 mb-2">Historial</p>
            <UndoRedoButtons />
          </div>

          {/* Main Actions */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-xs text-neutral-400 mb-2">Acciones</p>
            <div className="grid grid-cols-2 gap-2">
              <PreviewButton fullWidth />
              <ClearButton fullWidth />
              <PublishButton fullWidth />
              <SaveButton fullWidth />
            </div>
          </div>

          {/* User Menu */}
          <div className="px-4 py-3">
            <UserMenu isMobile />
          </div>
        </div>
      )}
    </header>
  );
};
