import Resource from "src/components/Resource";

type Props = {
  params?: any;
  children?: React.ReactNode;
};

export default async function Page({ params }: Props) {
  const { iri } = params;
  const res = await fetch(iri);
  const raw = await res.text();
  return (
    <div className="space-y-2">
      <Resource iri={iri} raw={raw} />
    </div>
  );
}
