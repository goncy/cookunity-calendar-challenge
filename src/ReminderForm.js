import React from "react";
import styled from "styled-components";

const Layer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Modal = styled.div`
  background-color: white;
  padding: 32px;
  border-radius: 4px;
  position: relative;
`;

const Close = styled.button`
  border: none;
  border-radius: 50%;
  background: var(--white);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark);
  position: absolute;
  font-size: 16px;
  right: -16px;
  top: -16px;
  cursor: pointer;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  border: none;
  font-size: 18px;
  border-radius: 2px;
  padding: 12px;
  cursor: pointer;
  transition: opacity 0.2s;
  background: var(--default);
  color: var(--dark);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${Button} {
    &[type="submit"] {
      background: var(--primary);
      color: var(--white);
    }

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    &:hover {
      opacity: 0.7;
    }
  }

  input {
    font-size: 18px;
    padding: 6px;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

const ReminderForm = ({initialValues, onSave, onDelete, onClose}) => {
  const baseReminder = {
    text: "",
    datetime: +new Date(),
    color: "#5a3de4",
    ...initialValues,
  };

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...baseReminder,
      text: e.target.text.value,
      color: e.target.color.value,
      datetime: +new Date(e.target.datetime.value),
    });
  }

  return (
    <Layer>
      <Modal>
        <Close onClick={onClose}>X</Close>
        <Form onSubmit={handleSubmit}>
          <input
            autoFocus
            required
            defaultValue={baseReminder.text}
            name="text"
            placeholder="Recordatorio"
            type="text"
          />
          <input
            required
            defaultValue={baseReminder.color}
            name="color"
            placeholder="Color"
            type="color"
          />
          <input
            required
            defaultValue={new Date(baseReminder.datetime)
              .toJSON()
              .split(":")
              .slice(0, 2)
              .join(":")}
            name="datetime"
            placeholder="Fecha"
            type="datetime-local"
          />
          <Button type="submit">Guardar</Button>
          {baseReminder.id && (
            <Button
              type="button"
              onClick={e => {
                e.preventDefault();
                onDelete(baseReminder.id);
              }}
            >
              Borrar
            </Button>
          )}
        </Form>
      </Modal>
    </Layer>
  );
};

export default ReminderForm;
