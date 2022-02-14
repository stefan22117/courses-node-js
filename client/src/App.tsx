import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import "./App.css";
import { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import store from "./redux/store";
import ReduxActions from "./redux/actions";
import { Provider, useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";
import Pages from "./pages";

import Navbar from "./components/Navbar";
import { bindActionCreators } from "redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <RoutesDefinitions />
      </BrowserRouter>
    </Provider>
  );
}

const RoutesDefinitions = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const authActions = bindActionCreators(ReduxActions.auth, dispatch);

  useEffect(() => {
    authActions.checkAuth();
  }, []);
  

  const transitions = useTransition(location, {
    
    from: {
      opacity: 0,
      transform: "translateX(100%)",
      transition:'all 0.5s ease-out'
    },
    enter: {
      opacity: 1,
      transform: "translateX(0%)",
      transition:'all 0.5s ease-out'
    },
    leave: {
      opacity: 0,
      transform: "translateX(-100%)",
      transition:'all 0.5s ease-out'
    },
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      <Routes location={item}>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/register" element={<Pages.Register />} />
        {/* <Route path="/course/:slug" element={<Pages.Course />} /> */}
        <Route path="/create-course" element={<Pages.CreateCourse />} />
        <Route path="/create-branch" element={<Pages.CreateBranch />} />
        <Route path="/created-courses" element={<Pages.CreatedCourses />} />
        <Route path="/courses" element={<Pages.CourseBranches />} />
        <Route path="/courses/:branch" element={<Pages.CoursesByBranch />} />
        <Route path="/courses/:branch/:slug" element={<Pages.Course />} />
      </Routes>
    </animated.div>
  ));
};

export default App;
