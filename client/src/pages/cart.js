import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import { getSet } from '../http/set.http'
import { getSwimsuit } from '../http/swimsuit.http'
import CartComponent from '../components/Cart/Cart.component'


const Cart = () => <CartComponent />

export default Cart

Cart.getInitialProps = wrapper.getInitialPageProps(store => async ({ req }) => {
    if (!req) {
        const http = {
            sets: getSet,
            swimsuits: () => getSwimsuit()
        }

        await store.dispatch(fetchData(http))
    }

    await store.dispatch(fetchData())
})
