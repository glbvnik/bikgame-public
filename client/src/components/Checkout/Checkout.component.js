import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/actions'
import { createOrder } from '../../http/order.http'
import { getData } from '../../http/user.http'
import EmptyCart from '../EmptyCart'
import Input from '../UI/Input'
import MyHead from '../MyHead'
import RadioInput from '../UI/RadioInput'
import TotalCheckout from './TotalCheckout'
import styles from '../../styles/Checkout.module.scss'

const CheckoutComponent = () => {
    const { prices } = useSelector(state => state.data)
    const { cart } = useSelector(state => state.cart)
    const { signedIn } = useSelector(state => state.auth)

    const shipping = prices.find(price => price.type === 'Nova poshta').price

    const prepayment = prices.find(price => price.type === 'Prepayment').price

    const swimsuits = cart.map(item => ({ [item.id]: item.quantity, top: item.topSize, bottom: item.bottomSize }))

    const quantity = cart.reduce((quantity, item) => parseInt(quantity) + parseInt(item.quantity), 0)

    const totalPrice = cart.reduce((total, item) => total + item.total, 0)

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        apartment: '',
        zipCode: '',
        payment: 'full',
        shipping,
        totalPrice: totalPrice,
        paid: totalPrice,
        swimsuits
    })

    const dispatch = useDispatch()

    const router = useRouter()

    let success = false

    useEffect(async () => {
        if (signedIn) {
            const {data} = await getData()

            setInputs({ ...inputs, firstName: data.firstName, lastName: data.lastName, email: data.email })
        }
    }, [signedIn])

    useEffect(() => setInputs({ ...inputs, totalPrice, paid: totalPrice, swimsuits }), [cart])

    const handleChange = e => {
        if (e.target.name === 'payment') {
            if (e.target.value === 'prepayment' && inputs.payment === 'full') return setInputs({ ...inputs, paid: prepayment, [e.target.name]: e.target.value })

            if (e.target.value === 'full' && inputs.payment === 'prepayment') return setInputs({ ...inputs, paid: totalPrice, [e.target.name]: e.target.value })
        }

        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (success) {
            await createOrder(inputs)

            dispatch(clearCart())

            return router.push(process.env.NEXT_PUBLIC_ORDER_SUCCESS_ROUTE)
        }

        router.push(process.env.NEXT_PUBLIC_ORDER_FAIL_ROUTE)
    }

    if (cart.length === 0 || Number.isNaN(quantity)) return <EmptyCart meta='checkout' title='Checkout - BIKGAME' />

    return (
        <>
            <MyHead meta='checkout' title='Checkout - BIKGAME' />

            <form className={ styles.form } onSubmit={ handleSubmit }>
                <h3>Contact information</h3>

                <div className={ styles.inputs }>
                    <Input disabled={ !!signedIn } handleChange={ handleChange } id='firstName' label='First name' required={ true } value={ inputs.firstName } />

                    <Input disabled={ !!signedIn } handleChange={ handleChange } id='lastName' label='Last name' required={ true } value={ inputs.lastName } />

                    <Input disabled={ !!signedIn } handleChange={ handleChange } id='email' label='Email' required={ true } type='email' value={ inputs.email } />

                    <Input handleChange={ handleChange } id='phone' label='Phone' required={ true } type='tel' value={ inputs.phone } />
                </div>

                <h3>Shipping address</h3>

                <div className={ `${ styles.inputs } ${ styles.inputs1 }` }>
                    <Input handleChange={ handleChange } id='city' label='City' required={ true } value={ inputs.city } />

                    <Input handleChange={ handleChange } id='address' label='Address' required={ true } value={ inputs.address } />

                    <Input handleChange={ handleChange } id='apartment' label='Apartment' value={ inputs.apartment } />

                    <Input handleChange={ handleChange } id='zipCode' label='ZIP code' min='0' required={ true } type='number' value={ inputs.zipCode } />
                </div>

                <h3>Payment</h3>

                <div className={ styles.radio }>
                    <RadioInput defaultChecked={ true } handleChange={ handleChange } id='full' label='Full' name='payment' text='Pay all the amount at once' />

                    <RadioInput handleChange={ handleChange } id='prepayment' label='Prepayment' name='payment' text={ `Pay a ${ prices.find(price => price.type === 'Prepayment').price }₴ deposit and the rest on arrival` } />
                </div>

                <h3>Shipping</h3>

                <div className={ styles.radio }>
                    <RadioInput defaultChecked={ true } handleChange={ handleChange } id='shipping' label='Nova poshta' text={ `Demands payment of ${ shipping }₴ on arrival` } />
                </div>

                <TotalCheckout paid={ inputs.paid } payment={ inputs.payment } quantity={ quantity } rest={ cart.reduce((total, item) => total + item.total, 0) } shipping={ shipping } />
            </form>
        </>
    )
}

export default CheckoutComponent
