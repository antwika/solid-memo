import { getClientEnv } from "src/lib/env";
import { asyncComponent } from "src/lib/hack";
import Link from "src/ui/Link";

type Props = {
  iri: string,
  k: number,
  v: number,
};

export default asyncComponent(async function Property({
  iri,
  k,
  v,
}: Props) {
  return (
    <div className="p-2 rounded-lg bg-slate-200">
      <div className='space-x-2'>
        <span>Entity:</span><strong>Property</strong>
      </div>
      <div className='flex space-x-2'>
        <span>International resource identifier:</span><strong><Link uri={`${getClientEnv().NEXT_PUBLIC_BASE_URL}/resource/${encodeURIComponent(iri)}`}>{ iri }</Link></strong>
      </div>
      <div className='space-x-2'>
        <span>K:</span><strong>{ k }</strong>
      </div>
      <div className='space-x-2'>
        <span>V:</span><strong>{ v }</strong>
      </div>
    </div>
  );
});
