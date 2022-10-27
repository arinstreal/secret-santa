import { Field } from 'formik';
import React, { FC, useMemo, useState } from 'react';
import { IPerson } from "../../../interfaces/person";
import { IOption } from "../../../interfaces/option";
import { Button, Stack, TextField } from "@mui/material";
import styles from "./PersonField.module.scss";

type PersonFieldProps = {
  person: IPerson,
  prefixName: string,
  onChange: (event: React.ChangeEvent<any>) => void,
  remove: () => void,
  readOnly?: boolean;
  persons?: Array<IPerson>;
  isNew?: boolean;
}

const PersonField: FC<PersonFieldProps> = (
  {
    person,
    prefixName,
    onChange,
    remove,
    readOnly,
    persons,
    isNew
  }: PersonFieldProps) => {
  const [openExclusion, setOpenExclusion] = useState(false);
  // @ts-ignore
  const personsOptions = useMemo<IOption[]>(() => (persons?.filter(item => item.id !== person.id) || []).map(item => ({
    value: item.id,
    label: item.name
  })), [persons]);
  const handleAddExclusion = () => {
    setOpenExclusion(prev => (!prev));
  }

  return (
    <div className={styles.personField}>
      <Stack direction="row" spacing={2}>
        <TextField
          id={`${prefixName}name`}
          label="Nazwa"
          variant="standard"
          onChange={onChange}
          disabled={readOnly}
          value={person.name}
          fullWidth
        />
        <TextField
          id={`${prefixName}email`}
          label="Email"
          onChange={onChange}
          value={person.email}
          type="email"
          disabled={readOnly}
          fullWidth
          variant="standard"
        />
        {
          !readOnly &&
            <Button variant="outlined" color="error" type="button" className="remove" onClick={remove}>
                X
            </Button>
        }
      </Stack>

      {
        !isNew && !readOnly && <Button onClick={handleAddExclusion} type="button">Dodaj wykluczenia</Button>
      }
      {
        openExclusion &&
          <Field as="select" name="color">
            {
              personsOptions.map(item => <option value={item.value}>{item.label}</option>)
            }
          </Field>
      }
    </div>
  )
}

export default PersonField;