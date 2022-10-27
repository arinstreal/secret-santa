import React, { FC } from "react";
import { IEvent } from "../../../interfaces/event";
import { useFormikContext } from "formik";
import { FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

interface IEventFields {
  readOnly?: boolean;
  isNew?: boolean;
}

const EventFields: FC<IEventFields> = ({ readOnly, isNew }) => {
  const { values, handleChange, setFieldValue, errors, touched } = useFormikContext<IEvent>();

  const onHandleChangeDate = (newValue: Date | null) => {
    setFieldValue('endDate', newValue);
  }

  return (
    <Stack spacing={2}>
      <TextField
        id="organizerName"
        label="Organizator"
        onChange={handleChange}
        value={values.organizerName}
        disabled={readOnly || !isNew}
        fullWidth
        required
        variant="standard"
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
        variant="standard"
      />
      {errors.organizerEmail && touched.organizerEmail ? <div>{errors.organizerEmail}</div> : null}
      <TextField
        id="name"
        label="Nazwa wydarzenia"
        onChange={handleChange}
        value={values.name}
        disabled={readOnly}
        fullWidth
        required
        variant="standard"
      />
      <DesktopDatePicker
        label="Data zakończenia"
        minDate={new Date()}
        inputFormat="DD/MM/YYYY"
        value={values.endDate ? new Date(values.endDate!) : null}
        onChange={onHandleChangeDate}
        renderInput={(params) => <TextField variant="standard" {...params} required />}
        disabled={readOnly}

      />
      <TextField
        id="budget"
        label="Budżet"
        onChange={handleChange}
        value={values.budget}
        fullWidth
        required
        variant="standard"
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
            'variant': 'standard'
          }}
          disabled={readOnly}
        />
      </FormControl>
      <TextField
        id="message"
        label="Wiadomość"
        type="textarea"
        onChange={handleChange}
        value={values.message}
        disabled={readOnly}
        fullWidth
        variant="standard"
      />
    </Stack>
  )
}

export default EventFields;