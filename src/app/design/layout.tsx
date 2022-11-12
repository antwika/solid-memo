import { pascalCase2KebabCase } from "src/lib/convert";
import Link from "src/ui/Link";
import Title from "src/ui/Title";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const componentNames = [
    'Anchor',
    'Badge',
    'Button',
    'Link',
    'Notice',
    'Table',
    'TextField',
    'Title',
    'Paper',
  ];
  componentNames.sort();
  const links = componentNames.map(name => (
    { href: `/design/${pascalCase2KebabCase(name)}`, label: name }
  ));

  return (
    <div className="flex space-x-2">
      <div className="bg-slate-200 p-2">
        <Title text="Elements" />
        { links.map(({ href, label }) => (
          <>
            <Link uri={ href }>{ label }</Link>
          </>
        ))}
      </div>
      <div className="flex flex-col flex-grow bg-slate-200 p-2">
        <Title text="Design" />
        <div>
          { children }
        </div>
      </div>
    </div>
  );
}