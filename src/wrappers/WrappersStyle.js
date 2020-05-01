import { createGlobalStyle } from "styled-components";

import { font, color } from "../config/styles";

export const GlobalStyle = createGlobalStyle`
  @import url("https://use.typekit.net/sww7xwr.css");
  body{
    margin: 0;
    padding: 0;
    background-color: black;
    max-width: 1650px;
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a, p, h1, h2, h3, label{
      margin: 0;
      padding: 0;
      font-family: ${font.family.title};
      font-weight: normal;
    }

    p{
      font-family: ${font.family.content};
    }

    h2{
      font-size: ${font.size.title};
      color: ${color.text};
      text-transform: uppercase;
    }

    .loadable-margin{
      margin-top: 50px;
    }
  }
`;
