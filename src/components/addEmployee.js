
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
import EventIcon from "@mui/icons-material/Event";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { getEmpployee } from "../server/employee";
import InputGrid from "./inputGrid";
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  employeeId: yup.string().required(),
  dateOfStartingWork: yup
    .date()
  ,
  dateOfBirth: yup.date().required(),
  gender: yup.string().required(),
  roleList: yup.array().of(
    yup.object({
      roleId: yup.string(),
      isManagerial: yup.boolean(),
      dateOfRoleEntry: yup
        .date()
    })
  )
});

export default function AddEmployee() {
  const [roleNames, setRoleNames] = useState([]);
  const employeeData = useSelector(state => state.employee);
  console.log("employeeData", employeeData);
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

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    values: employeeData ? employeeData : {}
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "roleList"
  });



  useEffect(() => {
    getEmpployee()
      .then(response => {

        setRoleNames(response.data); // המרת ה־Set למערך והגדרתו בסטייט
      })
      .catch(error => console.error(error));
  }, []);

  const onSubmit = (data) => {
    console.log("onSubmit", data)
    data.gender = data.gender === "male" ? 0 : 1;
    console.log(data)
      ;
    // אם ישנם נתונים של עובד (במקרה של עריכה)
    if (employeeData) {
      console.log("edit")
      axios.put(`https://localhost:7094/api/Employee/${employeeData.id}`, data)
        .then((response) => {
          console.log("then")
          // console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          console.log("catch")
        });
    } else {
      // אם אין נתונים של עובד (במקרה של הוספה)
      axios.post("https://localhost:7094/api/Employee", data)
        .then((response) => {
          console.log("then");
          console.log(response.data);
        })
        .catch((error) => console.error(error));
    }
  };
  const filteredRoles = roleNames.filter(role => !employeeData?.roleList?.some(assignedRole => assignedRole.roleId === role));
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2} direction="column">
            <InputGrid errors={errors} name="firstName" label="First Name" register={register} />
            <InputGrid errors={errors} name="lastName" label="Last Name" register={register} />
            <InputGrid errors={errors} name="employeeId" label="Employee ID" register={register} />
            <InputGrid errors={errors} name="dateOfStartingWork" label="Date of Starting Work" register={register} type="date"/>
            <InputGrid errors={errors} name="dateOfBirth" label="Birth Date" register={register} type="date"/>
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
                      <Select
                        labelId={`roleNameLabel_${index}`}
                        id={`roleName_${index}`}
                        error={!!errors?.roleList?.[index]?.roleId}
                        defaultValue={employeeData?.roleList?.[index]?.roleId}
                        {...register(`roleList.${index}.roleId`)}

                      >
                        {filteredRoles.map(role => (
                          <MenuItem key={role.roleId} value={role.roleId}>
                            {role.roleName}                          </MenuItem>
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
        <input onClick={onSubmit} type="submit" value={"submit"} />
      </form>
    </Paper >
  );
}