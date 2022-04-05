import { ChangeEvent, FC } from "react";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import ReactDatePicker from "react-datepicker";
import { IEvent } from "../../../interfaces/event";
import { Field } from "formik";

interface IEventFields {
  values: IEvent;
  handleChange: (e: ChangeEvent) => void;
  setFieldValue: (name: string, any: any) => void;
  readOnly?: boolean;
  isNew?: boolean;
}

const EventFields: FC<IEventFields> = ({ values, handleChange, readOnly, isNew, setFieldValue }) => {
  return (
    <div>
      <h2>Event</h2>
      <InputWithLabel
        id="organizerName"
        label="Organizer name"
        handleChange={handleChange}
        value={values.organizerName}
        readOnly={readOnly}
      />
      <InputWithLabel
        id="organizerEmail"
        label="Organizer email"
        type="email"
        handleChange={handleChange}
        value={values.organizerEmail}
        readOnly={readOnly}
      />
      <InputWithLabel
        id={isNew ? 'eventName' : 'name'}
        label="Event name"
        handleChange={handleChange}
        value={isNew ? values.eventName : values.name}
        readOnly={readOnly}
      />
      <div>
        <label htmlFor="eventName">Data zakończenia</label>
        <ReactDatePicker
          selected={values.endDate ? new Date(values.endDate!) : null}
          onChange={date => setFieldValue('endDate', date)}
          readOnly={readOnly}
        />
      </div>
      <InputWithLabel
        id="budget"
        label="Budget"
        handleChange={handleChange}
        value={values.budget}
        type="number"
        min={0}
        readOnly={readOnly}
      />
      <InputWithLabel
        id="message"
        label="Message"
        handleChange={handleChange}
        value={values.message}
        readOnly={readOnly}
      />
    </div>
  )
}

export default EventFields;