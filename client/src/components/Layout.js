import useResize from '../hooks/useResize'
import SidebarNavbar from './SidebarNavbar/SidebarNavbar'
import Footer from './Footer'

const Layout = ({ children }) => {
    useResize({ id: 'layout' })

    return (
        <div id='layout' style={{ display: 'flex', flexDirection: 'column', visibility: 'hidden' }}>
            <SidebarNavbar />
            { children }
            <Footer />
        </div>
    )
}

export default Layout
