import React from "react";
import { Link } from "react-router-dom";
import EventForm from "../../shared/EventForm/EventForm";

const ids = ['5ae845d9-e0f7-4985-d343-08da118acb81', '4f253ad9-2e25-4ab6-19ae-08da172db6aa'];

const Home = () => {
  return (
    <div>
      <div className="card">
        <EventForm isNew/>
      </div>
      {
        ids.map(id => <Link key={id} to={`event/${id}`}>Detail</Link>)
      }
    </div>)
}

export default Home;