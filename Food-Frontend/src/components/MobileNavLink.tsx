import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLink = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/user-profile"
        className="block text-center py-2 font-bold hover:text-orange-500 hover:border-black border hover:bg-gray-100 rounded-md transition duration-200 ease-in-out"
      >
        User Profille
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log out
      </Button>
    </>
  );
};

export default MobileNavLink;
