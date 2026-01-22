import React, { useState } from "react";
import Banner from "./Banner";
import { useLoaderData } from "react-router";
import JobCards from "./JobCards";
import { MdViewList } from "react-icons/md";
import Trends from "./Trends";

const Home = () => {
  const allJob = useLoaderData();
  const [showAll, setShowAll] = useState(false);
  const [jobs, setJobs] = useState(allJob);
  const visibleJobs = showAll ? jobs : jobs.slice(0, 4);

  return (
    <div>
      <Banner></Banner>
      <div>
        <div className="md:grid grid-cols-2 w-11/12 mx-auto gap-2">
          {visibleJobs.map((job) => (
            <JobCards key={job._id} job={job}></JobCards>
          ))}
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="btn flex w-1/4 mb-5 mx-auto block bg-gradient-to-r from-blue-200 to-violet-600 rounded-2xl font-bold text-white"
        >
          {" "}
          <MdViewList className="text-violet-500 text-2xl" />
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>
      {/* <section className="grid grid-cols-4">
        <div className="col-span-1">
          <Trends></Trends>
        </div>
        <div className="col-span-3"></div>
      </section> */}
    </div>
  );
};

export default Home;
