import styled from "styled-components";

import { Typography, Button, Paper, TextField } from "@material-ui/core";

export const Page = styled(Paper)`
  background-color: #eeeeee;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TypographyStyled = styled(Typography)`
  color: #212121;
  font-weight: bold;
`;

export const TextFieldStyled = styled(TextField)`
  margin: 10px 0;
  .MuiInputBase {
    background-color: #eeeeee;
  }

  .MuiOutLinedInput-notchedOutLine {
    border-color: #cccccc;
  }
`;

export const ButtonStyled = styled(Button)`
  padding: 10px;
  background-color: #212121;
  color: #eeeeee;
  border-radius: 20px;
`;
