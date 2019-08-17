import React, {Component} from 'react';

export default class DetailMenu extends Component{
  onClick = () => {
    this.props.history.push("/reservation");
  };
  render(){
    return(
      <div>
        <h1> This is Menu listing</h1>
        <button onClick={this.onClick}>
          Go to Menu Reservation
        </button>
      </div>
    );
  }

}
