// //basic without design
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom"
// const AllEmployees = () => {
//   const employees = useSelector(state => state.employees); // שינוי כאן ל-namel employees
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("https://localhost:7094/api/Employee")
//       .then(response => {
//         console.log("Response data:", response.data);
//         dispatch({ type: 'SET_EMPLOYEES', data: response.data });
//       })
//       .catch(err => console.log(err));
//   }, [dispatch]); // שינוי כאן, הוספת dispatch לתלות של useEffect
//   const nav = () => {
//     navigate("/AddEmployee");
//   }
//   const navigateToDelete=(employeeToDelete)=>{
//     navigate("/DeleteEmployee", { state: employeeToDelete })
//   }
//   return (
//     <div>
//       <h1>Employees:</h1>
//       {employees?.map((employee) => (
//         <div key={employee.employeeId}>
//           <p>{employee.IsActivatefirstName}</p>
//           <p> {employee?.lastName}</p>
//           <p>{employee?.employeeId}</p>
//           <p>{employee?.dateOfStartingWork}</p>
//           <button onClick={()=>navigateToDelete(employee)}>Delete Employee</button>
//           <button onClick={()=>navigate("/EditEmployee")}>Edit Employee</button>

//         </div>
//       ))}
//       <button onClick={() => nav()}>Add Employee</button>
//     </div>
//   );
// }
// export default AllEmployees;

//basic design
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
//  import '../styleSheets/deleteEmployee.css';
// const AllEmployees = () => {
//   const employees = useSelector(state => state.employees);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("https://localhost:7094/api/Employee")
//       .then(response => {
//         console.log("Response data:", response.data);
//         dispatch({ type: 'SET_EMPLOYEES', data: response.data });
//       })
//       .catch(err => console.log(err));
//   }, [dispatch]);

//   const nav = () => {
//     navigate("/AddEmployee");
//   }

//   const navigateToDelete = (employeeToDelete) => {
//     navigate("/DeleteEmployee", { state: employeeToDelete })
//   }

//   return (
//     <div>
//       <h1>Employees:</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Employee ID</th>
//             <th>Date of Starting Work</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
        
//           {employees?.map((employee) => (
//             <tr key={employee.employeeId}>
//               <td>{employee.firstName}</td>
//               <td>{employee.lastName}</td>
//               <td>{employee.employeeId}</td>
//               <td>{employee.dateOfStartingWork}</td>
//               <td>
//                 <button onClick={() => navigateToDelete(employee)}>Delete Employee</button>
//                 <button onClick={() => navigate("/EditEmployee")}>Edit Employee</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={nav}>Add Employee</button>
//     </div>
//   );
// }

// export default AllEmployees;
//with filter
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import '../styleSheets/deleteEmployee.css';

// const AllEmployees = () => {
//   const employees = useSelector(state => state.employees);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("https://localhost:7094/api/Employee")
//       .then(response => {
//         console.log("Response data:", response.data);
//         dispatch({ type: 'SET_EMPLOYEES', data: response.data });
//       })
//       .catch(err => console.log(err));
//   }, [dispatch]);

//   const nav = () => {
//     navigate("/AddEmployee");
//   }

//   const navigateToDelete = (employeeToDelete) => {
//     navigate("/DeleteEmployee", { state: employeeToDelete })
//   }

//   const activatedEmployees = employees.filter(employee => employee.isActivate !== false);
// const edit=(employee)=>{

//   dispatch({ type: 'SET_EMPLOYEE', employee: employee});
//   console.log(employee);
//   navigate("/EditEmployee") 

// }
//   return (
//     <div>
//       <h1>Employees:</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Employee ID</th>
//             <th>Date of Starting Work</th>
//           </tr>
//         </thead>
//         <tbody>
//           {activatedEmployees?.map((employee) => (
//             <tr key={employee.employeeId}>
//               <td>{employee.firstName}</td>
//               <td>{employee.lastName}</td>
//               <td>{employee.employeeId}</td>
//               <td>{employee.dateOfStartingWork}</td>
//               <td>
//                 <button onClick={() => navigateToDelete(employee)}>Delete Employee</button>
//                 <button onClick={() =>edit(employee) }>Edit Employee</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={nav}>Add Employee</button>
//     </div>
//   );
// }
// export default AllEmployees;
//עם ייצוא קובץ וסינונים
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';

const AllEmployees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const employees = useSelector(state => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredResults = employees.filter(employee =>
      Object.values(employee).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredEmployees(filteredResults);
  };

  const handleDelete = employeeToDelete => {
    console.log('Deleting employee:', employeeToDelete);
    navigate("/DeleteEmployee", { state: employeeToDelete })
  };

  const handleEdit = employee => {
    dispatch({ type: 'SET_EMPLOYEE', employee });
    console.log(employee);
    navigate("/EditEmployee");
  };

  const handleAdd = () => {
    navigate('/AddEmployee');
  };

  const handleExport = () => {
    console.log('Exporting employee list to Excel');
    // Implement export logic here
  };

  return (
    <div className="employee-list">
      <h1>Employees:</h1>
      <div className="actions">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleAdd}><FaPlus /> Add Employee</button>
        <button onClick={handleExport}>Export to Excel</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
            <th>Date of Starting Work</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee?.employeeId}>
              <td>{employee?.firstName}</td>
              <td>{employee?.lastName}</td>
              <td>{employee?.employeeId}</td>
              <td>{employee?.dateOfStartingWork}</td>
              <td>
                <button onClick={() => handleDelete(employee)}>
                  <RiDeleteBin6Line /> Delete
                </button>
                <button onClick={() => handleEdit(employee)}>
                  <RiPencilLine /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployees;
