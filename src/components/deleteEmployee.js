// import { useLocation } from "react-router-dom"
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import {useEffect} from "react"
// import Swal from "sweetalert2";

// const DeleteEmployee=()=>{
//     const dispatch = useDispatch();
//     const {state}=useLocation();
//     useEffect(()=>{
//         console.log("choosenEmployee",state.id)
//         axios.delete(`https://localhost:7094/api/Employee/${state.id}`)
//         .then(x => {
//             console.log("delete",x.data)
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title:  `The employee ${state.firstName} was deleted `  ,
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//           })
//           .catch(err => console.log(err))
//           .finally()
//     },[])

// }
// export default DeleteEmployee;
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import Swal from "sweetalert2";

const DeleteEmployee = () => {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const navigate=useNavigate();
    useEffect(() => {
        console.log("choosenEmployee", state.id)
        axios.delete(`https://localhost:7094/api/Employee/${state.id}`)
            .then(x => {
                console.log("delete", x.data)
                Swal.fire({
                    position: 'center',
                    icon: "success",
                    title: `The employee ${state.firstName} was deleted `,
                    showConfirmButton: false,
                    timer: 1500
                });
            navigate("/AllEmployees")
            })
            .catch(err => console.log(err))
            .finally()
    }, [])

}
export default DeleteEmployee;

