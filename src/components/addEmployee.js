//basic
// import React, { useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { log } from "util";

// const schema = yup.object({
//   firstName: yup.string().required(),
//   lastName: yup.string().required(),
//   employeeId: yup.number().positive().integer().required(),
//   dateOfStartingWork: yup
//     .date()
//     .min(yup.ref("birthDate"), "Date must be after birth date")
//     .required(),
//   birthDate: yup.date().required(),
//   gender: yup.string().required(),
//   roles: yup.array().of(
//     yup.object({
//       roleName: yup.string().required(),
//       isManagement: yup.boolean().required(),
//       startDate: yup
//         .date()
//         .min(yup.ref("dateOfStartingWork"), "Date must be after start date")
//         .required()
//     })
//   )
// });

// export default function AddEmployee() {
//   const employeeData = useSelector(state => state.employee);
//  console.log();
//  const parseDate = (date) => {

//   if (date) {
//       const parsedDate = new Date(date);
//       const year = parsedDate.getFullYear();
//       const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
//       const day = String(parsedDate.getDate()).padStart(2, '0');

//       return `${year}-${month}-${day}`;
//   }
//   return '';
// };
//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue
//   } = useForm({
//     resolver: yupResolver(schema)
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: control,
//     name: "roles"
//   });

//   useEffect(() => {
//     console.log(employeeData);
//     if (employeeData) {
//       setValue("firstName", employeeData?.firstName);
//       setValue("lastName", employeeData?.lastName);
//       setValue("employeeId", employeeData?.employeeId);
//       setValue("gender", employeeData?.gender);

//       employeeData?.roles?.forEach((role, index) => {
//         const fields = control.fields.roles;
//         if (!fields.length || fields.length <= index) {
//           append({}); // Add fields if needed
//         }
//         setValue(`roles?.${index}.roleName`, role?.roleName);
//         setValue(`roles?.${index}.isManagement`, role?.isManagement);
//         setValue(`roles?.${index}.startDate`, role?.startDate);
//       });
//     }
//   }, [employeeData, setValue, control, append]);

//   const onSubmit = (data) => {
//     const requestData = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       gender: Number(data.gender),
//       dateOfStart: data.dateOfStartingWork,
//       dateOfBirth: data.DateOfBirth,
//       roles: data.roles,
//   };
//     alert("hi submit component")
//     if (employeeData) {
//       console.log("edit", employeeData.employeeId);
//       axios.put(`https://localhost:7094/api/Employee/${employeeData.employeeId}`, requestData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => console.error(error));
//     } else {
//       console.log("add");
//       axios.post("https://localhost:7094/api/Employee", requestData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => console.error(error));

//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>firstName</label>
//       <input defaultValue={employeeData?.firstName}{...register("firstName")} />
//       <p>{errors.firstName?.message}</p>
//       <label>lastName</label>
//       <input {...register("lastName")} />
//       <p>{errors.lastName?.message}</p>
//       <label>employeeId</label>
//       <input {...register("employeeId")} />
//       <p>{errors.employeeId?.message}</p>
//       <label>dateOfStartingWork</label>
//       <input type="date" defaultValue={parseDate(employeeData?.dateOfStartingWork)} {...register("dateOfStartingWork")} />
//       <p>{errors.dateOfStartingWork?.message}</p>
//       <label>birthDate</label>
//       <input type="date" defaultValue={parseDate(employeeData?.dateOfBirth)} {...register("DateOfBirth")} />
//       <p>{errors.birthDate?.message}</p>
//       <select {...register("gender")}>
//         <option value="">Select gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>
//       <p>{errors.gender?.message}</p>

//       {/* Roles */}
//       <button
//         type="button"
//         onClick={() => {
//           append({});
//         }}
//       >
//         Add Role
//       </button>
//       {fields?.map((field, index) => (
//         <div key={field.id}>
//           <input {...register(`roles?.${index}.roleName`)} />
//           <label>is manager</label>
//           <input type="checkbox" {...register(`roles?.${index}.isManagement`)} />
//           <input type="date" {...register(`roles?.${index}.startDate`)} />
//           <button type="button" onClick={() => remove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}<input onClick={onSubmit} type="submit" value={"submit"}/>

//     </form>
//   );
// }
//basic &icons
// import React, { useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import CakeIcon from "@mui/icons-material/Cake";
// import WcIcon from "@mui/icons-material/Wc";
// import PeopleIcon from "@mui/icons-material/People";
// import EventIcon from "@mui/icons-material/Event";

// const schema = yup.object({
//   firstName: yup.string().required(),
//   lastName: yup.string().required(),
//   employeeId: yup.number().positive().integer().required(),
//   dateOfStartingWork: yup
//     .date()
//     .min(yup.ref("birthDate"), "Date must be after birth date")
//     .required(),
//   birthDate: yup.date().required(),
//   gender: yup.string().required(),
//   roles: yup.array().of(
//     yup.object({
//       roleName: yup.string().required(),
//       isManagement: yup.boolean().required(),
//       startDate: yup
//         .date()
//         .min(yup.ref("dateOfStartingWork"), "Date must be after start date")
//         .required()
//     })
//   )
// });

// export default function AddEmployee() {
//   const employeeData = useSelector(state => state.employee);

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue
//   } = useForm({
//     resolver: yupResolver(schema)
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: control,
//     name: "roles"
//   });

//   useEffect(() => {
//     if (employeeData) {
//       setValue("firstName", employeeData?.firstName);
//       setValue("lastName", employeeData?.lastName);
//       setValue("employeeId", employeeData?.employeeId);
//       setValue("gender", employeeData?.gender);

//       employeeData?.roles?.forEach((role, index) => {
//         const fields = control.fields.roles;
//         if (!fields.length || fields.length <= index) {
//           append({}); // Add fields if needed
//         }
//         setValue(`roles?.${index}.roleName`, role?.roleName);
//         setValue(`roles?.${index}.isManagement`, role?.isManagement);
//         setValue(`roles?.${index}.startDate`, role?.startDate);
//       });
//     }
//   }, [employeeData, setValue, control, append]);

//   const onSubmit = (data) => {
//     const requestData = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       gender: Number(data.gender),
//       dateOfStart: data.dateOfStartingWork,
//       dateOfBirth: data.DateOfBirth,
//       roles: data.roles,
//   };
//     alert("hi submit component")
//     if (employeeData) {
//       axios.put(`https://localhost:7094/api/Employee/${employeeData.employeeId}`, requestData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => console.error(error));
//     } else {
//       axios.post("https://localhost:7094/api/Employee", requestData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => console.error(error));
//     }
//   }

//   return (
//     <Paper elevation={3} style={{ padding: "20px" }}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
//           <Grid container spacing={2} direction="column">
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.firstName}
//                     id="firstName"
//                     label="First Name"
//                     helperText={errors.firstName?.message}
//                     defaultValue={employeeData?.firstName}
//                     {...register("firstName")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <AccountCircleIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.lastName}
//                     id="lastName"
//                     label="Last Name"
//                     helperText={errors.lastName?.message}
//                     defaultValue={employeeData?.lastName}
//                     {...register("lastName")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <AccountCircleIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.employeeId}
//                     id="employeeId"
//                     label="Employee ID"
//                     helperText={errors.employeeId?.message}
//                     defaultValue={employeeData?.employeeId}
//                     {...register("employeeId")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <WorkOutlineIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.dateOfStartingWork}
//                     id="dateOfStartingWork"
//                     label="Date of Starting Work"
//                     helperText={errors.dateOfStartingWork?.message}
//                     defaultValue={employeeData?.dateOfStartingWork}
//                     {...register("dateOfStartingWork")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <EventIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.DateOfBirth}
//                     id="DateOfBirth"
//                     label="Birth Date"
//                     helperText={errors.DateOfBirth?.message}
//                     defaultValue={employeeData?.DateOfBirth}
//                     {...register("DateOfBirth")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <CakeIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     select
//                     id="gender"
//                     label="Gender"
//                     helperText={errors.gender?.message}
//                     defaultValue={employeeData?.gender}
//                     {...register("gender")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <WcIcon color="action" />
//                       )
//                     }}
//                   >
//                     <option value="">Select gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </TextField>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item>
//             {/* Roles */}
//             <Button
//               type="button"
//               onClick={() => {
//                 append({});
//               }}
//             >
//               Add Role
//             </Button>
//             {fields?.map((field, index) => (
//               <Paper key={field.id} elevation={1} style={{ padding: "10px", margin: "10px 0", width: "100%" }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       error={!!errors?.roles?.[index]?.roleName}
//                       id={`roleName_${index}`}
//                       label="Role Name"
//                       helperText={errors?.roles?.[index]?.roleName?.message}
//                       {...register(`roles.${index}.roleName`)}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           id={`isManagement_${index}`}
//                           {...register(`roles.${index}.isManagement`)}
//                           defaultChecked={employeeData?.roles?.[index]?.isManagement}
//                         />
//                       }
//                       label="Is Manager"
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       error={!!errors?.roles?.[index]?.startDate}
//                       id={`startDate_${index}`}
//                       label="Start Date"
//                       helperText={errors?.roles?.[index]?.startDate?.message}
//                       defaultValue={employeeData?.roles?.[index]?.startDate}
//                       {...register(`roles.${index}.startDate`)}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button type="button" onClick={() => remove(index)}>
//                       Remove
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             ))}
//           </Grid>
//         </Box>
//         <Button type="submit" variant="contained" color="primary">Submit</Button>
//       </form>
//     </Paper>
//   );
// }
//work icons
// import React, { useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import CakeIcon from "@mui/icons-material/Cake";
// import WcIcon from "@mui/icons-material/Wc";
// import PeopleIcon from "@mui/icons-material/People";
// import EventIcon from "@mui/icons-material/Event";
// import { useState } from "react";


// const schema = yup.object({
//   firstName: yup.string().required(),
//   lastName: yup.string().required(),
//   employeeId: yup.number().positive().integer().required(),
//   dateOfStartingWork: yup
//     .date()
//     // .min(yup.ref("birthDate"), "Date must be after birth date")
//     .required(),
//   birthDate: yup.date().required(),
//   gender: yup.string().required(),
//   roles: yup.array().of(
//     yup.object({
//       roleName: yup.string().required(),
//       isManagement: yup.boolean().required(),
//       startDate: yup
//         .date()
//         // .min(yup.ref("dateOfStartingWork"), "Date must be after start date")
//         .required()
//     })
//   )
// });

// export default function AddEmployee() {
//   const [rolesList, setRolesList] = useState([]);
//   const employeeData = useSelector(state => state.employee);
//   // const roules = useSelector(state => state.roules);

//   const parseDate = (date) => {

//     if (date) {
//       const parsedDate = new Date(date);
//       const year = parsedDate.getFullYear();
//       const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
//       const day = String(parsedDate.getDate()).padStart(2, '0');

//       return `${year}-${month}-${day}`;
//     }
//     return '';
//   };

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue
//   } = useForm({
//     resolver: yupResolver(schema)
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: control,
//     name: "roles"
//   });

//   useEffect(() => {
//     if (employeeData) {
//       setValue("firstName", employeeData?.firstName);
//       setValue("lastName", employeeData?.lastName);
//       setValue("employeeId", employeeData?.employeeId);
//       setValue("gender", employeeData?.gender);
//       console.log("gende", employeeData?.gender);
//       employeeData?.roles?.forEach((role, index) => {
//         const fields = control.fields.roles;
//         if (!fields.length || fields.length <= index) {
//           append({}); // Add fields if needed
//         }
//         setValue(`roles?.${index}.roleName`, role?.roleName);
//         setValue(`roles?.${index}.isManagement`, role?.isManagement);
//         setValue(`roles?.${index}.startDate`, role?.startDate);
//       });
//     }
//   }, [employeeData, setValue, control, append]);


//   useEffect(() => {
//     axios.get("https://localhost:7094/api/Role")
//       .then(response => {
//         setRolesList(response.data); // שמירת רשימת התפקידים בסטייט
//       })
//       .catch(error => console.error(error));
//   }, []);
//   const onSubmit = (data) => {
//     const requestData = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       gender: Number(data.gender),
//       dateOfStart: data.dateOfStartingWork,
//       dateOfBirth: data.DateOfBirth,
//       roles: data.roles,
//     };
//     alert("hi submit component")
//     if (employeeData) {
//       axios.put(`https://localhost:7094/api/Employee/${employeeData.employeeId}`, requestData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => console.error(error));
//     } else {
//       axios.post("https://localhost:7094/api/Employee", requestData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => console.error(error));
//     }
//   };

//   return (
//     <Paper elevation={3} style={{ padding: "20px" }}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
//           <Grid container spacing={2} direction="column">
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.firstName}
//                     id="firstName"
//                     label="First Name"
//                     helperText={errors.firstName?.message}
//                     defaultValue={employeeData?.firstName}
//                     {...register("firstName")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <AccountCircleIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.lastName}
//                     id="lastName"
//                     label="Last Name"
//                     helperText={errors.lastName?.message}
//                     defaultValue={employeeData?.lastName}
//                     {...register("lastName")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <AccountCircleIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.employeeId}
//                     id="employeeId"
//                     label="Employee ID"
//                     helperText={errors.employeeId?.message}
//                     defaultValue={employeeData?.employeeId}
//                     {...register("employeeId")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <WorkOutlineIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.dateOfStartingWork}
//                     id="dateOfStartingWork"
//                     label="Date of Starting Work"
//                     helperText={errors.dateOfStartingWork?.message}
//                     defaultValue={parseDate(employeeData?.dateOfStartingWork)}

//                     {...register("dateOfStartingWork")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <EventIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid> 
//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     error={!!errors.DateOfBirth}
//                     id="DateOfBirth"
//                     label="Birth Date"
//                     helperText={errors.DateOfBirth?.message}
//                     defaultValue={parseDate(employeeData?.dateOfBirth)}
//                     {...register("DateOfBirth")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <CakeIcon color="action" />
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid item>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     select
//                     id="gender"
//                     label="Gender"
//                     helperText={errors.gender?.message}
//                     // defaultValue={employeeData?.gender}
//                     defaultValue={
//                       employeeData?.gender !== undefined
//                         ? employeeData.gender === 0 ? "male" : "female"
//                         : ""
//                     }

//                     {...register("gender")}
//                     fullWidth
//                     InputProps={{
//                       startAdornment: (
//                         <WcIcon color="action" />
//                       )
//                     }}
//                   >
//                     <option value="">Select gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </TextField>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item>
//             {/* Roles */}
//             <Button
//               type="button"
//               onClick={() => {
//                 append({});
//               }}
//             >
//               Add Role
//             </Button>
//             {fields?.map((field, index) => (
//               <Paper key={field.id} elevation={1} style={{ padding: "10px", margin: "10px 0", width: "100%" }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       error={!!errors?.roles?.[index]?.roleName}
//                       id={`roleName_${index}`}
//                       label="Role Name"
//                       helperText={errors?.roles?.[index]?.roleName?.message}
//                       {...register(`roles.${index}.roleName`)}
//                       fullWidth
//                       InputProps={{
//                         startAdornment: (
//                           <PeopleIcon color="action" />
//                         )
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           id={`isManagement_${index}`}
//                           {...register(`roles.${index}.isManagement`)}
//                           defaultChecked={employeeData?.roles?.[index]?.isManagement}
//                         />
//                       }
//                       label="Is Manager"
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       error={!!errors?.roles?.[index]?.startDate}
//                       id={`startDate_${index}`}
//                       label="Start Date"
//                       helperText={errors?.roles?.[index]?.startDate?.message}
//                       defaultValue={employeeData?.roles?.[index]?.startDate}
//                       {...register(`roles.${index}.startDate`)}
//                       fullWidth
//                       InputProps={{
//                         startAdornment: (
//                           <EventIcon color="action" />
//                         )
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button type="button" onClick={() => remove(index)}>
//                       Remove
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             ))}
//           </Grid>
//         </Box>
//         {/* <Button type="submit" onClick={()=>onSubmit()} variant="contained" color="primary">Submit</Button> */}
//         <input onClick={onSubmit} type="submit" value={"submit"}/>
//       </form>
//     </Paper>
//   );
// }
//try
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  employeeId: yup.number().positive().integer().required(),
  dateOfStartingWork: yup
    .date()
    // .min(yup.ref("birthDate"), "Date must be after birth date")
    .required(),
  birthDate: yup.date().required(),
  gender: yup.string().required(),
  roles: yup.array().of(
    yup.object({
      roleName: yup.string().required(),
      isManagement: yup.boolean().required(),
      startDate: yup
        .date()
        // .min(yup.ref("dateOfStartingWork"), "Date must be after start date")
        .required()
    })
  )
});

export default function AddEmployee() {
  const [roleNames, setRoleNames] = useState([]);
  const employeeData = useSelector(state => state.employee);
  const parseDate = (date) => {

    if (date) {
      const parsedDate = new Date(date);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "roles"
  });

  useEffect(() => {
    if (employeeData) {
      setValue("firstName", employeeData?.firstName);
      setValue("lastName", employeeData?.lastName);
      setValue("employeeId", employeeData?.employeeId);
      setValue("gender", employeeData?.gender);
      console.log("gende", employeeData?.gender);
      employeeData?.roles?.forEach((role, index) => {
        const fields = control.fields.roles;
        if (!fields.length || fields.length <= index) {
          append({}); // Add fields if needed
        }
        setValue(`roles?.${index}.roleName`, role?.roleName);
        setValue(`roles?.${index}.isManagement`, role?.isManagement);
        setValue(`roles?.${index}.startDate`, role?.startDate);
      });
    }
  }, [employeeData, setValue, control, append]);


  useEffect(() => {
    console.log("hi");
    axios.get("https://localhost:7094/api/Role")
      .then(response => {
        const roleNames = new Set(); // יצירת Set ריקה לשמות התפקידים
        response?.data.forEach(role => {
          roleNames.add(role.roleName); // הוספת שם התפקיד ל־Set
          
        });
        setRoleNames(Array.from(roleNames)); // המרת ה־Set למערך והגדרתו בסטייט
      })
      .catch(error => console.error(error));
  }, []);


  const onSubmit = (data) => {
    const requestData = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: Number(data.gender),
      dateOfStart: data.dateOfStartingWork,
      dateOfBirth: data.DateOfBirth,
      roles: data.roles,
    };
    alert("hi submit component")
    if (employeeData) {
      axios.put(`https://localhost:7094/api/Employee/${employeeData.employeeId}`, requestData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.error(error));
    } else {
      axios.post("https://localhost:7094/api/Employee", requestData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.error(error));
    }
  };
  const filteredRoles = roleNames.filter(role => !employeeData?.roles?.some(assignedRole => assignedRole.roleName.toLowerCase() === role.toLowerCase()));
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={10}>
                  <TextField
                    error={!!errors.firstName}
                    id="firstName"
                    label="First Name"
                    helperText={errors.firstName?.message}
                    defaultValue={employeeData?.firstName}
                    {...register("firstName")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <AccountCircleIcon color="action" />
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={10}>
                  <TextField
                    error={!!errors.lastName}
                    id="lastName"
                    label="Last Name"
                    helperText={errors.lastName?.message}
                    defaultValue={employeeData?.lastName}
                    {...register("lastName")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <AccountCircleIcon color="action" />
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={10}>
                  <TextField
                    error={!!errors.employeeId}
                    id="employeeId"
                    label="Employee ID"
                    helperText={errors.employeeId?.message}
                    defaultValue={employeeData?.employeeId}
                    {...register("employeeId")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <WorkOutlineIcon color="action" />
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={10}>
                  <TextField
                    error={!!errors.dateOfStartingWork}
                    id="dateOfStartingWork"
                    label="Date of Starting Work"
                    helperText={errors.dateOfStartingWork?.message}
                    defaultValue={parseDate(employeeData?.dateOfStartingWork)}

                    {...register("dateOfStartingWork")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <EventIcon color="action" />
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={10}>
                  <TextField
                    error={!!errors.DateOfBirth}
                    id="DateOfBirth"
                    label="Birth Date"
                    helperText={errors.DateOfBirth?.message}
                    defaultValue={parseDate(employeeData?.dateOfBirth)}
                    {...register("DateOfBirth")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <CakeIcon color="action" />
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={10}>
                  <TextField
                    select
                    id="gender"
                    label="Gender"
                    helperText={errors.gender?.message}
                    // defaultValue={employeeData?.gender}
                    defaultValue={
                      employeeData?.gender !== undefined
                        ? employeeData.gender === 0 ? "male" : "female"
                        : ""
                    }

                    {...register("gender")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <WcIcon color="action" />
                      )
                    }}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {/* Roles */}
            <Button
              type="button"
              onClick={() => {
                append({});
              }}
            >
              Add Role
            </Button>
            {fields?.map((field, index) => (
              <Paper key={field.id} elevation={1} style={{ padding: "10px", margin: "10px 0", width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id={`roleNameLabel_${index}`}>Role Name</InputLabel>
                      {/* <Select
                        labelId={`roleNameLabel_${index}`}
                        id={`roleName_${index}`}
                        error={!!errors?.roles?.[index]?.roleName}
                        defaultValue={employeeData?.roles?.[index]?.roleName}
                      
                        {...register(`roles.${index}.roleName`)}
                      >
                        {roleNames.map(role => (
                          <MenuItem key={role.id} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select> */}
                      <Select
                        labelId={`roleNameLabel_${index}`}
                        id={`roleName_${index}`}
                        error={!!errors?.roles?.[index]?.roleName}
                        defaultValue={employeeData?.roles?.[index]?.roleName}
                        {...register(`roles.${index}.roleName`)}
                      >
                        {/* {roleNames */}
                           {/* .filter(role => !employeeData?.roles || !employeeData.roles.some(empRole => empRole.roleName === role)) */}
                          {filteredRoles.map(role => (
                            <MenuItem key={role} value={role}>
                              {role}
                            </MenuItem>
                          ))}
                      </Select>


                      <FormHelperText>{errors?.roles?.[index]?.roleName?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={`isManagement_${index}`}
                          {...register(`roles.${index}.isManagement`)}
                          defaultChecked={employeeData?.roles?.[index]?.isManagement}
                        />
                      }
                      label="Is Manager"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!!errors?.roles?.[index]?.startDate}
                      id={`startDate_${index}`}
                      label="Start Date"
                      helperText={errors?.roles?.[index]?.startDate?.message}
                      defaultValue={employeeData?.roles?.[index]?.startDate}
                      {...register(`roles.${index}.startDate`)}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <EventIcon color="action" />
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="button" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
        </Box>
        {/* <Button type="submit" onClick={()=>onSubmit()} variant="contained" color="primary">Submit</Button> */}
        <input onClick={onSubmit} type="submit" value={"submit"} />
      </form>
    </Paper>
  );
}