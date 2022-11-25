import Title from "src/ui/Title";
import Form from "./form";

const dataTestid = 'test-page';

export default function Page() {
  return (
    <div data-testid={dataTestid} className="space-y-2">
      <Title dataTestid={`${dataTestid}-title`} text="My resources" />
      <Form dataTestid={`${dataTestid}-form`} />
    </div>
  );
}
