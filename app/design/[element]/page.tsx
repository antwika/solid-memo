import { kebabCase2PascalCase } from "@/lib/convert";
import Anchor from "@/ui/Anchor";
import Badge from "@/ui/Badge";
import Button from "@/ui/Button";
import Link from "@/ui/Link";
import Notice from "@/ui/Notice";
import Paper from "@/ui/Paper";
import Table from "@/ui/table/Table";
import Td from "@/ui/table/Td";
import Th from "@/ui/table/Th";
import TextField from "@/ui/TextField";
import Title from "@/ui/Title";
import { AiOutlineLink } from 'react-icons/ai';

type Props = {
  params?: any;
  children?: React.ReactNode;
};

export default async function Page({ params }: Props) {
  const { element } = params;

  switch (kebabCase2PascalCase(element)) {
    case 'Anchor':
      return <Anchor href="/">Anchor</Anchor>;
    case 'Badge':
      return <Badge>Badge</Badge>;
    case 'Button':
      return <Button>Button</Button>;
    case 'Link':
      return <Link icon={<AiOutlineLink />} uri="/">Link</Link>;
    case 'Notice':
      return (
        <div className="space-y-2">
          <Notice type="info">Info</Notice>
          <Notice type="warning">Warning</Notice>
          <Notice type="error">Error</Notice>
        </div>
      );
    case 'Paper':
      return <Paper>Paper</Paper>;
    case 'Table':
      return (
        <Table>
          <thead>
            <tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>Foo</Td>
              <Td>Bar</Td>
            </tr>
            <tr>
              <Td>Hello</Td>
              <Td>World</Td>
            </tr>
          </tbody>
        </Table>
      );
    case 'TextField':
      return <TextField placeholder="Type here..." />;
    case 'Title':
      return <Title text="Title" />;
    default:
      throw new Error('Unknown design element');
  }
}
