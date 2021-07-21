import MyHead from '../MyHead'
import styles from '../../styles/Verify.module.scss'

const VerifyComponent = () => {
    return (
        <>
            <MyHead meta='verify' title='Verify - BIKGAME' />

            <div className={ styles.container }>
                <h2>Thank you for registration, <span>please check your email!</span></h2>
                <p>We have sent you a link to confirm your registration. <span>If you have not receive it, please check your spam folder.</span><br />Click the link provided in the email to complete your registration.</p>
            </div>
        </>
    )
}

export default VerifyComponent
