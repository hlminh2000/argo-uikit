import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import LoadingSpinner from "../loadingSpinner";

const StyledButton = styled("button")`
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  line-height: ${({ theme, size }) => theme.button.sizes[size]};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: none;
  border: none;
  border-radius: 20px;

  padding: 10px 24px;
  background-color: ${({ theme }) => theme.button.primary.default};

  &:hover {
    background-color: ${({ theme }) => theme.button.primary.hover};
  }

  &:focus {
    background-color: ${({ theme }) => theme.button.primary.focus};
  }

  &:active {
    background-color: ${({ theme }) => theme.button.primary.active};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.button.primary.disabled};
  }
`;

const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  showLoader = false
}) => {
  const [isLoading, setLoading] = useState(false);

  const onClickFn = async event => {
    setLoading(true);
    await onClick(event);
    setLoading(false);
  };

  return (
    <StyledButton
      onClick={showLoader ? onClickFn : onClick}
      disabled={disabled}
      size={size}
      variant={variant}
    >
      {isLoading && showLoader ? "loading" : children}
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * Button variant type eg. primary
   */
  variant: PropTypes.oneOf(["primary", "secondary"]),
  /**
   * Button size
   */
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  /**
   * Use with async onClick handlers to set loading indicator
   */
  showLoader: PropTypes.bool
};

export default Button;
