import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Wrapper,
  Options,
  Main,
  MoveUp,
  MoveDown
} from "./OptionsContainerStyle";

import { Header, Call, Strike, Put, AllOptions } from "../components";

import { optionsActions } from "../../../store";

export const OptionsContainer = () => {
  const dispatch = useDispatch();

  const { loadOptions, setItemUp, setItemDown } = optionsActions;

  const { option, pagination, allStrikes } = useSelector(
    state => state.options
  );

  const { itemsAbove, itemsBelow } = pagination;

  function handleScroll(e) {
    e.preventDefault();

    if (e.deltaY > 0) {
      itemsBelow > 0 && dispatch(setItemDown());
    } else {
      itemsAbove > 0 && dispatch(setItemUp());
    }
  }

  // const reloadOptions = useCallback(() => {
  //   dispatch(loadReactiveOptions({ mainOption: "PETRE722" }));
  // }, [strikes]);

  useEffect(() => {
    if (option) {
      dispatch(loadOptions({ option }));
    }
  }, [option]);

  // useEffect(() => {
  //   reloadOptions();
  // }, [strikes]);

  return (
    <Wrapper>
      <Options>
        <Header />
        <MoveUp
          onClick={() => itemsAbove > 0 && dispatch(setItemUp())}
          disabled={itemsAbove < 1}
          display={allStrikes.length > 0 ? 1 : 0}
        >
          <span className="totalItems">
            Total de Itens: {allStrikes?.length}
          </span>
          <span className="countItems">Itens acima: {itemsAbove}</span>
        </MoveUp>
        <Main onWheel={allStrikes.length > 0 ? handleScroll : null}>
          <Call />
          <Strike />
          <Put />
        </Main>
        <MoveDown
          onClick={() => itemsBelow > 0 && dispatch(setItemDown())}
          disabled={itemsBelow < 1}
          display={allStrikes.length > 0 ? 1 : 0}
        >
          <span className="totalItems">
            Total de Itens: {allStrikes?.length}
          </span>
          <span className="countItems">Itens abaixo: {itemsBelow}</span>
        </MoveDown>
      </Options>

      <AllOptions />
    </Wrapper>
  );
};
