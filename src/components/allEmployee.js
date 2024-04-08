
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
// import { FaPlus } from 'react-icons/fa';
// import GetAppIcon from '@mui/icons-material/GetApp';
// import SearchIcon from '@mui/icons-material/Search';
// import React from 'react';
// import { getEmpployeesDispatch } from '../server/employee';
// import { Search, SearchContainer, SearchIconWrapper, StyledIcon, StyledIconButton, StyledInputBase, TableWrapper } from './allEmployee.muiStyle';
// import { exportToExcel } from '../server/excel';


// const AllEmployees = () => {
//   const [searchTerm, setSearchTerm] = React.useState('');
//   const filteredEmployees = useSelector(state => state.employees);
//   // const filteredEmployees = useSelector(state => state.employees.filter(employee => employee.isActivate === true));

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   React.useEffect(() => {
//     dispatch(getEmpployeesDispatch())
//   }, [dispatch]);






//   const handleDelete = employeeToDelete => {
//     console.log('Deleting employee:', employeeToDelete);
//     navigate("/DeleteEmployee", { state: employeeToDelete });
//   };

//   const handleEdit = employee => {
//     dispatch({ type: 'SET_EMPLOYEE', employee });
//     console.log(employee);
//     navigate("/EditEmployee");
//   };

//   const handleAdd = () => {
//     navigate('/AddEmployee');
//   };

//   const handleExport = () => {
//     console.log('Exporting employee list to Excel');
//     exportToExcel(filteredEmployees);
//   };


//   return (
//     <div className="employee-list">
//       <div className="actions">
//         <StyledIconButton variant="contained" onClick={handleAdd}><StyledIcon><FaPlus /></StyledIcon> ADD EMPLOYEE</StyledIconButton>
//       </div>
//       <div className="export">
//         <StyledIconButton variant="contained" onClick={handleExport}><StyledIcon><GetAppIcon /></StyledIcon> DOWNLOADS TO EXCEL FILE</StyledIconButton>
//       </div>
//       <SearchContainer>
//         <Search>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase
//             placeholder="Search…"
//             inputProps={{ 'aria-label': 'search' }}
//             onChange={({ target }) => setSearchTerm(target.value.toLowerCase())}
//           />
//         </Search>
//       </SearchContainer>
//       <TableWrapper>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {/* <TableCell>Employee Number</TableCell> */}
//                 <TableCell>First Name</TableCell>
//                 <TableCell>Last Name</TableCell>
//                 <TableCell>Employee ID</TableCell>
//                 <TableCell>Date of Starting Work</TableCell>
//                 <TableCell><StyledIcon><RiPencilLine /></StyledIcon></TableCell>
//                 <TableCell><StyledIcon><RiDeleteBin6Line /></StyledIcon></TableCell>


//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredEmployees.filter(x => !searchTerm || Object.values(x).indexOf(searchTerm)).map(employee => (
//                 <TableRow key={employee?.employeeId}>
//                   <TableCell>{employee?.firstName}</TableCell>
//                   <TableCell>{employee?.lastName}</TableCell>
//                   <TableCell>{employee?.employeeId}</TableCell>
//                   <TableCell>{employee?.dateOfStartingWork}</TableCell>
//                   <TableCell>
//                     <StyledIconButton onClick={() => handleEdit(employee)}><StyledIcon><RiPencilLine /></StyledIcon></StyledIconButton>
//                   </TableCell>
//                   <TableCell>
//                     <StyledIconButton onClick={() => handleDelete(employee)}><StyledIcon><RiDeleteBin6Line /></StyledIcon></StyledIconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </TableWrapper>
//     </div>
//   );
// };

// // export default AllEmployees;
// with changes work is activate
import React from 'react';
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
import { Search, SearchContainer, SearchIconWrapper, StyledIcon, StyledIconButton, StyledInputBase, TableWrapper } from './allEmployee.muiStyle';
import { getEmpployeesDispatch } from '../server/employee';
import { exportToExcel } from '../server/excel';

const AllEmployees = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch employees from Redux store and filter them
  const filteredEmployees = useSelector(state => state.employees.filter(employee => employee.isActivate === true));

  React.useEffect(() => {
    console.log("useeffect");
    dispatch(getEmpployeesDispatch());
  }, [dispatch]);

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
            onChange={({ target }) => setSearchTerm(target.value.toLowerCase())}
          />
        </Search>
      </SearchContainer>
      <TableWrapper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Date of Starting Work</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.filter(employee => !searchTerm ||
                Object.values(employee).some(value =>
                  String(value).toLowerCase().includes(searchTerm)
                )
              ).map(employee => (
                <TableRow key={employee?.employeeId}>
                  <TableCell>{employee?.firstName}</TableCell>
                  <TableCell>{employee?.lastName}</TableCell>
                  <TableCell>{employee?.employeeId}</TableCell>
                  <TableCell>{employee?.dateOfStartingWork}</TableCell>
                  <TableCell>
                    <StyledIconButton onClick={() => handleEdit(employee)}>
                      <StyledIcon><RiPencilLine /></StyledIcon>
                    </StyledIconButton>
                  </TableCell>
                  <TableCell>
                    <StyledIconButton onClick={() => handleDelete(employee)}>
                      <StyledIcon><RiDeleteBin6Line /></StyledIcon>
                    </StyledIconButton>
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
