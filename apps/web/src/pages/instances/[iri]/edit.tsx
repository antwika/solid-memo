import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card, Input } from "@ui/index";
import { Database } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext } from "react";
import useInstances from "src/hooks/useInstances";
import { useForm, type SubmitHandler } from "react-hook-form";
import Link from "next/link";

type Inputs = {
  name: string;
};

export default function Page() {
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { instanceMap, mutate, isLoading } = useInstances(
    iri ? [iri?.toString()] : []
  );
  const instance = iri ? instanceMap[iri.toString()] : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (isLoading) {
    return (
      <Layout>
        <Card className="p-2">
          <div>Loading instance...</div>
        </Card>
      </Layout>
    );
  }

  if (!instance) {
    return (
      <Layout>
        <div>No instance found</div>
      </Layout>
    );
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    service
      .updateInstance({ ...instance, name: data.name })
      .then(() => mutate())
      .then(() => {
        console.log("Updated instance!");
      })
      .catch((err) => {
        console.error("Failed to update instance, error:", err);
      });
  };

  return (
    <Layout>
      <Card key={instance.iri} className="p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-2 space-y-1">
            <div className="mb-2 flex gap-1">
              <Link
                href={`/instances/${encodeURIComponent(instance.iri)}`}
                className="hover:underline"
              >
                <div className="flex gap-1" title={instance.iri}>
                  <Database />
                  <strong>
                    <span>{instance.name}</span>
                  </strong>{" "}
                  (Instance)
                </div>
              </Link>
            </div>
            <div>
              <strong>• Name:</strong> {instance.name}
              <Input
                id="name"
                type="text"
                defaultValue={instance.name}
                {...register("name", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
