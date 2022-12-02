import SolidMemoBadge from 'src/components/badge/SolidMemoBadge';
import Title from 'src/ui/Title';
import SignInOutButton from 'src/components/SignInOutButton';
import Counter from '@/components/Counter';

const dataTestid = 'test-page';

export default function Page() {
  return (
    <div data-testid={dataTestid} className="space-y-2">
      <Title dataTestid={`${dataTestid}-title`} text="My home" />
      <div className="flex text-xl space-x-2 justify-center items-center">
        <div data-testid={`${dataTestid}-header`}>
          Welcome to
        </div>
        <SolidMemoBadge dataTestid={`${dataTestid}-solidMemoBadge`} />
      </div>
      <div className="flex text-xl space-x-2 justify-center items-center">
        <Counter dataTestid={`${dataTestid}-counter`} />
      </div>
      <div className="flex text-xl space-x-2 justify-center items-center">
        <SignInOutButton dataTestid={`${dataTestid}-signInOutButton`} />
      </div>
    </div>
  );
}
