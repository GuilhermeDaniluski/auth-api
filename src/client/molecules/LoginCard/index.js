import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import { Form } from './styles'
import CardContainer from 'Atoms/CardContainer'
import CardHeader from 'Atoms/CardHeader'
import Row from 'Atoms/Row'
import CardContent from 'atoms/CardContent'
import { mdiShieldKey } from '@mdi/js'
import InputField from 'atoms/InputField'
import Button from 'atoms/Button'
import { login, onLogin } from 'services/Auth'
import _enum from 'Utils/enum'
import { authConstants } from 'store/Auth/constants'

export default function LoginCard({ colorsObject, onChange }) {
  const { control, handleSubmit, errors } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = (data) => handleLogin(data)

  const handleLogin = async (data) => {
    setIsLoading(true)
    let response = await login(data)
    setIsLoading(false)
    if (response.error) {
      dispatch({type: authConstants.LOGOUT})
      return;
    }
    dispatch({type: authConstants.LOGIN})
  }

  return (
    <CardContainer>
      <CardHeader Title="Login" iconPath={mdiShieldKey} colors={colorsObject} />
      <CardContent>
        <Form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Controller
                as={InputField}
                name="username"
                control={control}
                label="Usuário"
                defaultValue=""
                error={!!errors.username}
                helperText={errors.username && errors.username.message}
                rules={{ required: 'Obrigatório' }}
              />
            </Row>
            <Row>
              <Controller
                rules={{ required: 'Obrigatório' }}
                as={InputField}
                type="password"
                name="password"
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                control={control}
                label="Senha"
                defaultValue=""
              />
            </Row>
            <Row style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <Button loading={isLoading} type='submit'>
                Entrar
              </Button>
            </Row>
          </form>
        </Form>
      </CardContent>
    </CardContainer>
  )
}
