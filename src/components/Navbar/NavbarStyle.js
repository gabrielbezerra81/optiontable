import styled from "styled-components";

import { color, font } from "../../config/styles";

export const Wrapper = styled.nav`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: ${color.primary};

  ::before {
    content: "";
    position: absolute;
    z-index: 9;
    top: 0;
    height: 50%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.13);
    filter: blur(3px);
  }

  .search {
    margin: 10px 0 0 10px;
    position: relative;
    z-index: 99;
  }

  .items {
    display: grid;
    grid-template-columns: 2.5fr repeat(5, 1.8fr) 6fr;
    position: relative;
    top: 5px;
  }
`;

export const Item = styled.div`
  margin: 0 40px;
  position: relative;

  h1 {
    margin: 0;
    font-size: 9pt;
    color: ${color.text};
    font-family: ${font.family.primary};
    line-height: 15pt;
  }

  p {
    margin: 0;
    font-size: 16pt;
    color: ${props => (props.red ? "red" : color.textLight)};
    font-family: ${font.family.primary};
    line-height: 26pt;
  }

  .loading {
    position: absolute;
    top: 10px;

    svg {
      height: 50px;
    }
  }
`;

export const CorporationName = styled.h1`
  position: relative;
  font-size: 16pt;
  color: ${color.textLight};
  text-transform: uppercase;
  font-family: ${font.family.primary};
  line-height: 26pt;

  .loading {
    position: absolute;
    top: 10px;
    right: 60px;

    svg {
      height: 50px;
    }
  }
`;

export const Buttons = styled.div`
  margin: 5px 10px 0 0;
  display: flex;
  position: relative;
  z-index: 99;

  .button {
    cursor: pointer;
    /* :hover {
      .cls-1 {
        fill: ${color.button};
        stroke: ${color.button};
      }
    } */
  }

  svg {
    width: 40px;
    margin: 0 5px;

    .cls-1 {
      fill: transparent;
    }
  }
`;
