import React, { FC } from "react";
import { IEvent } from "../../../interfaces/event";
import { useFormikContext } from "formik";
import { FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

interface IEventFields {
  readOnly?: boolean;
  isNew?: boolean;
}

const EventFields: FC<IEventFields> = ({ readOnly, isNew }) => {
  const { values, handleChange, setFieldValue } = useFormikContext<IEvent>();

  const onHandleChangeDate = (newValue: Date | null) => {
    setFieldValue('endDate', newValue);
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h3" gutterBottom component="div">
        Wydarzenie
      </Typography>
      <TextField
        id="organizerName"
        label="Organizator"
        onChange={handleChange}
        value={values.organizerName}
        disabled={readOnly || !isNew}
        fullWidth
        required
      />
      <TextField
        id="organizerEmail"
        label="Email organizatora"
        type="email"
        onChange={handleChange}
        value={values.organizerEmail}
        disabled={readOnly || !isNew}
        fullWidth
        required
      />
      <TextField
        id="name"
        label="Nazwa wydarzenia"
        onChange={handleChange}
        value={values.name}
        disabled={readOnly}
        fullWidth
        required
      />
      <DesktopDatePicker
        label="Data zakończenia"
        // name="endDate"
        inputFormat="DD/MM/YYYY"
        value={values.endDate ? new Date(values.endDate!) : null}
        onChange={onHandleChangeDate}
        renderInput={(params) => <TextField {...params} required />}
        disabled={readOnly}

      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="budget">Budżet</InputLabel>
        <OutlinedInput
          label="Budżet"
          id="budget"
          value={values.budget}
          onChange={handleChange}
          endAdornment={<InputAdornment position="end">PLN</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          required
          inputProps={{
            'aria-label': 'budget',
          }}
          disabled={readOnly}
        />
      </FormControl>
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