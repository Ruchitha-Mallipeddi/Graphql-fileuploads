import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";

const Button = ({
  label,
  variant,
  disabled,
  color,
  onClick,
  size,
  ...restProps
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled}
      size={size}
      onClick={onClick}
      {...restProps}
    >
      {label}
    </MuiButton>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
};
Button.defaultProps = {
  variant: "contained",
  disabled: false,
  label: "button",
  color: "primary",
};

export default Button;
