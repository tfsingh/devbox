import React, { useState } from "react";
import "./App.css";
import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: "invalid username",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    //post request to server with username and password
    //http://localhost:3000/register
    fetch("https://server-production-fef1.up.railway.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: uname.value,
        password: pass.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.message === "User Created Successfully") {
          setUsername(uname.value);
          setIsSubmitted(true);
        } else {
          setErrorMessages({ name: "uname", message: errors.uname });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    /*
    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
    */
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Create a DevBox</div>
        {isSubmitted ? (
          <div>
            You've registered! Follow{" "}
            <a href="https://login.tailscale.com/admin/invite/hiyL9qyjZqg">
              this
            </a>
            {""} link to setup a remote tunnel to <br />
            your server, and then login via ssh using your username. <br />
            <br />
            ex: ssh {username}@100.72.147.98
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default App;
