import Spinner from 'src/components/Spinner';

const dataTestid = 'test-loading';

export default function Loading() {
  return (
    <div data-testid={dataTestid} className='flex h-full justify-center items-center'>
      <Spinner dataTestid={`${dataTestid}-spinner`} label='Loading resource...'/>
    </div>
  );
}
