import { useState } from 'react'
import { updateReset } from '../../http/user.http'
import useError from '../../hooks/useError'
import useFocus from '../../hooks/useFocus'
import MessageReset from './MessageReset'
import MyHead from '../MyHead'
import { Button, Error, MyInput } from '../UI/Styled'
import styles from '../../styles/Reset.module.scss'

const ResetComponent = () => {
    const [input, setInput] = useState('')

    const [sent, setSent] = useState(false)

    const [error, setError] = useError()

    const [inputRef] = useFocus()

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await updateReset(input)

            setSent(true)
        } catch (e) {
            setError({ state: true, message: typeof e.response !== 'undefined' ? e.response.data.message : e })
        }
    }

    if (sent) return <MessageReset header='Please check your email!' message='We have sent you a link, where you can change your password. <span>If you have not receive it, please check your spam folder.</span>' />

    return (
        <>
            <MyHead meta='reset' title='Reset - BIKGAME' />

            <form className={ styles.form } onSubmit={ handleSubmit }>
                { error.state && <Error className={ styles.error }>{ error.message }</Error> }

                <h3>Type your email</h3>

                <MyInput id='email' onChange={ e => setInput(e.target.value) } placeholder='Email' ref={ inputRef } required type='email' value={ input } />

                <Button type='submit'>Submit</Button>
            </form>
        </>
    )
}

export default ResetComponent
