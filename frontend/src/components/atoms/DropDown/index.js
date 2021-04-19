import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 360,
  },
}));
const Dropdown = ({
  options,
  label,
  value,
  handleSelectChange,
  variant,
  error,
  helperText,
  disabled,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    handleSelectChange(event.target.value);
  };

  return (
    <>
      <FormControl
        className={classes.formControl}
        variant={variant}
        error={error}
        disabled={disabled}
        style={{ backgroundColor: "white" }}
      >
        <InputLabel shrink={true}>{label}</InputLabel>
        <Select value={value} onChange={handleChange}>
          {options &&
            options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </>
  );
};

export default Dropdown;
