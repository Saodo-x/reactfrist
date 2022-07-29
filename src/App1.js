import React from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import {Redirect, Route} from "react-router-dom";
import MyNavLink from "./components/MyNavLink";
import MyHeader from "./components/MyHeader";
import {CSSTransition} from "react-transition-group";
import './App1.css'

export default class App1 extends React.Component {

    state = {
        shows: true
    }

    reveal = () => {
        const is = this.state.shows
        this.setState({shows: !is},()=>{
            console.log(this.state.shows)
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <MyHeader/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group" onClick={this.reveal}>
                            <MyNavLink to='/about'>About</MyNavLink>
                            <MyNavLink to='/home'>Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Route exact path='/about'>
                                    <CSSTransition in={this.state.shows} timeout={500} classNames='page'>
                                        <About/>
                                    </CSSTransition>
                                </Route>
                                <Route path='/home'>
                                    <CSSTransition in={!this.state.shows} timeout={500} classNames='page'>
                                        <Home/>
                                    </CSSTransition>
                                </Route>
                                <Redirect to='/about'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}