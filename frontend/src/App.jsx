
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
import { LibrarySquareIcon } from 'lucide-react'
import Libray from './components/Libray'




const approuter = createBrowserRouter([
  { path: '/',
    element: <Home/>
   },
  { path: '/login', 
    element: <Login/>
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
   { path: '/newsfeed', 
    element: <NewsFeed/>
   },
   { path: '/libray', 
    element: <Libray/>
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
