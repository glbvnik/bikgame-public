import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5'
import MyHead from './MyHead'
import styles from '../styles/Order.module.scss'

const Order = ({ success }) => {
    return (
        <>
            <MyHead title={ `${ success ? 'Success' : 'Fail' } - BIKGAME` } meta={ success ? 'success' : 'fail' } />

            <div className={ styles.container }>
                <div>
                    { success ? <IoCheckmarkOutline /> : <IoCloseOutline />}
                </div>

                <h2>{ success ? 'Thank you for your order!' : 'Something went wrong...' }</h2>

                { success &&  <p>You will receive an SMS, when your order is delivered</p> }

                <p>Contact us at <a href = 'mailto: bikgame.swimwear@gmail.com'>bikgame.swimwear@gmail.com</a>, <span>if you have any questions</span></p>
            </div>
        </>
    )
}

export default Order
