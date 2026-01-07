import React, { use } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/singing-contract.json";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";
import axios from "axios";

const Register = () => {
  const { createUser, sendVerification } = use(AuthContext);

  const handleRegistration = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, ...restInfo } = Object.fromEntries(
      formData.entries()
    );
    createUser(email, password)
      .then((result) => {
        sendVerification().then(() => {
          const newUser = {
            email,
            ...restInfo,
          };
          axios.post("http://localhost:5000/users", newUser).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Please Check your Email for Verification!",
              });
            }
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="w-11/12 mx-auto hero-content md:gap-10 flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie loop animationData={animationData} style={{ width: 300 }} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1
              className="text-5xl pb-2 font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
           bg-clip-text text-transparent text-center"
            >
              Register now!
            </h1>
            <form onSubmit={handleRegistration}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  name="name"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <label className="label">Photo</label>
                <input
                  type="url"
                  className="input"
                  placeholder="Photo URL"
                  name="photo"
                />
                <div>
                  <p>
                    Already have account? Please{" "}
                    <Link
                      to="/signIn"
                      className="link link-hover text-blue-400"
                    >
                      SignIn
                    </Link>
                  </p>
                </div>
                <input
                  className="btn btn-neutral mt-4"
                  type="submit"
                  value="Register"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
