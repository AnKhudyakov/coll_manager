import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

function authRoute(Component) {
  const user = useSelector(selectCurrentUser);
  return function (props) {
    if (!user) {
      return <Auth variant="login" />;
    }
    return <Component {...props} />;
  };
}

export default authRoute;
