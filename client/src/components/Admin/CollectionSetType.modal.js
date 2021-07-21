import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, setModal } from '../../redux/actions'
import { getCollection } from '../../http/collection.http'
import { getSet } from '../../http/set.http'
import { getType } from '../../http/type.http'
import requests from '../../http/requests'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { Error } from '../UI/Styled'
import styles from '../../styles/Modal.module.scss'
import useError from '../../hooks/useError'

const CollectionSetTypeModal = ({ change, del, type }) => {
    const [inputs, setInputs] = useState({ name: '', colors: '', topSizes: '', bottomSizes: '', dataId: '', collectionId: '' })

    const [placeholder, setPlaceholder] = useState({
        name: 'Name',
        colors: 'color1,color2,color3',
        topSizes: 'size1,size2,size3',
        bottomSizes: 'size1,size2,size3'
    })

    const { data } = useSelector(state => state)

    const { modal } = useSelector(state => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!modal) {
            setInputs({ name: '', colors: '', topSizes: '', bottomSizes: '', dataId: '', collectionId: '' })

            setPlaceholder({
                name: 'Name',
                colors: 'color1,color2,color3',
                topSizes: 'size1,size2,size3',
                bottomSizes: 'size1,size2,size3'
            })

            const http = {
                collections: getCollection,
                sets: getSet,
                types: getType
            }

            return dispatch(fetchData(http))
        }

        document.getElementById('form1').scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, [modal])

    const [error, setError] = useError(modal)

    const handleChange = e => {
        if (type === 'Collection' && change) {
            const collection = data.collections.find(({ id }) => id === Number.parseInt(e.target.value))

            typeof collection !== 'undefined' && setPlaceholder({ ...placeholder, name: collection.name })
        }

        if (type === 'Type' && change) {
            const type = data.types.find(({ id }) => id === Number.parseInt(e.target.value))

            typeof type !== 'undefined' && setPlaceholder({ ...placeholder, name: type.name })
        }

        if (type === 'Set' && change) {
            if (e.target.name === 'dataId') {
                const set = data.sets.find(({ id }) => id === Number.parseInt(e.target.value))

                typeof set !== 'undefined' && setPlaceholder({ name: set.name, colors: set.colors, topSizes: set.topSizes, bottomSizes: set.bottomSizes })

                return setInputs({ ...inputs, collectionId: '', [e.target.name]: e.target.value })
            }
        }

        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleClick = async e => {
        e.preventDefault()

        if (e.target.textContent === 'Cancel') return dispatch(setModal(false))

        const action = e.target.textContent + ' ' + type

        try {
            await requests(action, inputs)
        } catch (e) {
            document.getElementById('form1').scrollIntoView({ behavior: 'smooth', block: 'start' })

            setError({ state: true, message: typeof e.response !== 'undefined' ? e.response.data.message : e })

            if (typeof e.response !== 'undefined') e.response.status === 401 && location.assign(process.env.NEXT_PUBLIC_SIGNIN_ROUTE)

            return
        }

        if (type === 'Set' && change) {
            setPlaceholder({
                name: 'Name',
                colors: 'color1,color2,color3',
                topSizes: 'size1,size2,size3',
                bottomSizes: 'size1,size2,size3'
            })
        }

        dispatch(setModal(false))

        return setInputs({ name: '', colors: '', topSizes: '', bottomSizes: '', dataId: '', collectionId: '' })
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

    const collectionName = () => {
        if (inputs.dataId !== '') {
            const set = data.sets.find(({ id }) => id === Number.parseInt(inputs.dataId))

            if (typeof set.collectionId !== 'undefined') return data.collections.find(({ id }) => id === set.collectionId).name
        }

        return '-select-'
    }

    const setData = () => {
        let d

        if (type === 'Collection') return d = data.collections

        if (type === 'Set') return d = data.sets

        if (type === 'Type') return d = data.types
    }

    return (
        <form autoComplete='off' className={ styles.form } id='form1'>
            { error.state && <Error>{ error.message }</Error> }

            { (change || del) &&
            <Select data={ setData() } handleChange={ handleChange } id='dataId' label={ type } placeholder='-select-' value={ inputs.dataId } />
            }

            { !del &&
            <Input handleChange={ handleChange } id='name' label='Name' value={ inputs.name } />
            }

            { (type === 'Set' && !del) &&
            <>
                <Select data={ data.collections } handleChange={ handleChange } id='collectionId' label='Collection' placeholder={ collectionName() } value={ inputs.collectionId } />

                <Input handleChange={ handleChange } id='colors' label='Colors' placeholder={ placeholder.colors } value={ inputs.color } />

                <Input handleChange={ handleChange } id='topSizes' label='Top sizes' placeholder={ placeholder.topSizes } value={ inputs.topSizes } />

                <Input handleChange={ handleChange } id='bottomSizes' label='Bottom sizes' placeholder={ placeholder.bottomSizes } value={ inputs.bottomSizes } />
            </>
            }

            <button onClick={ handleClick }>{ buttonText(change, del) }</button>
            <button onClick={ handleClick }>Cancel</button>
        </form>
    )
}

export default CollectionSetTypeModal
