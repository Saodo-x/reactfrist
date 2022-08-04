import {shallow} from "enzyme"
import toJson from "enzyme-to-json";
import AddInDetail from "../pages/AddInDetail";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as nanoid from "nanoid";

configure({ adapter: new Adapter() });

jest.mock('nanoid',() => {
    return function() {
        return {
            nanoid: ()=>{}
        }
    }
})

describe('AddInDetail组件测试',()=>{
    it('should AddInDetail test', function () {
        const state = {detail:false}
        const addDetail = shallow(<AddInDetail location={{state: state}}/>)
        addDetail.setState({id:'123'})
        expect(toJson(addDetail)).toMatchSnapshot()

        const head = addDetail.find('.detail-head')
        const spans = addDetail.find('span')
        const inputs = addDetail.find('input')
        const buts = addDetail.find('button')

        expect(head.text()).toBe('添加')
        expect(spans.length).toBe(4)
        expect(inputs.length).toBe(3)
        expect(buts.length).toBe(2)

        addDetail.setState({title:'哈哈哈',content:'哈哈哈',people: '哈哈哈'})

        const myMock = jest.fn()
        addDetail.setProps({history:{push:myMock}})
        buts.at(0).simulate('click')
        expect(myMock.mock.calls.length).toBe(1)
        buts.at(1).simulate('click')
        expect(myMock.mock.calls.length).toBe(2)
    });
})