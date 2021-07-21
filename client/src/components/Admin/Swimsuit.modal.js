import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useError from '../../hooks/useError'
import { fetchData, setModal } from '../../redux/actions'
import { getSwimsuit } from '../../http/swimsuit.http'
import requests from '../../http/requests'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { Error } from '../UI/Styled'
import styles from '../../styles/Modal.module.scss'

const SwimsuitModal = ({ change, del }) => {
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        color: '',
        price: '',
        swimsuitId: '',
        collectionId: '',
        setId: '',
        typeId: ''
    })

    const [images, setImages] = useState([])

    const [placeholder, setPlaceholder] = useState({
        name: 'Name',
        description: 'Description',
        price: 'Price',
        order: 'Order'
    })

    const { modal } = useSelector(state => state.app)
    const { data } = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!modal) {
            setInputs({ name: '', description: '', color: '', price: '', swimsuitId: '', collectionId: '', setId: '', typeId: '' })

            setImages([])

            setPlaceholder({
                name: 'Name',
                description: 'Description',
                price: 'Price',
                order: 'Order'
            })

            return dispatch(fetchData({ swimsuits: getSwimsuit }))
        }
    }, [modal])

    const [error, setError] = useError(modal)

    const handleChange = e => {
        if (e.target.name === 'collectionId') {
            return setInputs({ ...inputs, [e.target.name]: e.target.value, setId: '' })
        }

        if (e.target.name === 'swimsuitId' && change) {
            const swimsuit = data.swimsuits.find(({id}) => id === Number.parseInt(e.target.value))

            setPlaceholder({ ...placeholder, name: swimsuit.name, description: swimsuit.description, price: swimsuit.price })

            return setInputs({ ...inputs, collectionId: '', setId: '', typeId: '', [e.target.name]: e.target.value })
        }

        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleChangeImage = (e, id) => {
        if (e.target.files) return setImages(images.map(img => img.id === id ? { ...img, [e.target.name]: e.target.files[0] } : img))

        setImages(images.map(img => img.id === id ? { ...img, [e.target.name]: e.target.value } : img))
    }

    const handleImage = (e, id) => {
        e.preventDefault()

        if (e.target.name === 'del') return setImages(images.filter(img => img.id !== id))

        if (change && inputs.swimsuitId !== '') return setImages([...images, { id: Date.now(), alt: data.swimsuits.find(swimsuit => swimsuit.id === parseInt(inputs.swimsuitId)).name, order: images.length + 1, image: null }])

        if (!change && !del) return setImages([...images, { id: Date.now(), alt: inputs.name, order: images.length + 1, image: null }])
    }

    let action

    const handleClick = async e => {
        if (e.target.type === 'button') return dispatch(setModal(false))

        action = e.target.textContent + ' Swimsuit.component.js'
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await requests(action, inputs, images)
        } catch (e) {
            document.getElementById('form').scrollIntoView({ behavior: 'smooth', block: 'start' })

            setError({ state: true, message: typeof e.response !== 'undefined' ? e.response.data.message : e })

            if (typeof e.response !== 'undefined') e.response.status === 401 && location.assign(process.env.NEXT_PUBLIC_SIGNIN_ROUTE)

            return
        }

        dispatch(setModal(false))
    }

    const buttonText = (change, del) => {
        if (change) {
            const text = 'Change'

            return text
        }

        if (del) {
            const text = 'Delete'

            return text
        }

        const text = 'Create'

        return text
    }

    const swimsuitData = () => {
        let obj = { collection: '-select-', set: '-select-', type: '-select-', color: '-select-' }

        if (inputs.swimsuitId !== '') {
            const swimsuit = data.swimsuits.find(({ id }) => id === Number.parseInt(inputs.swimsuitId))

            if (typeof swimsuit.collectionId !== 'undefined') {
                const collection = data.collections.find(({ id }) => id === swimsuit.collectionId)

                if (typeof collection !== 'undefined') obj.collection = collection.name
            }

            if (typeof swimsuit.setId !== 'undefined') {
                const set = data.sets.find(({ id }) => id === swimsuit.setId)

                if (typeof set !== 'undefined') obj.set = set.name
            }

            if (typeof swimsuit.typeId !== 'undefined') {
                const type = data.types.find(({ id }) => id === swimsuit.typeId)

                if (typeof type !== 'undefined') obj.type = type.name
            }

            if (typeof swimsuit.color !== 'undefined') {
                obj.color = swimsuit.color
            }
        }

        return obj
    }

    const colorData = () => {
        if (inputs.setId !== '') return data.sets.find(set => parseInt(set.id) === parseInt(inputs.setId)).colors

        if (inputs.setId === '' && inputs.swimsuitId !== '') return data.sets.find(set => parseInt(set.id) === data.swimsuits.find(swimsuit => parseInt(swimsuit.id) === parseInt(inputs.swimsuitId)).setId).colors

        return []
    }

    return (
        <form autoComplete='off' className={ styles.form } id='form' onSubmit={ handleSubmit }>
            { error.state && <Error>{ error.message }</Error> }

            { (change || del) &&
                <Select data={ data.swimsuits } handleChange={ handleChange } id='swimsuitId' label='Swimsuit' placeholder='-select-' value={ inputs.swimsuitId } />
            }

            {!del &&
            <>
                <Select data={ data.collections } handleChange={ handleChange } id='collectionId' label='Collection' placeholder={ swimsuitData().collection } value={ inputs.collectionId } />

                <Select data={ data.sets } handleChange={ handleChange } id='setId' label='Set' placeholder={ swimsuitData().set } value={ inputs.setId } />

                <Select data={ data.types } handleChange={ handleChange } id='typeId' label='Type' placeholder={ swimsuitData().type } value={ inputs.typeId } />

                <Input handleChange={ handleChange } id='name' label='Name' value={ inputs.name } />

                <Input handleChange={ handleChange } id='description' label='Description' value={ inputs.description } />

                <Select data={ colorData() } handleChange={ handleChange } id='color' label='Color' placeholder={ swimsuitData().color } value={ inputs.color } />

                <Input handleChange={ handleChange } id='price' label='Price' min='0' type='number' value={ inputs.price } />

                { images.map((img, id) =>
                    <div className={ styles.image } key={ img.id }>
                        <Input handleChange={ e => handleChangeImage(e, img.id) } id='image' label={ `${ id + 1 }. Image` } type='file' />

                        <Input handleChange={ e => handleChangeImage(e, img.id) } id='order' label='Order' min='1' type='number' value={ inputs.order } />

                        <div>
                            <button name='del' onClick={ e => handleImage(e, img.id) }>Delete</button>
                        </div>
                    </div>
                ) }

                <button name='add' onClick={ handleImage }>Add Image</button>
            </>
            }

            <button onClick={ handleClick } type='submit'>{ buttonText(change, del) }</button>
            <button onClick={ handleClick } type='button'>Cancel</button>
        </form>
    )
}

export default SwimsuitModal
