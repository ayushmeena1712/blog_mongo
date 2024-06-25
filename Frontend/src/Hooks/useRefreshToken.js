import axios, { axiosPrivate } from "../axiosInstance.js";
import { useAuth } from "../Authcontext.jsx";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    console.log("Attempting to refresh token");
    try {
      const response = await axiosPrivate.post(
        "/api/users/refresh-token",
        { refreshToken: auth.refreshToken },
        { withCredentials: true }
      );
      console.log("New tokens:", response.data);
      setAuth({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken});

      return response.data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
