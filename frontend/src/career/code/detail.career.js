import React, {Component} from 'react';

export default class DetailCareer extends Component{
  onClick = () => {
    this.props.history.push("/");
  };
  render(){
    return(
      <div>
        <h1 className='names'> This is Detail Of Career</h1>
        <button onClick={this.onClick}>
          Go back to Home page
        </button>
      </div>
    );
  }

}
