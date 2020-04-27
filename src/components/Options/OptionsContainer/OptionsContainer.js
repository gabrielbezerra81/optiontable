import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Wrapper, Options, ShowMore } from "./OptionsContainerStyle";

import { Call, Strike, Put, AllOptions } from "../components";

import { optionsActions } from "../../../store";

export const OptionsContainer = () => {
  const dispatch = useDispatch();

  const { loadOptions } = optionsActions;

  const { option } = useSelector(state => state.options);

  useEffect(() => {
    if (option) {
      dispatch(loadOptions({ option }));
    }
  }, [option]);

  return (
    <Wrapper>
      <Options>
        <div className="content">
          <Call />
          <Strike />
          <Put />
        </div>
        <ShowMore />
      </Options>

      <AllOptions />
    </Wrapper>
  );
};
