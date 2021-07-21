import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosCart, IoIosClose, IoIosMenu } from 'react-icons/io'
import { IconLeft, IconRight, MyNavbar, NavbarTitle } from './Styled'
import styles from '../../styles/SidebarNavbar.module.scss'

const Navbar = ({ cart, sidebar, setSidebar }) => {
    const router = useRouter()

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <MyNavbar style={ router.asPath === process.env.NEXT_PUBLIC_SUCCESS_ROUTE ? { justifyContent: 'center' } : undefined }>

            { router.asPath !== process.env.NEXT_PUBLIC_SUCCESS_ROUTE &&
            <IconLeft className={ (!sidebar && router.pathname === '/') ? styles.leftIcon : styles.black } sidebar={ sidebar }>
                { !sidebar ? <IoIosMenu onClick={ showSidebar } /> : <IoIosClose onClick={ showSidebar } /> }
            </IconLeft>
            }

            { !sidebar &&
            <NavbarTitle>
                <a href='/'>{ router.pathname !== '/' && 'BIKGAME' }</a>
            </NavbarTitle>
            }

            { (!sidebar && router.asPath !== process.env.NEXT_PUBLIC_SUCCESS_ROUTE) &&
            <Link href={ process.env.NEXT_PUBLIC_CART_ROUTE }>
                <a>
                    <IconRight className={ `${ router.pathname !== '/' ? styles.black : undefined } ${ cart.length !== 0 ? styles.full : undefined }` }>
                        <IoIosCart />
                    </IconRight>
                </a>
            </Link>
            }
        </MyNavbar>
    )
}

export default Navbar
