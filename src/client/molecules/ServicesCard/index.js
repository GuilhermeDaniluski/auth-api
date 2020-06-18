import React, { useEffect, useState } from "react";

import { Container, StyledRow } from "./styles";
import CardContainer from "atoms/CardContainer";
import CardHeader from "Atoms/CardHeader";
import Row from "Atoms/Row";
import Column from "Atoms/Column";
import { mdiScriptTextOutline } from '@mdi/js';
import InfoField from "Atoms/InfoField";
import { getServicesInfo } from "services/systemInfo";
import CardContent from "atoms/CardContent";
import Divider from "Atoms/Divider";
import { useSelector } from "react-redux";


export default function ServicesCard({ colorsObject, onChange, ...props }) {
  const [servicesData, setServicesData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const update = useSelector(state => state.update.type)
  

  const fetchServicesData = async () => {
    return await getServicesInfo();
  };

  useEffect(() => {
    let isCancelled = false
    const fetchData = async () => {
      let response = await fetchServicesData()
      if (isCancelled) return
      if (!response) return
      setServicesData(response)
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
        Title="Serviços"
        iconPath={mdiScriptTextOutline}
        colors={colorsObject}
      />
      <CardContent isLoading={isLoading}>
        {servicesData.length > 0 && servicesData.map((service, index) => {
          return (
            <div key={service.name}>
              <StyledRow>
                <Column style={{ flex: 1 }}>
                  <InfoField text={service.name} />
                </Column>
                <Column>
                  <InfoField position='flex-end' isRunning={service.running} />
                </Column>
              </StyledRow>
            </div>
          )
        })}
      </CardContent>
    </CardContainer>
  );
}
