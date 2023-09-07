import React from 'react'
import Layout from '../components/Layout/Layout.js'
import Login from './Auth/Login.js'

const HomePage = () => {

  return (
    <Layout title={"Vote App"}>
      
        <div className="form-container" style={{ minHeight: "60vh" }}>
          <h1>Voter....</h1>
          <Login/>
        </div>

        <div className="form-container "  style={{ minHeight: "60vh" }}>
           <h5 className="text-center mb-1 mt-3">We take your privacy and the security of your personal information very seriously.<tr /> We are committed to protecting your personal information and ensuring that it is used only in accordance with this privacy policy.</h5>
            <div className="col-md-6 ">
              <img className="mb-1" src="/images/i.jpg" alt="Privacy matters" style={{ width: "100%" }}/>
            </div>
      </div>

          <h6 className="text-center" style={{color: "blue"}}>Thank you for trusting us with your personal information. If you have any questions or concerns regarding our privacy policy, please do not hesitate to contact us.</h6>
    </Layout>
  )
}

export default HomePage