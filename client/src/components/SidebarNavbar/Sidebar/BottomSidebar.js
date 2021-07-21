import Link from 'next/link'
import { clear } from '../../../http/user.http'
import { Bottom, BottomTitle } from '../Styled'

const BottomSidebar = ({ admin, signedIn, closeSidebar }) => {
    const data = [
        { title: 'Sign In', href: process.env.NEXT_PUBLIC_SIGNIN_ROUTE },
        { title: 'Sign Up', href: process.env.NEXT_PUBLIC_SIGNUP_ROUTE },
        { title: 'Orders', href: process.env.NEXT_PUBLIC_ORDERS_ROUTE },
        { title: 'Admin', href: process.env.NEXT_PUBLIC_ADMIN_ROUTE }
    ]

    const cases = [
        { _case: admin, data: [data[2], data[3]] },
        { _case: !admin && !signedIn, data: [data[0], data[1]] },
        { _case: !admin && signedIn, data: [data[2]] }
    ]

    const logOut = async () => {
        try {
            await clear()

            location.assign(process.env.NEXT_PUBLIC_SIGNIN_ROUTE)
        } catch (e) {}
    }

    return (
        <Bottom>
            { cases.find(({ _case }) => _case)?.data.map((d, id) =>
                <BottomTitle key={ id }>
                    <Link href={ d.href }>
                        <a onClick={ closeSidebar }>{ d.title }</a>
                    </Link>
                </BottomTitle>
            ) }

            { signedIn &&  <BottomTitle><a onClick={ logOut }>Log Out</a></BottomTitle>}
        </Bottom>
    )
}

export default BottomSidebar
