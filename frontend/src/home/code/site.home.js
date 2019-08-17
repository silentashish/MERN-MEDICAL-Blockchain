import React, {Component} from 'react';

export default class SiteHome extends Component{
  onClick = () => {
    this.props.history.push("/site/branch");
  };
  render(){
    return(
      <div>
        <h1> This is Site Home</h1>
        <button onClick={this.onClick}>
          Go to Menu Portion
        </button>
      </div>
    );
  }

}
