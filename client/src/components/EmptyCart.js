import Link from 'next/link'
import MyHead from './MyHead'
import styles from '../styles/Cart.module.scss'

const EmptyCart = ({ title, meta }) => {
    return (
        <>
            <MyHead title={ title } meta={ meta } />

            <div className={ styles.container }>
                <h3>Your cart is empty now</h3>

                <p><Link href={ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }><a>Continue shopping</a></Link></p>
            </div>
        </>
    )
}

export default EmptyCart
