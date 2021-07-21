import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useError from '../../hooks/useError'
import { fetchData, setModal } from '../../redux/actions'
import { getImage } from '../../http/image.http'
import requests from '../../http/requests'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { Error } from '../UI/Styled'
import styles from '../../styles/Modal.module.scss'

const MainImagesModal = ({ change }) => {
    const [images, setImages] = useState([])

    const { data } = useSelector(state => state)

    const { modal } = useSelector(state => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!modal) {
            setImages([])

            return dispatch(fetchData({ images: getImage }))
        }

        document.getElementById('form2').scrollIntoView({ behavior: 'smooth', block: 'end' })

        if (change) setImages(data.images)
    }, [modal])

    const [error, setError] = useError(modal)

    const handleChange = (e, id) => {
        if (e.target.files) return setImages(images.map(img => img.id === id ? { ...img, [e.target.name]: e.target.files[0] } : img))

        setImages(images.map(img => img.id === id ? { ...img, [e.target.name]: e.target.value } : img))
    }

    const handleImage = (e, id) => {
        e.preventDefault()

        if (e.target.name === 'del') return setImages(images.filter(img => img.id !== id))

        setImages([...images, { id: Date.now(), image: null, alt: '', order: data.images.length !== 0 ? data.images.length + images.length + 1 : 1, position: '' }])
    }

    let submit = {}

    const handleClick = async (e, imageId) => {
        if (e.target.type === 'button') return dispatch(setModal(false))

        submit.action = e.target.textContent + ' Main Images'
        submit.imageId = imageId
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await requests(submit.action, null, images, submit.imageId)
        } catch (e) {
            document.getElementById('form2').scrollIntoView({ behavior: 'smooth', block: 'start' })

            setError({ state: true, message: typeof e.response !== 'undefined' ? e.response.data.message : e })

            if (typeof e.response !== 'undefined') e.response.status === 401 && location.assign(process.env.NEXT_PUBLIC_SIGNIN_ROUTE)

            return
        }

        dispatch(setModal(false))
    }

    const buttonText = (change) => {
        if (change) {
            const text = 'Change'

            return text
        }

        const text = 'Create'

        return text
    }

    return (
        <form autoComplete='off' className={ styles.form2 } id='form2' onSubmit={ handleSubmit }>
            { error.state && <Error>{ error.message }</Error> }

            { images.map((img, id) =>
                <div className={ styles.image } key={ id }>
                    <Input handleChange={ e => handleChange(e, img.id) } id='image' label={ `${ id + 1 }. Image` } type='file' />

                    <Select data={ data.swimsuits } handleChange={ handleChange } id='alt' label='Swimsuit' placeholder='-select-' value={ img.alt } />

                    <Input handleChange={ e => handleChange(e, img.id) } id='order' label='Order' min='1' type='number' value={ img.order } />

                    <Input handleChange={ e => handleChange(e, img.id) } id='position' label='Position' placeholder='50% 50%' value={ img.position } />

                    <div>
                        <button name='del' onClick={ e => handleImage(e, img.id) }>Delete</button>
                    </div>
                </div>
            ) }

            <button name='add' onClick={ handleImage }>Add Image</button>

            <button onClick={ handleClick } type='submit'>{ buttonText(change) }</button>
            <button onClick={ handleClick } type='button'>Cancel</button>
        </form>
    )
}

export default MainImagesModal
