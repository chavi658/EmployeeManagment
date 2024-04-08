import axios from "axios";

export const getEmpployee = () => {
    return axios.get("https://localhost:7094/api/Role")
}

export const getEmpployeesDispatch = () => {
    return dispatch => {
        axios.get("https://localhost:7094/api/Employee")
        .then(response => {
          console.log("Response data:", response.data);
          dispatch({ type: 'SET_EMPLOYEES', data: response.data });
  
        })
        .catch(err => console.log(err));
    }
}
export const putEmployee=(id,data)=>
{
    axios.put(`https://localhost:7094/api/Employee/${id}`, data)
}
export const postEmployee=(data)=>
{
    axios.post("https://localhost:7094/api/Employee", data)
}