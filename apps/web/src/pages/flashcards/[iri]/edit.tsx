import { preferFragment } from "@solid-memo/core";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card, Input } from "@ui/index";
import { StickyNote } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext } from "react";
import useFlashcards from "src/hooks/useFlashcards";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  front: string;
  back: string;
};

export default function Page() {
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { flashcardMap, mutate, isLoading } = useFlashcards(
    iri ? [iri?.toString()] : []
  );
  const flashcard = iri ? flashcardMap[iri.toString()] : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (isLoading) {
    return (
      <Layout>
        <Card className="p-2">
          <div>Loading flashcard...</div>
        </Card>
      </Layout>
    );
  }

  if (!flashcard) {
    return (
      <Layout>
        <div>No flashcard found</div>
      </Layout>
    );
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    service
      .updateFlashcard({ ...flashcard, front: data.front, back: data.back })
      .then(() => mutate())
      .then(() => {
        console.log("Updated flashcard!");
      })
      .catch((err) => {
        console.error("Failed to update flashcard, error:", err);
      });
  };

  return (
    <Layout>
      <Card key={flashcard.iri} className="p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-2 space-y-1">
            <div className="mb-2 flex gap-1">
              <div className="width: 32px" title="Instance">
                <StickyNote />
              </div>
              <strong>{preferFragment(flashcard.iri)}</strong> (Flashcard)
            </div>
            <div>
              <strong>• Front:</strong>{" "}
              <Input
                id="front"
                type="text"
                defaultValue={flashcard.front}
                {...register("front", { required: true })}
              />
              {errors.front && <span>This field is required</span>}
            </div>
            <div>
              <strong>• Back:</strong>
              <Input
                id="back"
                type="text"
                defaultValue={flashcard.back}
                {...register("back", { required: true })}
              />
              {errors.back && <span>This field is required</span>}
            </div>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
