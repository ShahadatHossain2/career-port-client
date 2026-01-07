import React, { use } from "react";
import animationData from "../../assets/business-salesman.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signInUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state.pathname);
  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
    signInUser(email, password)
      .then((result) => {
        if (result.user?.emailVerified) {
          navigate(`${location.state ? location.state?.pathname : "/"}`);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!!",
            text: "Please Verify your email!",
          });
        }
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
    <div>
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
                Login now!
              </h1>
              <form onSubmit={handleSignIn}>
                <fieldset className="fieldset">
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
                  <div>
                    <p>
                      Don't have account? Please{" "}
                      <Link
                        to="/register"
                        className="link link-hover text-blue-400"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                  <input
                    className="btn btn-neutral mt-4"
                    type="submit"
                    value="SignIn"
                  />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
