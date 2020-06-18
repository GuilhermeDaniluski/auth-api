import React, { useEffect, useState, useLayoutEffect } from 'react'

import { Container, StyledRow, Label } from './styles'
import CardContainer from 'Atoms/CardContainer'
import CardHeader from 'Atoms/CardHeader'
import Row from 'Atoms/Row'
import Column from 'Atoms/Column'
import { mdiDesktopClassic } from '@mdi/js'
import InfoField from 'Atoms/InfoField'
import { getCpuInfo, getLoadInfo } from 'services/systemInfo'
import CardContent from 'atoms/CardContent'
import { useSelector } from 'react-redux'

export default function CpuCard({ colorsObject, onChange }) {
  const [cpuData, setCpuData] = useState(null)
  const [loadData, setLoadData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const update = useSelector((state) => state.update.type)

  const fetchCpuData = async () => {
    return await getCpuInfo()
  }

  const fetchLoadData = async () => {
    return await getLoadInfo()
  }

  useEffect(() => {
    let isCancelled = false
    const fetchData = async () => {
      let respondeCpu = await fetchCpuData()
      let respondeLoad = await fetchLoadData()
      if (isCancelled) return
      setCpuData(respondeCpu)
      setLoadData(respondeLoad)
      setIsLoading(false)
    }
    fetchData()
    return () => {
      isCancelled = true
    }
  }, [update])

  useEffect(() => {
    onChange()
  }, [isLoading,update])

  return (
    <CardContainer>
      <CardHeader
        isLoading={isLoading}
        Title="CPU"
        iconPath={mdiDesktopClassic}
        colors={colorsObject}
      />
      <CardContent isLoading={isLoading}>
        {cpuData && loadData && (
          <>
            <StyledRow>
              <Column>
                <InfoField label="Fabricante" text={cpuData.manufacturer} />
              </Column>
              <Column style={{ flex: 1 }}>
                {cpuData.brand != '' && (
                  <InfoField
                    label="Modelo"
                    position="flex-end"
                    textAlign="end"
                    text={cpuData.brand}
                  />
                )}
              </Column>
            </StyledRow>
            <StyledRow>
              <Column>
                {loadData.avgload > 0 && (
                  <InfoField
                    label="Uso médio"
                    text={loadData.avgload > 0 && `${(loadData.avgload * 100).toFixed(0)}%`}
                  />
                )}
              </Column>
              <Column style={{ flex: 1 }}>
                {loadData.currentload > 0 && (
                  <InfoField
                    label="Uso atual"
                    position="flex-end"
                    textAlign="end"
                    text={loadData.currentload > 0 && `${loadData.currentload.toFixed(0)}%`}
                  />
                )}
              </Column>
            </StyledRow>
          </>
        )}
      </CardContent>
    </CardContainer>
  )
}
