//basic 
// import { Grid, TextField } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const InputGrid = ({ errors, name, label, register, type = "text", showIcon = true }) => {
//   return (
//     <Grid item>
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={5}>
//           <TextField
//             type={type}
//             error={!!errors[name]}
//             id={name}
//             label={label}
//             helperText={errors[name]?.message}
//             {...register(name)}
//             fullWidth
//             InputProps={{
//               startAdornment: showIcon ? (
//                 <AccountCircleIcon color="action" />
//               ) : null,
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default InputGrid;
import { Grid, TextField, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const InputGrid = ({ errors, name, label, register, type = "text", showIcon = true }) => {
  return (
    <Grid item>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={5}>
          <Box sx={{ border: "1px solid #1565c0", borderRadius: "4px",width:"25vw",marginLeft:"7vw" }}>
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
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputGrid;

