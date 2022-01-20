const useLocalStorage = () => {
  // Get existing user data
  const getUser = () => localStorage.getItem("user_data");

  //   Save user info in Local Storage
  const updateUser = (user) => {
    localStorage.setItem("user_data", JSON.stringify(user));
  };

  //   Clear user info from Local Storage
  const clearUserData = () => {
    localStorage.removeItem("user_data");
  };

  return {
    getUser,
    updateUser,
    clearUserData,
  };
};

export default useLocalStorage;
