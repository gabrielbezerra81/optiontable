import styled, { css } from "styled-components";

import { TableContentRow as Row } from "../Commons";

export const Wrapper = styled.div``;

export const TableContentRow = styled(Row)`
  position: relative;

  .value {
    position: relative;
    z-index: 9999;
    cursor: pointer;
  }
`;

export const RowSelected = styled.div`
  ${props =>
    props.active === "sell" &&
    css`
      border: 1px solid red;

      .remove,
      .type {
        cursor: pointer;
        background-color: red;
      }
    `}

  ${props =>
    props.active === "buy" &&
    css`
      border: 1px solid green;

      .remove,
      .type {
        cursor: pointer;
        background-color: green;
      }
    `}

  border-radius: 5px;
  position: absolute;
  width: calc(100% + 115px);
  height: 20px;
  top: 3px;
  left: 20px;

  .type {
    position: absolute;
    /* left: -10px; */
    height: 100%;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .remove {
    position: absolute;
    z-index: 999;
    right: 0;
    height: 100%;
    width: 20px;
    display: ${props => (props.active?.length > 1 ? "flex" : "none")};
    justify-content: center;
    align-items: center;
  }
`;
