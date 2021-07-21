import Link from 'next/link'
import { useSelector } from 'react-redux'
import moment from 'moment'
import styles from '../../styles/Orders.module.scss'

const TableOrders = ({ orders }) => {
    const { swimsuits } = useSelector(state => state.data)

    const { admin } = useSelector(state => state.auth)

    return (
        <table className={ admin ? styles.table : styles.table1 }>
            <thead>
            <tr>
                <th>ID</th>
                { admin && <th>First name</th> }
                { admin && <th>Last name</th> }
                { admin && <th>Email</th> }
                { admin && <th>Phone</th> }
                { admin && <th>City</th> }
                { admin && <th>Address</th> }
                { admin && <th>Apartment</th> }
                { admin && <th>ZIP code</th> }
                <th>Payment</th>
                <th>Shipping</th>
                <th>Total price</th>
                <th>Paid</th>
                <th>Date</th>
                <th>Swimsuits</th>
            </tr>
            </thead>

            <tbody>
            { orders.map(order => <tr key={ order.id }>
                    <td>{ order.id }</td>
                    { admin && <td>{ order.firstName }</td>}
                    { admin && <td>{ order.lastName }</td>}
                    { admin && <td>{ order.email }</td>}
                    { admin && <td>{ order.phone }</td>}
                    { admin && <td>{ order.city }</td>}
                    { admin && <td>{ order.address }</td>}
                    { admin && <td>{ order.apartment ? order.apartment : '-' }</td> }
                    { admin && <td>{ order.zipCode }</td> }
                    <td>{ order.payment }</td>
                    <td>{ order.shipping }₴</td>
                    <td>{ order.totalPrice }₴</td>
                    <td>{ order.paid }₴</td>
                    <td>{ moment(order.createdAt).format('LLL') }</td>

                    <td>{ order.swimsuits.map((item, id) => {
                        const swimsuit = swimsuits.find(swimsuit => swimsuit.id === parseInt(Object.keys(item)))

                        if (swimsuit) {
                            const name = swimsuit.name

                            return (
                                <div className={ styles.card } key={ id }>
                                    <Link href={ `${ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }/${ name }` }>
                                        <a>{ name }:</a>
                                    </Link>
                                    <span>{ Object.values(item)[0] } pc</span>
                                    <span>top: { item.top }</span>
                                    <span>bottom: { item.bottom }</span>
                                </div>
                            )
                        }
                    }) }
                    </td>
                </tr>
            ) }
            </tbody>
        </table>
    )
}

export default TableOrders
