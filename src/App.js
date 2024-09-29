import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News2 from './components/News2';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import SavedNews from './components/SavedNews';



export default class App extends Component {


  
  constructor() {
    super();
    this.state = {
      mode: 'light',
      progress : 0,
      apikey : process.env.REACT_APP_NEWZ_APP_API_KEY
    };
  }
  
  setprogress = (progress)=>{
    this.setState({progress : progress});
  }

toggleMode = () => {
  if(this.state.mode === 'light') document.body.style.backgroundColor = 'black';
  else document.body.style.backgroundColor = 'white';
  this.setState({ mode: this.state.mode === 'light' ? 'dark' : 'light' });
}
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar mode={this.state.mode} toggleMode={this.toggleMode}/>
        <LoadingBar
          height={2}
          transitionTime={500}
          color='#f11946'
          progress={this.state.progress}
        />
        <Routes>
          <Route path='/login' element={<Login mode={this.state.mode}/>} />
          <Route path='/savedNews' element= {<SavedNews mode={this.state.mode}/>}/>
          <Route path='/register' element={<SignUp mode={this.state.mode}/>} />
          <Route path='/' element={<News2 setProgress={this.setprogress} apikey={this.state.apikey} key='general' mode={this.state.mode} pageSize={9} country={'in'} category={"general"}/>}/>
          <Route path='/business' element={<News2 setProgress={this.setprogress} apikey={this.state.apikey} key='business' mode={this.state.mode} pageSize={9} country={'in'} category={"business"}/>}/>
          <Route path='/entertainment' element={<News2 setProgress={this.setprogress} apikey={this.state.apikey} key='entertainment' mode={this.state.mode} pageSize={9} country={'in'} category={"entertainment"}/>}/>
          <Route path='/general' element={<News2 setProgress={this.setprogress} apikey={this.state.apikey} key='general' mode={this.state.mode} pageSize={9} country={'in'} category={"general"}/>}/>
          <Route path='/health' element={<News2 setProgress={this.setprogress} apikey={this.state.apikey} key='health' mode={this.state.mode} pageSize={9} country={'in'} category={"health"}/>}/>
          <Route path='/science' element={<News2 setProgress={this.setprogress} apikey={this.state.apikey} key='science' mode={this.state.mode} pageSize={9} country={'in'} category={"science"}/>}/>
          <Route path='/sports' element={<News2 setProgress={this.setprogress} apikey={this.state.apikey} key='sports' mode={this.state.mode} pageSize={9} country={'in'} category={"sports"}/>}/>
          <Route path='/technology' element={<News2 setProgress={this.setprogress} apikey={this.state.apikey} key='technology' mode={this.state.mode} pageSize={9} country={'in'} category={"technology"}/>}/>
        </Routes>

        </BrowserRouter>
      </div>
    )
  }
}