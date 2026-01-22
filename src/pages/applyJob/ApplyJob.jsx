import React from "react";
import { useParams } from "react-router";
import AuthHook from "../../hooks/AuthHook";
import axios from "axios";
import Swal from "sweetalert2";

const ApplyJob = () => {
  const { id: jobId } = useParams();
  const { user } = AuthHook();

  const handleJobApplication = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { linkedIn, github, resume } = Object.fromEntries(formData.entries());

    const application = {
      jobId,
      applicant: user.email,
      linkedIn,
      github,
      resume,
    };
    axios
      .post("https://career-port-server.onrender.com/application", application)
      .then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully applied!!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: error.message || "Server error occurred",
        });
      });
  };

  return (
    <div className="my-10 mx-2">
      <form onSubmit={handleJobApplication}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">LinkedIn Link</label>
          <input
            type="url"
            className="input"
            name="linkedIn"
            placeholder="LinkedIn profile Link"
          />

          <label className="label">Github Link</label>
          <input
            type="url"
            name="github"
            className="input"
            placeholder="Github Profile Link"
          />

          <label className="label">Resume Link</label>
          <input
            type="url"
            name="resume"
            className="input"
            placeholder="Your Resume Link"
          />

          <input
            className="btn btn-success font-bold text-white"
            type="submit"
            value="Apply"
          />
        </fieldset>
      </form>
    </div>
  );
};

export default ApplyJob;
