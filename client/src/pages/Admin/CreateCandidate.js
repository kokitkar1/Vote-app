import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from '../../components/Layout/AdminMenu.js'
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateCandidate = () => {

  const navigate = useNavigate();

  const [candidateName,setCandidateName] = useState([])
  const [candidateNumber,setCandidateNumber] = useState([])


              // Create function for handleCreate 
              const handleCreate = async (e) =>{
                e.preventDefault()
                try {
                  const {data} = await axios.post('/api/v1/vote/create-candidate',{candidateName,candidateNumber})

                    if(data?.success){
                        toast.success('candidate created successfully')
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
    <Layout title={"Dashboard - CreateCandidate"}>
        <div className="container-fluid m-3 p-3 dashboard">        
        <div className="row ">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1>Create Candidate</h1>
                <div className="m-1 w-75">
                <div className="mb-3">
                            <input type="text" value={candidateName} placeholder='Write a candidateName' className='form-control' onChange={(e)=> setCandidateName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <textarea type="number" value={candidateNumber} placeholder='Write a candidateNumber' className='form-control' onChange={(e)=> setCandidateNumber(e.target.value)} />
                        </div>
                </div>
                <div className="mb-3">
                    <button className='btn btn-primary' onClick={handleCreate} >CREATE CANDIDATE</button>
                </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCandidate