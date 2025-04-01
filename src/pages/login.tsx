import { Button, Input } from "@src/components/ui";
import Layout from "@src/pages/layout";

type Props = {
  tryLogIn: () => Promise<void>;
};

export default function Login({ tryLogIn }: Props) {
  return (
    <Layout>
      <Input />
      <Button onClick={tryLogIn}>Sign in with Solid</Button>
    </Layout>
  );
}
