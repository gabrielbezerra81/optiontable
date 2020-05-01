import React from "react";
import { useSelector } from "react-redux";

import horizontalLines from "../../../../assets/icons/horizontal-lines.svg";

import { Loadable } from "../../../UI";

import { Wrapper, TableContent, TableContentRow } from "./StrikeStyle";

export const Strike = () => {
  const { isLoadingRequest, strikes } = useSelector(state => state.options);

  return (
    <Wrapper>
      <TableContent>
        <Loadable
          isLoading={isLoadingRequest}
          center
          className="loadable-margin"
        >
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
