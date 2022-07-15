import React, {Component} from "react";
import CountUI from "./containers/Count";
import Person from "./containers/Person";

export default class App2 extends Component {
    render() {
        return (
            <div>
                <CountUI />
                <hr/>
                <Person />
            </div>
        )
    }
}