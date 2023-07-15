import ErrorPage from "@/components/pages/ErrorPage";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import ActivationPage from "@/components/pages/ActivationPage";

function withAuthRedirect(Component) {
  return (props) => {
    const user = useSelector(selectCurrentUser);
    if (!user) return <ErrorPage />;
    if (!user.isActivated) return <ActivationPage email={user.email} />;
    return <Component {...props} />;
  };
}

export default withAuthRedirect;
