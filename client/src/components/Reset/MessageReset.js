import parse from 'html-react-parser'
import MyHead from '../MyHead'
import styles from '../../styles/Reset.module.scss'

const MessageReset = ({ header, message }) => {
    return (
        <>
            <MyHead meta='reset' title='Reset - BIKGAME' />

            <div className={ styles.container }>
                <h2>{ header }</h2>
                <p>{ parse(message) }</p>
            </div>
        </>
    )
}

export default MessageReset
