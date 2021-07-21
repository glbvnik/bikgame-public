import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useError from '../../hooks/useError'
import { fetchData, setModal } from '../../redux/actions'
import requests from '../../http/requests'
import Input from '../UI/Input'
import { Error } from '../UI/Styled'
import styles from '../../styles/Modal.module.scss'
import {getPrice} from '../../http/prices.http'

const PricesModal = () => {
    const [prices, setPrices] = useState([])

    const { data } = useSelector(state => state)

    const { modal } = useSelector(state => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!modal) {
            setPrices([])

            return dispatch(fetchData({ prices: getPrice }))
        }

        setPrices(data.prices)
    }, [modal])

    const [error, setError] = useError(modal)

    const handleChange = (e, id) => setPrices(prices.map(price => price.id === id ? { ...price, price: e.target.value } : price))

    const handleClick = e => { if (e.target.type === 'button') return dispatch(setModal(false)) }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await requests('Change Prices', prices)
        } catch (e) {
            setError({ state: true, message: typeof e.response !== 'undefined' ? e.response.data.message : e })

            if (typeof e.response !== 'undefined') e.response.status === 401 && location.assign(process.env.NEXT_PUBLIC_SIGNIN_ROUTE)

            return
        }

        dispatch(setModal(false))
    }

    return (
        <form className={ styles.form } onSubmit={ handleSubmit }>
            { error.state && <Error>{ error.message }</Error> }

            { prices.map(price =>
                <Input handleChange={ e => handleChange(e, price.id) } id={ price.id } key={ price.id } label={ price.type } min='1' type='number' value={ price.price } />
            ) }

            <button onClick={ handleClick } type='submit'>Change</button>
            <button onClick={ handleClick } type='button'>Cancel</button>
        </form>
    )
}

export default PricesModal
