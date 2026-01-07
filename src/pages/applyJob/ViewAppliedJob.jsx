import React, { useEffect, useState } from "react";
import AuthHook from "../../hooks/AuthHook";
import axios from "axios";

const ViewAppliedJob = () => {
  const { user } = AuthHook();
  const [application, setApplication] = useState([]);

  useEffect(() => {
    if (!user.email) return;
    fetch(`http://localhost:5000/application/${user.email}`)
      .then((res) => res.json())
      .then((data) => setApplication(data));
  }, [user]);

  const [appliedJob, setAppliedJob] = useState([]);
  useEffect(() => {
    if (!application?.length) return;

    Promise.all(
      application.map((job) =>
        fetch(`http://localhost:5000/job/${job.jobId}`).then((res) =>
          res.json()
        )
      )
    ).then((data) => {
      setAppliedJob(data); // ✅ all jobs at once
    });
  }, [application]);

  console.log(appliedJob);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Deadline</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          {appliedJob.map((job) => (
            <tbody>
              {/* row 1 */}
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={job.photo} alt="Company" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{job.name}</div>
                      <div className="text-sm opacity-50">{job.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {job.position}
                  <br />
                </td>
                <td>{job.deadline}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
                <td>
                  <button>Action</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ViewAppliedJob;
