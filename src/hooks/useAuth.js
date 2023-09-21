import { useSelector } from "react-redux";

function useAuth() {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken && auth?.user) {
    return true;
  } else {
    return false;
  }
}

export default useAuth;
