import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import OrdersComponent from '../components/Orders/Orders.component'

const Orders = () => <OrdersComponent />

export default Orders

export const getServerSideProps = wrapper.getServerSideProps(store => async () => await store.dispatch(fetchData()))
