import wrapper from '../../redux/store'
import { fetchData } from '../../redux/actions'
import Order from '../../components/Order'

const Success = () => <Order success={ true } />

export default Success

export const getServerSideProps = wrapper.getServerSideProps(store => async () => await store.dispatch(fetchData()))
