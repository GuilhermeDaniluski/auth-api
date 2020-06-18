import React from "react";

import { Container } from "./styles";

export default function Column({children,...props}) {
  return <Container {...props}>{children}</Container>;
}
