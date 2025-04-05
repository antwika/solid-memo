import { Button } from "./ui";

type Props = {
  onLogOut: () => void;
};

export function Header({ onLogOut }: Props) {
  return (
    <div className="flex p-4">
      <div className="grow text-2xl font-extrabold">Solid Memo</div>
      <Button onClick={onLogOut}>Log out</Button>
    </div>
  );
}
