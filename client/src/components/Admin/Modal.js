import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../redux/actions'
import styles from '../../styles/Modal.module.scss'

const Modal = ({ children }) => {
    const modal = useSelector(state => state.app.modal)

    const dispatch = useDispatch()

    useEffect(() => { if (modal) document.getElementById('modal').scrollTop = 0 }, [modal])

    return (
        <div className={ modal ? `${ styles.active } ${ styles.modal }` : styles.modal } onClick={ () => dispatch(setModal(false)) }>
            <div className={modal ? `${ styles.active } ${ styles.content }` : styles.content } id='modal' onClick={ e => e.stopPropagation() }>
                { children }
            </div>
        </div>
    )
}

export default Modal
