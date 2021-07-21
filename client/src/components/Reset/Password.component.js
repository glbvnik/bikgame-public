import { useState } from 'react'
import { useRouter } from 'next/router'
import { resetPassword } from '../../http/user.http'
import useError from '../../hooks/useError'
import useFocus from '../../hooks/useFocus'
import MessageReset from './MessageReset'
import MyHead from '../MyHead'
import { Button, Error, MyInput } from '../UI/Styled'
import styles from '../../styles/Reset.module.scss'

const PasswordComponent = () => {
    const [inputs, setInputs] = useState({ password: '', check: '' })

    const [sent, setSent] = useState(false)

    const router = useRouter()

    const [error, setError] = useError()

    const [inputRef] = useFocus()

    const handleChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            if (inputs.password !== inputs.check) throw 'Typed passwords do not match'

            await resetPassword(router.query.id, inputs.password)

            setSent(true)
        } catch (e) {
            setError({ state: true, message: typeof e.response !== 'undefined' ? e.response.data.message : e })
        }
    }

    if (sent) return <MessageReset header='Success!' message='Your password has been changed successfully' />

    return (
        <>
            <MyHead meta='reset' title='PasswordComponent - BIKGAME' />

            <form className={ styles.form } onSubmit={ handleSubmit }>
                { error.state && <Error className={ styles.error }>{ error.message }</Error> }

                <h3>Type your new password</h3>

                <MyInput id='password' name='password' onChange={ handleChange } placeholder='Password' ref={ inputRef } required type='password' value={ inputs.password } />

                <MyInput id='check' name='check' onChange={ handleChange } placeholder='Check password' required type='password' value={ inputs.check } />

                <Button type='submit'>Submit</Button>
            </form>
        </>
    )
}

export default PasswordComponent
