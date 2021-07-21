import { useEffect, useState } from 'react'

function useImagesLoader() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!loaded) Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => img.onload = img.onerror = resolve)))
            .then(() => setLoaded(true))

        return () => setLoaded(true)
    }, [])

    return loaded
}

export default useImagesLoader
