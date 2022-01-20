import React from "react";
import Navigation from "../Navigation/Navigation";

const languages = [
  "C",
  "C++",
  "JavaScript",
  "Python",
  "Java",
  "PHP",
  "Swift",
  "Cotline",
];

const Home = () => {
  return (
    <div>
      <Navigation />
      <div className="container mt-5" style={style.searchForm}>
        <div>
          <div className="mb-4">
            <h2 className="text-center">Select Programming Language</h2>
          </div>
          <select className="form-select" aria-label="Default select example">
            <option defaultValue>Select Programming Language</option>

            {languages.map((lng, index) => (
              <option key={index} value={lng}>
                {lng}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Home;

const style = {
  searchForm: {
    maxWidth: "600px",
  },
};
