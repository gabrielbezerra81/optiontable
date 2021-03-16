import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

import { Wrapper, Item, CorporationName, Buttons } from "./NavbarStyle";

import { Loadable, SearchInput } from "../UI";

import { optionsActions } from "../../store";

export const Navbar = ({ handleSettings, handleExit }) => {
  const dispatch = useDispatch();

  const { loadReactiveOptions, setFieldValues } = optionsActions;

  const { isLoadingRequest, navbar, reactiveOptionURL } = useSelector(
    state => state.options
  );

  const optionRef = useRef();

  function handleSearch() {
    const option = optionRef.current?.value;
    if (option) {
      dispatch(
        loadReactiveOptions({
          mainOption: option,
          tableOptions: ["PETRE722"] // "PETRE722"
        })
      );
    }
  }

  // const transformData = array => {
  //   const result = array.map(({symbol}) => {
  //     return{

  //     }
  //   })
  // };

  const getMenuData = array => {
    const result = array.find(
      ({ symbol }) => symbol === optionRef.current?.value.toUpperCase()
    );

    return result;
  };

  useEffect(() => {
    let eventSource;
    const result = [];

    if (reactiveOptionURL) {
      // eslint-disable-next-line no-undef
      eventSource = new EventSource(reactiveOptionURL);

      eventSource.onmessage = ({ data }) => {
        if (typeof data !== undefined) {
          result.push(JSON.parse(data));
          console.log(data);
        }

        const navbar = getMenuData(result);

        dispatch(setFieldValues({ field: "navbar", values: navbar }));
      };

      eventSource.onerror = error => {
        console.log("erro", error);
      };
    }

    return () => {
      if (reactiveOptionURL) {
        eventSource.close();
        // eventSource.removeEventListener("ping", () => {});
      }
    };
  }, [reactiveOptionURL]);

  return (
    <Wrapper className="draggableNavbar">
      <div className="search">
        <SearchInput
          inputProps={{
            ref: optionRef
          }}
          onSearch={handleSearch}
        />
      </div>

      <div className="items">
        <Item>
          <h1>Último preço</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p>{navbar?.ultimo}</p>
          </Loadable>
        </Item>

        <Item red>
          <h1>Oscilação</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p />
          </Loadable>
        </Item>

        <Item>
          <h1>Mínimo</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p />
          </Loadable>
        </Item>
        <Item>
          <h1>Máximo</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p />
          </Loadable>
        </Item>
        <Item>
          <h1>Compra</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p>{navbar?.compra}</p>
          </Loadable>
        </Item>
        <Item>
          <h1>Venda</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p>{navbar?.venda}</p>
          </Loadable>
        </Item>

        <Loadable isLoading={isLoadingRequest} className="loading">
          <CorporationName />
        </Loadable>
      </div>

      <Buttons>
        <SettingsIcon
          alt="Botão de configurações"
          className="button"
          onClick={handleSettings}
        />

        <CloseIcon
          className="button"
          alt=" Botão de fechar"
          onClick={handleExit}
        />
      </Buttons>
    </Wrapper>
  );
};
