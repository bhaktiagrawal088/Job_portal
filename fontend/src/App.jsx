
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home/Home'
import Jobs from './components/Jobs/Jobs'
import Browse from './components/Browse/Browse'
import Profile from './components/Profile/Profile'
import JobDescription from './components/Jobs/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/companySetup'
import CompanyJobs from './components/admin/CompanyJobs'
import PostNewJobs from './components/admin/PostNewJobs'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path:'/jobs',
    element: <Jobs/>
  },
  {
    path: '/description/:id',
    element: <JobDescription/>
  },
  {
    path: "/browse",
    element:<Browse/>
  },
  {
    path : "/profile",
    element: <Profile/>
  },
  {
    path : "/admin/companies",
    element : <Companies/>
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany/>
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup/>
  },
  {
    path : "/admin/jobs",
    element : <CompanyJobs/>
  },{
    path: "/admin/jobs/create",
    element : <PostNewJobs/>
  }
])
function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
