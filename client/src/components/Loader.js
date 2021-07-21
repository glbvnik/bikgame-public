import MyHead from './MyHead'
import useResize from '../hooks/useResize'
import styles from '../styles/Loader.module.scss'

const Loader = () => {
    useResize({ id: 'loader', client: true, offSet: 60 })

    return (
        <>
            <MyHead title='BIKGAME' />

            <div className={ styles.loader } id='loader'>
                <div />
            </div>
        </>
    )
}

export default Loader
