import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBranch = () => {
    const navigate = useNavigate();
    const [branch, setBranch] = useState<{
        name:string
    }>({
        name:''
    });
    const handleChange = (name: string) : any => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void =>{

        setBranch(
            {...branch, 
        [name]: e.target.value
        })

    }

    const handleSubmit = (e:React.FormEvent<Element>) =>{
        e.preventDefault();
        axios.post("/branches/create-branch", branch)
        .then((response) => navigate(`/courses/${response.data.slug}`))
        .catch((err)=>{
            if(err.status == 401){
                navigate('/login');
            }
            console.log(err);
        });
    }
    

  return <div>
      <form onSubmit={handleSubmit}>
      <input onChange={handleChange("name")}/>
      <button type='submit'>Submit branch</button>
      </form>
  </div>;
};

export default AddBranch;
