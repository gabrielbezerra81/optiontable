import styled from "styled-components";

import { color } from "../../../config/styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  margin: 5px 0;
  color: white;
`;

export const Options = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 20px;
`;

export const Main = styled.div`
  margin-top: -70px;
  display: flex;
  grid-template-columns: 3fr 1fr 3fr;
  grid-column-gap: 10px;
`;

const Move = styled.span`
  display: ${props => (props.display ? null : "none")};
  cursor: ${props => (props.disabled ? "unset" : "pointer")};
  opacity: ${props => (props.disabled ? "0.4" : "1")};
  position: relative;
  width: 100%;
  height: 40px;
  background-color: ${color.primary};

  .totalItems {
    position: absolute;
    left: 10px;
    bottom: 5px;
  }

  .countItems {
    position: absolute;
    right: 10px;
    bottom: 5px;
  }

  :hover {
    opacity: ${props => (props.disabled ? "0.4" : "0.8")};
  }
  ::before {
    content: "";
    color: black;
    position: relative;
    top: 10px;
    left: calc(50% - 10px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0;
    height: 0;
  }
`;

export const MoveUp = styled(Move)`
  margin-top: -15px;
  ::before {
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #050000;
  }
`;

export const MoveDown = styled(Move)`
  margin-top: -10px;
  ::before {
    border-top: 20px solid #050000;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
  }
`;
