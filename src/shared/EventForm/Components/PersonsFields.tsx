import { FieldArray, FieldArrayRenderProps, useFormikContext } from "formik";
import PersonField from "../../../views/Home/Components/PersonField";
import React, { ChangeEvent, FC, ReactChildren } from "react";
import { initPerson, IPerson } from "../../../interfaces/person";
import { IEvent } from "../../../interfaces/event";
import { Button, Stack, Typography } from "@mui/material";

interface IPersonsFields {
  readOnly?: boolean;
  isNew?: boolean;
  handleChange: (e: ChangeEvent) => void;
  persons?: IPerson[];
  children?: ReactChildren;
}

const PersonsFields: FC<IPersonsFields> = ({ persons = [], readOnly, isNew, children }) => {
  const { handleChange } = useFormikContext<IEvent>();

  const addPerson = (personsArray: FieldArrayRenderProps) => {
    personsArray.push(initPerson());
  }

  const removePerson = (personsArray: FieldArrayRenderProps, index: number) => () => {
    personsArray.remove(index)
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom component="div">
        Uczestnicy
      </Typography>
      <FieldArray
        name="persons"
        render={arrayHelpers => (
          <div>
            {
              persons.map((person, index) => (
                <Stack spacing={2} key={index}>
                  <PersonField
                    person={persons[index]}
                    prefixName={`persons.${index}.`}
                    onChange={handleChange}
                    remove={removePerson(arrayHelpers, index)}
                    readOnly={readOnly}
                    persons={persons}
                    isNew={isNew}
                  />
                  {children}
                </Stack>
              ))
            }
            {
              !readOnly && <div className="mb-2">
                    <Button
                        type="button"
                        variant="outlined" color="success"
                        onClick={() => addPerson(arrayHelpers)}
                    >
                        + Dodaj osobę
                    </Button>
                </div>
            }
          </div>
        )
        }
      />
    </div>
  )
}

export default PersonsFields;