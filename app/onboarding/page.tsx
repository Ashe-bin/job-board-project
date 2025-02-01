import { OnboardingForm } from "@/components/forms/onboardingForm/OnboardingForm";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { checkSessionExits } from "../utils/checkSessionExits";

async function hasUserFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { onboardingCompleted: true },
  });
  if (user?.onboardingCompleted === true) {
    return redirect("/");
  }
  return user;
}

const OnBoardingPage = async () => {
  const session = await checkSessionExits();
  await hasUserFinishedOnboarding(session.id as string);
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
};

export default OnBoardingPage;
