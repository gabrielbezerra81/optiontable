import styled from "styled-components";

import { color, font } from "../../../../config/styles";

export const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 3fr 1fr 3fr;
  grid-column-gap: 10px;
`;

export const StrikeTableHeader = styled.div`
  background-color: ${color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  h1 {
    color: ${color.text};
    font-size: 12pt;
    line-height: 14pt;
    text-transform: uppercase;
    font-family: ${font.family.primary};
  }
  svg {
    cursor: pointer;
    height: 15px;
    margin-left: 5px;
    transition: transform 0.2s;
    transform: ${props => (props.rotate ? "rotate(180deg)" : "rotate(0deg)")};
    :hover {
      opacity: 0.8;
    }
  }
`;

export const StrikeTableContentHeader = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  height: 40px;
  margin-top: 5px;
  background-color: ${color.primary};

  h1 {
    position: relative;
    top: 5px;
    margin: 10px;
    color: ${color.text};
    font-size: 12pt;
    line-height: 14pt;
    font-family: ${font.family.primary};

    :nth-child(2) {
      top: -5px;
    }

    :nth-child(even) {
      text-transform: uppercase;
    }
  }
`;
