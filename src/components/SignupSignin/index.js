import React, { useState } from 'react';  
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

function SignupSigninComponent() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false); // false for signup, true for signin
  const [loading, setLoading] = useState(false);

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
            createDoc(user);
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
          setLoading(false);
          // Redirect or handle successful sign-in
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

  // Create user document
  function createDoc(user) {
    // Implement your doc creation logic here
    console.log("Creating doc for user:", user.uid);
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
          />
        </form>
        <p style={{ textAlign: "center" }}>
          {loginForm ? "Don't have an account?" : "Already have an account?"} 
          <span 
            onClick={toggleForm} 
            style={{ color: "var(--theme)", cursor: "pointer" }}>
            {loginForm ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </>
  );
}

export default SignupSigninComponent;
