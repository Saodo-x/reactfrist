import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import ShowAlert from "../components/showalert";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()})

describe('ShowAlert组件测试', ()=>{
    const sureAlert = {
        showAlert: true,
        title: '提示',
        content: "哈哈哈哈哈",
        btns: ""
    }
    const myMock = jest.fn()
    it('should ShowAlert test', function () {
        const showAlert = shallow(<ShowAlert sureAlert={sureAlert} getInfos={myMock}/>)
        showAlert.setState({showAlert:true})
        expect(toJson(showAlert)).toMatchSnapshot()

        const main = showAlert.find('.Alert-main')
        const background = showAlert.find('.Alert-back')
        const title = showAlert.find('.Alert-title')
        const content = showAlert.find('.Alert-content')
        const but = showAlert.find('.app-btn-cancel')

        expect(main.length).toBe(1)
        expect(background.length).toBe(1)
        expect(title.text()).toBe('提示')
        expect(content.get(0).props.dangerouslySetInnerHTML.__html).toBe('哈哈哈哈哈')
        expect(but.length).toBe(2)

        but.at(0).simulate('click')
        expect(showAlert.state().showAlert).toBe(false)
        expect(myMock.mock.calls.length).toBe(1)

        expect(but.at(1).text()).toBe('修改')
        but.at(1).simulate('click')

        showAlert.setState({showAlert:true,amend:true})
        expect(toJson(showAlert)).toMatchSnapshot()

        const but2 = showAlert.find('.app-btn-cancel')
        const txt = showAlert.find('textarea')

        expect(txt.length).toBe(1)
        expect(but2.at(0).text()).toBe('确定')
        expect(but2.at(1).text()).toBe('取消')

        but2.at(1).simulate('click')
        expect(showAlert.state().amend).toBe(false)

        const myMock2 = jest.fn()
        showAlert.setProps({alertRevise: myMock2})
        but2.at(0).simulate('click')
        expect(myMock2.mock.calls.length).toBe(1)
    });
})