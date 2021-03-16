import styled from "styled-components";

import { color, effect, font } from "../../../../config/styles";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 5px;

  svg {
    width: 24px;
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background-color: ${color.button};
    border-radius: 5px;
    border: none;
    font-family: ${font.family.primary};
    font-size: ${font.size.normal};
    color: ${color.textLight};

    ${effect.hover}
  }
`;

export const Header = styled.div`
  display: flex;
  height: 40px;

  .body {
    background-color: ${color.primary};
    width: 100%;
    margin-right: 6px;
  }

  .strategy {
    background-color: ${color.tableCell};
    padding: 10px;
    display: flex;
  }

  .search {
    cursor: pointer;
    background-color: ${color.primary};
    padding: 10px;
    border: 1px solid ${color.primaryLight};
    border-radius: 0 5px 5px 0;

    ${effect.hover}

    svg {
      path {
        fill: ${color.primaryLight};
        width: 24px;
      }
    }
  }
  transition: 1s;
  .searchInput {
    display: ${props => !props.isSearchOpen && "none"};
    position: absolute;
    z-index: 999;
    top: 50px;
    right: 0;
  }
`;

export const Actions = styled.div`
  margin: 5px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    cursor: pointer;
    height: 40px;
    background-color: ${color.tableCell};

    svg {
      width: 15px;

      .cls-1 {
        fill: ${color.text};
      }
    }
    h2 {
      margin-right: 5px;
    }

    ${effect.hover}

    :disabled {
      cursor: default;
      opacity: 0.6;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: ${color.primary};
  height: 60px;

  .button {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${effect.hover}

    svg {
      width: 40px;
      height: 20px;
      margin-top: 10px;

      .cls-1 {
        fill: ${color.text};
      }
    }
  }
`;

export const Table = styled.div``;

export const TableHeader = styled.div`
  background-color: ${color.tableCell};
  height: 30px;
  display: grid;
  grid-template-columns: 3fr 2fr 4fr repeat(3, 3fr);
  align-items: center;
  padding: 0 10px;

  h3 {
    font-weight: normal;
    text-transform: uppercase;
  }
`;

export const TableContent = styled.div`
  background-color: ${color.primary};
  padding: 5px 0;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 2fr 4fr repeat(3, 3fr);
  padding: 0 10px;

  p {
    font-size: ${font.size.normal};
    padding: 0;
    margin: 0;
  }

  .cod,
  .qtde,
  .vcto,
  .strike {
    display: grid;
    justify-items: center;
    padding: 5px;
    margin: 2.5px 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.18);
  }

  .qtde,
  .vcto,
  .strike {
    margin: 5px;

    p {
      color: ${color.strategyTable};
    }
  }

  .cod {
    margin: 5px 5px 0 0;
    height: 16px;
    p {
      color: ${color.text};
    }
  }

  .cv {
    display: flex;
    align-items: center;
    justify-content: center;

    .buy,
    .sell {
      display: grid;
      justify-items: center;
      width: 15px;
      background-color: rgba(255, 255, 255, 0.18);
      padding: 5px;
      margin: 0 5px;
      border-radius: 8px;

      p {
        opacity: 0.4;
      }
    }

    .buy {
      background-color: ${props => props.cv.toLowerCase() === "buy" && "green"};

      p {
        color: white;
        font-weight: bold;
        opacity: ${props => props.cv.toLowerCase() === "buy" && "1"};
      }
    }

    .sell {
      background-color: ${props => props.cv.toLowerCase() === "sell" && "red"};

      p {
        color: white;
        font-weight: bold;
        opacity: ${props => props.cv.toLowerCase() === "sell" && "1"};
      }
    }
  }

  .qtde,
  .vcto,
  .strike {
    position: relative;

    p {
      margin-right: 15px;
    }
    .buttons {
      position: absolute;
      top: calc(8%);
      right: 5px;

      .up {
        cursor: pointer;
        margin-bottom: 4px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 5px 9px 5px;
        border-color: transparent transparent ${color.text} transparent;

        ${effect.hover}
      }

      .down {
        cursor: pointer;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 5px 0 5px;
        border-color: ${color.text} transparent transparent transparent;

        ${effect.hover}
      }
    }
  }

  .family {
    margin-left: 10px;
    /* display: flex;
      align-items: center;
      justify-content: space-between; */
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    justify-items: center;
    align-items: center;

    p {
      text-transform: uppercase;
      margin-bottom: 0;
    }

    img {
      width: 40px;
    }

    .close {
      cursor: pointer;

      ${effect.hover};
    }
  }
`;

export const Slider = styled.div`
  background-color: ${color.tableCell};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  .slide {
    width: 60%;

    .title,
    .values {
      display: flex;
      justify-content: space-between;
    }

    .content {
      position: relative;
      background-color: ${color.sliderBar};
      height: 10px;

      .control {
        position: absolute;
        background-color: red;
        height: 100%;
        width: 5px;
        left: 60%;
      }
    }
  }
`;

export const Alert = styled.div`
  background-color: ${color.primary};
  padding: 5px;
  display: grid;
  grid-template-columns: 2fr 1fr;

  .row {
    display: flex;
    align-items: center;
    padding-left: 50px;

    p {
      color: ${color.text};
      width: 100px;
    }
  }

  .amount {
    position: relative;
    display: grid;
    justify-items: center;
    padding: 5px;
    margin: 2.5px 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.18);

    p {
      color: ${color.strategyTable};
      margin-right: 25px;
    }

    .buttons {
      position: absolute;
      top: calc(10%);
      right: 5px;

      .up {
        cursor: pointer;
        margin-bottom: 4px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 6px 10px 6px;
        border-color: transparent transparent ${color.text} transparent;

        ${effect.hover}
      }

      .down {
        cursor: pointer;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 6px 0 6px;
        border-color: ${color.text} transparent transparent transparent;

        ${effect.hover}
      }
    }
  }

  .value {
    display: flex;
    margin: 0 10px 15px auto;
    p {
      margin: 0 5px;
    }
  }

  .button {
    display: flex;

    .alert {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      background-color: ${color.button};
      border-radius: 5px;

      ${effect.hover}

      span {
        background-color: white;
        width: 1px;
        height: calc(100% + 10px);
      }
      p {
        margin-right: 5px;
      }

      svg {
        width: 20px;
        margin: 0 5px;
      }
    }
  }

  .row-2 {
    display: flex;
  }

  img {
    cursor: pointer;
    width: 25px;
    margin-left: 10px;

    svg {
      .cls-1 {
        fill: red;
      }
    }

    ${effect.hover}
  }
`;

export const Signature = styled.div`
  background-color: ${color.tableCell};
  padding: 5px 20px 20px 50px;
  display: flex;
  justify-content: space-between;

  section {
    label {
      color: ${color.text};
    }

    :nth-child(2) {
      display: flex;
      align-items: center;
      margin-top: auto;
    }
  }

  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    input {
      border: none;
      background-color: ${color.border};
      color: ${color.textLight};
      height: 30px;
      width: 150px;
      border-radius: 5px;
      padding: 0 5px;
    }
  }
`;
