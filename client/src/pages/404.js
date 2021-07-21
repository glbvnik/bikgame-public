import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { fetchData } from '../redux/actions'
import MyHead from '../components/MyHead'
import styles from '../styles/Custom404.module.scss'

const Custom404 = () => {
    const dispatch = useDispatch()

    useEffect(() => dispatch(fetchData()), [])

    return (
        <>
            <MyHead meta='error' title='Error - BIKGAME' />

            <div className={ styles.container }>
                <h2>Page not found</h2>

                <p>The page you requested does not exist</p>

                <p><Link href={ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }><a>Continue shopping</a></Link></p>
            </div>
        </>
    )
}

export default Custom404
