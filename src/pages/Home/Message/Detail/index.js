import React from "react";
// import qs from 'query-string'

export default class Detail extends React.Component {
    render() {
        // const {id,title} = this.props.match.params
        // const {search} = this.props.location
        // const {id,title} = qs.parse(search.slice(1))

        const {id,title} = this.props.location.state || {}
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
            </ul>
        )
    }
}