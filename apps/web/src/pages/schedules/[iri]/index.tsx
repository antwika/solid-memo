import { preferFragment } from "@solid-memo/core";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { Calendar, Database, StickyNote } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useSchedules from "src/hooks/useSchedules";

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { scheduleMap, isLoading } = useSchedules(iri ? [iri?.toString()] : []);
  const schedule = iri ? scheduleMap[iri.toString()] : undefined;

  if (isLoading) {
    return (
      <Layout>
        <Card className="p-2">
          <div>Loading schedule...</div>
        </Card>
      </Layout>
    );
  }

  if (!schedule) {
    return (
      <Layout>
        <div>No schedule found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Card key={schedule.iri} className="p-2">
        <div className="space-x-2 space-y-1">
          <div className="mb-2 flex gap-1">
            <div className="width: 32px" title="Schedule">
              <Calendar />
            </div>
            <strong>{preferFragment(schedule.iri)}</strong> (Schedule)
          </div>
          <div>
            <span title={schedule.iri}>
              <strong>• Iri:</strong> {preferFragment(schedule.iri)}
            </span>
          </div>
          <div>
            <strong>• Version:</strong> {schedule.version}
          </div>
          <strong>• Is in Solid Memo instance:</strong>{" "}
          <div className="mb-2 flex gap-1 items-center">
            <div className="width: 32px" title="Instance">
              <Database />
            </div>
            <strong>
              <span title={schedule.isInSolidMemoDataInstance}>
                {preferFragment(schedule.isInSolidMemoDataInstance)}
              </span>
            </strong>{" "}
            (Instance)
            <Button
              size={"sm"}
              onClick={() => {
                router.push(
                  `/instances/${encodeURIComponent(schedule.isInSolidMemoDataInstance)}`
                );
              }}
            >
              View
            </Button>
          </div>
          <div>
            <strong>• For flashcard:</strong>{" "}
            <div className="mb-2 flex gap-1 items-center">
              <div className="width: 32px" title="Instance">
                <StickyNote />
              </div>
              <strong>
                <span title={schedule.forFlashcard}>
                  {preferFragment(schedule.forFlashcard)}
                </span>
              </strong>{" "}
              (Flashcard)
              <Button
                size={"sm"}
                onClick={() => {
                  router.push(
                    `/flashcards/${encodeURIComponent(schedule.forFlashcard)}`
                  );
                }}
              >
                View
              </Button>
            </div>
          </div>
          {schedule?.lastReviewed && (
            <div>
              <strong>• Last reviewed:</strong>{" "}
              {schedule?.lastReviewed.toDateString()}
            </div>
          )}
          <div>
            <strong>• Next review:</strong> {schedule.nextReview.toDateString()}
          </div>
          <Button
            variant={"destructive"}
            onClick={() => {
              service
                .removeSchedule(schedule)
                .then(() =>
                  router.push(
                    `/instances/${encodeURIComponent(schedule.isInSolidMemoDataInstance)}`
                  )
                )
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Delete schedule
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
