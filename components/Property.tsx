import env from "@/lib/env";
import { asyncComponent } from "@/lib/hack";
import Link from "@/ui/Link";

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
        <span>International resource identifier:</span><strong><Link uri={`${env.BASE_URL}/resource/${encodeURIComponent(iri)}`}>{ iri }</Link></strong>
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
