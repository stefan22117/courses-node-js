import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface AppProps {
    message?: string;
  };

  const Register = ({ message }: AppProps) : JSX.Element => {

    const navigate = useNavigate();

    const [register, setRegister] = useState<{
        name?:string,
        email?:string,
        password?: string
    }>();

    const handleChange = (name: string): any => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void =>{

        setRegister(
            {...register, 
        [name]: e.target.value
        })

    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) : void =>{
        e.preventDefault();

        axios.post('/auth/register', register).then(res=>{
            alert('registrovan si');
        });
        navigate("/");



    }
    
    return (<form onSubmit={handleSubmit}>
        <input onChange={handleChange("name")}/>
        <input onChange={handleChange("email")}/>
        <input type="password" onChange={handleChange("password")}/>
        <button type="submit">Register</button>
    </form>)
};


  export default Register;
  