import { useEffect } from 'react'
import Link from 'next/link'
import useResize from '../../../hooks/useResize'
import MenuItem from './MenuItem'
import BottomSidebar from './BottomSidebar'
import { MenuTitle, MySidebar, SidebarWrap } from '../Styled'
import styles from '../../../styles/SidebarNavbar.module.scss'

const Sidebar = ({ admin, collections, sidebar, setSidebar, signedIn }) => {
    useEffect(() => document.body.onclick = (e => { if (e.clientX >= 300) setSidebar(false) }), [])

    useResize({ id: 'sidebarWrap', offSet: 60 })

    const closeSidebar = () => setSidebar(false)

    return (
        <MySidebar sidebar={ sidebar }>
            <SidebarWrap id='sidebarWrap'>
                <Link href={ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }>
                    <MenuTitle onClick={ closeSidebar }>
                        <h2 className={ styles.h2 }>ALL</h2>
                    </MenuTitle>
                </Link>

                { collections.map(collection => <MenuItem collection={ collection } id={ collection.id } key={ collection.id } />) }

                <BottomSidebar admin={ admin } signedIn={ signedIn } closeSidebar={ closeSidebar } />
            </SidebarWrap>
        </MySidebar>
    )
}

export default Sidebar
