import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { LogoIcon } from "./icons/icons";
import { auth } from "@/app/utils/auth";
import { UserDropDown } from "./UserDropDown";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";

export async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href={"/"} className="flex justify-center items-center gap-4">
        <LogoIcon width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Job<span className="text-primary">Board</span>
        </h1>
      </Link>

      {/* destop nav */}
      <div className="hidden md:flex justify-center items-center gap-4">
        <ModeToggle />
        <Link href={"/post-job"} className={buttonVariants({ size: "lg" })}>
          post job
        </Link>
        {session?.user ? (
          <UserDropDown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
      {/* mobile navigation */}
      <div className="md:hidden flex items-center gap-4">
        <ModeToggle />
        {session?.user ? (
          <UserDropDown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="text-left">
                <SheetTitle>
                  Job<span className="text-primary">Board</span>
                </SheetTitle>
                <SheetDescription>Find or Post job</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href={"/"}
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Find new jOb
                </Link>
                <Link
                  href={"/post-job"}
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Post job
                </Link>
                <Link
                  href={"/login"}
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Login
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
}
