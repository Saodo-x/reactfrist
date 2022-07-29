import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import Detail from "./Detail";

export default class Message extends React.Component {
    state = {
        messageArr:[
            {id:'001',title:'消息1'},
            {id:'002',title:'消息2'},
            {id:'003',title:'消息3'},
        ]
    }

    replaceShow = (id,title) => {
        this.props.history.replace({
            pathname:'/home/message/detail',
            state:{id:id,title:title}
        })
    }

    pushShow = (id,title) => {
        console.log(this.props)
        this.props.history.push({
            pathname: '/home/message/detail',
            state:{id: id, title: title}
        })
    }

    back = () => {
        this.props.history.goBack()
    }

    forward = () => {
        this.props.history.goForward()
    }

    Go = () => {
        this.props.history.go(2)
    }

    render() {
        const {messageArr} = this.state
        return (
            <div>
                <ul>
                    {
                        messageArr.map((item)=>
                            <li key={item.id}>
                                {/*<Link to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link>&nbsp;&nbsp;*/}
                                {/*<Link to={`/home/message/detail/?id=${item.id}&title=${item.title}`}>{item.title}</Link>&nbsp;&nbsp;*/}
                                <Link to={{pathname: '/home/message/detail',state: {id: item.id, title: item.title}}}>{item.title}</Link>&nbsp;&nbsp;
                                <button onClick={() => this.pushShow(item.id,item.title)}>push</button>
                                <button onClick={() => this.replaceShow(item.id,item.title)}>replace</button>
                            </li>
                        )
                    }
                </ul>
                <Switch>
                    {/*<Route path='/home/message/detail/:id/:title' component={Detail}/>*/}
                    <Route path='/home/message/detail' component={Detail}/>
                </Switch>
                <button onClick={this.back}>退</button>
                <button onClick={this.forward}>进</button>
                <button onClick={this.Go}>GO</button>
            </div>
        )
    }
}