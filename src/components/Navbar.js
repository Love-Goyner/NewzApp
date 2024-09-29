import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useFirebase } from '../context/firebase'; 

function Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const handleActiveClass = (e) => {
    const activeEl = document.querySelector(".active");
    if (activeEl) activeEl.classList.remove('active');
    e.target.classList.add('active');
  };

  const firebase = useFirebase();

  useEffect(()=> {
    if (firebase.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [firebase, isLoggedIn])

  const logoutUser = async () => {
    await firebase.logoutUser();
    setIsLoggedIn(false);
  }

  return (
    
    <div style={{ marginBottom: '70px' }}>
      <nav className={`fixed-top navbar navbar-expand-lg bg-${props.mode} navbar-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsZ</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" onClick={handleActiveClass} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleActiveClass} to="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleActiveClass} to="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleActiveClass} to="/science">Science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleActiveClass} to="/business">Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleActiveClass} to="/technology">Technology</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleActiveClass} to="/entertainment">Entertainment</Link>
              </li>
              {isLoggedIn && 
                <li className="nav-item">
                  <Link className="nav-link" onClick={handleActiveClass} to="/savedNews">Saved News</Link>
                </li>
              }
            </ul>

            {/* Toggle Button */}
            <div className="d-flex align-items-center">
              <div className="form-check form-switch me-3">
                <input className="form-check-input changeStyle" style={{ transform: 'scale(1.4)' }} onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              </div>

              {/* Conditional Rendering for Login/Logout */}
              {isLoggedIn ? (
                <div className="d-flex">
                  <span className="navbar-text me-2">Welcome</span>
                  <button className="btn btn-danger" onClick={logoutUser}>Logout</button>
                </div>
              ) : (
                <div className="d-flex">
                  <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                  <Link to="/register" className="btn btn-primary">Signup</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
