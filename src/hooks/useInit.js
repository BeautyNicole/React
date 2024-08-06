const { useState, useEffect } = require("react");

function useInit(callback, ...args) {
    const [mounted, setMounted] = useState(false)

    const resetInit = () => setMounted(false)

    useEffect(() => {
        if(!mounted) {
            setMounted(true)
            callback(...args)
        }
    }, [mounted, callback])

    return [resetInit]
} 

export default useInit