import React from "react";
import { useSelector } from "react-redux";

import arrow from "../../../../assets/icons/arrow.svg";
import horizontalLines from "../../../../assets/icons/horizontal-lines.svg";

import { Loadable } from "../../../UI";

import {
  Wrapper,
  TableHeader,
  TableContent,
  TableContentHeader,
  TableContentRow
} from "./StrikeStyle";

export const Strike = () => {
  const { isLoadingRequest, strikes } = useSelector(state => state.options);

  return (
    <Wrapper>
      <TableHeader>
        <h1>Strike</h1>
        <img src={arrow} alt="Seta" />
      </TableHeader>

      <TableContent>
        <TableContentHeader cols={3}>
          <h1>PETR</h1>
          <h1>13d</h1>
          <h1>PETR</h1>
        </TableContentHeader>
        <Loadable isLoading={isLoadingRequest} center>
          {strikes.map(strike => (
            <TableContentRow key={strike.id} cols={3}>
              <p className="code">H27</p>
              <p>{strike.strike}</p>
              <p className="code">H27</p>
              <img src={horizontalLines} alt="Linhas horizontais" />
            </TableContentRow>
          ))}
        </Loadable>
      </TableContent>
    </Wrapper>
  );
};
