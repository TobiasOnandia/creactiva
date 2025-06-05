import { DEVICE_CONFIG } from "@/config";

type DeviceType = keyof typeof DEVICE_CONFIG;

export const GridContainer = ({ 
  children, 
  activeDevice, 
  isEditMode 
}: { 
  children: React.ReactNode;
  activeDevice: DeviceType;
  isEditMode: boolean;
}) => (
  <article className={`
    relative z-50 flex-grow bg-neutral-900/80 backdrop-blur-sm h-full 
    border-2 border-dashed border-neutral-800 rounded-xl shadow-2xl 
    shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 
    group w-full ${DEVICE_CONFIG[activeDevice].maxWidth} p-6 flex flex-col
    ${isEditMode ? 'edit-mode' : ''}
  `}>
    {children}
  </article>
);
