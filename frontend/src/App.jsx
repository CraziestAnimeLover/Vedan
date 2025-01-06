
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Companies from './components/admin/Companies'
import JobDescription from './components/JobDescription'
import ServicePage from './components/Pages/ServicePage'
import NewsFeed from './components/Pages/NewsFeed'
import StudentForm from './components/auth/StudentForm'
import Sunny from './components/sunny'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Library from './components/library/Library'
import LostItem from './components/lostnfound/LostItem'
import PreviewPage from './components/auth/resume/PreviewPage'
import PreviewPageAts from './components/auth/resume/PreviewPageATS'








const approuter = createBrowserRouter([
  { path: '/',
    element: <Home/>
   },
  { path: '/login', 
    element: <Login/>
  },
  { path: '/forgot-password', 
    element: <ForgotPassword/>
  },
  { 
    path: '/reset-password/:token',
     element: <ResetPassword/> 
    },

  { path: '/register', 
    element: <Signup/>
   },
   { path: '/service', 
    element: <ServicePage/>
   },
   { path: '/service/student', 
    element: <StudentForm/>
   },
   { path: '/service/student/preview', 
    element: <PreviewPage/>
   },
   { path: '/service/student/previewats', 
    element: <PreviewPageAts/>
   },
   
   
   { path: '/newsfeed', 
    element: <NewsFeed/>
   },
   { path: '/library', 
    element: <Library/>
   },
   { path: '/jobs', 
    element: <Jobs/>
   },
   { path: '/description/:id', 
    element: <JobDescription/>
   },
   { path: '/browse', 
    element: <Browse/>
   },
   { path: '/profile', 
    element: <Profile/>
   },
   { path: '/sunny', 
    element: <Sunny/>
   },
   { path: '/lostnfound', 
    element: <LostItem/>
   },

   { path: '/admin/companies', 
    element: <Companies/>
   },
   
   
  ])

function App() {
  

  return (
    <>
    <RouterProvider router={approuter}/>
    
    </>
     
  )
}

export default App
