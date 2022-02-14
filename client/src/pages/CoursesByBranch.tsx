import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseListItem from '../components/CourseListItem';
import { TCourse } from './Course';
const CoursesByBranch = () => {
  const [branch, setBranch] = useState<{name:string,slug:string, courses:TCourse[]}>({name:'',slug:'', courses:[]});

  const params = useParams();
  useEffect(() => {
    axios.get(`/branches/${params.branch}`)
    .then(response=>setBranch(response.data))
  }, []);
  
  return <div>
    <h1>
    CoursesByBranch
    </h1>
    {
      branch.courses.length ?
    branch.courses.map((x, i)=> 

      <CourseListItem key={i} branch={branch} course={x}/>
      // <Link to={`/courses/${branch.slug}/${x?.slug}`}>
      // {x?.title}
      // </Link>
      )
    :
    <p>nema kurseva iz ove branche</p>
    }



  </div>;
};

export default CoursesByBranch;
