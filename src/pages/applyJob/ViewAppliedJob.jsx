import React, { useEffect, useState } from "react";
import AuthHook from "../../hooks/AuthHook";
import { myApplicationPromise } from "../api/ApplicationApi";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";

const ViewAppliedJob = () => {
  const { user } = AuthHook();
  const [application, setApplication] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    myApplicationPromise(user.email).then((data) => {
      console.log(data);
      setApplication(data);
    });
  }, [user]);

  const handleDeleteApplication = (applicationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/application/${applicationId}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Application has been Canceled.",
                icon: "success",
              });
              setApplication((prev) =>
                prev.filter((app) => app._id !== applicationId),
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  //   const [appliedJob, setAppliedJob] = useState([]);
  //   useEffect(() => {
  //     if (!application?.length) return;

  //     Promise.all(
  //       application.map((job) =>
  //         fetch(`http://localhost:5000/job/${job.jobId}`).then((res) =>
  //           res.json()
  //         )
  //       )
  //     ).then((data) => {
  //       setAppliedJob(data); //
  //     });
  //   }, [application]);

  //   console.log(appliedJob);

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
              <th>Action</th>
            </tr>
          </thead>
          {application.map((job) => (
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
                  <button
                    onClick={() => handleDeleteApplication(job._id)}
                    className="btn btn-xs ml-2"
                  >
                    <MdDeleteForever fill="red" size="20px"></MdDeleteForever>
                  </button>
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
