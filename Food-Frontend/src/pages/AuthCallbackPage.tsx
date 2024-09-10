import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateUser } from "src/api/UserApi";
import { PacmanLoader } from "react-spinners";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth0();
  const { createUser, isLoading: isCreatingUser } = useCreateUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    const createUserIfNeeded = async () => {
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        try { 
          await createUser({
            auth0Id: user.sub,
            email: user.email,
          });
        } catch (error) {
          toast.error("Failed to create your account. Please try again later.");
        }
        navigate("/");
      }
    };

    createUserIfNeeded();
  }, [createUser, navigate, user]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isAuthLoading ||
        (isCreatingUser && <PacmanLoader color="#F9316" size={50} />)}
    </div>
  );
};

export default AuthCallbackPage;
