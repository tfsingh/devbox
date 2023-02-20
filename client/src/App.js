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
    // Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Post request to server with username and password
    fetch("http://localhost:3000/register", {
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
          <label className="content">Username </label>
          <input type="text" name="uname" required className="content-2" />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label className="content">Password </label>
          <input type="password" name="pass" required className="content-2" />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  /*
  
    */

  return (
    <div className="">
      <div className="grid justify-center ">
        <h1 className="pt-32 tracking-tight text-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 max-w-5xl">
          Instantaneous, always on Dev Environments
        </h1>

        <div className="relative">
          <div className="absolute top-10 left-20 max-w-md text-xl md:max-w[460px] text-gray-300">
            <p>
              <code>DevBox</code> lets you spin-up a remote linux environment in
              seconds.
            </p>
            <p>It's always on, and you can access it from anywhere.</p>
            <p>
              Use <code>DevBox</code> for testing and development, or to share a
              dev environment with your team.
            </p>
          </div>
          <div className="absolute top-10 right-20``">
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
      </div>
    </div>
  );
}

export default App;
