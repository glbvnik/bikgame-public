import { useEffect, useRef, useState } from 'react'

function useError(modal = true) {
    const [error, setError] = useState({ state: false, message: '' })

    const timeout = useRef()

    useEffect(() => {
        if (!modal) return setError({ state: false, message: '' })

        if (error.state) {
            timeout.current = setTimeout(() => setError({ state: false, message: '' }), 10000)
        } else {
            clearTimeout(timeout.current)
        }

        return () => clearTimeout(timeout.current)
    }, [error.state, modal])

    return [error, setError]
}

export default useError
