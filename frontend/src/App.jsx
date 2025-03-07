
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
import Apply from './components/exam/Apply'
import Results from './components/exam/result/Results'
import StudyCenter from './components/exam/studyCenter'
import AdmitCard from './components/exam/AdmitCard'
import Smriti from './components/library/studentLib/smritilib/Smriti'
import Full from './components/library/studentLib/full/Full'
import DietChart from './components/diet/dietchart/DietChart'
import Placement from './components/placement/Placementdash/Placement'
import Opportunity from './components/placement/opportunity/Opportunity'
import Selfrating from './components/placement/selfrating/Selfrating'
import Resume from './components/placement/Resume/Resume'
import Profiles from './components/Profilesmain'
import Enquiryplace from './components/placement/enquiry/Enquiryplace'
import ApplyPlac from './components/placement/applyplac/ApplyPlace'
import ResopsePlace from './components/placement/respose/Responseplac'
import ResumeList from './components/placement/Resume/ResumeList'
import Company from './components/admin/company/Company'
import Comapnydashboard from './components/admin/company/Comapnydashboard'
import Companyplacement from './components/admin/company/compayplacement/Companyplacement'
import Gymdashboard from './components/gym/gymdashboard/Gymdashboard'
import Bills from './components/gym/bills/Bills'
import Trainingdashboard from './components/gym/vayayam/training/trainingdashboard/Trainingdashboard'
import GymAttendence from './components/gym/attendence/GymAttendence'
import BarbarDashboard from './components/barber/barbardashboard/BarbarDashboard'
import BarberAttendence from './components/barber/baberattendence/attendence/Barber/BarberAttendence'
import AharDashboard from './components/ahar/barber/AharDashboard/AharDashboard'
import Bills from './components/ahar/barber/aharaccount/bills/Bills'
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
  
  { path: '/library/smriti', 
   element: <Smriti/>
  },
  { path: '/library/full', 
   element: <Full/>
  },
  { path: '/diet', 
   element: <DietChart/>
  },
  { path: '/placement', 
   element: <Placement/>
  },
  { path: '/placement/opportunity', 
   element: <Opportunity/>
  },
  { path: '/placement/opportunity/enquiry', 
   element: <Enquiryplace/>
  },
  { path: '/placement/opportunity/apply', 
   element: <ApplyPlac/>
  },
  { path: '/placement/opportunity/response', 
   element: <ResopsePlace/>
  },
  { path: '/placement/resume', 
   element: <Resume/>
  },
  { path: '/placement/selfrating', 
   element: <Selfrating/>
  },
  { path: '/placement/resume/saved', 
   element: <ResumeList/>
  },
  { path: 'Sunnyairesume', 
   element: <StudentForm/>
  },
  { path: '/placement/selfrating', 
   element: <Selfrating/>
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
  { path: '/service/exam/apply', 
    element: <Apply/>
   },
  { path: '/service/exam/result', 
    element: <Results/>
   },
  { path: '/service/exam/studycenter', 
    element: <StudyCenter/>
   },
  { path: '/service/exam/admitcard', 
    element: <AdmitCard/>
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
   { path: '/profiles', 
    element: <Profiles/>
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
   { path: '/compan', 
    element: <Company/>
   },
   { path: '/company', 
    element: <Comapnydashboard/>
   },
   { path: '/company/placement', 
    element: <Companyplacement/>
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
   { path: '/gym', 
    element: <Gymdashboard/>
   },
   { path: '/gym/bills', 
    element: <Bills/>
   },
   { path: '/gym/attendence', 
    element: <GymAttendence/>
   },
   
   { path: '/gym/vayayam/training', 
    element: <Trainingdashboard />
   },
   { path: '/barber', 
    element: <BarbarDashboard />
   },
   { path: '/barber/attendence', 
    element: <BarberAttendence />
   },
   { path: '/ahar', 
    element: <AharDashboard/>
   },
   { path: '/ahar/bill', 
    element: <Bills/>
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
