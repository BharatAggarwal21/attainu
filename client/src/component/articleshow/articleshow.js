import React, { Component } from 'react';
//import axios from 'axios';
import {Link} from 'react-router-dom';
import './articleshow.css';

export default class Articleshow extends Component{
    state={
        title:this.props.title,
        content:this.props.content
    }
    render(){
        return(
            <div>
                <h3 className="heading1">{this.state.title}</h3>
                <h2>{this.state.content}</h2>
                <br/>
            </div>            
        )
    }
}