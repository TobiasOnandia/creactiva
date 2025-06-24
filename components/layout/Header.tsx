"use client";

import Link from "next/link";
import { UserMenu } from "@/components/auth/UserMenu";
import { ClearButton } from "@/components/ui/buttons/ClearButton";
import { PublishButton } from "@/components/ui/buttons/PublishButton";
import { DeviceViewSwitcher } from "@/components/ui/DeviceViewSwitcher";
import { SaveButton } from "@/components/ui/buttons/SaveButton";
import { PreviewButton } from "@/components/ui/buttons/PreviewButton";
import { UndoRedoButtons } from "@/components/ui/buttons/UndoRedoButtons";
import { MobileHeader } from "./MobileHeader";
import { useBreakpoints } from "@/hooks/useMediaQuery";
import { useCanvasStore } from "@/store/canvasStore";

export const Header = () => {
  const { isMobile } = useBreakpoints();
  const activeSection = useCanvasStore((state) => state.activeSection);
  const slug = activeSection?.slug || "";

  if (isMobile) {
    return <MobileHeader />;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg transition-transform hover:scale-[0.98]"
          >
            <h1 className="text-2xl font-medium bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] bg-clip-text text-transparent tracking-tight">
              creactiva
            </h1>
          </Link>
        </div>

        <DeviceViewSwitcher />
        <div className="flex items-center gap-4">
          <UndoRedoButtons />
          <div className="w-px h-6 bg-white/10" />
          <PreviewButton />
          <ClearButton />
          <PublishButton slug={slug} />
          <SaveButton />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
