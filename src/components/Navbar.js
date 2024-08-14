import React, { Component } from 'react'
import {Link} from "react-router-dom"

export class Navbar extends Component {
  handleActiveClass = (e)=>{
    const activeEl = document.querySelector(".active");
    activeEl.classList.remove('active');
    e.target.classList.add('active');
  }
  render() {
    return (
      <div style={{marginBottom: '70px'}}>
        <nav className={`fixed-top navbar navbar-expand-lg bg-${this.props.mode} navbar-${this.props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsZ</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" onClick={this.handleActiveClass} aria-current="page" to="/">Home</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" onClick={this.handleActiveClass} to="/general">General</Link></li> */}
        <li className="nav-item">
          <Link className="nav-link" onClick={this.handleActiveClass} to="/sports">Sports</Link></li>
        <li className="nav-item">
          <Link className="nav-link" onClick={this.handleActiveClass} to="/health">Health</Link></li>
        <li className="nav-item">
          <Link className="nav-link" onClick={this.handleActiveClass} to="/science">Science</Link></li>
        <li className="nav-item">
          <Link className="nav-link" onClick={this.handleActiveClass} to="/business">Business</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={this.handleActiveClass} to="/technology">Technology</Link></li>
        <li className="nav-item">
          <Link className="nav-link" onClick={this.handleActiveClass} to="/entertainment">Entertainment</Link>
        </li>

      </ul>
      <div className="form-check form-switch">
        <input className="form-check-input changeStyle" style={{transform:'scale(1.4)'}} onClick={this.props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
      </div>
    </div>
  </div>
</nav>
      </div>
    )
  }
}

export default Navbar
