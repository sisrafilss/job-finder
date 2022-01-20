import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const auth = getAuth();

  // Register new user
  const registerUser = (name, email, password, navigate, location) => {
    // dispatch(setLoading({ loading: true }));
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
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

  // Google sign in
  const signInWithGoogle = (navigate, location) => {
    const googleProvider = new GoogleAuthProvider();

    // Set Loading status to true
    // dispatch(setLoading({ loading: true }));

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

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

  return {
    registerUser,
    signInWithGoogle,
  };
};

export default useFirebase;
