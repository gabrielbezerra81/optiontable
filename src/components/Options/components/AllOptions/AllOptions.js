import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useUndo from "use-undo";

import searchIcon from "../../../../assets/icons/search-icon.svg";
import undoIcon from "../../../../assets/icons/undo.svg";
import redoIcon from "../../../../assets/icons/redo.svg";
import closeIcon from "../../../../assets/icons/close.svg";
import moreOrLessIcon from "../../../../assets/icons/more-or-less.svg";
import arrowsIcon from "../../../../assets/icons/horizontal-arrows.svg";
import bellIcon from "../../../../assets/icons/bell.svg";
import settings from "../../../../assets/icons/settings.svg";

import {
  Wrapper,
  Header,
  Actions,
  Options,
  Table,
  TableHeader,
  TableContent,
  TableRow,
  Slider,
  Alert,
  Signature
} from "./AllOptionsStyle";

import { Icon, Loadable } from "../../../UI";

import { color } from "../../../../config/styles";

import { optionsActions } from "../../../../store";

export const AllOptions = () => {
  const dispatch = useDispatch();

  const { removeTableOption, setFieldValues } = optionsActions;

  const { isLoadingRequest, allOptions, allStrikes, option } = useSelector(
    state => state.options
  );

  const [{ present }, { set, undo, redo, reset, canUndo, canRedo }] = useUndo(
    allOptions
  );

  useEffect(() => {
    set(allOptions);
  }, [allOptions]);

  useEffect(() => {
    reset([]);
  }, [option]);

  useEffect(() => {
    dispatch(setFieldValues({ field: "allOptions", values: present }));
  }, [present]);

  return (
    <Wrapper>
      <Header>
        <div className="body"></div>

        <div className="strategy">
          <h2>Estratégia</h2>
        </div>

        <div className="search">
          <Icon src={searchIcon} color={color.primaryLight} />
        </div>
      </Header>

      <Actions>
        <button className="button" onClick={undo} disabled={!canUndo}>
          <h2>Desfazer</h2> <Icon src={undoIcon} />
        </button>

        <button className="button" onClick={redo} disabled={!canRedo}>
          <h2>Refazer</h2> <Icon src={redoIcon} />
        </button>

        <button
          className="button"
          onClick={() =>
            dispatch(setFieldValues({ field: "allOptions", values: [] }))
          }
          disabled={present.length < 1}
        >
          <h2>Limpar</h2> <Icon src={closeIcon} width="20px" />
        </button>
      </Actions>
      <Loadable isLoading={isLoadingRequest} center>
        <div />
      </Loadable>
      {allStrikes.length > 0 && (
        <Fragment>
          <Options>
            <div className="button">
              <h2>Strikes</h2>
              <Icon src={moreOrLessIcon} />
            </div>

            <div className="button">
              <h2>Largura</h2>
              <Icon src={moreOrLessIcon} />
            </div>

            <div className="button">
              <h2> QTDE</h2>
              <Icon src={moreOrLessIcon} />
            </div>

            <div className="button">
              <h2>Vencimentos</h2>
              <Icon src={moreOrLessIcon} />
            </div>

            <div className="button">
              <h2>Iverter C/V</h2>
              <Icon src={arrowsIcon} />
            </div>
          </Options>

          <Table>
            <TableHeader>
              <h2>Cód</h2>
              <h2>C/V</h2>
              <h2>QTDE</h2>
              <h2>VCTO</h2>
              <h2>Strike</h2>
              <div></div>
            </TableHeader>

            <TableContent>
              {present.map(option => (
                <TableRow key={option.id} cv={option.cv} flag={option.model}>
                  <div className="cod">
                    <p>{option.symbol}</p>
                  </div>

                  <div className="cv">
                    <div className="buy">
                      <p>C</p>
                    </div>

                    <div className="sell">
                      <p>V</p>
                    </div>
                  </div>

                  <div className="qtde">
                    <p>{option.quantity}</p>

                    <div className="buttons">
                      <div className="up" />

                      <div className="down" />
                    </div>
                  </div>

                  <div className="vcto">
                    <p>{option.expiration}</p>

                    <div className="buttons">
                      <div className="up" />

                      <div className="down" />
                    </div>
                  </div>

                  <div className="strike">
                    <p>{option.strike}</p>

                    <div className="buttons">
                      <div className="up" />

                      <div className="down" />
                    </div>
                  </div>

                  <div className="type">
                    <p>{option.type}</p>

                    <img
                      //src={require(`assets/icons/flags/${option.model.toUpperCase()}.svg`)}
                      alt=""
                    />

                    <div
                      className="close"
                      // onClick={() => {
                      //   option.type === "CALL"
                      //     ? dispatch(removeTableCallOption(option.id))
                      //     : dispatch(removeTablePutOption(option.id));
                      // }}
                      onClick={() => {
                        dispatch(removeTableOption({ id: option.id }));
                      }}
                    >
                      <p>x</p>
                    </div>
                  </div>
                </TableRow>
              ))}
            </TableContent>
          </Table>

          <Slider>
            <div className="slide">
              <div className="title">
                <p>Mín</p>
                <p>Médio</p>
                <p>Máx</p>
              </div>

              <div className="content">
                <div className="control" />
              </div>

              <div className="values">
                <p>4.02</p>
                <p>4.295</p>
                <p>4.50</p>
              </div>
            </div>
          </Slider>

          <Alert>
            <div className="col">
              <div className="row">
                <p>Preço:</p>

                <div className="amount">
                  <p>100.000.000.000</p>

                  <div className="buttons">
                    <div className="up" />

                    <div className="down" />
                  </div>
                </div>
              </div>

              <div className="row">
                <p>Validade: </p>

                <div className="amount">
                  <p>100.000.000.000</p>

                  <div className="buttons">
                    <div className="up" />

                    <div className="down" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="value">
                <p>TOTAL:</p> <p>R$187.789,00</p>
              </div>

              <div className="row-2">
                <div className="button">
                  <div className="alert">
                    <p> Cadastar alerta!</p>
                    <span />
                    <Icon src={bellIcon} />
                  </div>
                </div>

                <img src={settings} alt="" />
              </div>
            </div>
          </Alert>

          <Signature>
            <section>
              <div className="input">
                <label htmlFor="signature">Assinatura eletrônica</label>
                <input type="text" />
              </div>

              <button>Comprar</button>
            </section>

            <section>
              <input type="CHECKBOX" />
              <label htmlFor="save"> Salvar assinatura</label>
            </section>
          </Signature>
        </Fragment>
      )}
    </Wrapper>
  );
};
