import styled from "styled-components";

export const Icon = styled.div`
  width: ${props => (props.width ? props.width : "24px")};
  height: ${props => (props.height ? props.height : "24px")};

  background-color: ${props => (props.color ? props.color : "#D2D5D2")};
  mask: url(${props => props.url}) no-repeat center / contain;
  -webkit-mask: url(${props => props.src}) no-repeat center / contain;
`;
