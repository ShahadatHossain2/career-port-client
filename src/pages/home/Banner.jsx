import React from "react";
import { easeInOut, motion } from "motion/react";
import bannerImg from "../../assets/banner.png";
import bannerImg2 from "../../assets/banner-2.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-120">
      <div className="w-11/12 mx-auto hero-content flex-col lg:flex-row-reverse">
        <div>
          <motion.img
            animate={{
              y: [0, 30, 0],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            src={bannerImg}
            className="w-[500px] mr-10 shadow-2xl rounded-t-4xl rounded-br-4xl border-l-8 border-b-8 border-blue-400"
          />
          <motion.img
            animate={{
              y: [0, -30, 0],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            src={bannerImg2}
            className="w-[500px] ml-10 shadow-2xl rounded-t-4xl rounded-br-4xl border-l-8 border-b-8 border-blue-400"
          />
        </div>
        <div>
          <motion.h1
            animate={{
              scale: [0, 1],
              color: ["#22c55e", "#3b82f6", "#ec4899"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: easeInOut }}
            className="text-5xl font-bold"
          >
            Your carrer Gateway!
          </motion.h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link to="/addJob" className="btn btn-primary">
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
