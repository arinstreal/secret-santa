import React, { FC, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { IDrawingResult } from "../../interfaces/drawingResults";
import dayjs from "dayjs";
import { Formik } from "formik";
import Gift from "../../shared/Gift/Gift";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import styles from "./DrawingResult.module.scss";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loader } from "../../shared/Loader/Loader";

dayjs.extend(relativeTime);

const DrawingResult: FC = () => {
  const { drawingId } = useParams();
  const { responseData: drawingResult, fetchResponseData } = useFetch<IDrawingResult>({
    type: 'GET',
    url: `DrawingResults/${drawingId}`
  });
  const { eventId, giverId } = drawingResult || {};

  const {
    // responseData: wishResult,
    fetchResponseData: sendWish,
    loading: loadingSendWish,
  } = useFetch<{ wish: string }>({
    type: 'PUT',
    url: `Events/${eventId}/Persons/${giverId}/GiftWishes`
  });

  useEffect(() => {
    fetchResponseData();
  }, [drawingId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!drawingResult?.giverName) return <Loader/>;
  return (
    <div className={styles.drawingResult}>
      <Typography
        variant="h4" component="div" align="center" color="white" fontFamily="GreatVibes Regular"
        marginBottom="12px">
        {drawingResult?.eventName}
      </Typography>
      <div className="card">
        <Typography
          variant="h4" gutterBottom component="div" align="center" marginTop="24px"
          fontFamily="GreatVibes Regular"
        >
          Witaj {drawingResult?.giverName}!
        </Typography>
        <Gift person={drawingResult?.recipientName}/>
        <Typography variant="body2" gutterBottom component="div" align="center" marginBottom="12px" color="gray">
          Dotknij wieczka, aby sprawdzić kogo wylosowałeś/aś
        </Typography>
        {drawingResult?.recipientGiftWishes &&
            <div className="mb-2"><b>Wymarzone prezenty:</b> <br/> {drawingResult?.recipientGiftWishes}</div>
        }
        <div className="mt-4 mb-2"><b>Budżet:</b> {drawingResult?.budget}zł</div>
        {
          drawingResult?.message &&
            <Typography variant="body1" gutterBottom component="div" textAlign="justify" marginBottom="12px">
            {drawingResult?.message}
          </Typography>
        }

        <div className={styles.wishesWrapper}>
          <Formik
            enableReinitialize={false}
            initialValues={{ wish: drawingResult?.giverGiftWishes || '' }}
            onSubmit={(formValues, formikBag) => {
              const { wish } = formValues;
              sendWish({ wish });
              formikBag.resetForm({ values: formValues });
            }}
          >
            {
              formik => (
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    id="wish"
                    label="List do Mikołaja"
                    onChange={formik.handleChange}
                    value={formik.values.wish}
                    fullWidth
                    multiline
                    type="textarea"
                  />
                  <div className={styles.buttonWrapper}>
                    <LoadingButton
                      loading={loadingSendWish}
                      variant="outlined"
                      color="error"
                      disabled={!formik.dirty}
                      type="submit">
                      Wyślij
                    </LoadingButton>
                  </div>
                </form>

              )
            }
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default DrawingResult;