// basic it work
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { getEmpployee } from "../server/employee";
import InputGrid from "./inputGrid";
import NavBar from "./navBar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const schema = yup.object({
  firstName: yup.string().required().min(2),
  lastName: yup.string().required().min(2),
  employeeId: yup.string().required().min(9).max(9),
  dateOfStartingWork: yup
    .date()
  ,
  dateOfBirth: yup.date().required().test('dateOfBirth', 'Birth date must be earlier than start date', function (value) {
    const { dateOfStartingWork } = this.parent;
    return value < dateOfStartingWork;
  }),
  gender: yup.string().required(),
  roleList: yup.array().of(
    yup.object({
      roleId: yup.string(),
      isManagerial: yup.boolean(),
      dateOfRoleEntry: yup.date()
        .test('dateOfRoleEntry', 'Role entry date must be later than or equal to start date', function (value) {
          const { dateOfStartingWork } = this.parent;
          return value >= dateOfStartingWork;
        })
    })
  )
});

export default function AddEmployee() {
  const dispatch = useDispatch();
  const [roleNames, setRoleNames] = useState([]);
  const employeeData = useSelector(state => state.employee);
  const [selectedRoles, setSelectedRoles] = useState(new Set());
  const navigate = useNavigate()

  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    values: employeeData ? employeeData : {}
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "roleList"
  });

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

  const isRoleIdExists = (index) => {
    const roleIdsArray = fields.map(field => field.roleId);
    var isExist = false
    roleIdsArray?.forEach((role) => {
      if (role == index)
        isExist = true;
    })
    return isExist;
  }

  useEffect(() => {
    getEmpployee()
      .then(response => {
        setRoleNames(response.data);
      })
      .catch(error => console.error(error));

  }, []);

  useEffect(() => {
    if (employeeData) {
      Object.keys(employeeData).forEach(key => {
        if (key === "dateOfStartingWork" || key === "dateOfBirth") {
          setValue(key, moment(employeeData[key]).format('YYYY-MM-DD'));
        } else if (key === "roles") {
          employeeData.roleList.forEach((role, index) => {
            setValue(`roles[${index}].startDateRole`, moment(role.dateOfRoleEntry).format('YYYY-MM-DD'));
          });
        } else {
          setValue(key, employeeData[key]);
        }
      });
    }
  }, [employeeData, setValue]);

  const onSubmit = (data) => {
    console.log("onSubmit", data)
    data.gender = data.gender === "male" ? 0 : 1;
    console.log(data)
      ;
    // אם ישנם נתונים של עובד (במקרה של עריכה)
    if (employeeData) {
      console.log("edit")
      console.log("employeeData.id", employeeData.id);
      axios.put(`https://localhost:7094/api/Employee/${employeeData.id}`, data)
        .then((response) => {
          console.log("edit_then")
          console.log(response.data);
          dispatch({ type: 'SET_EMPLOYEE', data: null });
          Swal.fire({
            position: 'center',
            icon: "success",
            title: `The employee ${employeeData.firstName} was update `,
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/AllEmployees")
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            console.log(error.response.data); // Server error details
          }
        });
    } else {
      // אם אין נתונים של עובד (במקרה של הוספה)
      axios.post("https://localhost:7094/api/Employee", data)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            position: 'center',
            icon: "success",
            title: `The employee ${employeeData.firstName} posed `,
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/AllEmployees")
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            console.log(error.response.data); // Server error details
          }
        });
    }
  };

  return (
    <>
      <NavBar />
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2} direction="column">
              <InputGrid errors={errors} name="firstName" label="First Name" register={register} />
              <InputGrid errors={errors} name="lastName" label="Last Name" register={register} />
              <InputGrid errors={errors} name="employeeId" label="Employee ID" register={register} />
              <InputGrid errors={errors} name="dateOfStartingWork" label="Date of Starting Work" register={register} type="datetime-local" />
              {/* <InputGrid errors={errors} name="dateOfStartingWork" label="Date of Starting Work" register={register} type="date" showIcon={false} /> */}

              <InputGrid errors={errors} name="dateOfBirth" label="Birth Date" register={register} type="datetime-local" />
              {/* <InputGrid errors={errors} name="dateOfBirth" label="Birth Date" register={register} type="date" showIcon={false} /> */}

              {/* <Select style={{ padding: "10px", margin: "10px 0", width: "25vw",marginLeft:"36.5vw" }}
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
                <MenuItem key="male" value="male" >
                  Male
                </MenuItem>
                <MenuItem key="female" value="female" >
                  Female
                </MenuItem>
              </Select> */}
              <Select style={{ padding: "10px", margin: "10px 0", width: "25vw", marginLeft: "36.5vw", height: "2.5rem" }}
                labelId="Gender"
                id="gender"
                error={!!errors?.gender?.message}
                defaultValue={
                  employeeData?.gender !== undefined
                    ? employeeData.gender === 0 ? "male" : "female"
                    : ""
                }
                {...register("gender")}
                sx={{ "& .MuiSelect-icon": { color: "#1565c0" } }}
              >
                <MenuItem key="male" value="male" sx={{ color: "white", backgroundColor: "#1565c0" }}>
                  Male
                </MenuItem>
                <MenuItem key="female" value="female" sx={{ color: "white", backgroundColor: "#1565c0" }}>
                  Female
                </MenuItem>
              </Select>

              {/* Roles */}
              <Button
                type="button" style={{ width: "25%", marginLeft: "36.5vw", backgroundColor: "#1565c0", color: "white" }}
                onClick={() => {
                  append({});
                }}
              >
                Add Role
              </Button>
              {fields?.map((field, index) => (
                <Paper key={field.id} elevation={1} style={{ padding: "10px", margin: "10px 0", width: "20%", marginLeft: "38vw" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id={`roleNameLabel_${index}`}>Role Name</InputLabel>
                        <Select
                          {...register(`roleList.${index}.roleId`)}
                          labelId={`demo-simple-select-standard-label-roleId-${index}`}
                          id={`demo-simple-select-standard-roleId-${index}`}
                          label="Choose a role"
                          defaultValue={field.roleId || ""}
                        >

                          {roleNames.filter(role => !isRoleIdExists(role.roleId) || role.roleId === field.roleId)
                            .map((role) => (
                              <MenuItem key={role.roleId} value={role.roleId} >
                                {role.roleName}
                              </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors?.roleList?.[index]?.roleId?.message}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id={`isManagement_${index}`}
                            {...register(`roleList.${index}.isManagerial`)}
                            defaultChecked={employeeData?.roleList?.[index]?.isManagerial}
                          />
                        }

                        label="Is Manager"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={!!errors?.roleList?.[index]?.dateOfRoleEntry}
                        id={`startDate_${index}`}
                        label="Start Date"
                        helperText={errors?.roleList?.[index]?.dateOfRoleEntry?.message}
                        defaultValue={parseDate(employeeData?.roleList?.[index]?.dateOfRoleEntry)}
                        {...register(`roleList.${index}.dateOfRoleEntry`)}
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
          <input onClick={onSubmit} type="submit" style={{ padding: "10px", borderRadius: "4px", width: "25%", marginRight: "2vw", backgroundColor: "#1565c0", color: "white" }} value={"submit"} />
        </form>
      </Paper >
    </>
  );
}



