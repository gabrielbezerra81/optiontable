import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Loadable } from "../../../UI";

import {
  TableContent,
  TableHeader,
  TableHeaderDate,
  TableHeaderTitle,
  TableContentHeader
} from "../Commons";
import { Wrapper, TableContentRow, RowSelected } from "./CallStyle";

import { optionsActions } from "../../../../store";

export const Call = () => {
  const dispatch = useDispatch();

  const { setTableCallOption, removeTableCallOption } = optionsActions;

  const { isLoadingRequest, calls } = useSelector(state => state.options);

  return (
    <Wrapper>
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
        <Loadable isLoading={isLoadingRequest} center>
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
                    setTableCallOption({
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
                    setTableCallOption({
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
                  calls.filter(({ id }) => id === call.id)[0] !== undefined
                    ? calls.filter(({ id }) => id === call.id)[0].cv
                    : ""
                }
              >
                <div
                  className="type"
                  onClick={() => {
                    dispatch(
                      setTableCallOption({
                        ...call
                      })
                    );
                  }}
                >
                  <span>
                    {calls.filter(({ id }) => id === call.id)[0] !== undefined
                      ? calls.filter(({ id }) => id === call.id)[0].initials
                      : ""}
                  </span>
                </div>

                <div
                  className="remove"
                  onClick={() =>
                    dispatch(removeTableCallOption({ id: call.id }))
                  }
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
