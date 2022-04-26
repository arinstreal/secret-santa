import { FC, MouseEvent, useEffect, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { initPerson, IPerson } from "../../../interfaces/person";
import PersonsFields from "../../../shared/EventForm/Components/PersonsFields";
import { Button } from "@mui/material";

interface IPersonsDetails {
  persons: IPerson[];
}

const PersonsDetails: FC<IPersonsDetails> = ({ persons }) => {
  let { eventId } = useParams();
  const [readOnly, setReadOnly] = useState(true);
  const { fetchResponseData: saveExclusions, success } = useFetch<IPerson[]>({
    type: 'PUT',
    url: `Events/${eventId}/Exclusions`
  });

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setReadOnly(prev => (!prev));
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { persons: [...persons || initPerson()] },
    onSubmit: values => {
      // const { name, endDate, budget, message } = values;
    }
  });

  useEffect(() => {
    if (success) {
      setReadOnly(true);
    }
  }, [success]);
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <PersonsFields
          readOnly={readOnly}
          persons={formik.values.persons}
          handleChange={formik.handleChange}
        />
        <div className="end">
          {
            !readOnly ?
              <Button type="submit">Zapisz wykluczenia</Button> :
              <Button onClick={handleEdit} type="button">Edytuj</Button>
          }
        </div>
      </form>
    </FormikProvider>
  )
}
export default PersonsDetails;