import { useState } from 'react'
import { useRouter } from 'next/router'
import useError from '../../hooks/useError'
import { signIn, signUp } from '../../http/user.http'
import InputsAuth from './InputsAuth'
import BottomAuth from './BottomAuth'
import MyHead from '../MyHead'
import { Button, Error } from '../UI/Styled'
import styles from '../../styles/Auth.module.scss'

const Auth = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    })

    const router = useRouter()

    const isSignup = router.pathname === process.env.NEXT_PUBLIC_SIGNUP_ROUTE

    const [error, setError] = useError()

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            if (isSignup) {
                await signUp(inputs.firstName, inputs.lastName, inputs.email, inputs.password)

                router.push(process.env.NEXT_PUBLIC_VERIFY_ROUTE)
            } else {
                const { data } = await signIn(inputs.email, inputs.password)

                if (data.role) router.push(process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE)
            }
        } catch (e) {
            if (typeof e.response.data.errors !== 'undefined') {
                const messages = e.response.data.errors.errors.map(e => e.msg)

                setError({ state: true, messages })
            } else {
                setError({ state: true, messages: [e.response.data.message] })
            }
        }
    }

    return (
        <>
            <MyHead title={ `${ isSignup ? 'Sign Up' : 'Sign In' } - BIKGAME` } meta={ isSignup ? 'Sign Up' : 'Sign In' } />

            <form className={ styles.form } onSubmit={ handleSubmit }>
                { error.state && <Error className={ styles.error }>{ error.messages.map((e, id) => <span key={ id }>{ e }</span>) }</Error> }

                <h2>{ isSignup ? 'Create account' : 'Sign In' }</h2>

                <InputsAuth inputs={ inputs } setInputs={ setInputs } isSignup={ isSignup } />

                <Button type='submit'>{ isSignup ? 'Sign Up' : 'Sign In' }</Button>

                <BottomAuth isSignup={ isSignup } />
            </form>
        </>
    )
}

export default Auth
