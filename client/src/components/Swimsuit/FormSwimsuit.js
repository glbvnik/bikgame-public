import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { addItem } from '../../redux/actions'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { Button } from '../UI/Styled'
import styles from '../../styles/Swimsuit.module.scss'

const FormSwimsuit = ({ sets, swimsuit, swimsuits }) => {
    const [inputs, setInputs] = useState({
        id: swimsuit?.id,
        name: swimsuit?.name,
        image: swimsuit?.images[0],
        color: swimsuit?.color,
        collectionId: swimsuit?.collectionId,
        setId: swimsuit?.setId,
        topSize: '',
        bottomSize: '',
        price: swimsuit?.price,
        quantity: '1',
        total: swimsuit?.price
    })

    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        const nextSwimsuit = swimsuits.find(({ setId, color }) => setId === swimsuit.setId && color === inputs.color)

        if (nextSwimsuit) {
            if (nextSwimsuit.color !== swimsuit.color) nextSwimsuit ? router.push(`${ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }/${ nextSwimsuit.name }?collectionId=${ swimsuit.collectionId }&setId=${ swimsuit.setId }`) : setInputs({ ...inputs, color: swimsuit.color })
        }
    }, [inputs.color])

    const handleChange = e => {
        if (e.target.name === 'quantity') return setInputs({ ...inputs, [e.target.name]: e.target.value, total: swimsuit.price * e.target.value })

        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(addItem(inputs))

        router.push(process.env.NEXT_PUBLIC_CART_ROUTE)
    }

    return (
        <form className={ styles.form } onSubmit={ handleSubmit }>
            <h3>{ swimsuit.name }</h3>
            <p>{ swimsuit.price }₴</p>

            <Select data={ sets.colors } handleChange={ handleChange } id='color' label='Color' placeholder='color' value={ inputs.color } />

            <Select data={ sets.topSizes } handleChange={ handleChange } id='topSize' label='Top' placeholder='size' value={ inputs.topSize } />

            <Select data={ sets.bottomSizes } handleChange={ handleChange } id='bottomSize' label='Bottom' placeholder='size' value={ inputs.bottomSize } />

            <Input handleChange={ handleChange } id='quantity' label='Quantity' min='1' required={ true } type='number' value={ inputs.quantity } />

            <Button type='submit'>Add to cart</Button>

            <p>{ swimsuit.description }</p>
        </form>
    )
}

export default FormSwimsuit
