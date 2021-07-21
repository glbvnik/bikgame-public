import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import { getPrice } from '../http/prices.http'
import CheckoutComponent from '../components/Checkout/Checkout.component'

const Checkout = () => <CheckoutComponent />

export default Checkout

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const http = { prices: getPrice }

    await store.dispatch(fetchData(http))
})
