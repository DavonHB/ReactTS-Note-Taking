import { useEffect, useState } from 'react'

export function useLocalStorage<TypeT>(key: string, 
    initialValue: TypeT | (() => TypeT)) {
        // Checking if the value exists yet in localStorage
        const [value, setValue] = useState<TypeT>(() => {
            const jsonValue = localStorage.getItem(key)

            if(jsonValue == null) {
                if (typeof initialValue === 'function') {
                    // Initial value is a function that returns the type of T (TypeT)
                    return (initialValue as () => TypeT)
                } else {
                    return initialValue
                }
            } else {
                return JSON.parse(jsonValue)
            }
        })

    // Save data in localStorage anytime our value or key changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)
    )}, [value, key])
    
    // First value (value) is going to be returned as TypeT, the second value (setValue) is going to be the typeof whatever it is set as
    return [value, setValue] as [TypeT, typeof setValue]
}