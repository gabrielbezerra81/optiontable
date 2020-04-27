import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Loadable } from "../../../UI";

import {
  TableHeader,
  TableHeaderTitle,
  TableHeaderDate,
  TableContent,
  TableContentHeader
} from "../Commons";
import { Wrapper, TableContentRow, RowSelected } from "./PutStyle";

export const Put = () => {
  const dispatch = useDispatch();

  const { isLoadingRequest, puts } = useSelector(state => state.options);

  return (
    <Wrapper>
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
        <Loadable isLoading={isLoadingRequest} center>
          {puts.map(put => (
            <TableContentRow key={put.id} cols={5}>
              <p
                className="value"
                onClick={() =>
                  dispatch(
                    setTablePutOption({
                      ...put,
                      cv: "sell"
                    })
                  )
                }
              >
                {/* {put.compra && put.compra.toFixed(2)} */}
              </p>

              <p
                className="value"
                onClick={() =>
                  dispatch(
                    setTablePutOption({
                      ...put,
                      cv: "buy"
                    })
                  )
                }
              >
                {/* {put.venda && put.venda.toFixed(2)} */}
              </p>
              <p>26.90</p>
              <p>26.90</p>
              <p>26.90</p>

              <RowSelected
                active={
                  puts.filter(({ id }) => id === put.id)[0] !== undefined
                    ? puts.filter(({ id }) => id === put.id)[0].cv
                    : ""
                }
              >
                <div
                  className="type"
                  onClick={() =>
                    dispatch(
                      setTablePutOption({
                        ...put
                      })
                    )
                  }
                >
                  <span>
                    {puts.filter(({ id }) => id === put.id)[0] !== undefined
                      ? puts.filter(({ id }) => id === put.id)[0].initials
                      : ""}
                  </span>
                </div>

                <div
                  className="remove"
                  onClick={() => dispatch(removeTablePutOption(put.id))}
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
