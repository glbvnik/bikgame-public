import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setSidebar } from '../../redux/actions'
import Navbar from './Navbar'
import Sidebar from './Sidebar/Sidebar'
import { Darkened } from './Styled'

const SidebarNavbar = ({ sidebar, setSidebar, admin, signedIn, cart, collections }) => {
    useEffect(() => {
        const body = document.body

        const darkened = document.getElementById('darkened')

        if (sidebar) {
            body.style.overflow = 'hidden'

            darkened.style.opacity = '0.5'

            darkened.style.visibility = 'initial'
        } else {
            body.style.overflow = 'initial'

            darkened.style.opacity = '0'

            darkened.style.visibility = 'hidden'
        }
    }, [sidebar])

    return (
        <>
            <Darkened id='darkened' />

            <Navbar cart={ cart } sidebar={ sidebar } setSidebar={ setSidebar } />

            <Sidebar admin={ admin } collections={ collections } sidebar={ sidebar } setSidebar={ setSidebar } signedIn={ signedIn } />
        </>
    )
}

const mapStateToProps = state => {
    return { sidebar: state.app.sidebar, admin: state.auth.admin, signedIn: state.auth.signedIn, collections: state.data.collections, cart: state.cart.cart }
}

const mapDispatchToProps = { setSidebar }

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavbar)
