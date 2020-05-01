import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import settingsIcon from "../../assets/icons/settings.svg";
import closeIcon from "../../assets/icons/close.svg";

import { Wrapper, Item, CorporationName, Buttons } from "./NavbarStyle";

import { Loadable, SearchInput } from "../UI";

import { optionsActions } from "../../store";

export const Navbar = ({ handleSettings, handleExit }) => {
  const dispatch = useDispatch();

  const { loadReactiveOptions, navbar } = optionsActions;

  const { isLoadingRequest } = useSelector(state => state.options);

  const optionRef = useRef();

  function handleSearch() {
    const option = optionRef.current?.value;
    if (option) {
      dispatch(
        loadReactiveOptions({
          mainOption: option
        })
      );
    }
  }

  // const source = new EventSource(
  //   `http://173.249.37.183:8090/quotes/symbols?symbols=${optionRef.current?.value.toUpperCase()}`
  // );

  // const loadNavbarContent = useCallback(() => {
  //   source.onmessage = function(event) {
  //     if (typeof event.data !== "undefined") {
  //       console.log(isDataNotEmpty);
  //       isDataNotEmpty &&
  //         dispatch(
  //           setFieldValues({ field: "navbar", values: JSON.parse(event.data) })
  //         );
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   isDataNotEmpty && loadNavbarContent();
  // }, [source, isDataNotEmpty]);

  return (
    <Wrapper>
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
            <p></p>
          </Loadable>
        </Item>

        <Item>
          <h1>Mínimo</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p></p>
          </Loadable>
        </Item>
        <Item>
          <h1>Máximo</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p></p>
          </Loadable>
        </Item>
        <Item>
          <h1>Compra</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p></p>
          </Loadable>
        </Item>
        <Item>
          <h1>Venda</h1>
          <Loadable isLoading={isLoadingRequest} className="loading">
            <p></p>
          </Loadable>
        </Item>

        <Loadable isLoading={isLoadingRequest} className="loading">
          <CorporationName></CorporationName>
        </Loadable>
      </div>

      <Buttons>
        <img
          src={settingsIcon}
          alt="Botão de configurações"
          className="button"
          onClick={handleSettings}
        />
        <img
          src={closeIcon}
          alt=" Botão de fechar"
          className="button"
          onClick={handleExit}
        />
      </Buttons>
    </Wrapper>
  );
};
