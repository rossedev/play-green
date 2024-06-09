import { useRouter } from 'next/navigation'
import { Button } from './ui/Button'
import {
  Container,
  ContainerFooter,
  ContainerForm,
  ForgotPasswordLink,
  Subtitle,
  Title,
} from '@/styles/Form.styled'
import { Input } from './ui/Input'
import { ErrorMessage } from '@/styles/Input.styled'
import { useForm } from '@/hooks/useForm'
import Loading from './ui/Loading'
import { ChangeEvent, KeyboardEvent } from 'react'

export const Login = () => {
  const router = useRouter()
  const { errors, form, isPendingLogin, handleChange, handleLogin } = useForm()

  const handleRedirect = () => {
    router.push('/sign-up')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <Container>
      <Title>Welcome</Title>
      <Subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Subtitle>

      <ContainerForm onKeyDown={handleKeyDown}>
        <Input
          type="text"
          label="Email"
          id="email"
          placeholder="usuario@greenrun.com"
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('email', e)
          }
          value={form.email}
        />
        {!!errors &&
          errors.map((error) =>
            error.name === 'email' ? (
              <ErrorMessage key={error.name}>{error.message}</ErrorMessage>
            ) : (
              ''
            ),
          )}
        <Input
          type="password"
          label="Password"
          placeholder="**********"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange('password', e)
          }}
          value={form.password}
        />
        {!!errors &&
          errors.map((error) =>
            error.name === 'password' ? (
              <ErrorMessage key={error.name}>{error.message}</ErrorMessage>
            ) : (
              ''
            ),
          )}

        <ForgotPasswordLink>Forgot your password?</ForgotPasswordLink>

        {isPendingLogin ? (
          <Loading />
        ) : (
          <Button title="Login" onClick={handleLogin} />
        )}
      </ContainerForm>

      <ContainerFooter>
        <p>
          Don&apos;t have an account?{' '}
          <strong onClick={handleRedirect}>Sign up</strong>
        </p>
      </ContainerFooter>
    </Container>
  )
}
