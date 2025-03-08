import React, { useState } from 'react';  
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

function SignupSigninComponent() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function signupWithEmail(){
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmpasword", confirmPassword);
     // Authenticate the user , or basiclly create a new account using email and pass
     if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") { 
      if(password===confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
         // Signed up 
         const user = userCredential.user;
         console.log("User>>>", user);
         toast.success('User Created!');
         setLoading(false);
         setName("");
         setPassword("");
         setEmail("");
         setconfirmPassword("");
         createDoc(user);
         // Create A doc with user id as the following id 
     })
     .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setLoading(false);
          // ..
    });
      }else{
        toast.error("Password and confirm Password don't match!")
        setLoading(false);
      }
      
     } else{
      toast.error("All fields are mandatory!");
      setLoading(false);
     }
  }

  function createDoc(user) {
    // Make sure that the doc with the uid doesn't exist
    // Create a doc.
  }

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          label={"full Name"}
          state={name}
          setState={setName}
          placeholder={"Ajees"}
        />
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
        <Input
          type="password"
           label={"Confirm Password"}
          state={confirmPassword}  
          setState={setconfirmPassword}  
          placeholder={"Example@aj123"}
        />
        <Button
         disabled={loading}
         text={loading ? "Loading..." : "Signup using Email and Password"} 
        onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center", margin: 0 }}>or</p>
        <Button text={loading ? "Loading..." : "Signup using Google"} blue={true}/>

      </form>
    </div>
  );
}

export default SignupSigninComponent;