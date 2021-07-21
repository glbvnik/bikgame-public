import Image from 'next/image'
import styles from '../../styles/Swimsuits.module.scss'

const Card = ({ img, name, price }) => {
    return (
        <div className={ styles.card }>
            <div className={ styles.image }>
                <Image
                    alt={ name }
                    layout='fill'
                    loading='eager'
                    objectFit='cover'
                    quality={ 100 }
                    src={ `${ process.env.NEXT_PUBLIC_API_URL }/${ img }` }
                />
            </div>

            <h3>{ name }</h3>
            <p>{ price }₴</p>
        </div>
    )
}

export default Card
