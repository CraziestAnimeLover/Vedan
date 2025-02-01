
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
import PreviewPageAts from './components/auth/resume/PreviewPageAts'
import Select from './components/auth/Select'

import AddLibraryForm from './components/auth/AddLibraryForm'
import MgtLibServicePage from './components/Pages/MgtLibServicePage'
import MgtSidebarLayout from './components/library/libraryadmin/MgtSidebarLayout'
import Billing from './components/library/billing/Billing'
import SeatChart from './components/library/seat/SeatChart'
import Attendance from './components/library/attendence/Attendance'
import Selects from './components/auth/Selects'
import ContactUs from './components/ContactUs'
import SocialServicePage from './components/Pages/SocialServicePage'
import Account from './components/library/account/Account'
import Libshell from './components/library/bookshell/Libshell'
import BookList from './components/library/bookshell/books/BookList'
import LibraryProfile from './components/library/profile/libmgtprofile/LibraryProfile'
import LoanBook from './components/library/bookloan/LoanBook'
import FakeTicketEnquiry from './components/library/enquiry/FakeTicketEnquiry'
import Shells from './components/library/bookshell/books/Shells'
import Events from './components/events/Events'
import Competition from './components/activity/competition/Competition'
import Esports from './components/activity/esports/Esports'
import Sports from './components/activity/sports/Sports'
import Testseries from './components/exam/testseries/Testseries'
import ScholarShip from './components/exam/scholarship/ScholarShip'
// import EnquiryCard from './components/library/enquiry/Enquiry'

// import BookListSection from './components/library/bookshell/books/BookListSection'












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
   { path: '/select', 
    element: <Select/>
   },
   { path: '/mgtservice', 
    element: <MgtLibServicePage/>
  },
  { path: '/mgtservice/selects', 
    element: <Selects/>
  },
 
  { path: '/mgtservice/mgtlibrary', 
    element: <MgtSidebarLayout/>
  },
  { path: '/mgtservice/mgtlibrary/profile', 
    element: <LibraryProfile/>
  },
  { path: '/mgtservice/mgtlibrary/billing', 
    element: <Billing/>
  },
  { path: '/mgtservice/mgtlibrary/seat', 
    element: <SeatChart/>
  },
  { path: '/mgtservice/mgtlibrary/attendence', 
    element: <Attendance/>
  },
  { path: '/mgtservice/mgtlibrary/account', 
    element: <Account/>
  },
  { path: '/mgtservice/mgtlibrary/books', 
    element: <Libshell/>
  },
  { path: '/mgtservice/mgtlibrary/bookloan', 
    element: <LoanBook/>
  },
  {
    path: "/mgtservice/mgtlibrary/bookshells",
    element: <Shells/>, // Pass filteredBooks as state or use context here
  },
  {
    path: "/mgtservice/mgtlibrary/enquiry",
    element: <FakeTicketEnquiry/>, // Pass filteredBooks as state or use context here
  },
  
  { path: '/service', 
   element: <ServicePage/>
  },
  { path: '/service/activity/sports', 
   element: <Sports/>
  },
  { path: '/service/activity/esports', 
   element: <Esports/>
  },
  { path: '/service/activity/compition', 
   element: <Competition/>
  },
  { path: '/service/exam/testseries', 
   element: <Testseries/>
  },
  { path: '/service/exam/scholarship', 
   element: <ScholarShip/>
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
   { path: '/library/dashboard', 
    element: <AddLibraryForm/>
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
  //  { path: '/game', 
  //   element: <ChessGame/>
  //  },
   { path: '/profile', 
    element: <Profile/>
   },
   { path: '/contactus', 
    element: <ContactUs/>
   },
   { path: '/sunny', 
    element: <Sunny/>
   },
   { path: '/social', 
    element: <SocialServicePage/>
   },
   { path: '/social/events', 
    element: <Events/>
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
