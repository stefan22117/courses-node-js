import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TCourse } from "./Course";


export type TBranch = {
    name: string;
    slug: string;
    courses?: TCourse[]
  } | null;
  
const CourseBranches = () => {
  const [branches, setBranches] = useState<TBranch[]>([]);


  useEffect(() => {
    axios.get('/branches')
    .then(branches=>setBranches(branches.data))
  }, []);
  

  return <div>
      <h1>CourseBranches</h1>

      {branches.map(branch=><Link to={`/courses/${branch?.slug}`}>{branch?.name}</Link>)}
  </div>;
};

export default CourseBranches;
