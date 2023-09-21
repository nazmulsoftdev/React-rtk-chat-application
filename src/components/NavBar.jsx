import React, { useEffect } from "react";
import { AiOutlineWechat as LogoIcon } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserLoggedOut } from "../featured/auth/authSlice";
function NavBar() {
  const localState = useSelector((state) => state.localStateData);

  const dispatch = useDispatch();

  // User Logout handler

  const logoutHandler = () => {
    localStorage.clear("");
    dispatch(UserLoggedOut());
  };

  return (
    <div className="bg-slate-900">
      <div className=" w-[90%] m-auto p-4 ">
        <div className="flex justify-between items-center">
          <Link to="/conversation">
            <LogoIcon size={30} color="white" />
          </Link>
          <div className="flex items-center ">
            <p
              className="text-white cursor-pointer font-bold"
              onClick={logoutHandler}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
