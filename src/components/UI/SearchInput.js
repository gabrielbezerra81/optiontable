import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import searchIcon from "../../assets/icons/search-icon.svg";
import { color } from "../../config/styles";

export const Wrapper = styled.div`
  display: flex;
`;

export const Input = styled.input`
  text-transform: uppercase;
  background-color: black;
  border: 2pt solid ${color.primaryLight};
  border-radius: 5px 0 0 5px;
  color: ${color.text};
  text-align: center;
  font-size: 12pt;
  font-family: myriad-pro, sans-serif;
  line-height: 20pt;
`;

export const Button = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.primaryLight};
  border-radius: 0 5px 5px 0;
  :hover {
    opacity: 0.8;
  }
  img {
    width: 20px;
  }
`;

export const SearchInput = ({ inputProps, onSearch }) => {
  function handlePress(event) {
    if (event.key === "Enter") {
      onSearch();
    }
  }
  return (
    <Wrapper>
      <Input onKeyPress={handlePress} {...inputProps} />
      <Button data-value="123" onClick={onSearch}>
        <img src={searchIcon} alt="ícone de pesquisa" />
      </Button>
    </Wrapper>
  );
};

SearchInput.propTypes = {
  inputProps: PropTypes.object,
  onSearch: PropTypes.func
};
