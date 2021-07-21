import CodeComponent from '../../components/Verify/Code.component'

const Code = ({ query }) => <CodeComponent query={ query } />

export default Code

export async function getServerSideProps({ query }) { return { props: { query: query.id } } }
