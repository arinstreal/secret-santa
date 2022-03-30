import { FieldArray, FieldArrayRenderProps, FormikContextType, FormikProvider } from "formik";
import PersonField from "../../../views/Home/Components/PersonField";
import { FC, useMemo } from "react";
import { IEvent } from "../../../interfaces/event";
import { initPerson } from "../../../interfaces/person";

interface IPersonsFields {
  formik: FormikContextType<IEvent>;
  readOnly?: boolean;
}

const PersonsFields: FC<IPersonsFields> = ({ formik, readOnly }) => {
  const persons = useMemo(() => formik.values.persons, [formik]);

  const addPerson = (personsArray: FieldArrayRenderProps) => {
    personsArray.push(initPerson());
  }

  const removePerson = (personsArray: FieldArrayRenderProps, index: number) => () => {
    personsArray.remove(index)
  }

  return (
    <div>
      <FormikProvider value={formik}>
        <FieldArray
          name="persons"
          render={arrayHelpers => (
            <div>
              {
                persons.map((person, index) => (
                  <PersonField
                    key={index}
                    person={persons[index]}
                    prefixName={`persons.${index}.`}
                    onChange={formik.handleChange}
                    remove={removePerson(arrayHelpers, index)}
                    readOnly={readOnly}
                  />
                ))
              }
              <div className="mb-2">
                <button
                  className="border"
                  type="button"
                  onClick={() => addPerson(arrayHelpers)}
                >
                  + Add person
                </button>
              </div>
            </div>
          )
          }
        />
      </FormikProvider>
    </div>
  )
}

export default PersonsFields;