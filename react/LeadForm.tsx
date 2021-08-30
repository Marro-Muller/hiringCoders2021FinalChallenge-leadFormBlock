import React, { useState } from "react";
import {
  ButtonStyled,
  Page,
  TextFieldStyled,
  TypographyStyled
} from "./LeadForm.style";
import InputMask from "react-input-mask";
import { OutlinedTextFieldProps } from "@material-ui/core";
import { useCssHandles } from "vtex.css-handles";
import { useMutation } from "react-apollo";
import SAVE_LEAD from "./queries/saveLead.graphql";

interface LeadInput {
  name: string;
  phoneNumber: string;
  email: string;
  type: string;
}

const CSS_HANDLES = ["leadForm"];

const LeadForm: React.FC = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [sent, setSent] = useState(false);
  const handles = useCssHandles(CSS_HANDLES);
  const [sendLead] = useMutation(SAVE_LEAD);

  const saveLead = () => {
    let validError = false;

    if (name == "") {
      validError = true;
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (phoneNumber == "") {
      setPhoneNumberError(true);
      validError = true;
    } else {
      const formattedPhone = phoneNumber.replace(/[^0-9]/g, "");
      if (formattedPhone.length != 11) {
        setPhoneNumberError(true);
        validError = true;
      } else {
        setPhoneNumberError(false);
      }
    }

    if (email == "") {
      setEmailError(true);
      validError = true;
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(email)) {
        setEmailError(false);
      } else {
        setEmailError(true);
        validError = true;
      }
    }

    if (validError) {
      setSent(false);
      return;
    }

    const leadListString = localStorage.getItem("leads");
    if (leadListString != null) {
      const newLead: LeadInput = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        type: "lead"
      };

      const newLeadList =
        "[" +
        leadListString.substring(1, leadListString.length - 1) +
        "," +
        JSON.stringify(newLead) +
        "]";
      localStorage.setItem("leads", newLeadList);
    } else {
      const newLead: LeadInput = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        type: "lead"
      };
      localStorage.setItem("leads", "[" + JSON.stringify(newLead) + "]");
    }

    sendLead({
      variables: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        type: "lead"
      }
    });

    setSent(true);

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
        {nameError === true ? (
          <TextFieldStyled
            error
            helperText="Nome inválido."
            variant="outlined"
            label="Nome completo"
            fullWidth
            value={name}
            onChange={event => setName(event.target.value)}
          />
        ) : (
          <TextFieldStyled
            variant="outlined"
            label="Nome completo"
            fullWidth
            value={name}
            onChange={event => setName(event.target.value)}
          />
        )}

        {phoneNumberError === true ? (
          <TextFieldMask
            error
            helperText="Telefone está incompleto."
            variant="outlined"
            label="Telefone"
            fullWidth
            mask="(99) 99999-9999"
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)}
          />
        ) : (
          <TextFieldMask
            variant="outlined"
            label="Telefone"
            fullWidth
            mask="(99) 99999-9999"
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)}
          />
        )}

        {emailError === true ? (
          <TextFieldStyled
            error
            helperText="Email inválido!"
            variant="outlined"
            label="E-mail"
            fullWidth
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        ) : (
          <TextFieldStyled
            variant="outlined"
            label="E-mail"
            fullWidth
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        )}
        {sent === true ? (
          <ButtonStyled onClick={saveLead}>Enviado!</ButtonStyled>
        ) : (
          <ButtonStyled variant="contained" onClick={saveLead}>Enviar</ButtonStyled>
        )}
      </Page>
    </div>
  );
};

LeadForm.schema = {
  title: "editor.leadForm.title",
  description: "editor.leadForm.description",
  type: "object",
  properties: {}
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
