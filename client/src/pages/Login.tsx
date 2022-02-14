import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReduxActions from '../redux/actions'
import { bindActionCreators } from "redux";
import { validateLocaleAndSetLanguage } from "typescript";
import axios from "axios";

interface AppProps {
    props?: any;
  };

  const Login = ({ ...props }) : JSX.Element => {



const dispatch = useDispatch();

    const authActions = bindActionCreators(ReduxActions.auth, dispatch);



    const navigate = useNavigate();

    const [login, setLogin] = useState<{
        email:string,
        password: string
    }>({
      email:'',
      password:'',
    });



    const handleChange = (name: string) : any => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void =>{
        setLogin(
            {...login, 
        [name]: e.target.value
        })
    }

    const [errors, setErrors] = useState<any[]>([]);

    const validate = () => {

      let errorsTemp : any[] = [];
    let filters = {
     email:  /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_\.\-])+\.([a-z]){2,4}/,
     password : /.{3,10}/
    }

      if(!filters.email.test(login.email)){
          errorsTemp = [...errorsTemp, { email: "Invalid email" }];
      }
      if(!filters.password.test(login.password ?? "")){
          errorsTemp = [...errorsTemp, { password: "Invalid password" }];
      }
      setErrors(errorsTemp);
      return !errorsTemp.length;
  }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) : Promise<void> =>{
        e.preventDefault();
        console.log(1);

        if(validate()){
          axios.post("/auth/login", login)
          .then((response)=>{
            console.log(55);
          authActions.login(response.data)
          console.log(2);
          navigate("/")
          }).catch(err=>{
            console.log({...err});
            if(err.response.status == 404){
              alert(404)
              setErrors([...errors, {email: err.response.data}])
            }
            if(err.response.status == 401){
              alert(401)
              setErrors([...errors, {password: err.response.data}])
            }
          })
        }
        else{
          alert('netacni')
          //alert( ) ??
        }

    }
    
    return (<form onSubmit={handleSubmit}>
        <input onChange={handleChange("email")}/>

        {
                    errors.filter(x=>x.email).length > 0 && 
                    errors.filter(x=>x.email).map((err, i)=> <span key={i}>{err.email}</span>)
                }
        <input type="password" onChange={handleChange("password")}/>
        {
                    errors.filter(x=>x.password).length > 0 && 
                    errors.filter(x=>x.password).map((err, i)=> <span key={i}>{err.password}</span>)
                }
        <button type="submit">Login</button>
    </form>)
};

  
  export default (Login);