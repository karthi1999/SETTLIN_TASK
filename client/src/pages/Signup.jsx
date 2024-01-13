import { useEffect, useState } from "react";
import { fields } from "../utils/accountFields";
import { isValidEmail } from "../utils/checkHandler";
import BtnComponent from "../components/baseComponents/BtnComponent";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupAPI } from "../store";
import getCookie from "../utils/getCookie";
import Alert from "../components/baseComponents/Alert";

export default function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [statusCode, setStatusCode] = useState(null);
	const { isLoading, accountDetails, showPopup, code, popupMsg, popupDesc } = useSelector((state) => state.accountState)
	const initialState = {
		email: '',
		pass: '',
		confirm_pass: ''
	};

	const [state, setState] = useState(initialState);
	const [errors, setErrors] = useState({
		first_name: '',
		email: '',
		pass: '',
		confirm_pass: ''
	});
	const [flag, setFlag] = useState({
		pass: false,
		confirm_pass: false
	});

	// Cookie Check
	useEffect(() => {
		if (getCookie('wt_s_id')) {
			return navigate('/home')
		}
	}, [isLoading])

	useEffect(() => {
		setShow(showPopup)
		setStatusCode(code)
	}, [isLoading, accountDetails, showPopup, code])

	const flagHandler = (e, id) => {
		e.preventDefault();
		setFlag((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	const inputHandler = (id, value) => {
		setState((prev) => ({ ...prev, [id]: value.trim() }));
	};

	const validateForm = () => {
		const isNameValid = state.pass.trim() !== '';
		const isEmailValid = isValidEmail(state.email);
		const isPasswordValid = state.pass.trim() !== '';
		const isMatch = state.pass !== '' && state.pass === state.confirm_pass;

		setErrors({
			first_name: isNameValid ? '' : 'Please provide a valid email',
			email: isEmailValid ? '' : 'Please provide a valid email',
			pass: isPasswordValid ? '' : 'Password is required',
			confirm_pass: isMatch ? '' : 'Password not match'
		});

		return isNameValid && isEmailValid && isPasswordValid && isMatch;
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (validateForm()) {
			// converting a password into a byte array it hide the exposure of the password in the UI.
			const userCredentials = {
				first_name: state.first_name,
				last_name: state.last_name,
				email: state.email,
				pass: btoa(state.pass),
				confirm_pass: btoa(state.confirm_pass),
			};
			dispatch(signupAPI(userCredentials))
		}
	};

	return (
		<>
			<Alert show={show} setShow={setShow} statusCode={statusCode} msg={popupMsg} desc={popupDesc} />
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="/logo.png"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
						Create your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
					<div>
						<div className="grid grid-cols-12 gap-x-5 gap-y-3">
							{fields && fields.map((field, index) => {
								const { id, type, label } = field;
								return (
									<div key={index} className={`col-span-12 ${id === "email" ? "sm:col-span-12" : "sm:col-span-6"}`}>
										<label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
											{label} {id !== "last_name" && <span className="text-xs text-[#E0454B]">*</span>}
										</label>
										<div className={`mt-2 relative ${errors[id] ? "" : "pb-5"}`}>
											<input
												id={id}
												name={id}
												autoComplete="off"
												type={(id === "pass" || id === "confirm_pass") ? flag[id] ? "text" : "password" : type}
												className={`block w-full rounded-md border-0 p-1.5 px-2 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors[id] ? "ring-[#E0454B]" : "ring-gray-300"}`}
												onChange={(e) => inputHandler(e.target.id, e.target.value)}
												onFocus={() => { setErrors((prev) => ({ ...prev, [id]: '' })) }}
											/>
											{
												errors[id] &&
												<p className="text-xs text-[#E0454B] text-right pt-1 pr-2">
													<i className="fa-solid fa-circle-info pr-1" style={{ color: '#f2071f' }}></i>
													{errors[id]}
												</p>
											}
											{
												(id === "pass" || id === "confirm_pass") &&
												<button
													className='absolute top-1.5 right-1.5 bg-white px-1'
													onClick={(e) => flagHandler(e, id)}
												>
													<i className={flag[id] ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
												</button>
											}
										</div>
									</div>
								)
							})}
							<div className="col-span-12 mt-3">
								<BtnComponent name={'Sign up'} fn={submitHandler} />
							</div>
						</div>
					</div>

					<div className="mt-10">
						<div className="relative">
							<div className="absolute inset-0 flex items-center" aria-hidden="true">
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm font-medium leading-6">
								<p className="bg-white px-6 text-gray-900">Already have account?{' '}
									<a href="/login" className="font-semibold text-[#E0454B] hover:text-red-300">
										Sign in to your account
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
