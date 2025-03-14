import React, { useEffect } from 'react';
import "./styles.css";
import { auth } from '../../firebase'; // Make sure auth is initialized properly
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';  // Import signOut from Firebase
import { toast } from 'react-toastify';  // Import toast for notifications

function Header() {
  const [user, loading] = useAuthState(auth);  // Firebase hook to get the user and loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");  // Redirect to dashboard if the user is authenticated
    }
  }, [user, loading, navigate]);  // Add navigate to dependencies to prevent warnings

  function logoutFnc() {
    try {
      signOut(auth)  // Call the Firebase sign-out method
        .then(() => {
          toast.success("Logged Out Successfully");  // Show success toast message
          navigate("/");  // Navigate to the home page or login page
        })
        .catch((error) => {
          console.error(error.message);  // Log any error to the console
          toast.error("Error during sign-out: " + error.message);  // Show error toast message
        });
    } catch (e) {
      console.error(e.message);  // Log the error if try-catch fails
      toast.error("Error: " + e.message);  // Show error toast message
    }
  }

  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      {user && 
        <p className="logo link" onClick={logoutFnc}>
          Logout
        </p>
      }
    </div>
  );
}

export default Header;
