import { createGlobalStyle } from "styled-components";

import AmericanaExtraBold from "../assets/Fonts/Americana T Extra Bold.woff2";
import Roboto from "../assets/Fonts/Roboto.woff2";

export default createGlobalStyle`
    @font-face {
        font-family: 'Americana T Extra Bold';
        src: local('Americana T Extra Bold'),
        url(${AmericanaExtraBold}) format('woff2');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Roboto';
        src: local('Roboto'),local('Roboto'),
        url(${Roboto}) format('woff2');
        font-weight: 300;
        font-style: normal;
    }
`;
