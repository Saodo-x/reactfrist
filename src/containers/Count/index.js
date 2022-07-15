import CountUI from '../../components/Count'
import {connect} from "react-redux";
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from "../../redux/count_action";

function mapStateToProps(state){
    return {
        count: state
    }
}

function mapDispatchToProps(dispatch){
    return {
        jia:num => dispatch(createIncrementAction(num)),
        jian:num => dispatch(createDecrementAction(num)),
        jiaAsync:(num,time) =>dispatch(createIncrementAsyncAction(num,time)),
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(CountUI)