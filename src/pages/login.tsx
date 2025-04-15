import { LoginForm } from "@components/index";
import Layout from "@pages/layout";

type Props = {
  tryLogIn: (oidcIssuer: string) => Promise<void>;
};

export default function Login({ tryLogIn }: Props) {
  return (
    <Layout>
      <LoginForm onSelectOidcIssuer={tryLogIn} />
    </Layout>
  );
}
