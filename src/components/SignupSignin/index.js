import React, { useState } from 'react';  
import "./styles.css";
import Input from '../Input';

function SignupSigninComponent() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

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
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"ajees@gmail.com"}
        />
        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@aj123"}
        />
        <Input
          <Input
          label={"Confirm Password"}
          state={confirmPassword}  
          setState={setconfirmPassword}  
          placeholder={"Example@aj123"}
        />
        />
      </form>
    </div>
  );
}

export default SignupSigninComponent;
