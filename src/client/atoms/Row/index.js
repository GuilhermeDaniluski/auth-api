import React from "react";

import { Container } from "./styles";

export default function Row({children,...props}) {
  return <Container {...props}>{children}</Container>;
}
