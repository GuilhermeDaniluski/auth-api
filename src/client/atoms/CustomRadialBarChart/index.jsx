import React, { useState, useEffect } from "react";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import { Container } from "./styles";
import colors from "Styles/colors";

export default function CustomRadialBarChart({ value, size,color }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        name: "18-24",
        value: value,
        fill: color,
      },
    ]);
  }, [value]);

  return (
    <Container>
      <RadialBarChart
        domain={[0, 100]}
        innerRadius={20}
        outerRadius={40}
        data={data}
        {...size}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          dataKey={"value"}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          minAngle={15}
          label={{ position: "center", fill:colors.infoField.value, fontFamily:'Roboto', fontWeight:200}}
          background
          clockWise
          dataKey="value"
        />
      </RadialBarChart>
    </Container>
  );
}

CustomRadialBarChart.defaultProps = {
  size: {
    height: 55,
    get width() {
      return this.height;
    },
    barSize: 10,
  },
};
