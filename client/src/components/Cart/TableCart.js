import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { changeQuantity, delItem } from '../../redux/actions'
import styles from '../../styles/Cart.module.scss'

const TableCart = ({ cart }) => {
    const dispatch = useDispatch()

    const handleChange = (quantity, item) => dispatch(changeQuantity(quantity, item.id, item.topSize, item.bottomSize))

    const handleClick = item => dispatch(delItem(item.id, item.topSize, item.bottomSize))

    return (
        <table className={ styles.table }>
            <thead>
                <tr>
                    <th>Swimsuit</th>
                    <th />
                    <th>Color</th>
                    <th>Sizes</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>

            <tbody>
            { cart.map((item, id) =>
                <tr key={ id }>
                    <td>
                        <div className={ styles.image }>
                            <Link href={ `${ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }/${ item.name }?collectionId=${ item.collectionId }&setId=${ item.setId }` }>
                                <a>
                                    <Image
                                        alt={ item.image.alt }
                                        layout='fill'
                                        loading='eager'
                                        objectFit='cover'
                                        src={ `${ process.env.NEXT_PUBLIC_API_URL }/${ item.image.name }` }
                                    />
                                </a>
                            </Link>
                        </div>
                    </td>

                    <td>
                        <Link href={ `${ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }/${ item.name }?collectionId=${ item.collectionId }&setId=${ item.setId }` }>
                            <a>
                                <h3>{ item.name }</h3>
                            </a>
                        </Link>
                    </td>

                    <td>{ item.color }</td>
                    <td><p>top: { item.topSize }</p><p>bottom: { item.bottomSize }</p></td>
                    <td>{ item.price }₴</td>
                    <td><input min='1' onChange={ e => handleChange(e.target.value, item) } type='number' value={ item.quantity }/></td>
                    <td>{ item.total }₴</td>
                    <td><button onClick={ () => handleClick(item) }>delete</button></td>
                </tr>
            ) }
            </tbody>
        </table>
    )
}

export default TableCart
