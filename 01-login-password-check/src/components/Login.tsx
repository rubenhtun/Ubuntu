import React, { ReactElement, useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Login Component
export default function Login() {
  const [enterPsw, setEnterPsw] = useState(false); // Display Enter Password Box
  const [showPsw, setShowPsw] = useState(false); // Show & Hide Password
  const [psw, setPsw] = useState("");
  const navigate = useNavigate();

  // Change the state data with updating state function()
  const entPsw = () => {
    setEnterPsw(!enterPsw);
  };

  // Typing Passsword Into Input Field
  const typPsw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPsw(e.target.value);
  };

  // Password Visibility
  const visiblePsw = () => {
    setShowPsw(!showPsw);
  };

  // Submit Psw Through Entering Key "Enter"
  const Enter = (e: { key: string }) => {
    if (e.key === "Enter") {
      return checkPsw();
    }
  };

  // Check Psw You Typed With "if" Conditional State
  const checkPsw = () => {
    if (psw === "123ubuntu") {
      return navigate("/home");
    } else {
      alert("Incorrect Password!");
    }
  };

  return (
    <div className="login-p">
      {/* Click Profile & Enter Password*/}
      {!enterPsw ? (
        <div className="profile-psw">
          <section onClick={entPsw}>
            <i className="fa-regular fa-user"></i>
            <span>Ubuntu</span>
          </section>
          <span>Not listed?</span>
        </div>
      ) : (
        <div className="ent-psw">
          <img
            src={require("../imgs/profile.jpg")}
            alt="Logo"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              placeItems: "center",
            }}
          />
          <h5 style={{ margin: "10px 0 15px 0" }}>Ubuntu</h5>
          <section className="psw-input">
            <input
              type={showPsw ? "text" : "password"}
              placeholder="Password"
              onChange={typPsw}
              onKeyDown={Enter}
            />
            <div
              onClick={visiblePsw}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={showPsw ? faEyeSlash : faEye} />
            </div>
          </section>
          <i
            className="fa-solid fa-angle-left"
            onClick={() => setEnterPsw(!enterPsw)} // Set useState False
          ></i>
        </div>
      )}

      {/* Footer Ubuntu Logo */}
      <div className="ubuntu-logo">
        <img src={require("../imgs/logo.png")} />
      </div>
    </div>
  );
}
