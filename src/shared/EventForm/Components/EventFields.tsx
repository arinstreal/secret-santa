import React, { FC } from "react";
import ReactDatePicker from "react-datepicker";
import { IEvent } from "../../../interfaces/event";
import { useFormikContext } from "formik";
import { Stack, TextField } from "@mui/material";

interface IEventFields {
  readOnly?: boolean;
  isNew?: boolean;
}

const EventFields: FC<IEventFields> = ({ readOnly, isNew }) => {
  const { values, handleChange, setFieldValue } = useFormikContext<IEvent>();

  return (
    <Stack  spacing={2}>
      <h2>Wydarzenie</h2>
      <TextField
        id="organizerName"
        label="Organizator"
        onChange={handleChange}
        value={values.organizerName}
        disabled={readOnly || !isNew}
        fullWidth
      />
      <TextField
        id="organizerEmail"
        label="Email organizatora"
        type="email"
        onChange={handleChange}
        value={values.organizerEmail}
        disabled={readOnly || !isNew}
        fullWidth
      />
      <TextField
        id="name"
        label="Nazwa wydarzenia"
        onChange={handleChange}
        value={values.name}
        disabled={readOnly}
        fullWidth
      />
      <div>
        <label htmlFor="endDate">Data zakończenia</label>
        <ReactDatePicker
          selected={values.endDate ? new Date(values.endDate!) : null}
          onChange={date => setFieldValue('endDate', date)}
          readOnly={readOnly}
        />
      </div>
      <TextField
        id="budget"
        label="Budżet"
        onChange={handleChange}
        value={values.budget}
        type="number"
        inputProps={{ min: '0', pattern: '[0-9]*' }}
        disabled={readOnly}
        fullWidth
      />
      <TextField
        id="message"
        label="Wiadomość"
        onChange={handleChange}
        value={values.message}
        disabled={readOnly}
        fullWidth
      />
    </Stack>
  )
}

export default EventFields;