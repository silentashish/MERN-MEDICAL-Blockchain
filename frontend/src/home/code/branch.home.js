import React, {Component} from 'react';

export default class BranchHome extends Component{
  onClick = () => {
    this.props.history.push("/menu/detail");
  };
  render(){
    return(
      <div>
        <h1 className='op'> This is Branch Home</h1>
        <button onClick={this.onClick}>
          Go to Menu
        </button>
      </div>
    );
  }

}
