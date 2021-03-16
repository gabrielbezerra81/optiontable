import React from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import styled from "styled-components";

import { color } from "../../config/styles";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loadable = props => {
  const { isLoading, type, color, width, center, className, children } = props;

  return isLoading ? (
    center ? (
      <Center>
        <ReactLoading
          type={type}
          color={color}
          width={width}
          className={className}
        />
      </Center>
    ) : (
      <ReactLoading
        type={type}
        color={color}
        width={width}
        className={className}
      />
    )
  ) : (
    children
  );
};

Loadable.defaultProps = {
  isLoading: false,
  center: false,
  type: "bars",
  color: color.textLight
};

Loadable.propTypes = {
  isLoading: PropTypes.bool,
  center: PropTypes.bool,
  type: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
