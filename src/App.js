import logo from './logo.svg';
import './App.css';
import EmployeeList from './components/allEmployee';
import AllEmployees from './components/allEmployee';
import EditEmployee from './components/editEmployee';
import AddEmployee from './components/addEmployee';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DeleteEmployee from './components/deleteEmployee';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllEmployees />} />
        <Route path="/AllEmployees" element={<AllEmployees />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/EditEmployee" element={<AddEmployee />} />
        <Route path="/DeleteEmployee" element={<DeleteEmployee />} />

      </Routes>
    </div>
  );
}

export default App;
