import styled from "styled-components";

import Colors from "Styles/colors";

import Row from "Atoms/Row";


export const Container = styled.div`
    
`;

export const StyledRow = styled(Row)`
    margin-top:5px;
`;

export const Label = styled.div`
    display: flex;
    text-align:start;
    margin-left:10px;
    margin-right:10px;
    font-family:'Roboto';
    color:${Colors.infoField.label};
`;