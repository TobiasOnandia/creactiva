import { LinkIcon } from "lucide-react";

interface PublishButtonProps {
  fullWidth?: boolean;
}

export const PublishButton = ({ fullWidth = false }: PublishButtonProps) => {
  return (
    <button
      className={`relative cursor-pointer overflow-hidden group px-5 py-2 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg font-medium hover:border-neutral-600 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 ${fullWidth ? "w-full" : ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(200px_at_50%_120%,rgba(114,186,232,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative flex items-center gap-2 text-neutral-200 group-hover:text-white">
        <LinkIcon className="w-4 h-4" />
        <span className="text-sm tracking-wide">Publicar</span>
      </span>
    </button>
  );
};
