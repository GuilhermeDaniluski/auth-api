import styled, { keyframes } from "styled-components";

import Colors from "Styles/colors";

import MaterialIcon from "@mdi/react";

export const Container = styled.div`
    display: flex;
    flex:1;
    flex-direction:column;
    width:100%;
    padding-top:10px;
    padding-right:10px;
`;

export const LabelContainer = styled.div`
    display: flex;
    flex:1;
    text-align:start;
    margin-left:10px;
    margin-right:10px;
    font-family:'Roboto';
    color:${Colors.infoField.label};
`;

export const ValueContainer = styled.div`
    font-family:'Roboto';
    display: flex;
    flex:1;
    margin-right:20px;
    margin-left:20px;
    color:${Colors.infoField.value};
`;

const fadeInOut = keyframes`
  from { opacity: 0; } 
`;


export const Icon = styled(MaterialIcon)`
    margin-left:10px;
    margin-right:10px;
    animation:  ${ props=> props.isrunning == 'true'? fadeInOut : ''} 0.5s infinite alternate;
`