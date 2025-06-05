"use client";

import { useCanvasStore } from "@/store/canvasStore";
import { DEVICE_CONFIG } from "@/config";

type DeviceType = keyof typeof DEVICE_CONFIG;

export const DeviceViewSwitcher = () => {
  const activeDevice = useCanvasStore((state) => state.activeDevice);
  const setActiveDevice = useCanvasStore((state) => state.setActiveDevice);

  return (
    <nav className="hidden md:flex flex-1 items-center justify-center">
      <ul className="flex items-center gap-1 bg-neutral-900 rounded-lg p-1 border border-white/10 shadow-lg shadow-black/30">
        {Object.entries(DEVICE_CONFIG).map(([device, config]) => {
          const currentDeviceType = device as DeviceType;
          const isActive = currentDeviceType === activeDevice;
          const IconComponent = config.icon;

          return (
            <li key={currentDeviceType}>
              <button
                onClick={() => setActiveDevice(currentDeviceType)}
                className={`relative cursor-pointer flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 ease-out group
                  ${
                    isActive
                      ? "bg-neutral-800 shadow-inner shadow-black/20"
                      : "hover:bg-neutral-800/60"
                  }`}
                aria-label={`Vista ${currentDeviceType}`}
              >
                <IconComponent
                  className={`w-5 h-5 transition-colors ${
                    isActive ? config.colorClass : "text-neutral-400"
                  }`}
                />
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{
                      border: `1px solid ${config.shadowColor}4D`,
                      boxShadow: `inset 0 0 8px ${config.shadowColor}40`,
                    }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
