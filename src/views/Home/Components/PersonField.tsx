import { Field } from 'formik';
import React, { FC, useMemo, useState } from 'react';
import { IPerson } from "../../../interfaces/person";
import InputWithLabel from "../../../shared/InputWithLabel/InputWithLabel";
import { IOption } from "../../../interfaces/option";

type PersonFieldProps = {
  person: IPerson,
  prefixName: string,
  onChange: (event: React.ChangeEvent<any>) => void,
  remove: () => void,
  readOnly?: boolean;
  persons?: Array<IPerson>;
  isNew?: boolean;
}

const PersonField: FC<PersonFieldProps> = ({ person, prefixName, onChange, remove, readOnly, persons, isNew }: PersonFieldProps) => {
  const [openExclusion, setOpenExclusion] = useState(false);
  // @ts-ignore
  const personsOptions = useMemo<IOption[]>(() => (persons?.filter(item=> item.id !== person.id) || []).map(item => ({value: item.id, label: item.name })) , [persons]);
  const handleAddExclusion = () => {
    setOpenExclusion(prev => (!prev));
  }

  return (
    <div>
      <div className="d-flex">
        <InputWithLabel
          id={`${prefixName}name`}
          label="Name"
          handleChange={onChange}
          value={person.name}
          readOnly={readOnly}
        />
        <InputWithLabel
          id={`${prefixName}email`}
          label="Email"
          handleChange={onChange}
          value={person.email}
          type="email"
          readOnly={readOnly}
        />
        {
          !readOnly && <button type="button" className="remove" onClick={remove}>
                X
            </button>
        }
      </div>

      {
        !isNew && !readOnly && <button onClick={handleAddExclusion} type="button">Add exclusions</button>
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