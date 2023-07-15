import ErrorPage from "@/components/pages/ErrorPage";
import { selectCurrentAuth } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

function withAuthRedirect(Component) {
  return (props) => {
    const auth = useSelector(selectCurrentAuth);
    if (!auth) return <ErrorPage />;
    return <Component {...props} />;
  };
}

export default withAuthRedirect;
