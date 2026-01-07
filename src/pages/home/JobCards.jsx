import React from "react";
import { Link } from "react-router";

const JobCards = ({ job }) => {
  const { _id, salary, type, photo, name, vacancy, location, deadline } = job;
  return (
    <div className="bg-blue-50 shadow my-5 p-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img className="w-20 rounded-2xl" src={photo} alt="logo" />
          <div>
            <h3 className="mb-2">{name}</h3>
            <p>Deadline: {deadline}</p>
          </div>
        </div>
        <div>
          <p className="bg-green-200 px-2 rounded-2xl">{type}</p>
        </div>
      </div>
      <hr className="my-6 border-dotted" />
      <div className="flex justify-between items-center">
        <div>
          <p>Work Place: {location}</p>
          <p>Vacancy: {vacancy}</p>
        </div>
        <div>
          <p className="font-bold text-green-600">Salary: {salary}</p>
          <Link
            to={`/jobDetails/${_id}`}
            className="btn btn-xs btn-info text-white font-bold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCards;
