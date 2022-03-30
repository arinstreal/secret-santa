import React, { ChangeEvent, FC } from "react";
import "./InputWithLabel.scss";

interface IInputWithLabel {
  id: string;
  label: string;
  handleChange: (e:ChangeEvent) => void;
  value?: any;
  type?: string;
  min?: number;
  readOnly?: boolean;
}

const InputWithLabel: FC<IInputWithLabel> = ({ id, label, handleChange, value, type, min, readOnly }) => {
  return (
    <div className="input-with-label">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        onChange={handleChange}
        value={value}
        type={type}
        min={min}
        readOnly={readOnly}
      />
    </div>
  )
}

export default InputWithLabel;