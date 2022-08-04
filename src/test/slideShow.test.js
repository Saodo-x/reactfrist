import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import SlideShow from "../pages/slideshow";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()})


describe('SlideShow组件测试',()=>{
    const state = {
        rectangle: [
            {color: '#d7000f', name: 1, display: 'block'},
            {color: '#002e9b', name: 2, display: 'none'},
            {color: '#c1c1c1', name: 3, display: 'none'},
            {color: '#697723', name: 4, display: 'none'},
        ],
        col: '#ff770f',
        num: [
            {a:1, col: "#cccccc"},
            {a:2, col: "#ff770f"},
            {a:3, col: "#cccccc"},
            {a:4, col: "#cccccc"}
        ],
        count: 1,
    }

    it('should SlideShow test', function () {
        jest.useFakeTimers()

        const slideShow = shallow(<SlideShow/>)
        slideShow.setState({
            rectangle: state.rectangle,
            col: state.col,
            num: state.num,
        })
        expect(toJson(slideShow)).toMatchSnapshot()
        console.log(slideShow.state())

        const slides = slideShow.find('#aaa')
        const buts = slides.at(0).children()
        const subscriptAll = slideShow.find('#hhh')
        const subscripts = subscriptAll.find('#circle')

        expect(slides.length).toBe(4)
        expect(subscripts.length).toBe(4)
        expect(buts.length).toBe(2)

        jest.runOnlyPendingTimers()

        const leftBut = buts.at(0)
        const rightBut = buts.at(1)
        rightBut.simulate('click')
        expect(slideShow.state().rectangle[1].display).toBe('block')
        leftBut.simulate('click')

        console.log(slideShow.state().num)
        expect(slideShow.state().rectangle[3].display).toBe('block')

        subscripts.at(0).simulate('click')
        expect(slideShow.state().num[0].col).toBe('#ff770f')
    });
})