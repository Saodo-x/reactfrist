import React from "react";
import Item from "../Item";
import "./index.css"

export default class MainList extends React.Component {

    render() {
        const {listContent} = this.props

        return (
            <ul className="todo-main">
                {
                    listContent.map((item)=>
                        <Item key={item.id} id={item.id} list={item}/>
                    )
                }
            </ul>
        )
    }
}