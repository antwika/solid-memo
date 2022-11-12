import { pascalCase2KebabCase } from "@/lib/convert";
import Link from "@/ui/Link";
import Title from "@/ui/Title";

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
  
  const sortedComponentNames = componentNames.sort();
  const links = sortedComponentNames.map(name => (
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
