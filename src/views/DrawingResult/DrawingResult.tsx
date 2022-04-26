import React, { FC, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { IDrawingResult } from "../../interfaces/drawingResults";
import dayjs from "dayjs";
import { FormikProvider, useFormik } from "formik";
import Gift from "../../shared/Gift/Gift";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
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
    <div>
      <Typography variant="h5" gutterBottom component="div" align="left">
        {drawingResult?.eventName}
      </Typography>
      <Typography variant="subtitle2" gutterBottom component="div" align="left">
        Dzień wymiany prezentami {drawingResult?.endDate && dayjs(drawingResult?.endDate).format('DD.MM.YYYY')}
        {/*{dayjs(drawingResult?.endDate).fromNow()}*/}
      </Typography>
      <Typography variant="h3" gutterBottom component="div" align="center">
        Witaj {drawingResult?.giverName}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div" align="center">
        Otwórz prezent, aby sprawdzić kogo wylosowałeś/aś
      </Typography>
      <div className="card">
        <Gift person={drawingResult?.recipientName}/>
        <div>Wymarzone prezenty: {drawingResult?.recipientGiftWishes}</div>

        <div>Budżet: {drawingResult?.budget}</div>
        <div>Wiadomość: {drawingResult?.message}</div>
      </div>
      <div className="card">
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
            <LoadingButton
              loading={loadingSendWish}
              variant="outlined"
              type="submit">
              Save
            </LoadingButton>
            {/*<LoadingButton type="sumbit" text="Wyślij" isLoading={loadingSendWish}/>*/}
          </form>
        </FormikProvider>
      </div>

    </div>
  )
}

export default DrawingResult;