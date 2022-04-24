import React, { FC, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { IDrawingResult } from "../../interfaces/drawingResults";
import dayjs from "dayjs";
import { FormikProvider, useFormik } from "formik";
import InputWithLabel from "../../shared/InputWithLabel/InputWithLabel";
import Gift from "../../shared/Gift/Gift";
import {LoadingButton} from "../../shared/LoadingButton/LoadingButton";

const DrawingResult: FC = () => {
  const { drawingId } = useParams();
  const { responseData: drawingResult, fetchResponseData } = useFetch<IDrawingResult>({
    type: 'GET',
    url: `DrawingResults/${drawingId}`
  });
  const { eventId, giverId } = drawingResult || {};

  const { responseData: wishResult, fetchResponseData: sendWish, loading: loadingSendWish } = useFetch<{ wish: string }>({
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
      sendWish({ wish });
    }
  });

  return (
    <div>
      <h2>Drawing result</h2>
      <h3>Hello {drawingResult?.giverName}</h3>
      <div className="card">
        <Gift person={drawingResult?.recipientName}/>
        <div>Event name: {drawingResult?.eventName}</div>
        <div>End date: {drawingResult?.endDate && dayjs(drawingResult?.endDate).format('YYYY-MM-DD HH:mm:ss')}</div>
        <div>Budget: {drawingResult?.budget}</div>
        <div>Message: {drawingResult?.message}</div>
        <div>Gift wishes: {drawingResult?.recipientGiftWishes}</div>
      </div>
      <div className="card">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <InputWithLabel
              id="wish"
              type="textarea"
              label="Your gift wishes"
              handleChange={formik.handleChange}
              value={formik.values.wish}
            />
            <LoadingButton type="sumbit" text="Wyślij" isLoading={loadingSendWish}/>
          </form>
        </FormikProvider>
      </div>

    </div>
  )
}

export default DrawingResult;