import React from "react";

import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="sticky h-14 z-[100] inset-x-0 top-0 border-b border-grey-200 bg-white/75  backdrop-blur-lg transition-all">
      <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20">
        <div className="flex h-14 items-center justify-between border-b border-slate-200">
          <Link to="/" className="flex z-40 font-semibold">
            <span>
              <span className="text-green-600">Dash</span>board ✨
            </span>
          </Link>
          <div className='className="h-full flex items-center space-x-4"'>
            <Link to="#">Contact </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
