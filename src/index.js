import React from "react";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.min.css";

import { ComponentWrapper } from "./wrappers";

import { Navbar, Options } from "./components";

const TableOptions = ({ navbarActions }) => {
  return (
    <ComponentWrapper>
      <Navbar
        handleSettings={navbarActions?.handleSettings}
        handleExit={navbarActions?.handleExit}
      />

      <Options />
    </ComponentWrapper>
  );
};

export default TableOptions;

TableOptions.propTypes = {
  navbarActions: PropTypes.shape({
    handleSettings: PropTypes.func,
    handleExit: PropTypes.func
  })
};
