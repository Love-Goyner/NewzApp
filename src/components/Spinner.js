import React, { Component } from 'react'
import loading from './loader.gif'
import loading2 from './loaderBlack.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-4'>
        <img src={(this.props.mode === 'light'?loading:loading2)} alt="Loading in process....." />
      </div>
    )
  }
}

export default Spinner
