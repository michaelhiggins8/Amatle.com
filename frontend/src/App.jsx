import {BrowserRouter,Route,Routes} from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import DocUpdate from "./components/DocUpdate/DocUpdate";
import MakeQuery from "./components/MakeQuery/MakeQuery";
import QueryCard from "./components/MakeQuery/QueryCard/QueryCard";
import Payment from "./components/Payment/Payment";
import CheckOut from "./components/Payment/CheckOut/CheckOut";
import EditMembers from "./components/EditMembers/EditMembers";
import EditProfile from "./components/EditProfile/EditProfile";
import BulkUpload from "./components/EditMembers/BulkUpload/BulkUpload";
import MembersDashboard from "./components/EditMembers/EditMembersCenterCard/MembersDashboard/MembersDashboard";
import BulkUploadStepOne from "./components/EditMembers/BulkUpload/BulkUploadStepOne/BulkUploadStepOne";
import BulkUploadStepTwo from "./components/EditMembers/BulkUpload/BulkUploadStepTwo/BulkUploadStepTwo";
import BulkUploadReference from "./components/DocUpdate/DocUpdateOptions/BulkUploadReference/BulkUploadReference";
import ManageDocuments from "./components/DocUpdate/DocUpdateOptions/ManageDocuments/ManageDocuments";
import CreatePassword from "./components/Profile/CreatePassword/CreatePassword";
import AboutUs from "./components/Home/Footer/AboutUs";

function App() {

  return (
    <>
      
    <BrowserRouter>
    <NavBar/>
      <div className="body-content">
        <Routes>
          <Route path = "/" element=<Home/>/>
          <Route path = "/sign_up" element = <SignUp/>/>
          <Route path = "/log_in" element = <LogIn/>/>
          <Route path = "/doc_update" element=<DocUpdate/>/>
          <Route path = "/make_query" element = <QueryCard/>/>  
          <Route path = "payment" element = <Payment/>/>
          <Route path = "/payment/:plan" element = <CheckOut/>/>     
          <Route path = "/edit_profile" element = <EditProfile/>/> 
          <Route path = "/edit_members" element = <EditMembers/>/> 
          <Route path = "/bulk_upload" element = <BulkUpload/>/> 
          <Route path = "/bulk_upload/step_1" element = <BulkUploadStepOne/>/> 
          <Route path = "/bulk_upload/step_2" element = <BulkUploadStepTwo/>/> 
          <Route path = "/members_dashboard" element = <MembersDashboard/>/> 
          <Route path = "/upload_docs" element = <BulkUploadReference/>/> 
          <Route path = "/documents_dashboard" element = <ManageDocuments/>/> 
          <Route path = "/create_Password" element = <CreatePassword/>/> 
          <Route path = "/about" element = <AboutUs/>/>

        </Routes>
      </div>
    
    </BrowserRouter>


    </>
  )
}

export default App
