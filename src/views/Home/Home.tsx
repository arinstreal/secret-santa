import React from "react";
import { Link } from "react-router-dom";
import EventForm from "../../shared/EventForm/EventForm";

const id = '5ae845d9-e0f7-4985-d343-08da118acb81';

const Home = () => {
  return (
    <div>
      <div className="card">
        <EventForm/>
      </div>
      <Link to={`event/${id}`}>Detail</Link>
    </div>)
}

export default Home;