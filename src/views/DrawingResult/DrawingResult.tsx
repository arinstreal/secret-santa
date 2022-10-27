import React, { FC, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { IDrawingResult } from "../../interfaces/drawingResults";
import dayjs from "dayjs";
import { FormikProvider, useFormik } from "formik";
import Gift from "../../shared/Gift/Gift";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import styles from "./DrawingResult.module.scss";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const DrawingResult: FC = () => {
  const { drawingId } = useParams();
  const { responseData: drawingResult, fetchResponseData } = useFetch<IDrawingResult>({
    type: 'GET',
    url: `DrawingResults/${drawingId}`
  });
  const { eventId, giverId } = drawingResult || {};

  const {
    responseData: wishResult,
    fetchResponseData: sendWish,
    loading: loadingSendWish
  } = useFetch<{ wish: string }>({
    type: 'PUT',
    url: `Events/${eventId}/Persons/${giverId}/GiftWishes`
  });

  useEffect(() => {
    fetchResponseData();
  }, [drawingId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { wish: drawingResult?.giverGiftWishes || '' },
    onSubmit: values => {
      const { wish } = values;
      console.log(values)
      sendWish({ wish });
    }
  });

  return (
    <div className={styles.drawingResult}>
      <Typography
        variant="h4" component="div" align="center" color="white" fontFamily="GreatVibes Regular"
        marginBottom="4px">
        {drawingResult?.eventName}
      </Typography>
      <div className="card">
        <Typography variant="h4" gutterBottom component="div" align="center" marginTop="24px"
                    fontFamily="GreatVibes Regular">
          Witaj {drawingResult?.giverName}!
        </Typography>
        <Gift person={drawingResult?.recipientName}/>
        <Typography variant="body2" gutterBottom component="div" align="center" marginBottom="12px" color="gray">
          Dotknij wieczka, aby sprawdzić kogo wylosowałeś/aś
        </Typography>
        {drawingResult?.recipientGiftWishes &&
            <div><b>Wymarzone prezenty:</b> {drawingResult?.recipientGiftWishes}</div>
        }
        <div className="mt-4"><b>Budżet:</b> {drawingResult?.budget}zł</div>
        <div className="mt-4">{drawingResult?.message}</div>

        <div className={styles.wishesWrapper}>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="wish"
                label="Twoje wymarzone prezenty"
                onChange={formik.handleChange}
                value={formik.values.wish}
                fullWidth
                required
                type="textarea"
              />
              <div className={styles.buttonWrapper}>
                <LoadingButton
                  loading={loadingSendWish}
                  variant="outlined"
                  color="error"
                  disabled={!formik.dirty || !formik.touched}
                  type="submit">
                  Zapisz
                </LoadingButton>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  )
}

export default DrawingResult;