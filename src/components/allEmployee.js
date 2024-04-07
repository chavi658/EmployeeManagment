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
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import GetAppIcon from '@mui/icons-material/GetApp';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import styled from 'styled-components';
import { alpha, styled as muiStyled } from '@mui/material/styles';
import React from 'react';
import * as XLSX from 'xlsx';
import { useState } from 'react';

const StyledIconButton = muiStyled('button')(({ theme }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1), // Set background color on hover
  },
}));

const StyledIcon = styled.span`
  font-size: 1.5em;
`;

const TableWrapper = styled.div`
  width: 80%;
  margin: auto;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Search = muiStyled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '80%',
  border: '2px solid', // Added border with 2px width
  borderColor: theme.palette.primary.main, // Set border color to primary color
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const exportToExcel = (employees) => {
  // Create data array to represent Excel file
  const data = employees.map(employee => ({
    'First Name': employee.firstName,
    'Last Name': employee.lastName,
    'Employee ID': employee.employeeId,
    'Date of Starting Work': employee.dateOfStartingWork,
  }));

  // Create new workbook
  const workbook = XLSX.utils.book_new();

  // Create new worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

  // Create Excel file in XLSX format
  XLSX.writeFile(workbook, 'employees.xlsx');
};

const AllEmployees = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const employees = useSelector(state => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [filteredEmployees,setfilteredEmployees]=useState([]);
  React.useEffect(() => {
    axios.get("https://localhost:7094/api/Employee")
      .then(response => {
        console.log("Response data:", response.data);
        dispatch({ type: 'SET_EMPLOYEES', data: response.data });
        setfilteredEmployees(response.data)

      })
      .catch(err => console.log(err));
  }, [dispatch]);

  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    filteredEmployees1(searchTerm);
  };

  const handleDelete = employeeToDelete => {
    console.log('Deleting employee:', employeeToDelete);
    navigate("/DeleteEmployee", { state: employeeToDelete });
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
    exportToExcel(filteredEmployees);
  };
const filteredEmployees1=(searchTerm)=>{
  setfilteredEmployees([])
 setfilteredEmployees(employees.filter(employee =>

  {
 for( const key in employee)
 if( typeof employee[key] === 'string' &&
      employee[key].toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
  }
    ))
}

  return (
    <div className="employee-list">
      <div className="actions">
        <StyledIconButton variant="contained" onClick={handleAdd}><StyledIcon><FaPlus /></StyledIcon> ADD EMPLOYEE</StyledIconButton>
      </div>
      <div className="export">
        <StyledIconButton variant="contained" onClick={handleExport}><StyledIcon><GetAppIcon /></StyledIcon> DOWNLOADS TO EXCEL FILE</StyledIconButton>
      </div>
      <SearchContainer>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearch}
          />
        </Search>
      </SearchContainer>
      <TableWrapper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>Employee Number</TableCell> */}
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Date of Starting Work</TableCell>
                <TableCell><StyledIcon><RiPencilLine /></StyledIcon></TableCell>
                <TableCell><StyledIcon><RiDeleteBin6Line /></StyledIcon></TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map(employee => (
                <TableRow key={employee?.employeeId}>
                  <TableCell>{employee?.firstName}</TableCell>
                  <TableCell>{employee?.lastName}</TableCell>
                  <TableCell>{employee?.employeeId}</TableCell>
                  <TableCell>{employee?.dateOfStartingWork}</TableCell>
                  <TableCell>
                    <StyledIconButton onClick={() => handleEdit(employee)}><StyledIcon><RiPencilLine /></StyledIcon></StyledIconButton>
                  </TableCell>
                  <TableCell>
                    <StyledIconButton onClick={() => handleDelete(employee)}><StyledIcon><RiDeleteBin6Line /></StyledIcon></StyledIconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </div>
  );
};

export default AllEmployees;

                 


