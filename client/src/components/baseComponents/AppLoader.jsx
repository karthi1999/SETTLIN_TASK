import React from 'react'
import { Bars } from 'react-loader-spinner'

export const AppLoader = () => {
  return (
    <div className='loader-wrapper flex flex-col items-center justify-center w-[100vw] h-[100vh] bg-gray-500 bg-opacity-75 absolute top-0 left-0 z-40'>
      <Bars
        height="25"
        width="25"
        color="rgb(249 115 22)"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperclassName="pt-1 sm:pt-2"
        visible={true}
      />
    </div>
  )
}