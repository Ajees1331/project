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

  function signupWithEmail(){
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmpasword", confirmPassword);
     // Authenticate the user , or basiclly create a new account using email and pass
     if(name!="" && email!="" && password!="" && confirmPassword!=""){
     createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       // Signed up 
       const user = userCredential.user;
       console.log("User>>>", user);
       toast.success('User Created!');
     // ...
  })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
      // ..
  });
     } else{
      toast.error("All fields are mandatory!");
     }
    
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
        <Button text={"Signup using Email and Password"} 
        onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center", margin: 0 }}>or</p>
        <Button text={"Signup using Google"} blue={true}/>

      </form>
    </div>
  );
}

export default SignupSigninComponent;