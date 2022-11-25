import Title from "src/ui/Title";
import Form from "./form";

type Props = {
  dataTestid?: string,
};

export default function Page({ dataTestid }: Props) {
  return (
    <div data-testid={dataTestid} className="space-y-2">
      <Title dataTestid={`${dataTestid}-title`} text="My resources" />
      <Form dataTestid={`${dataTestid}-form`} />
    </div>
  );
}
