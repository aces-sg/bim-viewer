import React, { createContext, useState, useEffect } from "react";
import * as auth from "./auth";
import {
  CognitoUserPool
} from "amazon-cognito-identity-js";
import awsmobile from "../../aws-exports";

interface AuthContextType {
  user: any;
  sub: any;
  signIn: (username: string, password: string) => void;
  isLoading: boolean;
  signOut: () => void;
  children?: React.ReactNode;
}

interface Result {
  success: boolean;
  message: string;
}

const userPool = new CognitoUserPool({
  UserPoolId: awsmobile.aws_user_pools_id,
  ClientId: awsmobile.aws_user_pools_web_client_id,
});

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const user = await auth.getCurrentUser();
      setUser(user);
    } catch (err) {
      // not logged in
      console.log(err);
      setUser({});
    }
  };
  
  const signIn = async (username: string, password: string) => {
    // debugger
    await auth.signIn(username, password);
    await getCurrentUser();
  };

  const signOut = async () => {
    await auth.signOut();
    setUser({});
  };

  const authValue = {
    user,
    isLoading,
    signIn,
    signOut,
    sub: user,
  };

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
