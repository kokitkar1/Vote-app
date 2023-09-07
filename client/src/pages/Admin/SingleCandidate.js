import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from '../../components/Layout/AdminMenu.js'
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const SingleCandidate = () => {

    // const navigate = useNavigate();
    const navigate = useNavigate();
    const params = useParams();
    const [candidateName,setCandidateName] = useState("")
    const [candidateNumber,setCandidateNumber] = useState("")
    const [id,setId] = useState("")


        // get single product
        const getSingleProduct = async () =>{
            try {
                const {data} = await axios.get(`/api/v1/vote/get-candidate/${params.candidateName}`)

                setId(data.candidate._id)
                setCandidateName(data.candidate.candidateName)
                setCandidateNumber(data.candidate.candidateNumber)

            } catch (error) {
                console.log(error)
            }
        }
        useEffect(() =>{
            getSingleProduct();
            //eslint-disable-next-line
        },[])
  
  
        // Create function for handleCreate 
            const handleUpdate = async (e) =>{
                e.preventDefault()
                  try {

                    const {data} = await axios.put(`/api/v1/vote/update-candidate/${id}`,{candidateName,candidateNumber})
  
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


            // Delete product function
            const handleDelete = async () =>{
                try {
                    let answer = window.prompt('Are You Sure! Really Want to delete this product?')
                    if(!answer) return
                    const {data} = await axios.delete(`/api/v1/vote/candidate/${id}`)
                    console.log(data);
                    toast.success('Product Deleted Successfully')
                    navigate('/dashboard/admin/candidate')
                } catch (error) {
                    console.log(error)
                    toast.error("Something went Wrong")
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
                <h1>Update Candidate</h1>
                <div className="m-1 w-75">
                <div className="mb-3">
                            <input type="text" value={candidateName} placeholder='Write a candidateName' className='form-control' onChange={(e)=> setCandidateName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <textarea type="number" value={candidateNumber} placeholder='Write a candidateNumber' className='form-control' onChange={(e)=> setCandidateNumber(e.target.value)} />
                        </div>
                </div>
                <div className="mb-3">
                    <button className='btn btn-primary' onClick={handleUpdate} >UPDATE CANDIDATE</button>
                </div>

                <div className="mb-3">
                            <button className='btn btn-danger' onClick={handleDelete} >DELETE CANDIDATE</button>
                </div>

            </div>
        </div>
        </div>
    </Layout>
  )
}

export default SingleCandidate