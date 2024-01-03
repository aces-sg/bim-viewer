// components/PrivateRoute.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "./auth";
import { urls } from "./data";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLogin = isLoggedIn(); // Assuming you have an authentication context
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      // Redirect to login page or any other page
      router.push(`${urls.loginPage}`);
    }
  }, [isLogin, router]);

  if (!isLogin) {
    return null; // or a loading spinner, etc.
  }

  return <>{children}</>
};

export default PrivateRoute;
