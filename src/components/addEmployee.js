
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
  employeeId: yup.string().required(),
  dateOfStartingWork: yup
    .date()
    .required(),
  dateOfBirth: yup.date().required(),
  gender: yup.string().required(),
  roleList: yup.array().of(
    yup.object({
      roleName: yup.string().required(),
      isManagement: yup.boolean().required(),
      startDate: yup
        .date()
        .required()
    })
  )
});

export default function AddEmployee() {
  const [roleNames, setRoleNames] = useState([]);
  const employeeData = useSelector(state => state.employee);
  console.log("employeeData",employeeData);
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
    name: "roleList"
  });

  useEffect(() => {
    if (employeeData) {
      setValue("firstName", employeeData?.firstName);
      setValue("lastName", employeeData?.lastName);
      setValue("employeeId", employeeData?.employeeId);
      setValue("gender", employeeData?.gender);
      employeeData?.roles?.forEach((role, index) => {
        const fields = control.fields.roles;
        if (!fields.length || fields.length <= index) {
          append({}); // Add fields if needed
        }
        setValue(`roleList?.${index}.roleName`, role?.roleName);
        setValue(`roleList?.${index}.isManagement`, role?.isManagement);
        setValue(`roleList?.${index}.startDate`, role?.startDate);
      });
    }
  }, [employeeData, setValue, control, append]);


  useEffect(() => {
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
    console.log("onSubmit",data)
    const gender = data.gender === "male" ? 0 : 1;
    const requestData = {
      employeeId: data?.employeeId,
      firstName: data?.firstName,
      lastName: data?.lastName,
      gender: gender,
      dateOfStartingWork: data?.dateOfStartingWork,
      dateOfBirth: data?.dateOfBirth,
      roleList: data?.roleList,
      isActivate:true
    };
    console.log("dateOfBirth", requestData.dateOfBirth);
    console.log("start", requestData.dateOfStartingWork);
    console.log("fname", requestData.firstName);
    console.log("lname", requestData.lastName);
    console.log("gender", requestData.gender);
    console.log("rolelist", requestData.roleList);
    console.log("id", requestData.employeeId);
    console.log("employeeData.id", employeeData.id);
    // אם ישנם נתונים של עובד (במקרה של עריכה)
    if (employeeData) 
    {
      console.log("edit")
      console.log(requestData)
      axios.put(`https://localhost:7094/api/Employee/${employeeData.id}`,requestData)
     
      //   firstName: requestData.firstName,
      //   lastName: requestData.lastName,
      //   employeeId: requestData.employeeId,
      //   dateOfStartingWork: "2024-04-07T10:23:56.978Z",
      //   dateOfBirth: "2024-04-07T10:23:56.978Z",
      //   gender: 0,
      //  roleList: [
      //     {
           
      //       roleName: "string",
      //       dateOfRoleEntry: "2024-04-07T10:23:56.978Z",
      //      isManagerial: true
      //     },    {
           
      //       roleName: "string",
      //       dateOfRoleEntry: "2024-04-07T10:23:56.978Z",
      //      isManagerial: true
      //     }
      //   ]
      // })
        .then((response) => {
          console.log("then")
          console.log(requestData)
          // console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          console.log("catch")
          console.log(requestData)
        });
    } else {
      // אם אין נתונים של עובד (במקרה של הוספה)
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
                    id="dateOfBirth"
                    label="Birth Date"
                    helperText={errors.dateOfBirth?.message}
                    defaultValue={parseDate(employeeData?.dateOfBirth)}
                    {...register("dateOfBirth")}
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
            {/* 
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
          </Grid> */}

           
            <Select
              labelId="Gender"
              id="gender"
              error={!!errors?.gender?.message}
              defaultValue={
                employeeData?.gender !== undefined
                  ? employeeData.gender === 0 ? "male" : "female"
                  : ""
              }
              {...register("gender")}
            >
              <MenuItem key="male" value="male">
                Male
              </MenuItem>
              <MenuItem key="female" value="female">
                Female
              </MenuItem>
            </Select>

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
              <Paper key={field.id} elevation={1} style={{ padding: "10px", margin: "10px 0", width: "20%" }}>
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
                        error={!!errors?.roleList?.[index]?.roleName}
                        defaultValue={employeeData?.roleList?.[index]?.roleName}
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


                      <FormHelperText>{errors?.roleList?.[index]?.roleName?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={`isManagement_${index}`}
                          {...register(`roles.${index}.isManagement`)}
                          defaultChecked={employeeData?.roleList?.[index]?.isManagement}
                        />
                      }
                      label="Is Manager"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!!errors?.roleList?.[index]?.startDate}
                      id={`startDate_${index}`}
                      label="Start Date"
                      helperText={errors?.roleList?.[index]?.startDate?.message}
                      defaultValue={employeeData?.roleList?.[index]?.startDate}
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