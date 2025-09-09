import React, { useState, useEffect } from "react";
import './css/login.css';
import { Link } from 'react-router-dom';
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Listen for login state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({
            uid: user.uid,
            name: userDoc.data().name,
          });
          navigate("/"); //redirect to home if already logged in
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("⚠️ Please enter email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Login successful!");
      setEmail("");
      setPassword("");
      navigate("/"); //go to home after login
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.code === "auth/user-not-found") {
        setMessage("❌ No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setMessage("❌ Incorrect password.");
      } else {
        setMessage("❌ Login failed: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="container my-5" style={{ maxWidth: "400px" }}>
        {loading ? (
          <div className="">
            <div className="text-center d-flex justify-content-center align-items-center gap-2 leading-message">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <h2>Loading...</h2>
            </div>
          </div>
        ) : currentUser ? (
          // If logged in → show nothing (redirect already handled)
          <p className="text-center">You are already logged in.</p>
        ) : (
          // If NOT logged in → show login form
          <>
            <h3 className="mb-4">Login</h3>
            <small><strong>ID:</strong> bot@gmail.com <strong>Password:</strong> Bot@123</small>
            <input
              className="form-control my-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control my-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {message && <small className="mt-3 text-center text-danger">{message}</small>}
            <div className="d-flex flex-column">
              <button
                className="btn btn-success mt-3"
                onClick={handleLogin}
              >
                Login
              </button>
             <p className="text-center py-3">
                You don't have an account?
               <Link to='/signup'  className="ms-2 btn-primary mt-3">
                Signup
              </Link>
             </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
