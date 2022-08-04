import React from "react";
import "./index.css"
import PubSub from "pubsub-js";

export default class SlideShow extends React.Component {
    state = {
        rectangle: [
            {color: '#d7000f', name: 1, display: 'block'},
            {color: '#002e9b', name: 2, display: 'none'},
            {color: '#c1c1c1', name: 3, display: 'none'},
            {color: '#697723', name: 4, display: 'none'},
        ],
        col: '#ff770f',
        num: [
            {a:1, col: "#ff770f"},
            {a:2, col: "#cccccc"},
            {a:3, col: "#cccccc"},
            {a:4, col: "#cccccc"}
        ],
        count: 1,
    }
    times = null

    componentDidMount() {
        const rectangle = this.state.rectangle.concat()
        const num = this.state.num.concat()
        this.times = setInterval(()=>{
            rectangle.forEach((item)=>{
                if (item.name === this.state.count){
                    item.display = 'block'
                    num[item.name-1].col = this.state.col
                }else {
                    item.display = 'none'
                    num[item.name-1].col = "#cccccc"
                }
            })
            // console.log('ss')
            this.setState({rectangle: rectangle})
            this.setState({num: num})
            if (this.state.count === 4){
                this.setState({count: 1})
            }else {
                const x = this.state.count
                this.setState({count: x+1})
            }
        },1500)

        if (this.props.location.state){
            PubSub.publish('detail',this.props.location.state.detail)
        }
    }

    componentWillUnmount() {
        clearInterval(this.times)
    }

    getLeft = (index)=>{
        const rectangle = this.state.rectangle.concat()
        const num = this.state.num.concat()
        if (index === 1){
            rectangle[rectangle.length-1].display = 'block'
            rectangle[index-1].display = 'none'
            num[num.length-1].col = this.state.col
            num[index-1].col = "#cccccc"
            this.setState({count: rectangle.length})
        }else {
            rectangle[index-2].display = 'block'
            rectangle[index-1].display = 'none'
            num[index-2].col = this.state.col
            num[index-1].col = "#cccccc"
            this.setState({count: index-1})
        }
        this.setState({rectangle: rectangle})
        this.setState({num: num})
    }

    getRight = (index)=>{
        const rectangle = this.state.rectangle.concat()
        const num = this.state.num.concat()
        if (index === 4){
            rectangle[0].display = 'block'
            rectangle[index-1].display = 'none'
            num[0].col = this.state.col
            num[index-1].col = "#cccccc"
            this.setState({count: 1})
        }else {
            rectangle[index].display = 'block'
            rectangle[index-1].display = 'none'
            num[index].col = this.state.col
            num[index-1].col = "#cccccc"
            this.setState({count: index+1})
        }
        this.setState({rectangle: rectangle})
        this.setState({num: num})
    }

    show = (a)=>{
        const rectangle = this.state.rectangle
        const num = this.state.num
        rectangle.forEach((item)=>{
            if (item.name === a){
                item.display = 'block'
                num[item.name-1].col = this.state.col
                this.setState({count: a})
            }else {
                item.display = 'none'
                num[item.name-1].col = "#cccccc"
            }
        })
        const newRec = rectangle.concat()
        const newNum = num.concat()
        this.setState({rectangle: newRec})
        this.setState({num: newNum})
        // console.log('ss')
    }

    render() {
        return (
            <div id='main'>
                {
                    this.state.rectangle.map((e)=>
                        <div id='aaa' className='cartoon' key={e.name} style={{background:e.color,display:e.display}}>
                            <div className="left" onClick={()=>this.getLeft(e.name)}>
                                <svg t="1657263878244" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2730" width="48" height="48">
                                    <path d="M842.666667 864c-8.533333 0-14.933333-2.133333-21.333334-8.533333l-341.333333-309.333334c-6.4-6.4-10.666667-14.933333-10.666667-23.466666 0-8.533333 4.266667-17.066667 10.666667-23.466667l341.333333-309.333333c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133333 44.8L548.266667 522.666667l315.733333 285.866666c12.8 10.666667 14.933333 32 2.133333 44.8-6.4 6.4-14.933333 10.666667-23.466666 10.666667z" p-id="2731"></path>
                                    <path d="M512 864c-8.533333 0-14.933333-2.133333-21.333333-8.533333L149.333333 546.133333c-6.4-6.4-10.666667-14.933333-10.666666-23.466666 0-8.533333 4.266667-17.066667 10.666666-23.466667L490.666667 189.866667c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133334 44.8L217.6 522.666667 533.333333 808.533333c12.8 12.8 14.933333 32 2.133334 44.8-6.4 6.4-14.933333 10.666667-23.466667 10.666667z" p-id="2732"></path>
                                </svg>
                            </div>
                            <div className="right" onClick={()=>this.getRight(e.name)}>
                                <svg t="1657264236000" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3162" width="48" height="48">
                                    <path d="M544 522.666667c0-8.533333-4.266667-17.066667-10.666667-23.466667L192 189.866667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733334 285.866667L149.333333 808.533333c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666z" p-id="3163"></path>
                                    <path d="M864 499.2l-341.333333-309.333333c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733333 285.866667-315.733333 285.866666c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466666 10.666667 8.533333 0 14.933333-2.133333 21.333334-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666 0-8.533333-4.266667-17.066667-10.666667-23.466667z" p-id="3164"></path>
                                </svg>
                            </div>
                        </div>
                    )
                }
                <div id='hhh'>
                    {
                        this.state.num.map((e,index)=>
                            <div id='circle' key={index} onClick={()=>this.show(e.a)} style={{background:e.col}}></div>
                        )
                    }
                </div>
            </div>
        )
    }
}