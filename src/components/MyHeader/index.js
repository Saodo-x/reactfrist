import React from "react";
import {withRouter} from "react-router-dom";

class MyHeader extends React.Component {

    back = ()=>{
        this.props.history.goBack()
    }

    forward = ()=>{
        this.props.history.goForward()
    }

    Go = ()=>{
        this.props.history.go(2)
    }

    render() {
        return (
            <div className="page-header">
                <h2>React Router Demo</h2>
                <button onClick={this.back}>退</button>
                <button onClick={this.forward}>进</button>
                <button onClick={this.Go}>GO</button>
            </div>
        )
    }
}

export default withRouter(MyHeader)