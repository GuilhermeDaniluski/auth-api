import React from "react";

import { Container, LabelContainer, ValueContainer, Icon} from "./styles";
import colors from "Styles/colors";
import { mdiCheckboxBlankCircle } from '@mdi/js';

export default function InfoField({ label, value, text,position, isRunning,textAlign, ...props }) {
  return (
    <Container style={{alignItems:position,textAlign:textAlign}} {...props}>
      {(value != null || text != null || isRunning != null) && <LabelContainer>{label}</LabelContainer>}
      {value != null && <ValueContainer>{value}%</ValueContainer>}
      {text && <ValueContainer>{text}</ValueContainer>}
      {isRunning != null && <Icon path={mdiCheckboxBlankCircle} isrunning={isRunning.toString()} size={0.7} color={(isRunning ? colors.active : colors.inactive)}/>}
    </Container>
  );
}

