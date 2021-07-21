import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import lscache from 'lscache'
import wrapper from '../redux/store'
import { initCart, setAuth } from '../redux/actions'
import Layout from '../components/Layout'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => dispatch(initCart(lscache.get('cart'))), [])

    useEffect(() => document.addEventListener('wheel', () => { if(document.activeElement.type === 'number') document.activeElement.blur() }), [])

    useEffect(async () => await dispatch(setAuth()), [router.asPath])

    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
            </Head>

            <Layout>
                <Component { ...pageProps } />
            </Layout>
        </>
    )
}

export default wrapper.withRedux(MyApp)
