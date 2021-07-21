import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import { getSwimsuit } from '../http/swimsuit.http'
import { getType } from '../http/type.http'
import SwimsuitsComponent from '../components/Swimsuits/Swimsuits.component'

const Swimsuits = () => <SwimsuitsComponent />

export default Swimsuits

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    const http = {
        swimsuits: () => getSwimsuit(query),
        types: getType
    }

    await store.dispatch(fetchData(http))
})
