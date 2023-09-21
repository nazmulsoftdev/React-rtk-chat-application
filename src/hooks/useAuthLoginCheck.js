import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserLoggedIn } from "../featured/auth/authSlice";

export default function useAuthLoginCheck() {
  const [checkAuth, setCheckAuth] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth?.accessToken && auth?.user) {
      dispatch(
        UserLoggedIn({
          accessToken: auth?.accessToken,
          user: auth?.user,
        })
      );
    }
    setTimeout(() => {
      setCheckAuth(true);
    }, 500);
  }, [dispatch, checkAuth]);

  return checkAuth;
}
