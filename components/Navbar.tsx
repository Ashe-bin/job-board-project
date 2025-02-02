import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { LogoIcon } from "./icons/icons";
import { auth } from "@/app/utils/auth";
import { UserDropDown } from "./UserDropDown";

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
    </nav>
  );
}
