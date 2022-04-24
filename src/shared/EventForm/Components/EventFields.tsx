import { FC } from "react";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import ReactDatePicker from "react-datepicker";
import { IEvent } from "../../../interfaces/event";
import { useFormikContext } from "formik";

interface IEventFields {
  readOnly?: boolean;
  isNew?: boolean;
}

const EventFields: FC<IEventFields> = ({ readOnly, isNew }) => {
  const { values, handleChange, setFieldValue } = useFormikContext<IEvent>();

  return (
    <div>
      <h2>Wydarzenie</h2>
      <InputWithLabel
        id="organizerName"
        label="Organizator"
        handleChange={handleChange}
        value={values.organizerName}
        readOnly={readOnly || !isNew}
      />
      <InputWithLabel
        id="organizerEmail"
        label="Email organizatora"
        type="email"
        handleChange={handleChange}
        value={values.organizerEmail}
        readOnly={readOnly || !isNew}
      />
      <InputWithLabel
        id="name"
        label="Nazwa wydarzenia"
        handleChange={handleChange}
        value={values.name}
        readOnly={readOnly}
      />
      <div>
        <label htmlFor="endDate">Data zakończenia</label>
        <ReactDatePicker
          selected={values.endDate ? new Date(values.endDate!) : null}
          onChange={date => setFieldValue('endDate', date)}
          readOnly={readOnly}
        />
      </div>
      <InputWithLabel
        id="budget"
        label="Budżet"
        handleChange={handleChange}
        value={values.budget}
        type="number"
        min={0}
        readOnly={readOnly}
      />
      <InputWithLabel
        id="message"
        label="Wiadomość"
        handleChange={handleChange}
        value={values.message}
        readOnly={readOnly}
      />
    </div>
  )
}

export default EventFields;