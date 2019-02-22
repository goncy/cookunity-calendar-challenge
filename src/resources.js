export default {
  get: () => JSON.parse(localStorage.getItem("reminders") || "[]"),
  set: reminders =>
    localStorage.setItem("reminders", JSON.stringify(reminders)),
};
