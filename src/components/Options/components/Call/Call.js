import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Loadable } from "../../../UI";

import { TableContent } from "../Commons";
import { Wrapper, TableContentRow, RowSelected } from "./CallStyle";

import { optionsActions } from "../../../../store";

export const Call = () => {
  const dispatch = useDispatch();

  const { setTableOption, removeTableOption } = optionsActions;

  const { isLoadingRequest, calls, allOptions } = useSelector(
    state => state.options
  );

  return (
    <Wrapper>
      <TableContent>
        <Loadable
          isLoading={isLoadingRequest}
          center
          className="loadable-margin"
        >
          {calls.map(call => (
            <TableContentRow key={call.id} cols={6}>
              <p className="M">
                {call.model === "AMERICAN" && "A"}

                {call.model === "EUROPEAN" && "E"}
              </p>
              <p>26.90</p>
              <p>26.90</p>
              <p>26.90</p>
              <p
                className="value"
                onClick={() => {
                  dispatch(
                    setTableOption({
                      ...call,
                      cv: "sell"
                    })
                  );
                }}
              >
                {call.compra?.toFixed(2)}
              </p>
              <p
                className="value"
                onClick={() => {
                  dispatch(
                    setTableOption({
                      ...call,
                      cv: "buy"
                    })
                  );
                }}
              >
                {call.venda?.toFixed(2)}
              </p>

              <RowSelected
                active={
                  allOptions.filter(({ id }) => id === call.id)[0] !== undefined
                    ? allOptions.filter(({ id }) => id === call.id)[0].cv
                    : ""
                }
              >
                <div
                  className="type"
                  onClick={() => {
                    dispatch(
                      setTableOption({
                        ...call
                      })
                    );
                  }}
                >
                  <span>
                    {allOptions.filter(({ id }) => id === call.id)[0] !==
                    undefined
                      ? allOptions.filter(({ id }) => id === call.id)[0]
                          .initials
                      : ""}
                  </span>
                </div>

                <div
                  className="remove"
                  onClick={() => dispatch(removeTableOption({ id: call.id }))}
                >
                  <span>x</span>
                </div>
              </RowSelected>
            </TableContentRow>
          ))}
        </Loadable>
      </TableContent>
    </Wrapper>
  );
};
