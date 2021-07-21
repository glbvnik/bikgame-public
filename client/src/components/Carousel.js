import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'
import useImagesLoader from '../hooks/useImagesLoader'
import useResize from '../hooks/useResize'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Loader from './Loader'
import MyHead from './MyHead'
import styles from '../styles/Carousel.module.scss'

const Carousel = () => {
    const imgs = useRef([])

    const num = useRef(0)

    const interval = useRef()

    const click = useRef(false)

    const { images } = useSelector(state => state.data)
    const { collections } = useSelector(state => state.data)
    const { sets } = useSelector(state => state.data)
    const { swimsuits } = useSelector(state => state.data)

    const { sidebar } = useSelector(state => state.app)

    useEffect(() => {
        imgs.current = document.querySelectorAll('#container img')

        imgs.current[imgs.current.length - 1].style.opacity = '1'
    }, [])

    const loaded = useImagesLoader()

    useEffect(() => {
        if (!sidebar) {
            if (loaded) interval.current = setInterval(() => slide(1), 10000)

            click.current = false

            return () => clearInterval(interval.current)
        }
    }, [loaded, click, sidebar])

    useResize({ id: 'container', client: true, offSet: 60 })

    const slide = count => {
        const container = document.getElementById(`container`)

        const current = container.children[imgs.current.length - 1]

        const prev = num.current

        if ((num.current + count) < 0) {
            num.current = images.length - 1
        } else if ((num.current + count) > images.length - 1) {
            num.current = 0
        } else {
            num.current = num.current + count
        }

        const next = document.getElementById(`${ imgs.current.length - 1 - num.current }main`)

        container.insertBefore(next, current.nextSibling)

        setTimeout(() => {
            imgs.current[imgs.current.length - 1 - prev].style.opacity = '0'

            imgs.current[imgs.current.length - 1 - num.current].style.opacity = '1'
        }, 20)
    }

    const handleClick = count => {
        slide(count)

        clearInterval(interval.current)

        click.current = true
    }

    const handleSwipe = useSwipeable({
        onSwipedLeft: e => handleClick(1),
        onSwipedRight: e => handleClick(-1)
    })

    return (
        <>
            <MyHead meta={ `${ images.map(img => img.alt).join(', ') }, ${ collections.map(collection => collection.name).join(', ') }, ${ sets.map(set => set.name).join(', ') }` } title='BIKGAME' />

            { !loaded && <Loader /> }

            <div className={ styles.container } id='container' style={ !loaded ? { display: 'none' } : undefined } { ...handleSwipe }>
                { images.map((img, id) => {
                    const swimsuit = swimsuits.find(({ name }) => name === img.alt)

                    return (
                        <div className='image' id={`${ id }main`} key={ id }>
                            <Link href={ `${ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }/${ img.alt }?collectionId=${ swimsuit.collectionId }&setId=${ swimsuit.setId }` } key={ id }>
                                <a>
                                    <Image
                                        alt={ img.alt }
                                        layout='fill'
                                        loading='eager'
                                        objectFit='cover'
                                        objectPosition={ img.position }
                                        src={ `${ process.env.NEXT_PUBLIC_API_URL }/${ img.name }` }
                                        unoptimized={ true }
                                    />
                            </a>
                        </Link>
                    </div>
                    ) }
                ) }

                { !sidebar &&
                <>
                    <IoIosArrowBack onClick={() => handleClick(-1)} />
                    <IoIosArrowForward onClick={() => handleClick(1)} />
                </>
                }
            </div>
        </>
    )
}

export default Carousel
