import React, { useEffect, useState } from 'react'

import { Container, StyledRow } from './styles'
import CardContainer from 'atoms/CardContainer'
import CardHeader from 'Atoms/CardHeader'
import Row from 'Atoms/Row'
import Column from 'Atoms/Column'
import { mdiMemory } from '@mdi/js'
import InfoField from 'Atoms/InfoField'
import { getMemInfo } from 'services/systemInfo'
import CardContent from 'atoms/CardContent'
import unitConverter from 'Utils/unitConverter'
import { useSelector } from 'react-redux'

export default function MemoryCard({ colorsObject, onChange }) {
  const [memData, setMemData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const update = useSelector(state => state.update.type)
  
  const fetchMemData = async () => {
    return await getMemInfo()
  }

  useEffect(() => {
    let isCancelled = false
    const fetchData = async () => {
      let response = await fetchMemData()
      if (isCancelled) return
      if (!response) return
      setMemData(response)
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
        Title="Memória"
        iconPath={mdiMemory}
        colors={colorsObject}
      />
      {memData && <CardContent isLoading={isLoading}>
        <StyledRow>
          <Column>
            <InfoField label="Total" text={memData.total && unitConverter(memData.total)} />
          </Column>
          <Column style={{ flex: 1 }}>
            <InfoField
              label="Livre"
              position="flex-end"
              text={memData.free && unitConverter(memData.free)}
            />
          </Column>
        </StyledRow>
        <StyledRow>
          <Column>
            <InfoField
              label="Usado"
              text={
                memData.used &&
                `${unitConverter(memData.used)} (${((memData.used / memData.total) * 100).toFixed(
                  0
                )}%)`
              }
            />
          </Column>
        </StyledRow>
      </CardContent>}
    </CardContainer>
  )
}
