import React from 'react'

import { Container } from './styles'

export default function CardContainer({children,...props}) {
    return (
        <Container {...props}>
            {children}
        </Container>
    )
}
