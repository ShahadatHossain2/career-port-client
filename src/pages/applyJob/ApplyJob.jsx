import React from "react";
import { useParams } from "react-router";
import AuthHook from "../../hooks/AuthHook";
import axios from "axios";
import Swal from "sweetalert2";
import applyAnimation from "../../assets/user-interface.json";
import Lottie from "lottie-react";

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
      .post("http://localhost:5000/application", application)
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
    <div className="my-10 w-10/11 mx-auto flex justify-around">
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
            required
            type="url"
            name="github"
            className="input"
            placeholder="Github Profile Link"
          />

          <label className="label">Resume Link</label>
          <input
            required
            type="url"
            name="resume"
            className="input"
            placeholder="Your Resume Link"
          />

          <input
            required
            className="btn btn-success font-bold text-white"
            type="submit"
            value="Apply"
          />
        </fieldset>
      </form>
      <div>
        <Lottie
          loop
          animationData={applyAnimation}
          style={{ width: 300 }}
        ></Lottie>
      </div>
    </div>
  );
};

export default ApplyJob;
