import { NavLink } from "react-router-dom";
import ReduxActions from "../redux/actions";
import React, { useEffect, useRef } from "react";
import { bindActionCreators } from "redux";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";

const Navbar: React.FC = (): JSX.Element => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    // alert('navbar rendered')
  
    const authActions = bindActionCreators(ReduxActions.auth, dispatch);
    // const navigate = useNavigate();
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? "active-nav" : "")}
        >
          HOME
        </NavLink>
  
        {auth.isLoggedIn ? (
          <>
            <NavLink
              to="/logout"
              onClick={authActions.logout}
              className={(navData) => (navData.isActive ? "active-nav" : "")}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={(navData) => (navData.isActive ? "active-nav" : "")}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={(navData) => (navData.isActive ? "active-nav" : "")}
            >
              Register
            </NavLink>
          </>
        )}
  
        <NavLink
          to="/create-course"
          className={(navData) => (navData.isActive ? "active-nav" : "")}
        >
          Create-course
        </NavLink>
        <NavLink
          to="/created-courses"
          className={(navData) => (navData.isActive ? "active-nav" : "")}
        >
          My courses
        </NavLink>

        {/* theme */}
        <Form.Switch /> 
        {/* theme */}

      </div>
    );
  };

export default Navbar;