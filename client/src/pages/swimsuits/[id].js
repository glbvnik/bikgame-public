import wrapper from '../../redux/store'
import { fetchData } from '../../redux/actions'
import { getSet } from '../../http/set.http'
import { getOneSwimsuit, getSwimsuit } from '../../http/swimsuit.http'
import SwimsuitComponent from '../../components/Swimsuit/Swimsuit.component'

const Swimsuit = () => <SwimsuitComponent />

export default Swimsuit

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    const http = {
        sets: () => getSet(query.setId),
        swimsuit: () => getOneSwimsuit(query.id),
        swimsuits: () => getSwimsuit({ collectionId: query.collectionId, setId: query.setId })
    }

    await store.dispatch(fetchData(http))
})
