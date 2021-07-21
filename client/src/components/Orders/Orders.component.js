import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getOrder } from '../../http/order.http'
import Loader from '../Loader'
import MyHead from '../MyHead'
import TableOrders from './TableOrders'
import styles from '../../styles/Orders.module.scss'

const OrdersComponent = () => {
    const [orders, setOrders] = useState([])

    const [loader, setLoader] = useState(true)

    const { signedIn } = useSelector(state => state.auth)

    useEffect(async () => {
        if (signedIn) {
            const { data } = await getOrder()

            return setOrders(data)
        }

        setLoader(false)
    }, [signedIn])

    if (orders.length === 0) return (
        <>
            <MyHead meta='orders' title='Orders - BIKGAME' />

            { loader && <Loader /> }

            { !loader &&
            <div className={ styles.container }>
                <h3>No orders yet</h3>

                <p>You should be <Link href={ process.env.NEXT_PUBLIC_SIGNIN_ROUTE }><a>signed in</a></Link> to see your orders</p>

                <Link href={ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }><a>Continue shopping</a></Link>
            </div>
            }
        </>
    )

    return (
        <>
            <MyHead meta='orders' title='Orders - BIKGAME' />

            <TableOrders orders={ orders } />
        </>
    )
}

export default OrdersComponent
