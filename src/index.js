/**
 Created By liqiankun on 2019/11/23
 */

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';


class App extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        axios.get('http://www.dell-lee.com/react/api/header.json')
            .then((response) => {
                console.log(response);
            })
    }

    render(){
        return (
            <div>
                hello world
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('root'));