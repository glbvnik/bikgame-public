import useFocus from '../../hooks/useFocus'
import { MyInput } from '../UI/Styled'

const InputsAuth = ({ inputs, setInputs, isSignup }) => {
    const [inputRef] = useFocus()

    const handleChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value })

    return (
        <>
            { isSignup &&
            <>
                <MyInput name='firstName' onChange={ handleChange } placeholder='First Name' ref={ isSignup ? inputRef : undefined } required value={ inputs.firstName } />
                <MyInput name='lastName' onChange={ handleChange } placeholder='Last Name' required value={ inputs.lastName } />
            </>
            }

            <MyInput name='email' onChange={ handleChange } placeholder='Email' ref={ !isSignup ? inputRef : undefined } required type='email' value={ inputs.email } />
            <MyInput name='password' onChange={ handleChange } placeholder='Password' required type='password' value={ inputs.password } />
        </>
    )
}

export default InputsAuth
