import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import Auth from '../components/Auth/Auth'

const Signup = () => <Auth />

export default Signup

export const getServerSideProps = wrapper.getServerSideProps(store => async () => await store.dispatch(fetchData()))
