import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import SignIn from "../pages/signIn/SignIn";
import AddJob from "../pages/addJob/AddJob";
import PrivateRoute from "./PrivateRoute";
import JobDetails from "../pages/jobDetails/JobDetails";
import ApplyJob from "../pages/applyJob/ApplyJob";
import ViewAppliedJob from "../pages/applyJob/viewAppliedJob";
import MyPost from "../pages/myPost/MyPost";
import ViewApplications from "../pages/viewApplications/ViewApplications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () =>
          fetch("https://career-port-server.onrender.com/job").then((res) =>
            res.json(),
          ),
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "/signIn",
        Component: SignIn,
      },
      {
        path: "/addJob",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "JobDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://career-port-server.onrender.com/job/${params.id}`,
          ).then((res) => res.json()),
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "applyJob/:id",
        loader: ({ params }) =>
          fetch(
            `https://career-port-server.onrender.com/job/${params.id}`,
          ).then((res) => res.json()),
        element: (
          <PrivateRoute>
            <ApplyJob></ApplyJob>
          </PrivateRoute>
        ),
      },
      {
        path: "application",
        element: (
          <PrivateRoute>
            <ViewAppliedJob></ViewAppliedJob>
          </PrivateRoute>
        ),
      },
      {
        path: "jobPost",
        element: (
          <PrivateRoute>
            <MyPost></MyPost>
          </PrivateRoute>
        ),
      },
      {
        path: "application/job/:id",
        loader: ({ params }) =>
          fetch(
            `https://career-port-server.onrender.com/application/job/${params.id}`,
          ),
        element: (
          <PrivateRoute>
            <ViewApplications></ViewApplications>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
