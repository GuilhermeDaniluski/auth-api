import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import { Form } from './styles'
import CardContainer from 'Atoms/CardContainer'
import CardHeader from 'Atoms/CardHeader'
import Row from 'Atoms/Row'
import CardContent from 'atoms/CardContent'
import { mdiLan, mdiAccount, mdiKey } from '@mdi/js'
import InputField from 'atoms/InputField'
import Button from 'atoms/Button'
import { login, onLogin } from 'services/Auth'
import _enum from 'Utils/enum'
import { authConstants } from 'store/Auth/constants'
import Column from 'Atoms/Column'
import CardButtons from 'atoms/CardButtons'
import { postLocal, getLocal } from 'services/Mqtt'
import Icon from 'atoms/Icon'

export default function LocalSetupCard({ colorsObject, onChange }) {
  const { control, handleSubmit, errors, reset } = useForm()
  const isMountedRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditting, setIsEditting] = useState(false)
  const [initialValues, setInitialValues] = useState({})

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    setIsLoading(true)
    let response = await postLocal(data)
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
      ip: '',
    })
  }

  const handleSaveClick = async () => {
    handleSubmit(onSubmit)()
  }

  const fetchMqttLocalData = async () => {
    return getLocal()
  }

  useEffect(() => {
    isMountedRef.current = true
    let isCancelled = false
    const fetchData = async () => {
      let responde = await fetchMqttLocalData()
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
      <CardHeader isLoading={isLoading} Title="MQTT Local" iconPath={mdiLan} colors={colorsObject} />
      <CardContent isLoading={isLoading}>
        <Form>
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
