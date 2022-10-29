import HomeLink from "@/ui/links/HomeLink";
import Logotype from "@/ui/Logotype";

export default function Page() {
  return (
    <div>
      <HomeLink />
      <div className="flex text-xl space-x-2 justify-center items-center">
        <div>
          Welcome to
        </div>
        <Logotype />
      </div>
    </div>
  );
}
