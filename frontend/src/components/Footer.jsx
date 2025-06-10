import React from "react";
import logo from "../assets/logo.png";
function Footer() {
  return (
    <div className="mt-14 border-t-2 pt-16 flex flex-col md:flex-row gap-6 items-center md:justify-between">
      <div className=" flex md:w-1/5 w-full flex-col gap-4">
        <div className="flex items-start gap-2 ">
          <img className="w-10" src={logo} alt="" />
          <div className="flex flex-col gap-4">
            <span className="text-orange-500 text-2xl font-medium">
              CourseSphere
            </span>
            <span>Follow us</span>
            <div className="flex gap-2">
              <i className="fa-brands fa-instagram text-xl"></i>
              <i className="fa-brands fa-github text-xl"></i>
              <i className="fa-brands fa-linkedin text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:w-1/5 w-full items-start md:items-center gap-2">
        <h1>Copyrights</h1>
        <span className="text-zinc-500 text-sm">Terms & Conditions</span>
        <span className="text-zinc-500 text-sm">Privacy Policy</span>
        <span className="text-zinc-500 text-sm">Refund & Cancellation</span>
      </div>
      <div className="flex flex-col md:w-1/5 w-full items-start md:items-center gap-2">
        <h1>Copyrights</h1>
        <span className="text-zinc-500 text-sm">Terms & Conditions</span>
        <span className="text-zinc-500 text-sm">Privacy Policy</span>
        <span className="text-zinc-500 text-sm">Refund & Cancellation</span>
      </div>
    </div>
  );
}

export default Footer;
