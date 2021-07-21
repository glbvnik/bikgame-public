import wrapper from '../../redux/store'
import { fetchData } from '../../redux/actions'
import PasswordComponent from '../../components/Reset/Password.component'

const Password = () => <PasswordComponent />

export default Password

export const getServerSideProps = wrapper.getServerSideProps(store => async () => await store.dispatch(fetchData()))
