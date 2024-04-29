import React from 'react'

function Button({
    children,
    text,//text ka dusra naam
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',//agar koi classname user nai pass ki h toh
    ...props //agar or koi property h toh voh sari props mai lai li
})
{return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button