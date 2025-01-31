import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { LogoIcon } from "./icons/icons";
import { auth, signOut } from "@/app/utils/auth";

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
      <div className="flex justify-center items-center gap-4">
        <ModeToggle />
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button>Logout</Button>
          </form>
        ) : (
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
