import wrapper from '../redux/store'
import { fetchData } from '../redux/actions'
import VerifyComponent from '../components/Verify/Verify.component'

const Verify = () => <VerifyComponent />

export default Verify

export const getServerSideProps = wrapper.getServerSideProps(store => async () => await store.dispatch(fetchData()))
