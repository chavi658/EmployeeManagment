import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const EmployeeDetails=()=>{
const employee =useSelector(state=>state.employee)
console.log("demp",employee);
return(
<>
<div>
employeeId:
<h3>{employee?.employeeId}</h3>
employeeFirstName:
<h3>{employee?.firstName}</h3>
employeeLastName:
<h3>{employee?.lastName}</h3>
DateOfBirth:
<h3>{employee?.dateOfBirth}</h3>
Gender:
<h3>{employee?.gender}</h3>
Roles:
{employee?.roleList?.map(role=><h3>
    DataEntery:
    {role.dateOfRoleEntry} <br>
    </br>
    RoleName:
    {role.roleName}
</h3> )
}
</div>
</>
);
}
export default EmployeeDetails;