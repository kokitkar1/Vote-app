import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import { useAuth } from '../../context/auth.js'
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Vote = () => {


const navigate = useNavigate();
const [auth,setAuth] = useAuth()
const [candidate,setCandidate] = useState([]);




 // Get All product
 const getAllCandidate = async () =>{
  try {
    const {data} = await axios.get(`/api/v1/vote/get-candidate`);
    setCandidate(data.candidate)
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
getAllCandidate();
},[])





const handleVote = async () =>{
  try {
    const {data} = await axios.put(`/api/v1/auth/update-user/${candidate}`)
    if(data?.success){
      toast.success("Candidate Updated Successfully")
      navigate('/dashboard/admin/candidate')  
  }else{
      toast.error(data?.message)
    }
} catch (error) {
    console.log(error)
    toast.error("Something went wrong")
}



  
  
}
    
  return (
    <Layout>
      {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}


      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center"></h4>
              <img className="mx-3 mt-5" src="/images/i.jpg" alt="Privacy matters" style={{ width: "100%" }}/>
        </div>
        <div className="col-md-9">
          <h1 className="text-center" >All Candidate</h1>
          <div className="d-flex flex-wrap">
            {candidate?.map(c => (
                        <div className="card m-2" style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">{c.candidateName}</h5>
                                <p className="card-text">{c.candidateNumber}</p>
                                <div className="card-name-price">
                                  <button className="btn btn-info ms-1" onClick={handleVote} >Vote</button>
                                </div> 
                            </div>
                        </div>
                    ))}
          </div>
        </div>
      </div>








      {/* <div className="form-container" style={{ minHeight: "83vh" }}>
        <h1>Voteing List</h1>

       <div className="col-auto">
        <label htmlFor="inputPassword6" className="col-form-label ms-2 mx-2 pd-1">Candidate 1</label>
        <button type="button" className="btn btn-primary mb-2 mt-2 pd-1">Vote</button>
        </div>

        <div className="col-auto">
        <label htmlFor="inputPassword6" className="col-form-label ms-2 mx-2 pd-1">Candidate 2</label>
        <button type="button" className="btn btn-primary mb-2 mt-2 pd-1">Vote</button>
        </div>

        <div className="col-auto">
        <label htmlFor="inputPassword6" className="col-form-label ms-2 mx-2 pd-1">Candidate 3</label>
        <button type="button" className="btn btn-primary mb-2 mt-2 pd-1">Vote</button>
        </div>

        <div className="col-auto">
        <label htmlFor="inputPassword6" className="col-form-label ms-2 mx-2 pd-1">Candidate 4</label>
        <button type="button" className="btn btn-primary mb-2 mt-2 pd-1">Vote</button>
        </div>
      </div> */}



    </Layout>
  );
};

export default Vote;
