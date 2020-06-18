import React, { useEffect, useState } from "react";

import { Container, StyledRow } from "./styles";
import CardContainer from "atoms/CardContainer";
import CardHeader from "Atoms/CardHeader";
import Row from "Atoms/Row";
import Column from "Atoms/Column";
import { mdiLinux } from "@mdi/js";
import InfoField from "Atoms/InfoField";
import { getOsInfo } from "services/systemInfo";
import CardContent from "atoms/CardContent";
import { useSelector } from "react-redux";

export default function SystemCard({ colorsObject, onChange }) {
  const [osData, setOsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const update = useSelector(state => state.update.type)

  const fetchOsData = async () => {
    return await getOsInfo();
  };

  useEffect(() => {
    let isCancelled = false
    const fetchData = async () => {
      let response = await fetchOsData()
      if (isCancelled) return
      if (!response) return
      setOsData(response)
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
        Title="Sistema"
        iconPath={mdiLinux}
        colors={colorsObject}
      />
      {osData && <CardContent isLoading={isLoading}>
        <StyledRow>
          <Column>
            <InfoField label="Plataforma" text={osData.platform} />
          </Column>
          <Column style={{ flex: 1 }}>
            <InfoField label="Distribuição" position='flex-end'
              textAlign='end'
              text={osData.distro} />
          </Column>
        </StyledRow>
        <StyledRow>
          <Column>
            <InfoField label="Versão" text={osData.release} />
          </Column>
          <Column style={{ flex: 1 }}>
            <InfoField label="Arquitetura" position='flex-end'
              textAlign='end'
              text={osData.arch} />
          </Column>
        </StyledRow>
      </CardContent>}
    </CardContainer>
  );
}
