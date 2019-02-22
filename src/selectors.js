import {createSelector} from "reselect";
import * as R from "ramda";

import {DAYS} from "./constants";

export const weekOrderSelector = (month, year) =>
  R.pipe(
    R.splitAt(new Date(year, month, 1).getDay()),
    R.reverse,
    R.flatten
  )(DAYS);

export const remindersSelector = R.map(reminder => {
  const date = new Date(reminder.datetime);

  return {
    ...reminder,
    minutes: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
});

export const groupedReminders = createSelector(
  remindersSelector,
  (_, month, year) => ({month, year}),
  (reminders, {month, year}) =>
    R.pipe(
      R.sortBy(R.prop("datetime")),
      R.filter(R.whereEq({month, year})),
      R.groupBy(R.prop("day"))
    )(reminders)
);

export const monthDaysSelector = createSelector(
  groupedReminders,
  (_, month, year) => ({month, year}),
  (reminders, {month, year}) =>
    R.pipe(
      R.range(1),
      R.map(number => ({number, reminders: R.prop(number, reminders)}))
    )(new Date(year, month + 1, 0).getDate() + 1)
);
