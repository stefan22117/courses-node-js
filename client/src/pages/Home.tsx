import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReduxActions from '../redux/actions';
import {RootState} from '../redux/store';

const Home = () => {
const dispatch = useDispatch();

const authActions = bindActionCreators(ReduxActions.auth, dispatch);



const auth = useSelector((state:RootState) => state.auth)
    return <>
    
    {auth.isLoggedIn && auth?.user?.name}
    <h1>home</h1>
    <Link to='/courses'>courses</Link>
    </>
}

export default Home