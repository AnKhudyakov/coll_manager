import { useRefreshQuery } from "@/app/services/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useRefreshQuery();
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data]);
  return { isLoading, error };
};

export default useRefreshToken;
