import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CircleUserRound, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const UsernameMemu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center px-3 py-2 rounded-md bg-white shadow-md hover:bg-orange-100 gap-2 transition duration-200 ease-in-out">
          <CircleUserRound className="text-orange-500" />
          <span className="text-sm text-gray-700 font-semibold">
            {user?.email}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-48 text-center">
        <DropdownMenuItem asChild>
          <Link
            to="/user-profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200 ease-in-out"
          >
            User
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild>
          <button
            onClick={() => logout()}
            className="w-full px-4 py-2 text-center text-red-600 hover:bg-red-100 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMemu;
