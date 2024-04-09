

{item?.employeePosition?.map((field, index) => (
    <Box key={index}>
        <Select
            label="Position"
            defaultValue={field.positionId}
            onChange={(e) => setValue(`employeePosition[${index}].positionId`, e.target.value)}
            {...register(`employeePosition[${index}].positionId`)}
        >
            <InputLabel id="position-select-label">Position</InputLabel>
            {positions.map(position => (
                <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
            ))}
        </Select>
        <TextField
            type="datetime-local"
            // defaultValue={field.dateEntry}
            {...register(`employeePosition[${index}].dateEntry`)}
            onChange={(e) => setValue(`employeePosition[${index}].dateEntry`, e.target.value)}
        />
        <Checkbox
            size="small"
            checked={!!field.management}
            onChange={(e) => setValue(`employeePosition[${index}].management`, e.target.checked)}
        />
        <Grid item xs={12}>
            <Button type="button" onClick={() => removePosition(index)}>
                Remove
            </Button></Grid>
    </Box>
))}




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
          // הוא מסכים להוסיף לי רק תפקיד אחד.
          //הקוד שלי היה ככה גם בלי הקוד שלך רק לא ב GRID
          //מה זאת אומרת אחרי שהוספת את הקוד שלי נהיה רק יותר גרוע?
          //לא שינה כלוםץ הוא מסכים רק הוספת תפקיד אחד 
          // איזה מוזר...
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