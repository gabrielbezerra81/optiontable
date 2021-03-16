import styled from "styled-components";

import { color, font } from "../../../../config/styles";

export const TableHeader = styled.div`
  background-color: ${color.primary};
  display: flex;
  align-items: center;
  justify-content: ${props => props.right && "flex-end"};
  height: 40px;
`;

export const TableHeaderDate = styled.h1`
  color: ${color.text};
  font-size: 12pt;
  line-height: 14pt;
  font-family: ${font.family.primary};
  padding-left: 40px;
  padding-right: ${props => props.right && "40px"};
  display: flex;

  span {
    cursor: pointer;
    border: solid ${color.text};
    border-width: 0 4px 4px 0;
    display: inline-block;
    position: relative;
    padding: 7px;
    transform: ${props => (props.rotate ? "rotate(-135deg)" : "rotate(45deg)")};
    top: ${props => (props.rotate ? "5px" : "-5px")};
    margin-right: ${props => !props.right && "20px"};
    margin-left: ${props => props.right && "20px"};

    :hover {
      opacity: 0.8;
    }
  }
`;

export const TableHeaderTitle = styled(TableHeaderDate)`
  text-transform: uppercase;
`;
export const TableContent = styled.div`
  .header {
    display: grid;
    align-content: center;
    grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
    padding: 0 10px;
    margin-top: 5px;
    background-color: ${color.primary};
    height: 40px;

    h1 {
      color: ${color.text};
      font-size: 12pt;
      line-height: 14pt;
      font-family: ${font.family.primary};
      text-transform: uppercase;

      :nth-child(1) {
        margin-left: ${props => props.cols > 5 && "40px"};
      }

      :nth-child(n + 2) {
        ::before {
          content: "";
          position: relative;
          margin-right: 5px;
          border-right: 1px dashed ${color.text};
        }
      }
    }
  }
`;

export const TableContentHeader = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  padding: 0 10px;
  margin-top: 5px;
  background-color: ${color.primary};
  height: 40px;

  h1 {
    color: ${color.text};
    font-size: 12pt;
    line-height: 14pt;
    font-family: ${font.family.primary};
    text-transform: uppercase;

    :nth-child(1) {
      margin-left: ${props => props.cols > 5 && "40px"};
    }

    :nth-child(n + 2) {
      ::before {
        content: "";
        position: relative;
        margin-right: 5px;
        border-right: 1px dashed ${color.text};
      }
    }
  }
`;

export const TableContentRow = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  padding: 0 0 5px 0;
  border-bottom: 1px dashed ${color.border};
  color: ${color.text};
  font-size: 12pt;
  line-height: 23pt;
  font-family: ${font.family.primary};
  max-height: 22px;

  p {
    position: relative;
    bottom: 3px;
    color: ${color.tableNumber};

    :nth-child(1) {
      margin-left: ${props => props.cols > 5 && "50px"};
    }

    :nth-child(n + 2) {
      margin-left: 15px;
    }
  }

  .M {
    text-transform: uppercase;
  }

  .value {
    color: green;
  }
`;
