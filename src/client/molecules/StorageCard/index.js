import React, { useEffect, useState } from "react";

import { Container, StyledRow, Label } from "./styles";
import CardContainer from "atoms/CardContainer";
import CardHeader from "Atoms/CardHeader";
import Row from "Atoms/Row";
import Column from "Atoms/Column";
import { mdiHarddisk } from "@mdi/js";
import InfoField from "Atoms/InfoField";
import { getDiskInfo } from "services/systemInfo";
import CardContent from "atoms/CardContent";
import unitConverter from "Utils/unitConverter";
import CustomRadialBarChart from "atoms/CustomRadialBarChart";
import Divider from "Atoms/Divider";
import { useSelector } from "react-redux";

export default function StorageCard({ colorsObject, onChange }) {
  const [diskData, setDiskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const update = useSelector(state => state.update.type)

  const fetchDiskData = async () => {
    return await getDiskInfo();
  };


  useEffect(() => {
    let isCancelled = false
    const fetchData = async () => {
      let response = await fetchDiskData()
      if (isCancelled) return
      if (!response) return
      setDiskData(response)
      setIsLoading(false)
    }

    fetchData()

    return () => {
      isCancelled = true
    }
  }, [update])


  useEffect(() => {
    onChange()
  }, [isLoading, update])

  return (
    <CardContainer>
      <CardHeader
        isLoading={isLoading}
        Title="Dados do Disco"
        iconPath={mdiHarddisk}
        colors={colorsObject}
      />
      <CardContent isLoading={isLoading}>
        {diskData.length > 0 && diskData.map((disk, index) => {
          return (
            <div key={disk.fs}>
              {index > 0 && (
                <Divider containerStyle={{ marginTop: 15, marginBottom: 15 }}/>
              )}
              <Row style={{ fontFamily: 'Roboto', justifyContent: 'center', }}>
                {`Disco ${index + 1}`}
              </Row>
              <Row>
                <Column>
                  <StyledRow>
                    <Column>
                      <InfoField label="Nome" text={disk.fs} />
                    </Column>
                    <Column>
                      <InfoField label="Tipo" text={disk.type} />
                    </Column>
                  </StyledRow>
                  <StyledRow style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <InfoField
                      label="Tamanho"
                      text={unitConverter(disk.size)}
                    />
                  </StyledRow>
                </Column>
                <StyledRow style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                  <Column style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Label>Usado(%)</Label>
                    <CustomRadialBarChart color={colorsObject.color} value={disk.use.toFixed(0)} />
                  </Column>
                </StyledRow>
              </Row>
            </div>
          );
        })}
      </CardContent>
    </CardContainer>
  );
}
