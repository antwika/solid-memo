import SolidMemoBadge from "components/badge/SolidMemoBadge";
import Title from "@/ui/Title";

export default function Page() {
  return (
    <div>
      <Title text="My home" />
      <div className="flex text-xl space-x-2 justify-center items-center">
        <div>
          Welcome to
        </div>
        <SolidMemoBadge />
      </div>
    </div>
  );
}
