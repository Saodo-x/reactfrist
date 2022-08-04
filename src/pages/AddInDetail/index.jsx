import React, {Component} from "react";
import {nanoid} from "nanoid";
import './index.css'
import PubSub from "pubsub-js";

export default class AddInDetail extends Component{
    state = {
        title: '',
        id: '',
        content: '',
        people: '',
        detail: ''
    }

    myTitle = null
    myCont = null
    myPeople = null

    componentDidMount() {
        if (this.props.location.state){
            this.setState({detail:this.props.location.state.detail})
        }
        this.setState({id:nanoid()})
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({detail:nextProps.location.state.detail})
    }

    changeContent = ()=>{
        if (this.myTitle.value !== this.state.title){
            this.setState({title:this.myTitle.value})
        }else if (this.myCont.value !== this.state.content){
            this.setState({content:this.myCont.value})
        }else {
            this.setState({people:this.myPeople.value})
        }
    }

    unAdd = ()=>{
        this.setState({title: '', id: '', content: '', people: '', detail: ''})
        this.props.history.push({
            pathname: '/slideshow',
            state: {detail: !this.state.detail}
        })
    }

    confirmAdd = ()=>{
        if (this.state.content && this.state.title && this.state.people){
            const list = {
                content: this.state.content,
                id: this.state.id,
                accomplish: false,
                title: this.state.title,
                addPeople: this.state.people
            }
            PubSub.publish('getDetail', list)
            this.props.history.push({
                pathname: '/slideshow',
                state: {detail: !this.state.detail}
            })
            this.setState({title: '', id: '', content: '', people: '', detail: ''})
        }else {
            alert('请将信息填写完整！')
        }
    }

    render() {
        return(
            <div id='detail-main'>
                <div className='detail-list'>
                    <div className='detail-head'>添加</div>
                    <div className='line-between'></div>
                    <div className='detail-title'>
                        <span className='detail-span'>标题：</span>
                        <input className='detail-input' ref={c => this.myTitle = c} onChange={this.changeContent} value={this.state.title} type='text'/>
                    </div>
                    <div className='line-between'></div>
                    <div className='detail-id'>
                        <span className='detail-span' style={{margin:'0 0 0 0.8rem'}}>ID:</span>
                        <div className='detail-span-cont'>{this.state.id}</div>
                    </div>
                    <div className='line-between'></div>
                    <div className='detail-title'>
                        <span className='detail-span'>内容：</span>
                        <input className='detail-input' type='text' ref={c => this.myCont = c} onChange={this.changeContent}  value={this.state.content}/>
                    </div>
                    <div className='line-between'></div>
                    <div className='detail-title'>
                        <span className='detail-span'>添加人：</span>
                        <input className='detail-input' type='text' ref={c => this.myPeople = c} onChange={this.changeContent}  value={this.state.people}/>
                    </div>
                    <div className='line-between'></div>
                    <div className='detail-button'>
                        <button className='btn btn-danger' onClick={this.confirmAdd}>确定添加</button>
                        <button className='btn btn-danger' onClick={this.unAdd}>取消添加</button>
                    </div>
                </div>
            </div>
        )
    }
}