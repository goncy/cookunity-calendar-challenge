import React from "react";
import * as R from "ramda";
import styled from "styled-components";

import {weekOrderSelector, monthDaysSelector} from "./selectors";

const Table = styled.table`
  background: white;
  border: 1px solid gainsboro;
  border-radius: 4px;
  box-shadow: 0px 0px 6px gainsboro;
  padding: 12px;
`;

const Cell = styled.div`
  width: 128px;
  max-width: 128px;
  height: 128px;
  max-height: 128px;
  border: 1px solid whitesmoke;
  position: relative;
  overflow: auto;
  cursor: pointer;

  &:before {
    position: sticky;
    margin-bottom: 8px;
    top: 6px;
    left: 6px;
    content: '${({number}) => number}';
    background: white;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: grey;
    z-index: 1;
  }
`;

const Reminder = styled.div`
  border: none;
  border-radius: 4px;
  background-color: ${({color}) => color};
  color: white;
  padding: 0 4px;
  margin: 2px 0;
  font-size: 12px;
  cursor: pointer;
`;

const Calendar = ({reminders, month, year, onReminderClick, onCellClick}) => {
  const monthDays = monthDaysSelector(reminders, month, year);
  const weekOrder = weekOrderSelector(month, year);

  return (
    <Table>
      <thead>
        <tr>
          {R.map(
            day => (
              <th key={day}>{day}</th>
            ),
            weekOrder
          )}
        </tr>
      </thead>
      <tbody>
        {R.pipe(
          R.splitEvery(7),
          R.addIndex(R.map)((row, day) => (
            <tr key={day}>
              {R.map(
                ({number, reminders = []}) => (
                  <td key={number}>
                    <Cell number={number} onClick={() => onCellClick(number)}>
                      {R.addIndex(R.map)(
                        reminder => (
                          <Reminder
                            key={reminder.id}
                            color={reminder.color}
                            onClick={e => {
                              e.stopPropagation();
                              onReminderClick(reminder);
                            }}
                          >
                            {reminder.text}
                          </Reminder>
                        ),
                        reminders
                      )}
                    </Cell>
                  </td>
                ),
                row
              )}
            </tr>
          ))
        )(monthDays)}
      </tbody>
    </Table>
  );
};

export default Calendar;
