import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ url, onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const cleanPassword = password.trim();

    if (!cleanPassword) {
      toast.error("Please enter the admin password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/admin/login`, {
        password: cleanPassword
      });

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login successful!");
        onLoginSuccess();
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Invalid password");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async () => {
    setPassword("BiteoraAdmin2026!");
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/admin/login`, {
        password: "BiteoraAdmin2026!"
      });
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Welcome to Biteora Admin!");
        onLoginSuccess();
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-shell glass-panel">
        <section className="login-marketing">
          <p className="eyebrow">Biteora Admin</p>
          <h1>Restaurant operations, tuned for speed.</h1>
          <p>
            Update dishes, review orders, and keep the storefront aligned from a focused dashboard.
          </p>
          <div className="login-highlights">
            <span>Menu publishing</span>
            <span>Order tracking</span>
            <span>Secure access</span>
          </div>
        </section>

        <div className="login-box">
          <p className="login-kicker">Secure access</p>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="login-quick-section">
            <button
              type="button"
              className="btn-quick-login"
              onClick={quickLogin}
              disabled={loading}
            >
              ⚡ One-Click Admin Sign In
            </button>
            <p className="login-hint-text">
              Password: <code>BiteoraAdmin2026!</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
