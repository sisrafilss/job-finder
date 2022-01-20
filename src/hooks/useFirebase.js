import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";

import initializeAuthentication from "../Firebase/firebase.init";
import useLocalStorage from "./useLocalStorage";

initializeAuthentication();

const useFirebase = () => {
  const auth = getAuth();
  // Get Local Storage funtionas from custom hooks
  const { getUser, updateUser, clearUserData } = useLocalStorage();

  // Get user data from Local Storage if exists
  const user = JSON.parse(getUser());

  // Register new user
  const registerUser = (name, email, password, navigate, location) => {
    // dispatch(setLoading({ loading: true }));
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        // Save user data to local Storage
        updateUser(user);

        // Empty error for successfully register
        // dispatch(setAuthError({ error: "" }));

        // Save user data to Database
        // dispatch(saveUserToDB({ name, email }));

        // Update user's name to firebase
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            // dispatch(setAuthError({ error: "" }));
          })
          .catch((error) => {
            // dispatch(setAuthError({ error: error.message }));
          });

        console.log(result.user);

        // Redirect user to the page where they come from
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // Set error
        // dispatch(setAuthError({ error: error.message }));
      })
      .finally(() => {
        // update loading status
        // dispatch(setLoading({ loading: false }));
      });
  };

  // Login with email and password
  const loginWithEmailAndPassword = (email, password, navigate, location) => {
    // dispatch(setLoading({ loading: true }));
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        // Save user data to local Storage
        updateUser(user);

        // Empty error for successfully login
        // dispatch(setAuthError({ error: "" }));
        // Redirect user to the page where they come from
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // Set error to the error
        // dispatch(setAuthError({ error: error.message }));
      })
      .finally(() => {
        // Update loading status
        // dispatch(setLoading({ loading: false }));
      });
  };

  // Google sign in
  const signInWithGoogle = (navigate, location) => {
    const googleProvider = new GoogleAuthProvider();

    // Set Loading status to true
    // dispatch(setLoading({ loading: true }));

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        // Save user data to local Storage
        updateUser(user);

        console.log(user);

        // Set user data to store
        // dispatch(
        //   setUser({
        //     email: user.email,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        //   })
        // );

        // Empty error for succfully login
        // dispatch(setAuthError({ error: "" }));

        // Redirect user to the page where they come from
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // Set auth error for login error.
        // dispatch(setAuthError({ error: error.message }));
      })
      .finally(() => {
        // Set Loading status to false
        // dispatch(setLoading({ loading: false }));
      });
  };

  // Observing user state
  useEffect(() => {
    // dispatch(setLoading({ loading: true }));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // dispatch(
        //   setUser({
        //     email: user.email,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        //   })
        // );
        // dispatch(setLoading({ loading: false }));
      } else {
      }
    });
    return () => unsubscribe;
  }, [auth]);

  // Log Out
  const logOut = () => {
    signOut(auth)
      .then(() => {
        clearUserData();
        // dispatch(setUser({}));
      })
      .catch(() => {
        // An error happened.
      });
  };

  return {
    user,
    registerUser,
    loginWithEmailAndPassword,
    signInWithGoogle,
    logOut,
  };
};

export default useFirebase;
