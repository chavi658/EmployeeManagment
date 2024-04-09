// import { Grid, Icon, TextField } from "@mui/material"
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const InputGrid = ({ errors, name, label, register, type = "text",showIcon=true }) => {
//     return <Grid item>
//         <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={5}>
//                 <TextField
//                     type={type}
//                     error={!!errors[name]}
//                     id={name}
//                     label={label}
//                     helperText={errors[name]?.message}
//                     {...register(name)}
//                     fullWidth
//                     InputProps={{
//                         startAdornment: (
                          
//                             // <Icon
//                             <AccountCircleIcon color="action" />
//                         )
//                     }}
//                 />
//             </Grid>
//         </Grid>
//     </Grid>
// }
// export default InputGrid
//work wihot icons
// import { Grid, TextField } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import EventIcon from "@mui/icons-material/Event";
// import { useState } from "react";
// import { DatePicker } from "@mui/lab";

// const InputGrid = ({ errors, name, label, register, type = "text" }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleDateClick = () => {
//     setIsOpen(true);
//   };

//   const handleCloseDatePicker = () => {
//     setIsOpen(false);
//   };

//   return (
//     <Grid item>
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={5}>
//           <TextField
//             type="text"
//             error={!!errors[name]}
//             id={name}
//             label={label}
//             helperText={errors[name]?.message}
//             {...register(name)}
//             fullWidth
//             InputProps={{
//               startAdornment: <EventIcon color="action" onClick={handleDateClick} />,
//             }}
//           />
//           {isOpen && (
//             <DatePicker
//               open={isOpen}
//               onClose={handleCloseDatePicker}
//               value={null} // Set value to your state or initial value
//               onChange={(newValue) => {
//                 // Handle date change here
//                 console.log(newValue);
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   error={!!errors[name]}
//                   helperText={errors[name]?.message}
//                 />
//               )}
//             />
//           )}
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default InputGrid;
//wor לוח שנה מזעזע
// import { Grid, TextField } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import EventIcon from "@mui/icons-material/Event";
// import { useState } from "react";
// import DatePicker from "react-date-picker";

// const InputGrid = ({ errors, name, label, register, type = "text" }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dateValue, setDateValue] = useState(new Date());

//   const handleDateClick = () => {
//     setIsOpen(true);
//   };

//   const handleCloseDatePicker = () => {
//     setIsOpen(false);
//   };

//   return (
//     <Grid item>
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={5}>
//           <TextField
//             type="text"
//             error={!!errors[name]}
//             id={name}
//             label={label}
//             helperText={errors[name]?.message}
//             fullWidth
//             value={dateValue.toLocaleDateString()}
//             InputProps={{
//               startAdornment: <EventIcon color="action" onClick={handleDateClick} />,
//             }}
//             {...register(name)}
//           />
//           {isOpen && (
//             <DatePicker
//               onChange={(date) => {
//                 setDateValue(date);
//                 handleCloseDatePicker();
//               }}
//               value={dateValue}
//               onClose={handleCloseDatePicker}
//               calendarIcon={null}
//               clearIcon={null}
//             />
//           )}
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default InputGrid;
import { Grid, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const InputGrid = ({ errors, name, label, register, type = "text", showIcon = true }) => {
  return (
    <Grid item>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={5}>
          <TextField
            type={type}
            error={!!errors[name]}
            id={name}
            label={label}
            helperText={errors[name]?.message}
            {...register(name)}
            fullWidth
            InputProps={{
              startAdornment: showIcon ? (
                <AccountCircleIcon color="action" />
              ) : null,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputGrid;
