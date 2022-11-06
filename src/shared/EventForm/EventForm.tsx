import { FormikProvider, useFormik } from "formik";
import { IEvent } from "../../interfaces/event";
import { FC, useEffect } from "react";
import PersonsFields from "./Components/PersonsFields";
import { useNavigate, useParams } from "react-router-dom";
import { omit } from "lodash";
import EventFields from "./Components/EventFields";
import useFetch from "../../hooks/useFetch";
import { initPerson, IPerson } from "../../interfaces/person";
import Button from "@mui/material/Button";
import { Card, CardContent, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./EventForm.module.scss";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import * as Yup from 'yup';

const initialValues: IEvent = {
  organizerName: '',
  organizerEmail: '',
  name: '',
  endDate: null,
  budget: 0,
  message: '',
  persons: [initPerson()]
}

interface IEventForm {
  data?: IEvent | null;
  readOnly?: boolean;
  isNew?: boolean;
  handleEdit?: () => void;
}

const EventForm: FC<IEventForm> = ({ data, readOnly, isNew, handleEdit }) => {
  let navigate = useNavigate();
  let { eventId } = useParams();
  const { fetchResponseData: createEvent, responseData: event, success } = useFetch<IEvent>({
    type: 'POST',
    url: `Events`
  });
  const { fetchResponseData: editEvent } = useFetch<IPerson[]>({
    type: 'PUT',
    url: `Events/${eventId}/Edit`
  });

  const EventFormSchema = Yup.object().shape({
    organizerEmail: Yup.string().email('Nieprawidłowy email').required('Required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...(data || initialValues), organizerInEvent: false },
    validationSchema: EventFormSchema,
    onSubmit: values => {
      isNew ? onCreateNew(values) : editEvent(omit(values, 'creatingDate'));
    }
  });

  const onCreateNew = (values: any) => {
    const entity = {
      ...values
    }
    if (values.organizerInEvent) {
      entity.persons.push({ name: values.organizerName, email: values.organizerEmail });
    }
    createEvent(entity);
  };

  useEffect(() => {
    if (success && event?.id) {
      navigate(`event/${event.id}`);
    }
  }, [success, event, navigate]);

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className={styles.eventForm}>
          <div>
            <Card className={styles.eventCard}>
              <CardContent>
                <EventAvailableIcon className="card-icon"/>
                <EventFields
                  readOnly={readOnly}
                  isNew={isNew}
                />
                <FormControlLabel
                  name="organizerInEvent" control={<Checkbox/>}
                  label="Czy organizator bierze udział w losowaniu?"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <PersonAddAlt1Icon className="card-icon"/>
                <PersonsFields
                  readOnly={readOnly}
                  isNew={isNew}
                  persons={formik.values.persons}
                  handleChange={formik.handleChange}
                />
              </CardContent>
            </Card>
          </div>
          <div className="end">
            {
              !readOnly && <Button variant="contained" color="primary" type="submit">Wyślij</Button>
            }
          </div>
        </form>
      </FormikProvider>
      {
        readOnly &&
          <div className="end">
              <Button variant="contained" color="primary" onClick={handleEdit} type="button">Edytuj</Button>
          </div>
      }
    </>
  );
}

export default EventForm;
