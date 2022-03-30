import React, { FC } from 'react';
import { IPerson } from "../../../interfaces/person";
import InputWithLabel from "../../../shared/InputWithLabel/InputWithLabel";

type PersonFieldProps = {
  person: IPerson,
  prefixName: string,
  onChange: (event: React.ChangeEvent<any>) => void,
  remove: () => void,
  readOnly?: boolean;
}

const PersonField: FC<PersonFieldProps> = ({ person, prefixName, onChange, remove, readOnly }: PersonFieldProps) => {
  return (
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
      <button type="button" className="remove" onClick={remove}>
        X
      </button>
    </div>
  )
}

export default PersonField;