import "./newProject.css";

import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// SprintBootLocal
// const API_URL = 'http://localhost:5005';
// SprintBoot Heroku
const API_URL = 'https://cresta-nanoworld-final-project.herokuapp.com'

function NewProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  // const navigate = useNavigate();

  // to Set Calculator
  const [calculatorId, setCalculatorId] = useState(0);
  const [calculators, setCalculators] = useState([]);
  const getAllCalculators = () => {

    // GET request to get the calculators
    axios
      .get(`${API_URL}/api/calculators`)
      .then((response) => setCalculators(response.data))
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    getAllCalculators();
  }, []);

  
  // POST request to submit New Project
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, creator,  description, calculatorId };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/projects`, requestBody)
      .then((response) => {
        setTitle("");
        setDescription("");
        setCreator("");
        setCalculatorId(0);

        // navigate("/projects");
      })
      .catch((error) => {
        const errorDescription = "Only Professors";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="formPage" id="main">
      <h1 className="formTitle">New Project</h1>

      <form className="formFormat" onSubmit={handleSubmit}>
        <div className="formItem">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label>Creator:</label>
          <input
            type="text"
            name="calculator"
            placeholder="Created by"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label>Select Calculator:</label>
          <select
            className="formItem"
            type="number"
            name="calculator"
            defaultValue={{
              label: "Select calculator",
              value: "Select calculator",
            }}
            onChange={(e) => setCalculatorId(e.target.value)}
          >
            {calculators.map((calculator) => (
              <option key={calculator.id} value={calculator.id}>
                {calculator.command}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="formButton">
          Submit
        </button>
      </form>
      <span className="space">
        <p>
          <br />
        </p>
      </span>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default NewProject;
