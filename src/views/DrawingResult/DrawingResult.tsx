import React, { FC, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { IDrawingResult } from "../../interfaces/drawingResults";
import dayjs from "dayjs";
import { FormikProvider, useFormik } from "formik";
import { omit } from "lodash";
import InputWithLabel from "../../shared/InputWithLabel/InputWithLabel";

const DrawingResult: FC = () => {
  const { drawingId } = useParams();
  const { responseData: drawingResult, fetchResponseData } = useFetch<IDrawingResult>({
    type: 'GET',
    url: `DrawingResults/${drawingId}`
  });

  useEffect(() => {
    fetchResponseData();
  }, [drawingId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { giverGiftWishes: drawingResult?.giverGiftWishes || '' },
    onSubmit: values => {
      // isNew ? onCreateNew(values) : onEditEvent(omit(values, 'creatingDate'));
    }
  });

  return (
    <div>
      <h2>Drawing result</h2>
      <h3>Hello {drawingResult?.giverName}</h3>
      <div className="card">
        <div>Event name: {drawingResult?.eventName}</div>
        <div>End date: {drawingResult?.endDate && dayjs(drawingResult?.endDate).format('YYYY-MM-DD HH:mm:ss')}</div>
        <div>Budget: {drawingResult?.budget}</div>
        <div>Message: {drawingResult?.message}</div>
        <div>Recipient name: {drawingResult?.recipientName}</div>
        <div>Gift wishes: {drawingResult?.recipientGiftWishes}</div>
      </div>
      <div className="card">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <InputWithLabel
              id="giverGiftWishes"
              type="textarea"
              label="Your gift wishes"
              handleChange={formik.handleChange}
              value={formik.values.giverGiftWishes}
            />
          </form>
        </FormikProvider>
      </div>

    </div>
  )
}

export default DrawingResult;