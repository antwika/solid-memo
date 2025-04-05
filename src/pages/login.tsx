import Counter from "@src/components/Counter";
import { LoginForm } from "@src/components/LoginForm";
import Layout from "@src/pages/layout";

type Props = {
  tryLogIn: (oidcIssuer: string) => Promise<void>;
};

export default function Login({ tryLogIn }: Props) {
  return (
    <Layout>
      <Counter />
      <LoginForm onSelectOidcIssuer={tryLogIn} />
    </Layout>
  );
}
