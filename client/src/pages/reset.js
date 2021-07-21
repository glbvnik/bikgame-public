import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import ResetComponent from '../components/Reset/Reset.component'

const Reset = () => <ResetComponent />

export default Reset

export const getServerSideProps = wrapper.getServerSideProps(store => async () => await store.dispatch(fetchData()))
