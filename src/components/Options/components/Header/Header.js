import React, { useState } from "react";

import arrow from "../../../../assets/icons/arrow.svg";

import {
  TableHeader,
  TableHeaderTitle,
  TableHeaderDate,
  TableContent,
  TableContentHeader
} from "../Commons";
import {
  Wrapper,
  StrikeTableHeader,
  StrikeTableContentHeader
} from "./HeaderStyle";

export const Header = () => {
  const [isToRotate, setIsToRotate] = useState(false);

  function handleStrikeOrder() {
    setIsToRotate(!isToRotate);
  }

  return (
    <Wrapper>
      <section>
        <TableHeader>
          <TableHeaderDate>
            <span />
            27/07/2019
          </TableHeaderDate>

          <TableHeaderTitle>Call</TableHeaderTitle>
        </TableHeader>
        <TableContent>
          <TableContentHeader cols={6}>
            <h1>M</h1>
            <h1>Taxa</h1>
            <h1>VE</h1>
            <h1>VI</h1>
            <h1>Compra</h1>
            <h1>Venda</h1>
          </TableContentHeader>
        </TableContent>
      </section>

      <section>
        <StrikeTableHeader rotate={isToRotate ? 1 : 0}>
          <h1>Strike</h1>
          <img onClick={handleStrikeOrder} src={arrow} alt="Seta" />
        </StrikeTableHeader>
        <TableContent>
          <StrikeTableContentHeader cols={3}>
            <h1>PETR</h1>
            <h1>13d</h1>
            <h1>PETR</h1>
          </StrikeTableContentHeader>
        </TableContent>
      </section>

      <section>
        <TableHeader right>
          <TableHeaderTitle>Put</TableHeaderTitle>

          <TableHeaderDate right>
            27/07/2019
            <span />
          </TableHeaderDate>
        </TableHeader>

        <TableContent>
          <TableContentHeader cols={5}>
            <h1>Compra</h1>
            <h1>Venda</h1>
            <h1>VI</h1>
            <h1>VE</h1>
            <h1>Taxa</h1>
          </TableContentHeader>
        </TableContent>
      </section>
    </Wrapper>
  );
};
