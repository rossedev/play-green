import { useRouter } from 'next/navigation'
import { ChangeEvent, useContext, useState, useTransition } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { UserContext } from '@/context/UserContext'
import { TErrors, TForm } from '@/types/form'
import { emailRegex, passwordRegex } from '@/utils/regex'
import { toast } from 'react-toastify'
import { auth } from '@/firebase/config'
import { createUser } from '@/firebase/auth/user'

export const useForm = () => {
  const router = useRouter()
  const [, UserDispatch] = useContext<any>(UserContext)
  const [isPending, startTransition] = useTransition()

  const [errors, setErrors] = useState<Array<TErrors>>([])
  const [form, setForm] = useState<TForm>({
    email: '',
    password: '',
  })

  const handleChange = (name: string, event: ChangeEvent<HTMLInputElement>) => {
    const errors = hasErrors({
      ...form,
      [name]: event.target.value,
    })

    setErrors(errors)

    setForm((prevForm) => ({
      ...prevForm,
      [name]: event.target.value,
    }))
  }

  const hasErrors = (form: TForm) => {
    const messagesError: Array<TErrors> = []

    if (!form.password) {
      messagesError.push({
        name: 'password',
        message: 'Password is mandatory',
      })
    }

    if (!form.email || !emailRegex.test(form.email)) {
      messagesError.push({
        name: 'email',
        message:
          'Check your email. Make sure it is in this format: ejemplo@email.com',
      })
    }

    if (form.password && !passwordRegex.test(form.password)) {
      messagesError.push({
        name: 'password',
        message: 'The password must be at least 8 characters long',
      })
    }

    return messagesError.length > 0 ? messagesError : []
  }

  const handleLogin = () => {
    const errors = hasErrors(form)

    if (errors.length > 0) {
      setErrors(errors)
      return
    }

    startTransition(() => {
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then(({ user }) => {
          UserDispatch({
            type: 'SET_USER_LOGGED',
            payload: {
              isLogged: true,
              ...user,
            },
          })
          router.push('/dashboard')
        })
        .catch((error) => {
          toast.error(`An error has occurred: ${error.message}`, {
            autoClose: 2000,
          })
        })
    })
  }

  const handleSignUp = () => {
    createUser(form.email, form.password)
      .then(({ user }) => {
        UserDispatch({
          type: 'SET_USER_LOGGED',
          payload: {
            isLogged: true,
            ...user,
          },
        })
        router.push('/dashboard')
      })
      .catch((error) => {
        toast.error(`An error has occurred: ${error.message}`, {
          autoClose: 2000,
        })
      })
  }

  return {
    errors,
    form,
    isPendingLogin: isPending,
    handleChange,
    handleLogin,
    handleSignUp,
  }
}
