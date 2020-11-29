import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'

import api from '../../services/api'
import { useToast } from '../../hooks/Toast'

import Input from '../../components/Input'
import Button from '../../components/Button'

import LogoImg from '../../assets/logo.svg'
import { Container, Content, AnimationContainer, Background } from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório.'),
          email: Yup.string()
            .required('E-mail é obrigadtório.')
            .email('E-mail não é válido.'),
          password: Yup.string().min(6, 'Mínimo de 6 caracteres para senha.'),
        })

        await schema.validate(data, { abortEarly: false })

        await api.post('/users', data)
        history.push('/')

        addToast({
          type: 'success',
          title: 'Cadastro OK',
          description: 'Parabéns! Seu cadastro foi realizado com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          console.log(errors)
          return
        }

        addToast({
          type: 'info',
          title: 'Erro no Cadastramento',
          description:
            'Ocorreu um erro ao fazer o seu cadastro. Cheque suas informações.',
        })
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
