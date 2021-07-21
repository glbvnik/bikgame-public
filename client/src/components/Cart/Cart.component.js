import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import lscache from 'lscache'
import { initCart } from '../../redux/actions'
import EmptyCart from '../EmptyCart'
import MyHead from '../MyHead'
import TableCart from './TableCart'
import { Button } from '../UI/Styled'
import styles from '../../styles/Cart.module.scss'

const CartComponent = () => {
    const { cart } = useSelector(state => state.cart)
    const { swimsuits } = useSelector(state => state.data)
    const { sets } = useSelector(state => state.data)

    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => dispatch(initCart(lscache.get('cart'), swimsuits, sets)), [])

    if (cart.length === 0) return <EmptyCart title='cart' meta='Cart - BIKGAME' />

    return (
        <>
            <MyHead title='cart' meta='Cart - BIKGAME' />

            <div>
                <TableCart cart={ cart } />

                <div className={ styles.end }>
                    <p>Subtotal: { cart.reduce((total, item) => total + item.total, 0) }₴</p>
                    <Button onClick={ () => router.push(process.env.NEXT_PUBLIC_CHECKOUT_ROUTE) }>Check Out</Button>
                </div>
            </div>
        </>
    )
}

export default CartComponent
