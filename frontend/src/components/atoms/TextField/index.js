import React from "react";
import { makeStyles, TextField as MuiTextField } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 360,
  },
  inputRoot: {
    "&$disabled": {
      color: "#332828",
    },
  },
  disabled: {},
}));
const TextField = ({
  label,
  name,
  value,
  type,
  multiline,
  rows,
  rowsMax,
  defaultValue,
  placeholder,
  handleTextChange,
  variant,
  margin,
  shrink,
  ...restProps
}) => {
  const classes = useStyles();
  const onChange = (event) => {
    handleTextChange(name, event.target.value);
  };

  return (
    <MuiTextField
      margin={margin}
      name={name}
      label={label}
      value={value}
      multiline={multiline}
      placeholder={placeholder}
      defaultValue={defaultValue}
      rows={rows}
      rowsMax={rowsMax}
      autoComplete="off"
      onChange={onChange}
      variant={variant}
      InputLabelProps={{
        shrink: shrink,
      }}
      InputProps={{
        classes: {
          root: classes.inputRoot,
          disabled: classes.disabled,
        },
      }}
      style={{ backgroundColor: "white" }}
      type={type}
      className={classes.root}
      {...restProps}
    />
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};

TextField.defaultProps = {
  multiline: false,
};

export default TextField;
