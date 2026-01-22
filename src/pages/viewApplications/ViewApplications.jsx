import axios from "axios";
import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useLoaderData, useRevalidator } from "react-router";
import Swal from "sweetalert2";

const ViewApplications = () => {
  const applications = useLoaderData();
  const revalidator = useRevalidator();
  const navigation = useNavigate();
  applications.map((app) => console.log(app._id));
  const handleStatusChange = (e, applicationId) => {
    axios
      .patch(
        `https://career-port-server.onrender.com/application/${applicationId}`,
        {
          status: e.target.value,
        },
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status Successfully Updated!!",
            showConfirmButton: false,
            timer: 1500,
          });
          revalidator.revalidate();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Hired":
        return "bg-green-500 text-white";
      case "Short-listed":
        return "bg-yellow-400 text-black";
      case "Rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div>
      <div
        onClick={() => navigation(-1)}
        className="ml-4 flex gap-1 items-center w-20"
      >
        <FaArrowAltCircleLeft></FaArrowAltCircleLeft>
        <p className="font-bold">Back</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Github</th>
              <th>Linkedin</th>
              <th>Resume</th>
              <th>Status</th>
            </tr>
          </thead>
          {applications.map((application, idx) => (
            <tbody>
              <tr className="bg-base-200">
                <th>{idx + 1}</th>
                <th>
                  <a
                    className="text-blue-300 underline"
                    href={application.github}
                  >
                    Link
                  </a>
                </th>
                <th>
                  <a
                    className="text-blue-300 underline"
                    href={application.linkedIn}
                  >
                    Link
                  </a>
                </th>
                <th>
                  <a
                    className="text-blue-300 underline"
                    href={application.resume}
                  >
                    Link
                  </a>
                </th>
                <th>
                  <select
                    onChange={(e) => handleStatusChange(e, application._id)}
                    defaultValue={application.status || "status"}
                    className={`select w-1/2 ${getStatusClass(
                      application.status,
                    )}`}
                  >
                    <option value="status" disabled={true}>
                      Select
                    </option>
                    <option className="bg-green-400 mb-1">Hired</option>
                    <option className="bg-yellow-400 mb-1">Short-listed</option>
                    <option className="bg-red-400">Rejected</option>
                  </select>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
