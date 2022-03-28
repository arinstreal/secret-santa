import { Field } from 'formik';
import React, { FC } from 'react';
import { IPerson } from "../../../interfaces/person";

type PersonFieldProps = {
  person: IPerson,
  prefixName: string,
  onChange: (event: React.ChangeEvent<any>) => void
}

const PersonField: FC<PersonFieldProps> = ({ person, prefixName, onChange }: PersonFieldProps) => {
  return (
    <div>
      <label htmlFor={`${prefixName}name`}>Name</label>
      <input
        type="text"
        id={`${prefixName}name`}
        name={`${prefixName}name`}
        value={person.name}
        onChange={onChange}
      />
      <label htmlFor={`${prefixName}email`}>Email</label>
      <input
        type="email"
        id={`${prefixName}email`}
        name={`${prefixName}email`}
        value={person.email}
        onChange={onChange}
      />
    </div>
  )
}

export default PersonField;