import { Grid, Icon, TextField } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const InputGrid = ({ errors, name, label, register, type = "text" }) => {
    return <Grid item>
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={10}>
                <TextField
                    type={type}
                    error={!!errors[name]}
                    id={name}
                    label={label}
                    helperText={errors[name]?.message}
                    {...register(name)}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            // <Icon
                            <AccountCircleIcon color="action" />
                        )
                    }}
                />
            </Grid>
        </Grid>
    </Grid>
}

export default InputGrid