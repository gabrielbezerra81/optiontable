import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Loadable } from "../../../UI";

import { TableContent } from "../Commons";
import { Wrapper, TableContentRow, RowSelected } from "./PutStyle";

import { optionsActions } from "../../../../store";

export const Put = () => {
  const dispatch = useDispatch();

  const { setTableOption, removeTableOption } = optionsActions;

  const { isLoadingRequest, puts, allOptions } = useSelector(
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
          {puts.map(put => (
            <TableContentRow key={put.id} cols={5}>
              <p
                className="value"
                onClick={() =>
                  dispatch(
                    setTableOption({
                      ...put,
                      cv: "sell"
                    })
                  )
                }
              >
                {put.compra?.toFixed(2)}
              </p>

              <p
                className="value"
                onClick={() =>
                  dispatch(
                    setTableOption({
                      ...put,
                      cv: "buy"
                    })
                  )
                }
              >
                {put.venda?.toFixed(2)}
              </p>
              <p>26.90</p>
              <p>26.90</p>
              <p>26.90</p>

              <RowSelected
                active={
                  allOptions.filter(({ id }) => id === put.id)[0] !== undefined
                    ? allOptions.filter(({ id }) => id === put.id)[0].cv
                    : ""
                }
              >
                <div
                  className="type"
                  onClick={() =>
                    dispatch(
                      setTableOption({
                        ...put
                      })
                    )
                  }
                >
                  <span>
                    {allOptions.filter(({ id }) => id === put.id)[0] !==
                    undefined
                      ? allOptions.filter(({ id }) => id === put.id)[0].initials
                      : ""}
                  </span>
                </div>

                <div
                  className="remove"
                  onClick={() => dispatch(removeTableOption({ id: put.id }))}
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
