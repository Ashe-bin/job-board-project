import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDown, Heart, Layers3, LogOut } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { signOut } from "@/app/utils/auth";

interface UserDropDownProps {
  email: string;
  name: string;
  image: string;
}
export const UserDropDown = ({ email, name, image }: UserDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={image} alt="profile image" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} strokeWidth={2} className="ml-1 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 px-1" align="end">
        <DropdownMenuLabel className="flex flex-col px-1">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/favorites"}>
              <Heart size={16} strokeWidth={2} className="opacity-60" />
              <span>Favorite Jobs</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/my-jobs"}>
              <Layers3 size={16} strokeWidth={2} className="opacity-60" />
              <span>My Jobs</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="flex w-full items-center gap-2">
              <LogOut size={16} strokeWidth={2} className="opacity-60" />
              <span>Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
