import wrapper from '../../redux/store'
import { fetchData, setPage } from '../../redux/actions'
import PageComponent from '../../components/Page.component'

const Page = () => <PageComponent />

export default Page

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
    await store.dispatch(fetchData())

    const res = await store.dispatch(setPage(params.id))

    if (!res) return { notFound: true }
})
