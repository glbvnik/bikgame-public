import Head from 'next/head'

const MyHead = ({ meta, title }) => {
    return (
        <Head>
            <meta keywords={ meta } />

            <title>{ title }</title>
        </Head>
    )
}

export default MyHead
