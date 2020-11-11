import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

export default function useStore(mapStateToProps = state => state, mapDispatchToProps = () => {}) {
    const state = useSelector(state => mapStateToProps(state));
    const dispatch = useDispatch();
    const actions = bindActionCreators(mapDispatchToProps, dispatch);

    return { state, actions }
}