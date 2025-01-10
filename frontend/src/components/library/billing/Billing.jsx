import React from 'react'
import MembershipPlan from './membership/MembershipPlan'
import FeeStructure from './Feestruct/FeeStructure'
import Navbar from '../../shared/Navbar'
import ServiceTypeSelection from './ServiceTypeSelection'
import LibraryFeeStructure from './Feestruct/LibraryFeeStructure'
import InputForm from './Feestruct/InputForm'
import Account from '../account/Account'

const Billing = () => {
  return (
    <div>
       <Navbar/>
<div>
    {/* <MembershipPlan/> */}

</div>
<div>
    {/* <FeeStructure/> */}
</div>
{/* <ServiceTypeSelection/> */}
<InputForm/>
<div>
  <LibraryFeeStructure/>
  <Account/>
</div>

    </div>
  )
}

export default Billing