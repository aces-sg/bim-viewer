// components/ProtectedRoute.js
import { use, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { CustomModal, ProtectedModal } from "../Modals";
import { Auth } from "aws-amplify";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [showNote, setShowNote] = useState(false);
  async function checkUser() {
    try {
      let res = await Auth.currentAuthenticatedUser();
      return res;
    } catch (err) {
      console.log("failed to get user", err);
      setShowNote(true);
    }
  }

  useEffect(() => {
    checkUser();
  });

  return (
    <>
      {children}
      {showNote && (
        <CustomModal>
          <ProtectedModal
            type={false}
            message="You'll need to register an account first"
          />
        </CustomModal>
      )}
    </>
  );
};

export default ProtectedRoute;
