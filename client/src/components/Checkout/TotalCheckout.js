import styles from '../../styles/Checkout.module.scss'

const TotalCheckout = ({ paid, payment, quantity, rest, shipping }) => {
    return (
        <div className={ styles.total }>
            <div>
                <h3>Total</h3>

                <p>items: <em>{ paid }₴</em> for { quantity } { quantity > 1 ? 'swimsuits' : 'swimsuit' } { payment === 'prepayment'  && <>+ <em>{ rest - paid }₴</em> <u>on arrival</u></> }</p>

                <p>shipping: <em>{ shipping }₴</em> <u>on arrival</u></p>
            </div>

            <div>
                <h3>to pay: { paid }₴</h3>

                <button type='submit'>Pay now</button>
            </div>
        </div>
    )
}

export default TotalCheckout
