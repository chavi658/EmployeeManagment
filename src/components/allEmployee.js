
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
import { FaInfo, FaPlus, FaUserEdit } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchContainer, SearchIconWrapper, StyledIcon, StyledIconButton, StyledInputBase, TableWrapper, styles } from './allEmployee.muiStyle';
import { getEmpployeesDispatch } from '../server/employee';
import { exportToExcel } from '../server/excel';
import NavBar from './navBar';
// import NavBar from './header';

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
  const parseDate = (date) => {

    if (date) {
      const parsedDate = new Date(date);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');

      return `${day}/${month}/${year}`;
    }
    return '';
  };
  const handleDelete = employeeToDelete => {
    console.log('Deleting employee:', employeeToDelete);
    navigate("/DeleteEmployee", { state: employeeToDelete });
  };
  const handleDetails = employee => {
    console.log('Details employee:', employee);
    dispatch({ type: 'SET_EMPLOYEE', employee });
    navigate("/EmployeeDetails");
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
    <>

      <style>{styles}</style>
      <NavBar onAdd={handleAdd} onExport={handleExport} /> {/* מעבר של הפונקציות handleAdd ו־handleExport לקומפוננטת ה־NavBar */}
      <div className="employee-list">
        {/* <div className="actions">
          <StyledIconButton variant="contained" onClick={handleAdd}><StyledIcon><FaPlus /></StyledIcon> ADD EMPLOYEE</StyledIconButton>
        </div>
        <div className="export">
          <StyledIconButton variant="contained" onClick={handleExport}><StyledIcon><GetAppIcon /></StyledIcon> DOWNLOADS TO EXCEL FILE</StyledIconButton>
        </div> */}

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
                {/* <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Date of Starting Work</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Details</TableCell>

              </TableRow> */}
                <TableCell className="table-header-cell">First Name</TableCell>
                <TableCell className="table-header-cell">Last Name</TableCell>
                <TableCell className="table-header-cell">Employee ID</TableCell>
                <TableCell className="table-header-cell">Date of Starting Work</TableCell>
                <TableCell className="table-header-cell">Edit</TableCell>
                <TableCell className="table-header-cell">Delete</TableCell>
                <TableCell className="table-header-cell">Details</TableCell>

              </TableHead>
              <TableBody>
                {/* {filteredEmployees.filter(employee => !searchTerm ||
                  Object.values(employee).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                  ) */}
                {filteredEmployees.filter(employee => !searchTerm||
                  Object.values(employee).some(value =>
                    (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (value instanceof Date && value.toLocaleDateString().includes(searchTerm))
                  )
                // })
                ).map(employee => (
                <TableRow key={employee?.employeeId}>
                  <TableCell>{employee?.firstName}</TableCell>
                  <TableCell>{employee?.lastName}</TableCell>
                  <TableCell>{employee?.employeeId}</TableCell>
                  <TableCell>{parseDate(employee?.dateOfStartingWork)}</TableCell>
                  <TableCell>
                    <StyledIconButton style={{ color: '#1565c0' }} onClick={() => handleEdit(employee)}>
                      <StyledIcon><EditIcon /></StyledIcon>
                    </StyledIconButton>
                  </TableCell>
                  <TableCell>
                    <StyledIconButton style={{ color: '#1565c0' }} onClick={() => handleDelete(employee)}>
                      <StyledIcon><DeleteIcon /></StyledIcon>
                    </StyledIconButton>
                  </TableCell>
                  <TableCell>
                    <StyledIconButton style={{ color: '#1565c0' }} onClick={() => handleDetails(employee)}>
                      <StyledIcon><FaUserEdit /> </StyledIcon>
                    </StyledIconButton>
                  </TableCell>
                </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </div>
    </>
  );
};

export default AllEmployees;