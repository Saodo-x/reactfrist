import React from "react";
import MyNavLink from "../../components/MyNavLink";
import News from "./News";
import Message from "./Message";
import {Redirect, Route, Switch} from "react-router-dom";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h2>Home组件内容</h2>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            <MyNavLink to='/home/news'>News</MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to='/home/message'>Message</MyNavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route path='/home/news' component={News}/>
                        <Route path='/home/message' component={Message}/>
                        <Redirect to='/home/news'/>
                    </Switch>
                </div>
            </div>
        )
    }
}