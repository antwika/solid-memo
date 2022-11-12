import Spinner from "src/components/Spinner";

export default async function Loading() {
  return (
    <div className="flex h-full justify-center items-center">
      <Spinner label="Loading resource..."/>
    </div>
  );
}
