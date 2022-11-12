import Title from "src/ui/Title";
import Form from "./form";

export default async function Page() {
  return (
    <div className="space-y-2">
      <Title text="My resources" />
      <Form />
    </div>
  );
}