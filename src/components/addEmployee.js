
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import { log } from "util";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  employeeId: yup.number().positive().integer().required(),
  dateOfStartingWork: yup
    .date()
    .min(yup.ref("birthDate"), "Date must be after birth date")
    .required(),
  birthDate: yup.date().required(),
  gender: yup.string().required(),
  roles: yup.array().of(
    yup.object({
      roleName: yup.string().required(),
      isManagement: yup.boolean().required(),
      startDate: yup
        .date()
        .min(yup.ref("dateOfStartingWork"), "Date must be after start date")
        .required()
    })
  )
});

export default function AddEmployee() {
  const employeeData = useSelector(state => state.employee);
 console.log();
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
    console.log(employeeData);
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
        setValue(`roles?.${index}.roleName`, role?.roleName);
        setValue(`roles?.${index}.isManagement`, role?.isManagement);
        setValue(`roles?.${index}.startDate`, role?.startDate);
      });
    }
  }, [employeeData, setValue, control, append]);

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
      console.log("edit", employeeData.employeeId);
      axios.put(`https://localhost:7094/api/Employee/${employeeData.employeeId}`, requestData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.error(error));
    } else {
      console.log("add");
      axios.post("https://localhost:7094/api/Employee", requestData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.error(error));
        
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>firstName</label>
      <input defaultValue={employeeData?.firstName}{...register("firstName")} />
      <p>{errors.firstName?.message}</p>
      <label>lastName</label>
      <input {...register("lastName")} />
      <p>{errors.lastName?.message}</p>
      <label>employeeId</label>
      <input {...register("employeeId")} />
      <p>{errors.employeeId?.message}</p>
      <label>dateOfStartingWork</label>
      <input type="date" defaultValue={parseDate(employeeData?.dateOfStartingWork)} {...register("dateOfStartingWork")} />
      <p>{errors.dateOfStartingWork?.message}</p>
      <label>birthDate</label>
      <input type="date" defaultValue={parseDate(employeeData?.dateOfBirth)} {...register("DateOfBirth")} />
      <p>{errors.birthDate?.message}</p>
      <select {...register("gender")}>
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <p>{errors.gender?.message}</p>

      {/* Roles */}
      <button
        type="button"
        onClick={() => {
          append({});
        }}
      >
        Add Role
      </button>
      {fields?.map((field, index) => (
        <div key={field.id}>
          <input {...register(`roles?.${index}.roleName`)} />
          <label>is manager</label>
          <input type="checkbox" {...register(`roles?.${index}.isManagement`)} />
          <input type="date" {...register(`roles?.${index}.startDate`)} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}<input onClick={onSubmit} type="submit" value={"submit"}/>

    </form>
  );
}
