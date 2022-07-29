// import renderer from 'react-test-renderer'
import {shallow} from "enzyme"
import toJson from "enzyme-to-json";
import App from "./App";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainList from "./components/MainList";
import Item from "./components/Item";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

jest.mock('nanoid')
jest.mock('pubsub-js',()=>{
    return {
        publish: jest.fn(() => 3)
    }
})

const listContent = [
    {content: '睡觉', id: '001', accomplish: true},
    {content: '吃饭', id: '002', accomplish: false},
    {content: '学习', id: '003', accomplish: false}
]

describe('App快照测试',()=>{
    it('should App test', function () {
        const app = shallow(<App/>).toJSON()
        expect(toJson(app)).toMatchSnapshot()
    });
})

describe('Footer快照测试',()=>{
    it('should Footer test', function () {
        const footer = shallow(<Footer num={3} statistics={1} statisticsAll={false}/>)
        expect(toJson(footer)).toMatchSnapshot()

        const myMock = jest.fn()
        const but = footer.find('button')
        const spans = footer.find('span')
        const label = footer.find('label')
        expect(but.text()).toBe('清除已完成任务')
        expect(spans.at(0).text()).toBe('已完成1 / 全部3')
        expect(spans.at(1).text()).toBe('已完成1')
        expect(but.length).toBe(1)
        expect(spans.length).toBe(2)
        expect(label.is('label')).toEqual(true)
        expect(label.children().is('input')).toBe(true)

        footer.setProps({list:listContent, deleteAll:function (list){
                footer.setState({list:list})
                myMock()
            }})
        footer.find('button').simulate('click')
        expect(footer.state().list[0].content).toBe('吃饭')
        expect(myMock.mock.calls.length).toBe(1)
    });
})

describe('Header快照测试', function () {
    it('should Header test', function () {
        const header = shallow(<Header />)
        const inputs = header.find('input')
        // const myMock = jest.fn()

        inputs.simulate('change',{target: {value: '哈哈哈'}})
        expect(header.state().inputTxt).toBe('哈哈哈')

        inputs.simulate('keyUp',{keyCode:13})
        expect(header.state().inputTxt).toBe('')

        expect(toJson(header)).toMatchSnapshot()
        expect(inputs.length).toBe(1)
    });
});

describe('List快照测试', function () {
    it('should MainList test', function () {
        const state = {
            listContent: listContent
        }
        const mainList = shallow(<MainList listContent={listContent}/>)
        const uls = mainList.find('ul')
        const items = mainList.find('Item')

        expect(toJson(mainList)).toMatchSnapshot()
        expect(state).toMatchSnapshot({
            listContent: expect.any(Array)
        })

        expect(items.length).toBe(3)
        expect(uls.length).toBe(1)
        expect(items.at(0).is('Item')).toBe(true)
        expect(uls.is('ul')).toBe(true)
    });

    it('should Item test', function () {
        const myMock = jest.fn()
        const list = listContent[0]
        const items = shallow(<Item list={list} />)
        const lis = items.find('li')
        const labels = items.find('label')
        const input1 = items.find('input')
        const spans = labels.children().at(1)
        const but = items.find('button')

        expect(toJson(items)).toMatchSnapshot()
        expect(list).toMatchSnapshot({
            content: expect.any(String),
            id: expect.any(String),
            accomplish: expect.any(Boolean)
        })

        expect(lis.length).toBe(1)
        expect(labels.length).toBe(1)
        expect(input1.length).toBe(1)
        expect(spans.text()).toBe('睡觉')
        expect(but.length).toBe(2)

        input1.simulate('change')
        expect(items.state().checked).toBe(false)

        items.setState({compile: true})
        expect(items.find('input').length).toBe(2)

        items.setProps({contentCompile:myMock})
        const input2 = items.find('input').at(1)
        input2.simulate('keyUp', {
            keyCode: 13,
            target: {value: '哈哈哈'}
        })
        expect(myMock.mock.calls.length).toBe(1)

        input2.simulate('change', {target: {value: '哈哈'}})
        expect(items.state().value).toBe('哈哈')

        input2.simulate('blur', {target: {value: '哈哈'}})
        expect(myMock.mock.calls.length).toBe(2)
    });
});