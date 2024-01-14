import React, { useEffect, useState } from 'react';
import { fields } from '../utils/expenseFields';
import NavBar from '../components/pageComponent/NavBar';
import MenuList from '../components/baseComponents/MenuList';
import BtnComponent from '../components/baseComponents/BtnComponent';
import Modal from '../components/pageComponent/Modal';
import { isValidEmail, isValidPhone } from '../utils/checkHandler';
import { useDispatch, useSelector } from 'react-redux';
import getCookie from "../utils/getCookie"
import { createExpenseAPI, deleteExpenseAPI, getAccountDetailsAPI, getAllExpenseAPI, getLimitAPI, setLimitAPI, signoutAPI, updateExpenseAPI } from '../store';
import { useNavigate } from 'react-router-dom';
import getHeader from '../utils/getHeader';
import WarnModal from '../components/pageComponent/WarnModal';
import deleteCookie from '../utils/deleteCookie';
import { AppLoader } from "../components/baseComponents/AppLoader";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import category from "../utils/category.json"

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountDetails } = useSelector((state) => state.accountState)
  const { isLoading, expenseData } = useSelector((state) => state.expenseState)
  const { isLimitLoading, limitData } = useSelector((state) => state.limitState)
  const [expenseList, setExpenseList] = useState([])
  const [open, setOpen] = useState(false)
  const [load, setLoad] = useState(true)
  const [deletePopup, setDeletePopup] = useState(false)
  const [deleteExpense, setDeleteExpense] = useState(null)
  const [popupData, setPopupData] = useState(null)
  const [errors, setErrors] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [categories, setCategories] = useState(category.categories);
  const [groupedExpenses, setGroupedExpenses] = useState(null);
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [limit, setLimit] = useState(0);
  const [limitFlag, setLimitFlag] = useState(false);
  const session = getCookie('wt_s_id');
  let initialState = {
    date: getCurrentDate(),
    category: '',
    discription: '',
    spend: '',
  };
  const [formData, setFormData] = useState(initialState);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    // Validate required fields
    if (!formData.spend.trim()) {
      newErrors.spend = 'Spend is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    // Validate category against the provided array
    const categoryExists = categories.find(
      (category) => category.name === formData.category
    );

    if (!categoryExists) {
      newErrors.category = 'Invalid category';
    }

    setErrors(newErrors);

    // Return true if there are no errors, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (session) {
      dispatch(getAccountDetailsAPI({ session_uuid: session }))
      if (accountDetails !== null && accountDetails.length === 0) {
        return navigate('/')
      }
    }
  }, [])

  useEffect(() => {
    // Get all users call
    if (accountDetails) {
      dispatch(getAllExpenseAPI(getHeader(accountDetails)))
      dispatch(getLimitAPI(getHeader(accountDetails)))
    }

    // Cookie check
    if (!session) {
      deleteCookie('wt_s_id')
      navigate('/')
    }

  }, [accountDetails])

  useEffect(() => {
    setExpenseList(expenseData);

    // Group expenses by date
    const groupedExpensesResult = expenseData.reduce((result, expense) => {
      const expenseDate = new Date(expense.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      let formattedDate;

      if (
        expenseDate.getDate() === today.getDate() &&
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      ) {
        formattedDate = 'Today';
      } else if (
        expenseDate.getDate() === yesterday.getDate() &&
        expenseDate.getMonth() === yesterday.getMonth() &&
        expenseDate.getFullYear() === yesterday.getFullYear()
      ) {
        formattedDate = 'Yesterday';
      } else {
        formattedDate = expenseDate.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }

      if (!result[formattedDate]) {
        result[formattedDate] = [];
      }

      result[formattedDate].push(expense);
      return result;
    }, {});

    // Sorting the result by month and year
    const sortedGroupedExpenses = Object.keys(groupedExpensesResult).sort((a, b) => {
      if (a === 'Today') return -1;
      if (b === 'Today') return 1;
      if (a === 'Yesterday') return -1;
      if (b === 'Yesterday') return 1;
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB - dateA;
    }).reduce((sortedResult, key) => {
      sortedResult[key] = groupedExpensesResult[key];
      return sortedResult;
    }, {});

    setGroupedExpenses(sortedGroupedExpenses);


    // Calculate current month total spend
    const today = new Date();
    const currentMonthExpenses = expenseData.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    });

    const totalSpend = currentMonthExpenses.reduce((total, expense) => {
      return total + parseFloat(expense.spend);
    }, 0);

    setCurrentMonthTotal(totalSpend);
  }, [expenseData]);


  useEffect(() => {
    setLoad(isLoading || isLimitLoading)
  }, [isLoading, isLimitLoading])
  useEffect(() => {
    setLimit(limitData || 0)
  }, [limitData, isLimitLoading, limitFlag])

  const submitHandler = (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm();

    if (isValid) {
      dispatch(createExpenseAPI(getHeader(accountDetails), formData));
      // Reset form after submission
      setOpen(false);
      setFormData(initialState);
      setSearchValue('')
    }
  };
  const menuListHandler = (name, items) => {
    if (name === "Edit") {
      setFormData(items);
      setOpen(true);
      setPopupData({ head: 'Update Expense Details', btnTxt: 'Update' });
    } else if (name === "Delete") {
      setDeletePopup(true);
      setDeleteExpense(items)
    } else if (name === "Delete All") {
      setDeletePopup(true);
      setDeleteExpense(items)
    } else {
      deleteCookie('wt_s_id');
      dispatch(signoutAPI());
      navigate('/login');
    }
  }

  const deleteHandle = (id) => {
    if (id) {
      dispatch(deleteExpenseAPI(getHeader(accountDetails), { uuid: id }))
    }
  }

  const createHandler = () => {
    setOpen(true);
    setPopupData({ head: 'Create Expense Details', btnTxt: 'Create' })
  }

  const setLimitHandler = () => {
    dispatch(setLimitAPI(getHeader(accountDetails), { limit: limit }));
    setLimitFlag(false)
  }

  return (
    <>
      <div className='max-w-screen h-screen text-sm bg-gray-300'>
        {popupData &&
          <Modal
            open={open}
            setOpen={setOpen}
            formData={formData}
            setFormData={setFormData}
            submitHandler={submitHandler}
            errors={errors}
            setErrors={setErrors}
            initialState={initialState}
            popupData={popupData}
            categories={categories}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />}
        <WarnModal
          open={deletePopup}
          setOpen={setDeletePopup}
          deleteHandle={deleteHandle}
        />
        <>
          <div className="bg-gray-800 relative">
            <div className="pb-32 h-full">
              <Disclosure as="nav" className="bg-gray-800">
                <>
                  <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-700 h-full">
                      <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-[#E0454B] flex justify-center items-center rounded-full">
                            <img
                              className="h-8 w-8"
                              src="/company-logo.png"
                              alt="Your Company"
                            />

                          </div>
                          <p className='font-bold text-white pl-3'>SETTLIN</p>
                        </div>
                        <div className="block">
                          <div className="ml-4 flex items-center md:ml-6">
                            {/* Profile dropdown */}
                            <div>
                              <MenuList fn={menuListHandler} menuList={['Sign out']}>
                                <p className='bg-[#e0454b] text-white w-10 h-10 rounded-full text-base flex justify-center items-center font-semibold uppercase'>
                                  {accountDetails && accountDetails.first_name[0] + accountDetails.last_name[0]}
                                </p>
                              </MenuList>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </Disclosure>
              <header className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:flex justify-between items-center">
                  <div></div>
                  <h1 className={`sm:text-3xl font-bold tracking-tight text-center ${limit ? limit < currentMonthTotal ? "text-[#e0454b]" : "text-white" : "text-white"}`}>
                    <span className="sm:text-2xl font-semibold pr-2 text-white">This Month Expense </span>
                    &#x20B9; {currentMonthTotal}
                    <span className='sm:text-xl font-semibold pl-2 text-white'>
                      /  {limitFlag
                        ? <input type='text' className='w-16 border bg-white text-black px-1 sm:text-base' value={limit} onChange={(e) => { setLimit(e.target.value) }} />
                        : limit} Limit
                    </span>
                  </h1>
                  <div className=' mt-3 sm:mt-0'>
                    {limitFlag
                      ? <div className='flex gap-2'>
                        <BtnComponent name="Save" fn={() => setLimitHandler()} />
                        <BtnComponent name="Cancel" fn={() => setLimitFlag(false)} />
                      </div>
                      : <BtnComponent name="Set Limit" fn={() => setLimitFlag(true)} />}
                  </div>
                </div>
              </header>
            </div>

            <main className="-mt-32 absolute w-full">
              <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6 h-[345px] sm:h-[460px] overflow-auto">
                  {expenseData &&
                    expenseData.length > 0 ?
                    groupedExpenses &&
                    Object.keys(groupedExpenses).map((date) => {
                      const expensesForDate = groupedExpenses[date];

                      return (
                        <div key={date}>
                          <h3 className='p-3 px-5 mt-2 w-full bg-gray-200 rounded-full font-semibold'>{date}</h3>

                          {expensesForDate.map((expense) => {
                            const { category, discription, spend } = expense;
                            const image = categories.filter((item) => item.name === category);

                            return (
                              <div key={expense.uuid} className='p-2 px-5 w-full flex justify-between items-center'>
                                <div className='flex gap-3 justify-center items-center'>
                                  <img src={image[0].icon} className='w-7 h-7 rounded-full' alt={category} />
                                  <div className='grid grid-cols-1'>
                                    <p className=' text-sm sm:text-base'>{category}</p>
                                    <p className='text-xs text-gray-400 truncate w-full' title={discription}>{discription}</p>
                                  </div>

                                </div>
                                <p className='font-semibold flex gap-1 items-center text-sm sm:text-base pl-1 whitespace-nowrap pt-1'>&#x20B9; {spend}
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-5 h-5 sm:w-6 sm:h-6" onClick={() => { deleteHandle(expense.uuid) }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })
                    : (
                      <div className='w-full h-full flex justify-center items-center'>
                        <img src="/no-data.jpg" alt="no data" className='h-56 w-auto object-contain' />
                      </div>
                    )
                  }
                </div>
              </div>
            </main>


          </div>
          <div className='absolute bottom-2 right-1/2 sm:right-5 sm:bottom-5' title='Create new expense detail'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10 p-2 rounded-full bg-[#E0454B]" onClick={createHandler}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </>
        {load && <AppLoader />}
      </div >
    </>
  )
}

export default Home