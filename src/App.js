import logo from './logo.svg';
import './App.css';

//import AllEmployees from './components/allEmployee';
import AddEmployee from './components/addEmployee';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DeleteEmployee from './components/deleteEmployee';
import AllEmployees from './components/allEmployee';
import EmployeeDetails from './components/employeeDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllEmployees />} />
        <Route path="/AllEmployees" element={<AllEmployees />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/EditEmployee" element={<AddEmployee />} />
        <Route path="/DeleteEmployee" element={<DeleteEmployee />} />
        <Route path="/EmployeeDetails" element={<EmployeeDetails />} />

        
      </Routes>
    </div>
  );
}

export default App;
