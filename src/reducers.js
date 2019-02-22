const initialState = {
  status: "init",
  reminders: [],
};

export default {
  status: (state = initialState.status, action) => {
    switch (action.type) {
      case "app/BOOT": {
        return "pending";
      }

      case "app/BOOTED": {
        return "resolved";
      }

      default:
        return state;
    }
  },
  reminders: (state = initialState.reminders, action) => {
    switch (action.type) {
      case "reminders/SET": {
        return action.payload;
      }

      case "reminders/ADD": {
        return state.concat({...action.payload, id: +new Date()});
      }

      case "reminders/UPDATE": {
        return state.map(reminder =>
          reminder.id === action.payload.id ? action.payload : reminder
        );
      }

      case "reminders/DELETE": {
        return state.filter(reminder => reminder.id !== action.payload);
      }

      default:
        return state;
    }
  },
};
