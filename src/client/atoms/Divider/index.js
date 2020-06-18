import React from 'react';

import MaterialDivider from "@material-ui/core/Divider";
import colors from "Styles/colors";


export default function Divider({containerStyle, dividerStyle}) {
    return (
        <div style={{display:'flex',flex:1, justifyContent:'center', alignItems: 'center',width:'100%',...containerStyle}}>
            <MaterialDivider
                variant="middle"
                style={{ flex:1, backgroundColor: colors.lightGrey, width: '50%',...dividerStyle }}
            />
        </div>

    );
}
