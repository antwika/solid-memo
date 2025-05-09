import {
  getDatetime,
  getStringNoLocale,
  getThingAll,
  getUrl,
  type Thing,
} from "@inrupt/solid-client";
import useDatasets from "./useDatasets";
import { parseSchedule, type ScheduleModel } from "@solid-memo/core";

function parseScheduleFromThing(thing: Thing) {
  return parseSchedule({
    iri: thing.url,
    type: getUrl(thing, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
    version: getStringNoLocale(
      thing,
      "http://antwika.com/ns/solid-memo#version"
    ),
    isInSolidMemoDataInstance: getUrl(
      thing,
      "http://antwika.com/ns/solid-memo#isInSolidMemoDataInstance"
    ),
    forFlashcard: getUrl(
      thing,
      "http://antwika.com/ns/solid-memo#forFlashcard"
    ),
    nextReview: getDatetime(
      thing,
      "http://antwika.com/ns/solid-memo#nextReview"
    ),
    lastReviewed: getDatetime(
      thing,
      "http://antwika.com/ns/solid-memo#lastReviewed"
    ),
  });
}

export default function useSchedules(scheduleUrls: string[]) {
  const { data: scheduleDatasets, mutate } = useDatasets(scheduleUrls);

  const schedules = (scheduleDatasets ?? [])
    .map((dataset) => getThingAll(dataset))
    .flat()
    .filter((thing) => scheduleUrls.includes(thing.url))
    .map((thing) => parseScheduleFromThing(thing));

  const scheduleMap = schedules.reduce<Record<string, ScheduleModel>>(
    (acc, schedule) => {
      acc[schedule.iri] = schedule;
      return acc;
    },
    {}
  );

  return { scheduleDatasets, schedules, scheduleMap, mutate };
}
