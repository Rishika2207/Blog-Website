import React, { useId } from 'react'
//why we used useref here?
//humne ek component banaya toh uski state bhi vhi hogi lekin humme uski state ka access khi or chahiye toh use liye reference dena padega toh vha kaam aayega useRef
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",//kya kya lene wale h
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label //agar kisi nai label pass kiya h toh
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})
export default Input