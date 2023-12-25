import "./App.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GunContext from "./contextes/gun";
import Navbar from "./components/Navbar";

function App() {
  const gun = useContext(GunContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  if (!gun) {
    throw new Error("Gun not found");
  }

  const handleButtonClick = () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    // Creating the user
    gun.get("users").set({ username, createdAt: Date.now() });
    console.log("User created successfully and now redirecting");
    navigate(`/${username}`);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-around w-full h-4/5">
        {/* Title */}
        <h1 className="pt-10 text-4xl font-bold text-center text-white">
          Welcome to the Demo of{" "}
          <div className="font-mono text-pink-700">
            Blockchain based non-repudiation
          </div>
        </h1>

        {/* Input field */}
        <div className="flex flex-col items-center w-full space-y-4">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-1/2 p-2 text-black"
            required
          />
          <button
            onClick={handleButtonClick}
            className="w-1/2 p-2 text-white bg-pink-700 rounded-md"
          >
            Starting Chatting!
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
