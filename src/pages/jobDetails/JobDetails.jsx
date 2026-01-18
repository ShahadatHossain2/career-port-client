import React from "react";
import viewJobBg from "../../assets/viewJob.png";
import { Link, useLoaderData } from "react-router";

const JobDetails = () => {
  const job = useLoaderData();
  const {
    _id,
    salary,
    type,
    photo,
    name,
    vacancy,
    location,
    deadline,
    responsibility,
    skill,
  } = job;
  skill.map((sk) => console.log(sk));
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${viewJobBg})`,
      }}
    >
      <div className="hero-overlay">
        <div className="bg-blue-50 shadow my-5 p-4 rounded-lg  w-11/12 mx-auto">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img className="w-20 rounded-2xl" src={photo} alt="logo" />
              <div>
                <h3 className="mb-2 font-bold">{name}</h3>
                <p>Deadline: {deadline}</p>
              </div>
            </div>
            <div>
              <p className="bg-green-200 px-2 rounded-2xl mb-2">{type}</p>
              <p className="font-bold text-green-600">Salary: {salary}</p>
            </div>
          </div>
          <hr className="my-6 border-dotted" />
          <div className="">
            <div>
              <p> Work Place: {location}</p>
              <p>Vacancy: {vacancy}</p>
            </div>
            <div>
              <div className="md:flex grid grid-cols-2">
                {responsibility.map((sk, index) => (
                  <p className="m-1 p-1" key={index}>
                    {sk}
                  </p>
                ))}
              </div>
              <div className="md:flex grid grid-cols-2">
                {skill.map((sk, index) => (
                  <p
                    className="border m-1 p-1 rounded-2xl bg-pink-200"
                    key={index}
                  >
                    {sk}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to={`/applyJob/${_id}`}
              className="btn btn-sm w-1/2 rounded-2xl bg-blue-300 font-bold text-white my-5"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
