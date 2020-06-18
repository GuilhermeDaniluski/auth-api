import React, { useState } from 'react'
import Icon from '@mdi/react'
import { Container, ButtonWithShadow, Button, ButtonContainer } from './styles'
import { mdiPencilOutline, mdiCheckBold, mdiCloseThick, mdiLock, mdiLockOpen } from '@mdi/js'
import Zoom from '@material-ui/core/Zoom'
import colors from 'Styles/colors'
import Collapse from '@material-ui/core/Collapse'
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

export default function CardButtons({ onEdit, onSave, onCancel, lock ,color}) {
  const handleEditToggle = () => {
    onEdit()
  }

  const handleSaveClick = async () => {
    onSave()
  }

  const handleCancelClick = () => {
    onCancel()
  }

  return (
    <div style={{ paddingLeft: 15 }}>
      <Container style={{backgroundColor:color}}>
        <Zoom in={true} timeout={500}>
          <Tooltip arrow title="Editar" placement="right">
            <ButtonWithShadow
              style={{ backgroundColor: colors.light, color:color }}
              onClick={handleEditToggle}
            >
              <Icon path={lock ? mdiLockOpen : mdiLock} size={1} />
            </ButtonWithShadow>
          </Tooltip>
        </Zoom>

        <Collapse in={lock} timeout={500}>
          <ButtonContainer>
            <Tooltip arrow title="Limpar" placement="right">
              <Zoom in={lock} timeout={500}>
                <ButtonWithShadow
                  style={{ backgroundColor: colors.light, marginTop: 10 }}
                  onClick={handleCancelClick}
                >
                  <Icon path={mdiCloseThick} size={0.6} />
                </ButtonWithShadow>
              </Zoom>
            </Tooltip>

            <Tooltip arrow title="Confirmar" placement="right">
              <Zoom in={lock} timeout={500}>
                <ButtonWithShadow
                  color="primary"
                  style={{ backgroundColor: colors.light, marginTop: 10 }}
                  onClick={handleSaveClick}
                >
                  <Icon path={mdiCheckBold} size={0.6} />
                </ButtonWithShadow>
              </Zoom>
            </Tooltip>
          </ButtonContainer>
        </Collapse>
      </Container>
    </div>
  )
}
