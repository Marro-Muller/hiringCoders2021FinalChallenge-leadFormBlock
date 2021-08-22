import React, { useState } from "react";
import {
  ButtonStyled,
  Page,
  TextFieldStyled,
  TypographyStyled,
} from "./LeadForm.style";
import InputMask from "react-input-mask";
import { OutlinedTextFieldProps } from "@material-ui/core";
import { useCssHandles } from "vtex.css-handles";

// interface ILead {
//  name: string;
//  phoneNumber: string;
//  email: string;
//}

const CSS_HANDLES = ["leadForm"];

const LeadForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const handles = useCssHandles(CSS_HANDLES);

  const saveLead = () => {
    // const leadListString = localStorage.getItem("leads");
    // if (leadListString != null) {
    //   const newLead: ILead = {
    //     name: name,
    //     email: email,
    //     phoneNumber: phoneNumber,
    //   };

    //   const newLeadList =
    //     "[" +
    //     leadListString.substring(1, leadListString.length - 1) +
    //     "," +
    //     JSON.stringify(newLead) +
    //     "]";
    //   localStorage.setItem("leads", newLeadList);
    // } else {
    //   const newLead: ILead = {
    //     name: name,
    //     email: email,
    //     phoneNumber: phoneNumber,
    //   };
    //   localStorage.setItem("leads", "[" + JSON.stringify(newLead) + "]");
    // }

    setName("");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <div className={`${handles.leadForm}`}>
      <Page elevation={2}>
        <TypographyStyled>
          Se inscreva para receber nossas promoções!
        </TypographyStyled>
        <TextFieldStyled
          variant="outlined"
          label="Nome completo"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextFieldMask
          variant="outlined"
          label="Telefone"
          fullWidth
          mask="(99) 99999-9999"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <TextFieldStyled
          variant="outlined"
          label="E-mail"
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <ButtonStyled onClick={saveLead}>Enviar</ButtonStyled>
      </Page>
    </div>
  );
};

LeadForm.schema = {
  title: "editor.leadForm.title",
  description: "editor.leadForm.description",
  type: "object",
  properties: {},
};

export interface TextFieldMaskProps extends OutlinedTextFieldProps {
  mask: string;
  value: string | number | readonly string[];
}

const TextFieldMask: React.FC<TextFieldMaskProps> = ({
  mask,
  value,
  onChange,
  ...props
}) => {
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {() => {
        return <TextFieldStyled {...props} />;
      }}
    </InputMask>
  );
};

export default LeadForm;
