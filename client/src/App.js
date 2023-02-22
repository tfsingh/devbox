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
    console.log(uname.value, pass.value);
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
    <div className="">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 bg-white">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
            {renderErrorMessage("uname")}
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="johndoe"
            name="uname"
            required
          />
        </div>
        <div className="mb-2 bg-white ">
          <label className="bg-white block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className=" appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*********"
            name="pass"
            required
          />
        </div>

        <div className="flex bg-white items-center justify-between">
          <button
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            <input type="submit" />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="grid justify-center">
      <h1 className="pt-32 tracking-tight text-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 max-w-5xl">
        Instantaneous, always on Dev Environments
      </h1>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-3xl mx-auto top-10">
        <div className="text-xl md:col-start-1 max-w-sm">
          <p>
            <code>DevBox</code> lets you spin-up a remote linux environment in
            seconds.
          </p>
          <p>Admin privileges, always on, and access from anywhere.</p>
          <p>
            Use <code>DevBox</code> for testing and development, or to share a
            dev environment with your team.
          </p>
        </div>
        <div className="text-xl md:col-start-2 max-w-s">
          {isSubmitted ? (
            <div>
              <p>You've registered!</p>
              <p>
                Follow{" "}
                <a
                  href="https://login.tailscale.com/admin/invite/hiyL9qyjZqg"
                  className="text-pink-600"
                >
                  this
                </a>{" "}
                link to setup a remote tunnel to your server, and then login via
                ssh using your username.
              </p>
              <p>ex: ssh {username}@100.72.147.98</p>
            </div>
          ) : (
            renderForm
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
