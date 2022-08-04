import React, { Component } from 'react'
import './index.css'

export default class ShowAlert extends Component {
    state = {
        showAlert: false,
        id: '',
        but: [],
        showClass: "",
        amend: false,
        content: '',
        title: '',
        people: '',
        fixedValue: ''
    }
    myTxt = null
    myTitle = null
    myPeople = null

    componentDidMount() {
        this.setState({
            showAlert: this.props.sureAlert ? this.props.sureAlert.showAlert : false,
            content: this.props.sureAlert ? this.props.sureAlert.content : '',
            id: this.props.sureAlert ? this.props.sureAlert.id : '',
            title: this.props.sureAlert ? this.props.sureAlert.title : '',
            people: this.props.sureAlert ? this.props.sureAlert.people : '',
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            showAlert: nextProps.sureAlert.showAlert,
            content: nextProps.sureAlert.content,
            id: nextProps.sureAlert.id,
            title: nextProps.sureAlert.title,
            people: nextProps.sureAlert.people,
        })
    }

    handleChange = ()=>{
        if (this.myTitle.value !== this.state.title){
            this.setState({title:this.myTitle.value})
        }else if (this.myTxt.value !== this.state.content){
            this.setState({content:this.myTxt.value})
        }else {
            this.setState({people:this.myPeople.value})
        }
    }

    bon = ()=>{
        this.setState({showAlert: false},()=>{
            this.props.getInfos(this.state.showAlert)
        })
    }

    revise = ()=>{
        const content = this.state.content
        this.setState({amend: true, fixedValue: content})
    }

    cancel = ()=>{
        const fixedValue = this.state.fixedValue
        this.setState({amend: false, content: fixedValue})
    }

    confirm = ()=>{
        const id = this.state.id
        const content = this.state.content
        const title = this.state.title
        const people = this.state.people
        this.props.alertRevise(id,content,title,people)
        this.setState({amend: false})
    }

    render() {
        return (
            <div className='Alert-main'>
                {
                    this.state.showAlert ? <div className='Alert-back'></div> : null
                }
                {
                    this.state.showAlert ?
                        <div className='Alert-cont'>
                            <div className='Alert-cont-flex'>
                                <div className={this.state.amend ? 'AlertInput':''}>
                                    {
                                        this.props.sureAlert.title ?
                                            this.state.amend ? <input className='Alert-input' type='text' ref={c => this.myTitle = c} value={this.state.title} onChange={this.handleChange}/>
                                                : <div className='Alert-title'>{this.props.sureAlert.title}</div>
                                            : null
                                    }
                                    {
                                        this.props.sureAlert.people ?
                                            this.state.amend ? <input className='Alert-input' type='text' ref={c => this.myPeople = c} value={this.state.people} onChange={this.handleChange}/>
                                                : <div className='Alert-people'>{this.props.sureAlert.people}</div>
                                            : null
                                    }
                                </div>
                                {
                                    this.props.sureAlert.content ?
                                        this.state.amend ? <textarea ref={c => this.myTxt = c} onChange={this.handleChange} value={this.state.content}/>
                                            : <div className='Alert-content' dangerouslySetInnerHTML={{ __html: this.props.sureAlert.content }}></div>
                                        : null
                                }
                                {
                                    this.state.amend ? <div className='Alert-button x-layout-box'>
                                        <div className='app-btn-cancel x-flex-one orange' onClick={this.confirm}>确定</div>
                                        <div className='app-btn-cancel x-flex-one orange' onClick={this.cancel}>取消</div>
                                    </div> : <div className='Alert-button x-layout-box'>
                                        <div className='app-btn-cancel x-flex-one orange' onClick={this.bon}>知道了</div>
                                        <div className='app-btn-cancel x-flex-one orange' onClick={this.revise}>修改</div>
                                    </div>
                                }
                            </div>
                        </div> : null
                }
            </div>
        )
    }
}