import React, { useEffect, useState } from "react";
import AuthHook from "../../hooks/AuthHook";
import { myJobPostFullPromise } from "../api/ApplicationApi";
import { Link } from "react-router";
import { FaEdit, FaEye } from "react-icons/fa";
import { motion } from "motion/react";

const MyPost = () => {
  const { user } = AuthHook();
  const [myJobPost, setMyJobPost] = useState([]);

  useEffect(() => {
    if (!user.email) return;
    myJobPostFullPromise(user.email, user.accessToken).then((data) => {
      setMyJobPost(data);
    });
    // myJobPostFullPromise(user.email).then((data) => console.log(data));
  }, [user]);

  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Deadline</th>
                <th>Application</th>
                <th>Action</th>
              </tr>
            </thead>
            {myJobPost.map((job) => (
              <tbody key={job._id}>
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
                  <td>{job.application_count}</td>
                  <td className="flex gap-2">
                    <Link to={`/application/job/${job._id}`}>
                      <FaEye className="hover:text-yellow-400 hover:size-5"></FaEye>
                    </Link>
                    <Link>
                      <FaEdit className="hover:text-blue-400 hover:size-5"></FaEdit>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
