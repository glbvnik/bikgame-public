import Link from 'next/link'
import styles from '../styles/Footer.module.scss'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={ styles.footer }>
            <div>
                <Link href={ process.env.NEXT_PUBLIC_ABOUT_ROUTE }><a>About</a></Link>
                <Link href={ process.env.NEXT_PUBLIC_CONTACT_ROUTE }><a>Contact</a></Link>
                <Link href={ process.env.NEXT_PUBLIC_PAYMENT_ROUTE }><a>Payment</a></Link>
                <Link href={ process.env.NEXT_PUBLIC_SHIPPING_ROUTE }><a>Shipping</a></Link>
                <Link href={ process.env.NEXT_PUBLIC_TERMS_OF_USE_ROUTE }><a>Terms of use</a></Link>
            </div>

            <p>ⓒ { currentYear }, BIKGAME</p>
        </footer>
    )
}

export default Footer
