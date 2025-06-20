"use client";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { publishSection } from "@/app/actions/publishAction";

interface PublishButtonProps {
  slug: string;
  fullWidth?: boolean;
}

export const PublishButton = ({
  slug,
  fullWidth = false,
}: PublishButtonProps) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await publishSection({ slug });
      if (res.success) {
        toast.success("Publicado correctamente");
        router.push(`/p/${slug}`);
      } else {
        toast.error(res.error?.message || "Error al publicar");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al publicar");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <button
      onClick={handlePublish}
      disabled={isPublishing}
      className={`
        relative flex items-center gap-2 px-5 py-2 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg font-medium
        ${fullWidth ? "w-full" : ""}
        ${
          isPublishing
            ? "opacity-70 cursor-wait"
            : "group-hover:border-neutral-600 transition-all duration-300"
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50
      `}
    >
      <div className="absolute inset-0 bg-[radial-gradient(200px_at_50%_120%,rgba(114,186,232,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative flex items-center gap-2 text-neutral-200 group-hover:text-white">
        <LinkIcon className={`w-4 h-4 ${isPublishing ? "animate-spin" : ""}`} />
        <span className="text-sm tracking-wide">
          {isPublishing ? "Publicando..." : "Publicar"}
        </span>
      </span>
    </button>
  );
};
