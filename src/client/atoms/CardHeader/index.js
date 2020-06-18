import React from "react";

import { Container, TitleContainer, IconContainer } from "./styles";

import Icon from "@mdi/react";

import StylesColors from "Styles/colors";
import LinearLoader from "atoms/LinearLoader";
import Row from "Atoms/Row";
import Column from "Atoms/Column";
import SpinLoader from "atoms/SpinLoader";

export default function CardHeader({ Title, style, iconPath, isLoading, colors }) {
  return (
    <Container>
      <Row style={{ flex: 1, }}>
        <Column>
          <IconContainer colors={colors}>
            <Icon path={iconPath} size={2} color={StylesColors.light} />
          </IconContainer>
        </Column>
        <Column style={{ flex: 1, }}>
          <TitleContainer>{Title}</TitleContainer>
        </Column>
      </Row>
      {isLoading && <Row style={{justifyContent: 'center', marginBottom:20}}>
        <SpinLoader color={colors.color}/>
      </Row>}
    </Container>
  );
}