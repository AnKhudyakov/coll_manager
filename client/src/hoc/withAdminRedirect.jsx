import ErrorPage from "@/components/pages/ErrorPage";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

function withAdminRedirect(Component) {
  return (props) => {
    const user = useSelector(selectCurrentUser);
    if (!user?.admin) return <ErrorPage />;
    return <Component {...props} />;
  };
}

export default withAdminRedirect;
