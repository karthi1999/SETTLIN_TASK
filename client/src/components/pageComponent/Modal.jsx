import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import BtnComponent from '../baseComponents/BtnComponent';
import { fields } from '../../utils/expenseFields';

export default function Modal(
  {
    open,
    setOpen,
    formData,
    setFormData,
    submitHandler,
    errors,
    setErrors,
    initialState,
    popupData,
    categories,
    searchValue,
    setSearchValue
  }
) {

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [optionFlag, setOptionFlag] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'spend' && value.length > 0 && !/^\d+$/.test(value)) {
      return;
    }
    if ((name === 'category') && /^\d/.test(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };



  useEffect(() => {
    // Filter categories based on the search value
    const filtered = categories.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Move the exact match to the beginning of the array
    const sortedCategories = filtered.sort((a, b) => {
      const aIndex = a.name.toLowerCase().indexOf(searchValue.toLowerCase());
      const bIndex = b.name.toLowerCase().indexOf(searchValue.toLowerCase());
      return aIndex - bIndex;
    });

    setFilteredCategories(sortedCategories);
  }, [searchValue, categories]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-3 sm:w-auto text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all w-full sm:max-w-2xl sm:p-6 sm:pt-3">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div className='flex justify-between items-center border-b pb-4'>
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {popupData.head}
                      </Dialog.Title>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => { setOpen(false); setFormData(initialState) }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>

                    <div className="mt-4">
                      <div className="grid grid-cols-2 gap-x-5">
                        {fields &&
                          fields.map((field, index) => {
                            const { id, label } = field;
                            return (
                              <div key={index} className='col-span-2'>
                                <label
                                  htmlFor={id}
                                  className="block text-sm font-medium leading-6 text-gray-900 text-left"
                                >
                                  {label} {id !== 'discription' && <span className='text-xs text-[#E0454B]'>*</span>}
                                </label>
                                {id !== "category"
                                  ?
                                  id === "date"
                                    ? <div className={`${errors[id] ? "mb-0" : "mb-5"}`}>
                                      <input
                                        id={id}
                                        name={id}
                                        type="date"
                                        value={formData[id]}
                                        required
                                        onClick={() => setOptionFlag(false)}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        className={`block w-full rounded-md border focus:outline-none focus:border-indigo-600 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 px-3  sm:text-sm sm:leading-6 ${errors[id] ? 'border-[#E0454B]' : ''
                                          }`}
                                      />
                                    </div>
                                    : <div className={`${errors[id] ? "mb-0" : "mb-5"}`}>
                                      <input
                                        id={id}
                                        name={id}
                                        type="text"
                                        value={formData[id]}
                                        required
                                        onClick={() => setOptionFlag(false)}
                                        placeholder={id === "spend" ? "\u20B9" : ''}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        className={`block w-full rounded-md border focus:outline-none focus:border-indigo-600 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 px-3  sm:text-sm sm:leading-6 ${errors[id] ? 'border-[#E0454B]' : ''
                                          }`}
                                      />
                                    </div>
                                  : <div className={`relative ${errors[id] ? "mb-0" : "mb-5"}`}>
                                    <input
                                      id={id}
                                      name={id}
                                      type="text"
                                      className={`block w-full rounded-md border focus:outline-none focus:border-indigo-600 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 px-3  sm:text-sm sm:leading-6 ${errors[id] ? 'border-[#E0454B]' : ''}`}
                                      placeholder="Search"
                                      value={formData[id]}
                                      required
                                      onClick={() => setOptionFlag(true)}
                                      onChange={(e) => {
                                        setSearchValue(e.target.value); handleChange(e)
                                      }}
                                      onFocus={handleFocus}
                                    />
                                    <button
                                      className="absolute flex items-center right-3 top-2"
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
                                    {optionFlag &&
                                      <div className='h-44 w-full overflow-auto absolute border mt-1 rounded-md bg-white shadow-sm text-left'>
                                        {filteredCategories.map((item, i) => (
                                          <p
                                            key={i}
                                            className='p-1 px-4 hover:bg-gray-100'
                                            onClick={() => {
                                              setOptionFlag(false); setSearchValue(item.name);
                                              setFormData((prevData) => ({
                                                ...prevData,
                                                ["category"]: item.name,
                                              }));
                                            }}
                                          >
                                            {item.name}
                                          </p>
                                        ))}
                                      </div>}
                                  </div>}
                                {errors[id] && (
                                  <p className="text-xs text-[#E0454B] text-right pt-1 pl-1">{errors[id]}</p>
                                )}
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <BtnComponent name={popupData.btnTxt} fn={submitHandler} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
