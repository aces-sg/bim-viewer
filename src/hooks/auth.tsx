import { Auth } from "aws-amplify";

import { useState, useEffect } from "react";

export const isBrowser = () => typeof window !== "undefined";

export const getUserName = async () => {
  const userObj = await getUser();
  const name = userObj.attributes.given_name;
  return name;
};

export const useUserName = () => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const initialize = async () => {
      setUsername(await getUserName());
    };
    initialize();
  }, []);
  return username;
};

export const getUser = async () => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch (err) {
    return null;
  }
};

export const useUser = (): any => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const initialize = async () => {
      setUser(await getUser());
    };
    initialize();
  }, []);
  return user;
};

export const isLoggedIn = async () => {
  const user = await getUser();
  if (user) return true;

  return false;
};

export const useIsLoggedIn = () => {
  const [isLoggedInState, setLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const initialize = async () => {
      setLoggedIn(await isLoggedIn());
    };
    initialize();
  }, []);
  return isLoggedInState;
};

export const isAdmin = async () => {
  if (!isBrowser()) return false;

  const user = await getUser();
  if (!user) return false;

  return user.signInUserSession.idToken.payload["cognito:groups"]?.includes(
    "Admin",
  );
};

export const useIsAdmin = () => {
  const [isAdminRole, setIsAdmin] = useState(null);
  useEffect(() => {
    const initialize = async () => {
      setIsAdmin(await isAdmin());
    };
    initialize();
  }, []);
  return isAdminRole;
};

export const isSuper = async () => {
  const user = await getUser();

  if (!isBrowser()) return false;

  return user.signInUserSession.idToken.payload["cognito:groups"]?.includes(
    "Super",
  );
};

export const useIsSuper = () => {
  const [isSuperRole, setIsSuper] = useState(null);
  useEffect(() => {
    const initialize = async () => {
      setIsSuper(await isSuper());
    };
    initialize();
  }, []);
  return isSuperRole;
};

export const confirmSignUp = async ({ username, code }: any) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
};
