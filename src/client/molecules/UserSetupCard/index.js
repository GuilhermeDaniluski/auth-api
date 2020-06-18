import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import { Form } from './styles'
import CardContainer from 'Atoms/CardContainer'
import CardHeader from 'Atoms/CardHeader'
import Row from 'Atoms/Row'
import CardContent from 'atoms/CardContent'
import { mdiAccountEdit, mdiAccount, mdiKey, mdiClockOutline, mdiAlertCircle } from '@mdi/js'
import InputField from 'atoms/InputField'
import _enum from 'Utils/enum'
import Column from 'Atoms/Column'
import CardButtons from 'atoms/CardButtons'
import { getUser, postUser } from 'services/Auth'
import Icon from 'atoms/Icon'
import Tooltip from '@material-ui/core/Tooltip'

export default function UserSetupCard({ colorsObject, onChange }) {
  const { control, handleSubmit, errors, reset } = useForm()
  const isMountedRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditting, setIsEditting] = useState(false)
  const [initialValues, setInitialValues] = useState({})

  const onSubmit = async (data) => {
    setIsLoading(true)
    let response = await postUser(data)
    if (!isMountedRef.current) {
      return
    }
    setIsLoading(false)
    setIsEditting(false)
    if (response == 'OK') {
      reset(data)
      setInitialValues(data)
      return
    }
    reset(initialValues)
  }

  const handleEditClick = () => {
    if (isEditting) {
      reset(initialValues)
    }
    setIsEditting(!isEditting)
  }

  const handleClearClick = () => {
    reset({
      username: '',
      password: '',
      updateTime:'',
    })
  }

  const handleSaveClick = async () => {
    handleSubmit(onSubmit)()
  }

  const fetchUserData = async () => {
    return getUser()
  }

  useEffect(() => {
    isMountedRef.current = true
    let isCancelled = false
    const fetchData = async () => {
      let responde = await fetchUserData()
      if (isCancelled) return
      setInitialValues(responde)
      setIsLoading(false)
    }

    fetchData()

    return () => {
      isCancelled = true
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    onChange()
  }, [isLoading])

  return (
    <CardContainer style={{ margin: 15 }}>
      <CardHeader
        isLoading={isLoading}
        Title="Configuração da Dashboard"
        iconPath={mdiAccountEdit}
        colors={colorsObject}
      />
      <CardContent isLoading={isLoading}>
        <Form>
          <Column>
            <Row style={{ alignItems: 'center' }}>
              <Icon path={mdiAccount} color={colorsObject.color} />
              <Controller
                as={InputField}
                name="username"
                control={control}
                label="Usuário"
                defaultValue={initialValues.username}
                InputProps={{
                  readOnly: !isEditting,
                }}
                error={!!errors.username}
                helperText={errors.username && errors.username.message}
                rules={{ required: 'Obrigatório' }}
              />
              <Icon path={mdiKey} color={colorsObject.color} />
              <Controller
                rules={{ required: 'Obrigatório' }}
                as={InputField}
                type="password"
                name="password"
                InputProps={{
                  readOnly: !isEditting,
                }}
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                control={control}
                label="Senha"
                defaultValue={initialValues.password}
              />
            </Row>
            <Row style={{ alignItems: 'center' }}>
              <Icon path={mdiClockOutline} color={colorsObject.color} />
              <Tooltip
                arrow
                title="Quanto
               menor o tempo de atualização, 
               maior a quantidade de recursos será exigida do sistema, 
               podendo até comprometer a coleta de dados dos dispositivos."
              >
                <span>
                  <Controller
                    rules={{
                      required: 'Obrigatório',
                      min: { value: 10, message: 'O valor deve ser maior que 10 segundos' },
                    }}
                    as={InputField}
                    name="updateTime"
                    InputProps={{
                      readOnly: !isEditting,
                    }}
                    type="number"
                    error={!!errors.updateTime}
                    helperText={errors.updateTime && errors.updateTime.message}
                    control={control}
                    label="Tempo de Atualização(s)"
                    defaultValue={initialValues.updateTime}
                  />
                </span>
              </Tooltip>
            </Row>
          </Column>

          <Column>
            <CardButtons
              isLoading={isLoading}
              onEdit={handleEditClick}
              onCancel={handleClearClick}
              onSave={handleSaveClick}
              lock={isEditting}
              color={colorsObject.color}
            />
          </Column>
        </Form>
      </CardContent>
    </CardContainer>
  )
}
