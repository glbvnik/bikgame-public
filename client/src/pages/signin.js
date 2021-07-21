import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import Auth from '../components/Auth/Auth'

const Signin = () => <Auth />

export default Signin

export const getServerSideProps = wrapper.getServerSideProps(store => async () => await store.dispatch(fetchData()))
