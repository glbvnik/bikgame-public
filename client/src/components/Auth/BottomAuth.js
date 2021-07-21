import Link from 'next/link'

const BottomAuth = ({ isSignup }) => {
    return (
        <>
            <p>
                <Link href={ isSignup ? process.env.NEXT_PUBLIC_SIGNIN_ROUTE : process.env.NEXT_PUBLIC_SIGNUP_ROUTE }>
                    <a>{ isSignup ? 'Sign In' : 'Sign Up' }</a>
                </Link>
            </p>

            { !isSignup &&
            <p>
                <Link href={ process.env.NEXT_PUBLIC_RESET_ROUTE }>
                    <a>Forgot your password?</a>
                </Link>
            </p>
            }
        </>
    )
}

export default BottomAuth
