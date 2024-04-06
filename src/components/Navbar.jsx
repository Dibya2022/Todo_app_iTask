import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-700 text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-9 cursor-pointer">iTask</span>
      </div>

      <ul className="flex gap-8 mx-9  cursor-pointer">
        <li className="hover:font-bold text-white-500 transition-all transition-duration-50 ">
          Home
        </li>
        <li className="hover:font-bold text-white-500 transition-all transition-duration-50 ">
          Your Task
        </li>
        <li className="hover:font-bold text-white-500 transition-all transition-duration-50 ">
          Created By@KumarDibya
        </li>
      </ul>
    </nav>
  );
};
