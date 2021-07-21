import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import useImagesLoader from '../../hooks/useImagesLoader'
import Loader from '../Loader'
import Types from './Types'
import Card from './Card'
import MyHead from '../MyHead'
import styles from '../../styles/Swimsuits.module.scss'

const SwimsuitsComponent = () => {
    const { swimsuits } = useSelector(state => state.data)
    const { collections } = useSelector(state => state.data)
    const { sets } = useSelector(state => state.data)

    const router = useRouter()

    const collection = collections.find(collection => collection.id === parseInt(router.query.collectionId))
    const set = sets.find(set => set.id === parseInt(router.query.setId))

    const title = useRef('')

    const setTitle = () => {
        if (set) {
            title.current = `${ collection.name } - ${ set.name }`
        } else if (collection) {
            title.current = collection.name
        } else {
            title.current = 'ALL'
        }
    }

    setTitle()

    useEffect(setTitle, [router.query])

    const loaded = useImagesLoader()

    if (swimsuits.length === 0) return <Loader />

    return (
        <>
            <MyHead meta={ `${ swimsuits.map(swimsuit => swimsuit.name).join(', ') }, ${ collections.map(collection => collection.name).join(', ') }, ${ sets.map(set => set.name).join(', ') }` } title={ `${ title.current } - BIKGAME` } />

            { (!router.query.setId && loaded) && <Types /> }

            { !loaded && <Loader /> }

            <div className={ styles.cards } style={ !loaded ? { display: 'none' } : undefined }>
                { swimsuits.map(swimsuit =>
                    <div className={ styles.div } key={ swimsuit.id }>
                        <Link href={`${ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }/${ swimsuit.name }?collectionId=${ swimsuit.collectionId }&setId=${ swimsuit.setId }`}>
                            <a>
                                <Card img={ swimsuit.images[0].name } name={ swimsuit.name } price={ swimsuit.price } />
                            </a>
                        </Link>
                    </div>
                ) }
            </div>
        </>
    )
}

export default SwimsuitsComponent
