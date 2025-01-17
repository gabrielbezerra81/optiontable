import styled from "styled-components";

import { color, font } from "../../../../config/styles";

export const Wrapper = styled.div`
  width: 180px;
`;

export const TableContent = styled.div``;

export const TableContentRow = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  padding: 0 0 5px 0;
  border-bottom: 1px dashed ${color.borderLight};
  color: ${color.text};
  font-size: 10pt;
  font-family: ${font.family.primary};
  max-height: 22px;

  p {
    position: relative;
    z-index: 999;
  }

  svg {
    width: 20px;
    position: relative;
    top: -36px;
    left: 265%;
  }

  :nth-child(odd) {
    background-color: ${color.tableCell};
  }

  :nth-child(${props => props.sellActive + 1}) {
    ::after {
      content: "";
      position: relative;
      border-top: 1px solid red;
      border-right: 1px solid red;
      border-bottom: 1px solid red;
      border-radius: 0 5px 5px 0;
    }
  }

  :nth-child(${props => props.buyActive + 1}) {
    ::after {
      content: "";
      position: relative;
      left: 100%;
      border-top: 1px solid green;
      border-bottom: 1px solid green;
      border-left: 1px solid green;
      border-radius: 5px 0 0 5px;
    }
  }

  ::after {
    content: "";
    top: -34px;
    position: relative;
    z-index: 99;
    height: 22px;
    width: calc(100% * 2);
  }

  p {
    position: relative;
    bottom: 5px;
    margin: 10px;
    color: ${color.text};
    font-size: 12pt;
    line-height: 14pt;
    font-family: ${font.family.primary};
    text-transform: uppercase;
  }

  .code {
    font-size: 10pt;
  }
`;
