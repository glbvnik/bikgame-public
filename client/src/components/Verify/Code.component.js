import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { verify } from '../../http/user.http'
import MyHead from '../MyHead'
import Loader from '../Loader'
import styles from '../../styles/Verify.module.scss'

const CodeComponent = ({ query }) => {
    const { signedIn } = useSelector(state => state.auth)

    const router = useRouter()

    useEffect(async () => {
        if (router.asPath !== process.env.NEXT_PUBLIC_SUCCESS_ROUTE) {
            const { data } = await verify(query)

            return router.push(data.route)
        }

        setTimeout(() => router.push(process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE), 5000)
    }, [router.asPath])

    if (signedIn && router.asPath === process.env.NEXT_PUBLIC_SUCCESS_ROUTE) return (
        <>
            <MyHead meta='verify' title='Verify - BIKGAME' />

            <div className={ styles.container } style={{ margin: 'auto' }}><h2>Thank you for registration!</h2></div>
        </>
    )

    return <Loader />
}

export default CodeComponent
