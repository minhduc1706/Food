import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLink from "./MobileNavLink";

export const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500 h-6 w-6" />
      </SheetTrigger>
      <SheetContent className="space-y-4 p-4 bg-white rounded-md shadow-lg">
        <SheetTitle className="flex items-center justify-between">
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2 text-gray-700">
              <CircleUserRound className="text-orange-500" />
              <span>{user?.email}</span>
            </span>
          ) : (
            <span className="font-bold text-gray-700">Welcome to <span className="text-orange-500 font-bold">DeliGo</span></span>
          )}
        </SheetTitle>
        <Separator className="border-t border-gray-200" />
        <SheetDescription className="flex flex-col space-y-3">
          {isAuthenticated ? (
            <MobileNavLink />
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              className="w-full px-4 py-2 text-center font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-md transition duration-200 ease-in-out"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
