import React from "react";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.min.css";

import { ComponentWrapper } from "./wrappers";

import { Navbar, Options } from "./components";

const TableOptions = ({ navbarActions }) => {
  return (
    <div>
      <ComponentWrapper>
        <Navbar
          handleSettings={navbarActions?.handleSettings}
          handleExit={navbarActions?.handleExit}
        />
        <Options />
      </ComponentWrapper>
    </div>
  );
};

export default TableOptions;

TableOptions.propTypes = {
  navbarActions: PropTypes.shape({
    handleSettings: PropTypes.func,
    handleExit: PropTypes.func
  })
};

// "react": "file:../path-to-dev-app/node_modules/react",
// "react-dom": "file:../path-to-dev-app/node_modules/react-dom"
