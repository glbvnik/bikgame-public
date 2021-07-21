import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import styles from '../../styles/Swimsuits.module.scss'

const Types = () => {
    const { types } = useSelector(state => state.data)

    const router = useRouter()

    const handleClick = (e, id) => {
        e.target.focus()

        if (e.target.name === 'all') {
            const regex = new RegExp(/[?&]typeId=([^&#]*)/)

            const url = regex.test(router.asPath) ? router.asPath.replace(regex, ``) : `${ router.asPath }`

            return router.push(url)
        }

        const regex = new RegExp(/typeId=([^&#]*)/)

        const question = new RegExp(/[?]/)

        const url = regex.test(router.asPath) ? router.asPath.replace(regex, `typeId=${ id }`) : `${ router.asPath }${ question.test(router.asPath) ? '&' : '?' }typeId=${ id }`

        router.push(url)
    }

    return (
        <div className={ styles.types }>
            <button className={ styles.type } name='all' onClick={ handleClick }>all</button>

            { types.map(type => <button className={ styles.type } key={ type.id } onClick={ e => handleClick(e, type.id) }>{ type.name }</button>) }
        </div>
    )
}

export default Types
