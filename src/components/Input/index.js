import React from 'react';
import PropTypes from 'prop-types';
import "./styles.css";

function Input({ label, state, setState, placeholder, type }) {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
