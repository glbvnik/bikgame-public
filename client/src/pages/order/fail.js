import wrapper from '../../redux/store'
import { fetchData } from '../../redux/actions'
import Order from '../../components/Order'

const Fail = () => <Order />

export default Fail

export const getServerSideProps = wrapper.getServerSideProps(store => async () => await store.dispatch(fetchData()))
