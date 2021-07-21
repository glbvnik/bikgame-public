import { useEffect, useRef } from 'react'

function useFocus() {
    const inputRef = useRef()

    const setFocus = () => inputRef.current.focus()

    useEffect(() => setFocus(), [])

    return [inputRef]
}

export default useFocus
