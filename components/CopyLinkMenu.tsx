"use client";
import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { toast } from "sonner";

interface CopyLinkMenuProps {
  jobURL: string;
}

export const CopyLinkMenu = ({ jobURL }: CopyLinkMenuProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobURL);
      toast.success("URL copied to clipboard");
    } catch (error) {}
  };
  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="h-4 w-4" />
      <span>Copy Job URL</span>
    </DropdownMenuItem>
  );
};
