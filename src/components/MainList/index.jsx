import React from "react";
import Item from "../Item";
import "./index.css"
import {TransitionGroup, CSSTransition} from "react-transition-group";

export default class MainList extends React.Component {

    render() {
        const {listContent} = this.props

        return (
                <ul className="todo-main">
                    <TransitionGroup>
                    {
                        listContent.map((item)=>
                            <CSSTransition key={item.id} timeout={500} classNames='item'>
                                <Item key={item.id} id={item.id} list={item} getInfos={this.props.getInfos} contentCompile={this.props.contentCompile}/>
                            </CSSTransition>
                        )
                    }
                    </TransitionGroup>
                </ul>
        )
    }
}