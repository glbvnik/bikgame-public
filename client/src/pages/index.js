import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import { getImage } from '../http/image.http'
import { getSwimsuit } from '../http/swimsuit.http'
import Carousel from '../components/Carousel'

const Index = () => <Carousel/>

export default Index

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const http = { images: getImage, swimsuits: getSwimsuit }

    await store.dispatch(fetchData(http))
})
