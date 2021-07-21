import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../redux/actions'
import Custom404 from '../../pages/404'
import MyHead from '../MyHead'
import Modal from './Modal'
import SwimsuitModal from './Swimsuit.modal'
import CollectionSetTypeModal from './CollectionSetType.modal'
import PricesModal from './Prices.modal'
import MainImagesModal from './MainImages.modal'
import styles from '../../styles/Admin.module.scss'

const AdminComponent = () => {
    const { admin } = useSelector(state => state.auth)

    const children = useRef({})

    const modal = useSelector(state => state.app.modal)

    const dispatch = useDispatch()

    useEffect(() => {
        const body = document.body

        if (modal) return body.style.overflow = 'hidden'

        body.style.overflow = 'initial'
    }, [modal])

    const setChildren = e => {
        switch (e.target.textContent) {
            case 'Create Swimsuit':
                return children.current = { children: <SwimsuitModal /> }
            case 'Change Swimsuit':
                return children.current = { children: <SwimsuitModal change={ true } /> }
            case 'Delete Swimsuit':
                return children.current = { children: <SwimsuitModal del={ true } />}
            case 'Create Collection':
                return children.current = { children: <CollectionSetTypeModal type='Collection' /> }
            case 'Change Collection':
                return children.current = { children: <CollectionSetTypeModal change={ true } type='Collection' /> }
            case 'Delete Collection':
                return children.current = { children: <CollectionSetTypeModal del={ true } type='Collection' /> }
            case 'Create Set':
                return children.current = { children: <CollectionSetTypeModal type='Set' /> }
            case 'Change Set':
                return children.current = { children: <CollectionSetTypeModal change={ true } type='Set' /> }
            case 'Delete Set':
                return children.current = { children: <CollectionSetTypeModal del={ true } type='Set' /> }
            case 'Create Type':
                return children.current = { children: <CollectionSetTypeModal type='Type' /> }
            case 'Change Type':
                return children.current = { children: <CollectionSetTypeModal change={ true } type='Type' /> }
            case 'Delete Type':
                return children.current = { children: <CollectionSetTypeModal del={ true } type='Type' /> }
            case 'Change Prices':
                return children.current = { children: <PricesModal /> }
            case 'Create Images':
                return children.current = { children: <MainImagesModal /> }
            case 'Change Images':
                return children.current = { children: <MainImagesModal change={ true } /> }
            default:
                return children.current = {}
        }
    }
    
    const handleClick = e => {
        e.target.focus()
        
        setChildren(e)
        
        dispatch(setModal(true))
    }

    if (!admin) return <Custom404 />

    return (
        <>
            <MyHead title='Admin - BIKGAME' />

            <div className={ styles.container }>
                <Modal { ...children.current } />

                <h2>Swimsuit</h2>
                <button onClick={ handleClick }>Create Swimsuit</button>
                <button onClick={ handleClick }>Change Swimsuit</button>
                <button onClick={ handleClick }>Delete Swimsuit</button>

                <h2>Collection</h2>
                <button onClick={ handleClick }>Create Collection</button>
                <button onClick={ handleClick }>Change Collection</button>
                <button onClick={ handleClick }>Delete Collection</button>

                <h2>Set</h2>
                <button onClick={ handleClick }>Create Set</button>
                <button onClick={ handleClick }>Change Set</button>
                <button onClick={ handleClick }>Delete Set</button>

                <h2>Type</h2>
                <button onClick={ handleClick }>Create Type</button>
                <button onClick={ handleClick }>Change Type</button>
                <button onClick={ handleClick }>Delete Type</button>

                <h2>Prices</h2>
                <button onClick={ handleClick }>Change Prices</button>

                <h2>Main Images</h2>
                <button onClick={ handleClick }>Create Images</button>
                <button onClick={ handleClick }>Change Images</button>
            </div>
        </>
    )
}

export default AdminComponent
