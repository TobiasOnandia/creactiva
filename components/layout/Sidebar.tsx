"use client";
import { useState } from "react";
import { mainNavItems } from "@/config";
import { SecondaryPanel } from "../SecondaryPanel";
import { TemplatesPanel } from "../templates/TemplatesPanel";

export function Sidebar() {
  const [open, setOpen] = useState({
    isOpen: false,
    panel: "add",
  });

  const toggleSidebar = (type: string) => {
    setOpen((prev) => ({
      isOpen: !prev.isOpen,
      panel: type,
    }));
  };

  return (
    <aside className=" flex h-screen bg-neutral-900/80 backdrop-blur-xl border-r border-white/10">
      <section className="flex flex-col  justify-center w-16 z-50 py-4">
        <nav className="flex flex-col items-center gap-1.5 px-1.5">
          {mainNavItems.map((item) => {
            const isActive = item.id === open.panel && open.isOpen;
            return (
              <button
                key={item.id}
                onClick={() => toggleSidebar(item.id)}
                className={`relative flex cursor-pointer items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                      : "hover:bg-neutral-800/60 border border-transparent hover:border-white/5"
                  }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50`}
                aria-label={item.label}
              >
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? "text-cyan-400"
                      : "text-neutral-400 group-hover:text-neutral-200"
                  }`}
                />

                {isActive && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full shadow-[0_0_8px] shadow-cyan-500/40" />
                )}

                <span className="absolute left-full ml-4 px-3 py-1.5 text-sm font-medium bg-neutral-900/90 backdrop-blur-sm rounded-md border border-white/10 shadow-lg shadow-black/30 text-neutral-200 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
                  {item.label}
                  <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-900/90 border-l border-t border-white/10 rotate-45" />
                </span>
              </button>
            );
          })}
        </nav>
      </section>

      {open.isOpen && open.panel === "add" && <SecondaryPanel />}
      {open.isOpen && open.panel === "templates" && <TemplatesPanel />}
    </aside>
  );
}
