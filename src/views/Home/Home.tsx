import React from "react";
import { Link } from "react-router-dom";
import EventForm from "../../shared/EventForm/EventForm";

const ids = ['5ae845d9-e0f7-4985-d343-08da118acb81', '4f253ad9-2e25-4ab6-19ae-08da172db6aa', 'd7aba5cc-5273-4f4e-9d2d-08da18bec62e'];

const Home = () => {
  return (
    <div>
      <EventForm isNew/>
      {
        ids.map(id => <Link key={id} to={`event/${id}`}>Detail</Link>)
      }
    </div>
  )
}

export default Home;