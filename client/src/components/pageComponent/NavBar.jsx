import React from 'react'
import BtnComponent from '../baseComponents/BtnComponent'
import MenuList from '../baseComponents/MenuList'

const NavBar = ({ setOpen, setSearchValue, accountDetails, setPopupData, menuListHandler }) => {
  const { first_name } = accountDetails;
  const menuList = ['Sign out']

  return (
    <div className='p-3 py-5 flex justify-between items-center'>
      <div>
        <div>
          <img src='/logo.png' className="h-10 w-auto" alt='Logo' />
        </div>
      </div>
      <div className='w-full'>
        <div className="relative flex w-1/4 flex-wrap items-stretch border border-gray-400 p-3 mx-auto rounded py-2">
          <input
            type="text"
            className="focus:outline-none w-full pr-7"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="absolute z-[2] flex items-center right-3"
            type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="black"
              className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className='flex gap-9 w-1/4 justify-end items-center'>
        <div>
          <BtnComponent name="+ Create Employee" fn={() => { setOpen(true); setPopupData({ head: 'Create New Employee', btnTxt: 'Create Employee' }) }} />
        </div>
        <div>
          <MenuList fn={menuListHandler} menuList={menuList}>
            <p className='bg-orange-500 text-white w-10 h-10 rounded-full text-base flex justify-center items-center font-semibold uppercase'>{first_name[0]}</p>
          </MenuList>
        </div>

      </div>
    </div>
  )
}

export default NavBar