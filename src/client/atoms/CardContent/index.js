import React from 'react'

import { Container, StyledRow } from "./styles";
import Column from 'Atoms/Column'

export default function CardContent({isLoading, children, ...props}) {
    return (
        <StyledRow>
            <Column style={{width:'100%', display:isLoading && 'none'}}>
                {!isLoading && children}
            </Column>
        </StyledRow>
    )
}
