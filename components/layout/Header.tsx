import Link from "next/link";
import { UserMenu } from "@/components/auth/UserMenu";
import { ClearButton } from "@/components/ui/buttons/ClearButton";
import { PublishButton } from "@/components/ui/buttons/PublishButton";
import { DeviceViewSwitcher } from "@/components/ui/DeviceViewSwitcher";
import { SaveButton } from "@/components/ui/buttons/SaveButton";
import { PreviewButton } from "@/components/ui/buttons/PreviewButton";

export const Header = () => {
  return (
    <header className="mx-auto flex-1 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 md:gap-8 bg-neutral-900/80  h-20 border-b border-white/10 transition-all duration-300 ease-in-out">
      <Link
        href="/"
        className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg transition-transform hover:scale-[0.98]"
      >
        <h1 className="text-2xl font-medium bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] bg-clip-text text-transparent tracking-tight">
          creactiva
        </h1>
      </Link>

      <DeviceViewSwitcher />

      <nav className="flex items-center gap-2 sm:gap-3">
        <ClearButton />
        <SaveButton />
        <PreviewButton />
        <PublishButton />

        <div className="h-6 w-px bg-neutral-700 mx-2" />

        <UserMenu />
      </nav>
    </header>
  );
};
