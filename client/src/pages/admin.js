import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import { getImage } from '../http/image.http'
import { getPrice } from '../http/prices.http'
import { getSet } from '../http/set.http'
import { getSwimsuit } from '../http/swimsuit.http'
import { getType } from '../http/type.http'
import AdminComponent from '../components/Admin/Admin.component'

const Admin = () => <AdminComponent />

export default Admin

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const http = {
        images: getImage,
        prices: getPrice,
        sets: getSet,
        swimsuits: getSwimsuit,
        types: getType
    }

    await store.dispatch(fetchData(http))
})
