import Image from 'next/image'
import { useSelector } from 'react-redux'
import useImagesLoader from '../../hooks/useImagesLoader'
import FormSwimsuit from './FormSwimsuit'
import Loader from '../Loader'
import MyHead from '../MyHead'
import styles from '../../styles/Swimsuit.module.scss'

const SwimsuitComponent = () => {
    const { swimsuit } = useSelector(state => state.data)
    const { swimsuits } = useSelector(state => state.data)
    const { collections } = useSelector(state => state.data)
    const { sets } = useSelector(state => state.data)

    const loaded = useImagesLoader()

    if (!swimsuit) return <Loader />

    return (
        <>
            <MyHead meta={ `${ swimsuits.name }, ${ collections.map(collection => collection.name).join(', ') }, ${ sets.name }` } title={ `${ swimsuit.name } - BIKGAME` } />

            { !loaded && <Loader /> }

            <div className={ styles.container } style={ !loaded ? { display: 'none' } : undefined }>
                <div className={ styles.div }>
                    <div className={ `${ styles.firstImg } ${ styles.image }` }>
                        <Image
                            alt={ swimsuit.images[0].alt }
                            layout='fill'
                            loading='eager'
                            objectFit='cover'
                            quality={ 100 }
                            src={ `${ process.env.NEXT_PUBLIC_API_URL }/${ swimsuit.images[0].name }` }
                        />
                    </div>

                    <FormSwimsuit sets={ sets } swimsuit={ swimsuit } swimsuits={ swimsuits } />
                </div>

                <div>{ swimsuit.images.slice(1).map(img =>
                    <div className={ styles.image } key={ img.id }>
                        <Image
                            alt={ img.alt }
                            layout='fill'
                            loading='eager'
                            objectFit='cover'
                            quality={ 100 }
                            src={ `${ process.env.NEXT_PUBLIC_API_URL }/${ img.name }` }
                        />
                    </div>
                ) }
                </div>
            </div>
        </>
    )
}

export default SwimsuitComponent
