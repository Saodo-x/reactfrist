import {Component} from "react";
import {nanoid} from "nanoid";
import {connect} from "react-redux";
import {createAddPerson} from "../../redux/action/person";



class Person extends Component {
    addPerson = ()=>{
        const name = this.nameNode.value
        const age = this.ageNode.value
        const personObj = {id:nanoid(),name:name,age:age}
        this.props.addList(personObj)
    }

    render() {
        return(
            <div>
                <h2>哈哈哈</h2>
                <h3>和为：{this.props.count}</h3>
                <input ref={c => this.nameNode = c} type='text' placeholder='名字'/>
                <input ref={c => this.ageNode = c} type='text' placeholder='年龄'/>
                <button onClick={this.addPerson}>添加</button>
                <ul>
                    {
                        this.props.personList.map((item)=>
                            <li key={item.id}>{item.name}----{item.age}</li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    state =>({
        personList:state.rens,
        count:state.hes
    }),
    {
        addList:createAddPerson
    }
)(Person)