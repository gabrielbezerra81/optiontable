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
  .content {
    display: grid;
    grid-template-columns: 3fr 1fr 3fr;
    grid-column-gap: 10px;
  }
`;

export const ShowMore = styled.span`
  cursor: pointer;
  width: 100%;
  height: 40px;
  background-color: ${color.primary};
  :hover {
    opacity: 0.8;
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
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #050000;
  }
`;
