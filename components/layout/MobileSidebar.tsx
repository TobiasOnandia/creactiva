"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { mainNavItems } from "@/config";
import { MobileSecondaryPanel } from "@/components/aside/MobileSecondaryPanel";
import { MobileTemplatesPanel } from "@/components/templates/MobileTemplatesPanel";
import { PagesPanel } from "@/components/templates/PagesPanel";
import { SiteSettingsPanel } from "@/components/templates/SiteSettingsPanel";

interface MobileSidebarProps {
  isPreviewMode?: boolean;
}

export function MobileSidebar({ isPreviewMode = false }: MobileSidebarProps) {
  const [open, setOpen] = useState({
    isOpen: false,
    panel: "add",
  });

  const toggleSidebar = (type: string) => {
    setOpen((prev) => {
      if (prev.panel === type && prev.isOpen) {
        return {
          isOpen: false,
          panel: type,
        };
      }

      return {
        isOpen: true,
        panel: type,
      };
    });
  };

  const closeSidebar = () => {
    setOpen((prev) => ({ ...prev, isOpen: false }));
  };

  // Cerrar sidebar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        open.isOpen &&
        !target.closest(".mobile-sidebar-content") &&
        !target.closest(".mobile-bottom-nav")
      ) {
        closeSidebar();
      }
    };

    if (open.isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open.isOpen]);

  // Prevenir scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (open.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open.isOpen]);

  if (isPreviewMode) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {open.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn" />
      )}

      {/* Full Screen Drawer */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          open.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mobile-sidebar-content h-full bg-neutral-900 border-l border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-neutral-900/95 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              {mainNavItems.map((item) => {
                if (item.id === open.panel) {
                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h2 className="text-lg font-medium text-white">
                        {item.label}
                      </h2>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {open.panel === "add" && <MobileSecondaryPanel />}
            {open.panel === "templates" && <MobileTemplatesPanel />}
            {open.panel === "pages" && <PagesPanel />}
            {open.panel === "settings" && <SiteSettingsPanel />}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-30 bg-neutral-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-2">
        <nav className="flex items-center justify-around max-w-lg mx-auto">
          {mainNavItems.map((item) => {
            const isActive = item.id === open.panel && open.isOpen;

            return (
              <button
                key={item.id}
                onClick={() => toggleSidebar(item.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 min-w-0 flex-1 max-w-20
                  ${
                    isActive
                      ? "bg-cyan-500/10 border border-cyan-500/30"
                      : "hover:bg-neutral-800/50 border border-transparent"
                  }
                `}
                aria-label={item.label}
              >
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-cyan-400" : "text-neutral-400"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors truncate w-full text-center ${
                    isActive ? "text-cyan-400" : "text-neutral-400"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Spacer for bottom navigation */}
      <div className="h-20" />
    </>
  );
}
