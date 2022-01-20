import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const auth = getAuth();

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
    signInWithGoogle,
  };
};

export default useFirebase;
