import React,{Component} from 'react';
import '../style/pagenotfound.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class BlankPage extends Component{
    redirect= () =>{
        this.props.history.push("/menu/detail");
    }

    render(){
        return(
            <div className='container'>
                <div className='jumbotron'>
                    <img id='pgntimg' src="http://cdn.onlinewebfonts.com/svg/img_545112.png"/>
                    <h1 id='pgnt'>Page Not Found, Return to main page</h1>
                    <h5 id='pgnthome' onClick={this.redirect}>Go to homePage</h5>
                </div>
            </div>    
        );
    }

}

export default BlankPage;