import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorPage from "@/components/pages/ErrorPage";

function withAuthRedirect(Component) {
  return (props) => {
    const user = useSelector(selectCurrentUser);
    if (!user) return <ErrorPage />;
    return <Component {...props} />;
  };
}

export default withAuthRedirect;
