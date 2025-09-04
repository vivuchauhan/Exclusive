import React, { useState, useEffect } from "react";
import './css/login.css';
import { Link } from 'react-router-dom';
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";


function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]); // to store all users

  // Fetch users from Firestore when component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSignup = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setMessage("⚠️ All fields are required.");
      return;
    }
    if (password.length < 6) {
      setMessage("⚠️ Password must be at least 6 characters.");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user details in Firestore with uid as doc ID
      await setDoc(doc(db, "users", user.uid), {
        name: fullName,
        email: user.email,
        createdAt: new Date(),
      });

      setMessage("✅ User registered successfully!");
      setFullName("");
      setEmail("");
      setPassword("");

      // Update local user list immediately after signup
      setUsers((prev) => [...prev, { id: user.uid, name: fullName, email }]);
    } catch (error) {
      console.error("Signup failed:", error.message);
      if (error.code === "auth/email-already-in-use") {
        setMessage("⚠️ This email is already registered.");
      } else {
        setMessage("❌ Signup failed: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="container my-5" style={{ maxWidth: "400px" }}>
        <h3 className="mb-4">Signup</h3>
        <input
          className="form-control my-2"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         {message && <small className="mt-3 text-center text-danger">{message}</small>}
        <button className="btn btn-primary w-100 mt-3" onClick={handleSignup}>
          Signup
        </button>
        <p className="py-3 text-center">
          Already have an account ?  
           <Link to='/login'  className="btn-primary ms-2">
              login
          </Link>
        </p>
      </div>
        
       <div className="container">
         <h5 className="mt-5 text-center text-uppercase mb-3">Registered Users</h5>
          <div className="row gap-3 justify-content-center">
            {[...users]
              .sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                return dateB - dateA;
              })
              .map((user) => (
                <div key={user.id} className="col-3 user-profile">
                  <div className="circle text-dark">
                    {user.name.length > 1 ? user.name.substring(0, 1) : user.name}
                  </div>
                  <div className="box ps-2">
                      <strong>{user.name}</strong> <br />
                      <small>
                        Joined:{" "}
                        {user.createdAt?.toDate
                          ? user.createdAt.toDate().toLocaleString()
                          : new Date(user.createdAt).toLocaleString()}
                      </small>
                  </div>
                </div>
            ))}
          </div>
       </div>
    </>
  );
}

export default Signup;
