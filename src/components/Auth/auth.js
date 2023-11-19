import { createContext } from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { cognitoConfig } from "./cognitoConfig";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

const AccountContext = createContext();

export function signUp(email, password) {
  return new Promise((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      [{ Name: "email", Value: email }],
      null,
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.user);
      },
    );
  });
}

export function confirmSignUp(username, code) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log("Couldn't verify account");
        reject(err);
        return;
      }
      console.log("Account verified successfully");
      resolve(result);
    });
  });
}

export function signIn(email, password) {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        console.log("login success", result);
        navigate("/");
        resolve(result);
      },
      onFailure: err => {
        console.log("login failure", err);
        reject(err);
      },
      newPasswordRequired: data => {
        console.log("new password required", data);
        reject(data);
      },
    });
  });
}

export function forgotPassword(username) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve();
      },
      onFailure: err => {
        reject(err);
      },
    });
  });
}

export function confirmPassword(username, confirmationCode, newPassword) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(confirmationCode, newPassword, {
      onSuccess: () => {
        resolve();
      },
      onFailure: err => {
        reject(err);
      },
    });
  });
}

export function signOut() {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    navigate("/");
  }
}

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return;
        }
        const userData = attributes.reduce((acc, attribute) => {
          acc[attribute.Name] = attribute.Value;
          return acc;
        }, {});

        resolve({ ...userData, username: cognitoUser.username });
      });
    });
  });
}

export function getSession() {
  const cognitoUser = userPool.getCurrentUser();
  return new Promise((resolve, reject) => {
    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }
    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session);
    });
  });
}

export function isLoggedIn() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    // If no user is currently stored in the user pool, the user isn't logged in.
    if (!cognitoUser) {
      resolve(false);
      navigate("/user/login");
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (err) {
        // In case of any error while fetching session, return false
        resolve(false);
        return;
      }

      // If session is valid, return true, otherwise return false.
      resolve(session.isValid());
    });
  });
}
