import React, { useState } from 'react';  
import "./styles.css";
import Input from '../Input';

function SignupSigninComponent() {
  const [name, setName] = useState(""); 

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"Ajees"}
        />
      </form>
    </div>
  );
}

export default SignupSigninComponent;
