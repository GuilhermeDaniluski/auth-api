import React, { useRef } from 'react'

import Column from 'Atoms/Column'

import { Container } from './styles'
import CpuCard from 'Molecules/CpuCard'
import SystemCard from 'molecules/SystemCard'
import StorageCard from 'molecules/StorageCard'

import Row from 'Atoms/Row'
import MemoryCard from 'molecules/MemoryCard'
import ServicesCard from 'molecules/ServicesCard'
import colors from 'Styles/colors'

const masonryOptions = {
  gutter: 0,
}

export default function Home() {
  let containerRef = useRef(null)

  const handleResize = () => {
    if (containerRef.performLayout) {
      containerRef.performLayout()
    }
  }

  return (
    <Container
      options={masonryOptions}
      updateOnEachImageLoad={true}
      ref={(ref) => {
        containerRef = ref
      }}
    >
      <ServicesCard
        onChange={handleResize}
        colorsObject={colors.card.colors[1]}
        style={{ width: '500px' }}
      />
      <StorageCard onChange={handleResize} colorsObject={colors.card.colors[0]} />
      <MemoryCard onChange={handleResize} colorsObject={colors.card.colors[3]} />
      <CpuCard onChange={handleResize} colorsObject={colors.card.colors[2]} />
      <SystemCard onChange={handleResize} colorsObject={colors.card.colors[4]} />
    </Container>
  )
}
