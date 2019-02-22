import React, {useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import * as R from "ramda";

import {MONTHS} from "./constants";

import Calendar from "./Calendar";
import ReminderForm from "./ReminderForm";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  font-size: 32px;
  margin-bottom: 12px;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 24px;
    font-weight: 600;
    color: gray;
    margin: 0 12px;

    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  }
`;

const App = ({status, reminders, dispatch}) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [reminder, setReminder] = useState(null);

  function handleNewReminder(day) {
    const time = new Date();

    setReminder({
      datetime: +new Date(year, month, day, time.getHours(), time.getMinutes()),
    });
  }

  function handleEditReminder(_reminder) {
    setReminder(_reminder);
  }

  function handleReminderSave(_reminder) {
    if (_reminder.id) {
      dispatch({type: "reminders/UPDATE", payload: _reminder});
    } else {
      dispatch({type: "reminders/ADD", payload: _reminder});
    }

    setReminder(null);
  }

  function handleReminderDelete(id) {
    dispatch({type: "reminders/DELETE", payload: id});
    setReminder(null);
  }

  function handleReminderCancel() {
    setReminder(null);
  }

  if (status !== "resolved") return <span>Cargando...</span>;

  return (
    <main>
      <Nav>
        <button
          disabled={month <= 0}
          type="button"
          onClick={() => setMonth(month - 1)}
        >
          {`<`}
        </button>
        {MONTHS[month]}
        <button
          disabled={month >= 11}
          type="button"
          onClick={() => setMonth(month + 1)}
        >
          {`>`}
        </button>
      </Nav>
      <Nav>
        <button
          disabled={year <= 0}
          type="button"
          onClick={() => setYear(year - 1)}
        >
          {`<`}
        </button>
        {year}
        <button type="button" onClick={() => setYear(year + 1)}>
          {`>`}
        </button>
      </Nav>
      <Calendar
        month={month}
        reminders={reminders}
        year={year}
        onCellClick={handleNewReminder}
        onReminderClick={handleEditReminder}
      />
      {reminder && (
        <ReminderForm
          initialValues={reminder}
          onClose={handleReminderCancel}
          onDelete={handleReminderDelete}
          onSave={handleReminderSave}
        />
      )}
    </main>
  );
};

export default connect(R.pick(["status", "reminders"]))(App);
