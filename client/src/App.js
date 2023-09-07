import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage.js';
import Register from './pages/Auth/Register.js';
import Login from './pages/Auth/Login.js';
import ForgotPassword from './pages/Auth/ForgotPassword.js';
import Vote from './pages/Auth/Vote.js';
import PrivateRoute from './components/Routes/Private.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import AdminRoute from './components/Routes/AdminRoute.js';
import UserDboard from './pages/Admin/UserDboard.js';
import CreateCandidate from './pages/Admin/CreateCandidate.js';
import Candidate from './pages/Admin/Candidate.js';
import SingleCandidate from './pages/Admin/SingleCandidate.js';


function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/vote' element={<PrivateRoute/>} >
        <Route path='' element={<Vote/>} />
      </Route>
        <Route path='/dashboard/user' element={<UserDboard/>} />

      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-candidate' element={<CreateCandidate/>}/>
        <Route path='admin/candidate' element={<Candidate/>}/>
        <Route path='admin/candidate/:candidateName' element={<SingleCandidate/>}/>
      </Route>
      <Route path='/' element={<HomePage/>} />
    
      <Route path='/forgot-password' element={<ForgotPassword/>} />
    </Routes>
    </>
  );
}

export default App;
