import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(); // Initialize Firestore
const googleProvider = new GoogleAuthProvider(); // Google Auth provider

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false); // false for signup, true for signin
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sign up with email and password
  function signupWithEmail() {
    setLoading(true);
    console.log("Sign Up: ", { name, email, password, confirmPassword });

    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") { 
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User Created: ", user);
            toast.success('User Created!');
            setLoading(false);
            setName("");
            setPassword("");
            setEmail("");
            setconfirmPassword("");
            createDoc(user); // Create Firestore doc for the user
            navigate("/dashboard"); // Navigate to dashboard
          })
          .catch((error) => {
            console.log("Error: ", error.code, error.message);
            toast.error(error.message);
            setLoading(false);
          });
      } else {
        toast.error("Password and confirm password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  // Sign in with email and password
  function signinWithEmail() {
    setLoading(true);
    console.log("Sign In: ", { email, password });

    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Signed In User: ", user);
          toast.success('Signed in successfully!');
          createDoc(user); // Create Firestore doc for the user
          navigate("/dashboard"); // Navigate to dashboard
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error: ", error.code, error.message);
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      toast.error("Email and password are required!");
      setLoading(false);
    }
  }

  // Google Sign-In
  function googleSignIn(event) {
    event.preventDefault();  // Prevent form submission (if the button is inside a form)
    setLoading(true);
    console.log("Google Sign-In triggered...");

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Google Signed In User: ", user);

        // Check if the user already exists in Firestore
        checkIfDocExists(user).then(docExists => {
          if (!docExists) {
            // If no document, create it
            createDoc(user);
          } else {
            // If document exists, show that the user is already registered
            toast.info("Your document already exists!");
          }

          toast.success('Signed in with Google!');
          navigate("/dashboard"); // Navigate to dashboard
          setLoading(false);
        }).catch((error) => {
          console.error("Error checking document existence:", error);
          toast.error("Something went wrong.");
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error during Google Sign-In: ", error);  // Log the full error object
        if (error.code === 'auth/popup-closed-by-user') {
          toast.error("Popup closed by user");
        } else if (error.code === 'auth/cancelled-popup-request') {
          toast.error("Popup request was cancelled");
        } else {
          toast.error("Google Sign-In failed. Please try again.");
        }
        setLoading(false);
      });
  }

  // Create user document in Firestore
  function createDoc(user) {
    const usersCollection = collection(db, "users");

    // Check if the user document already exists
    checkIfDocExists(user).then(docExists => {
      if (!docExists) {
        // If document doesn't exist, create it
        addDoc(usersCollection, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || name, // Use the user's displayName (Google Sign-In) or custom name from signup
          createdAt: new Date(), // Set creation time only if it's a new user
        })
        .then(() => {
          console.log("User document created successfully!");
          toast.success("Your profile has been created successfully!");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast.error("Error creating document.");
        });
      } else {
        // If the document exists, notify the user
        toast.info("Your document already exists!");
        console.log("User document already exists, no changes made.");
      }
    }).catch((error) => {
      console.error("Error checking document existence:", error);
    });
  }

  // Check if a user document already exists
  async function checkIfDocExists(user) {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // If document exists, it returns true, else false
  }

  // Switch between signup and signin forms
  const toggleForm = () => setLoginForm(!loginForm);

  return (
    <>
      <div className="signup-wrapper">
        <h2 className="title">
          {loginForm ? 'Sign In to ' : 'Sign Up on '} 
          <span style={{ color: "var(--theme)" }}>Financely.</span>
        </h2>
        <form>
          {!loginForm && ( // Show this if loginForm is false (signup)
            <>
              <Input
                label={"Full Name"}
                state={name}
                setState={setName}
                placeholder={"Ajees"}
              />
            </>
          )}
          <Input
            type="email"
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"ajees@gmail.com"}
          />
          <Input
            type="password"
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"Example@aj123"}
          />
          {!loginForm && ( // Show this if loginForm is false (signup)
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}  
              setState={setconfirmPassword}  
              placeholder={"Example@aj123"}
            />
          )}
          <Button
            disabled={loading}
            text={loading ? "Loading..." : loginForm ? "Sign In" : "Sign Up"}
            onClick={loginForm ? signinWithEmail : signupWithEmail}
          />
          <p style={{ textAlign: "center", margin: 0 }}>or</p>
          <Button 
            text={loading ? "Loading..." : loginForm ? "Sign In using Google" : "Sign Up using Google"} 
            blue={true}
            onClick={googleSignIn} // Google Sign-In button
          />
        </form>
        <p style={{ textAlign: "center" }}>
          {loginForm ? "Don't have an account?" : "Already have an account?"} 
          <span 
            onClick={toggleForm} 
            style={{ color: "var(--theme)", cursor: "pointer" }} >
            {loginForm ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </>
  );
}

export default SignupSigninComponent;
