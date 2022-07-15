import React from "react";
import CountUI from "./containers/Count";
import store from "./redux/store";

export default class App2 extends React.Component {
    render() {
        return (
            <CountUI store={store}/>
        )
    }
}