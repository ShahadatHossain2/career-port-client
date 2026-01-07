import Pikaday from "pikaday";
import React, { useEffect, useRef, useState } from "react";
import addJobBg from "../../assets/AddJob.png";
import axios from "axios";
import Swal from "sweetalert2";

const AddJob = () => {
  const [count, setCount] = useState(1);
  const handleJobPost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJobPost = Object.fromEntries(formData.entries());
    const skills = formData.getAll("skill");
    const postJob = {
      ...newJobPost,
      skill: skills,
    };

    axios
      .post("http://localhost:5000/job", postJob)
      .then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job Successfully Posted!!",
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
  const myDatepicker = useRef(null);
  useEffect(() => {
    const picker = new Pikaday({
      field: myDatepicker.current,
    });
    return () => picker.destroy();
  }, []);
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${addJobBg})`,
      }}
    >
      <div className="hero-overlay">
        <div className="w-1/2 mx-auto my-5">
          <form onSubmit={handleJobPost}>
            <fieldset className="fieldset">
              <label className="label text-xl text-white">
                Name of the company?
              </label>
              <input
                type="text"
                className="input input-info w-full mb-2"
                placeholder="Company Name"
                name="name"
              />
              <label className="label text-xl text-white">Position</label>
              <input
                type="text"
                className="input input-info w-full mb-2"
                placeholder="Position"
                name="position"
              />
              <label className="label text-xl text-white">Company Logo</label>
              <input
                type="text"
                className="input input-info w-full mb-2"
                placeholder="Logo URL"
                name="photo"
              />
              <label className="label text-xl text-white">Total Vacancy</label>
              <input
                type="text"
                className="input input-info w-full mb-2"
                placeholder="Vacancy"
                name="vacancy"
              />
              <label className="label text-xl text-white">Salary</label>
              <input
                type="text"
                className="input input-info w-full mb-2"
                placeholder="Salary"
                name="salary"
              />
              <label className="label text-xl text-white">
                Job Responsibility
              </label>
              <textarea
                placeholder="Responsibility"
                className="textarea textarea-info mb-2 w-full"
                name="responsibility"
              ></textarea>
              <label className="label text-xl text-white">
                Skill Requirements
              </label>
              {Array.from({ length: count }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  name="skill"
                  className="input input-info w-full mb-2"
                  placeholder={`Skill ${index + 1}`}
                />
              ))}

              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add More
              </button>
              {/* <textarea
                placeholder="Skill Requirements"
                className="textarea textarea-info mb-2 w-full"
                name="skill"
              ></textarea> */}
              <label className="label text-xl text-white">Job Type</label>
              <select name="type" className="select w-full">
                <option disabled={true}>--Select--</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Intern</option>
              </select>
              <label className="label text-xl text-white">Job Location</label>
              <input
                type="text"
                className="input input-info w-full mb-2"
                placeholder="Location"
                name="location"
              />
              <label className="label text-xl text-white">
                Application Deadline
              </label>
              <input
                type="text"
                name="deadline"
                className="input pika-single w-full"
                defaultValue="Pick a date"
                ref={myDatepicker}
              />
              <input
                className="w-1/2 mx-auto bg-gradient-to-r from-blue-200 to-violet-600 cursor-pointer my-3 rounded py-2 text-xl font-bold text-white"
                type="submit"
                value="Submit"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
