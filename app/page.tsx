import SolidMemoBadge from "components/badge/SolidMemoBadge";
import Title from "@/ui/Title";
import SignInOutButton from "@/components/SignInOutButton";

export default function Page() {
  return (
    <div className="space-y-2">
      <Title text="My home" />
      <div className="flex text-xl space-x-2 justify-center items-center">
        <div>
          Welcome to
        </div>
        <SolidMemoBadge />
      </div>
      <div className="flex text-xl space-x-2 justify-center items-center">
        <SignInOutButton />
      </div>
    </div>
  );
}
