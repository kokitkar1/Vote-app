import React ,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu.js'
import Layout from '../../components/Layout/Layout.js'
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from 'react-router-dom';

const Candidate = () => {

    const [candidate, setCandidate] = useState([]);

    // Get all product
    const getAllCandidate = async () =>{
        try {
            
            const {data} = await axios.get('/api/v1/vote/get-candidate')
            setCandidate(data.candidate)

        } catch (error) {
            console.log(error)
            toast.error('Something went Wrong')
        }
    }


    // Lifecycle method
    useEffect(() =>{
        getAllCandidate();
    },[])

  return (
    <Layout>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All CANDIDATE</h1>
                <div className="d-flex flex-wrap">
                {candidate?.map(c => (
                    <Link   key={c._id} to={`/dashboard/admin/candidate/${c.candidateName}`} className='product-link'>
                        <div className="card m-2" style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">{c.candidateName}</h5>
                                <p className="card-text">{c.candidateNumber}</p>
                                <p className="card-text">{c.candidateVote}</p>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Candidate