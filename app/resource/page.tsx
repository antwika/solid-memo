import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import Title from "@/ui/Title";
import Form from "./form";

export default async function Page() {
  return (
    <div className="space-y-2">
      <Title text="My resources" />
      <Form />
    </div>
  );
}
