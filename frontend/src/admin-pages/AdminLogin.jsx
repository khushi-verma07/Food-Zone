import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-login.css";
import NormalNav from "../admin-components/Navbar/NormalNav";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ Icons for show/hide password

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle state

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      toast.success("Admin login successful!");
      navigate("/admin/add");
    } else {
      toast.error("you are not authorazied");
    }
  };

  return (
    <>
      <NormalNav />
      <div className="admin-login" style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>You need to fill this</h2>
        <form onSubmit={handleLogin} autoComplete="off" style={{ display: "inline-block", textAlign: "left" }}>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
          <br /><br />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#666"
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <br /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
