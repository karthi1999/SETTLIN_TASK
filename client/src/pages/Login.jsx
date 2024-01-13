import { useEffect, useState } from "react";
import { fields } from "../utils/accountFields";
import { isValidEmail } from "../utils/checkHandler";
import BtnComponent from "../components/baseComponents/BtnComponent";
import { useDispatch, useSelector } from "react-redux";
import { signinAPI } from "../store";
import Alert from "../components/baseComponents/Alert";
import { useNavigate } from "react-router-dom"
import getCookie from "../utils/getCookie";

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, accountDetails, showPopup, code, popupMsg, popupDesc } = useSelector((state) => state.accountState)
	const [show, setShow] = useState(false);
	const [statusCode, setStatusCode] = useState(null);
	let initialState = {
		email: '',
		pass: ''
	}
	const [state, setState] = useState(initialState)
	const login = (fields && fields.filter((field) => field.id === "email" || field.id === "pass"))
	const [passType, setPassType] = useState(false);
	const [errors, setErrors] = useState(initialState);

	// Cookie check
	useEffect(() => {
		if (getCookie('wt_s_id')) {
			return navigate('/home')
		}
	}, [show])

	useEffect(() => {
		setShow(showPopup)
		setStatusCode(code)
	}, [isLoading, accountDetails, showPopup, code])

	// Passward visibilty
	const passTypeHandler = (e) => {
		e.preventDefault();
		setPassType(!passType)
	}

	const inputHandler = (id, value) => {
		setState((prev) => ({ ...prev, [id]: value.trim() }))
	}

	const validateForm = () => {
		const isEmailValid = isValidEmail(state.email);
		const isPasswordValid = state.pass.trim() !== '';

		setErrors({
			email: isEmailValid ? '' : 'Please provide a valid email',
			pass: isPasswordValid ? '' : 'Password is required',
		});

		return isEmailValid && isPasswordValid;
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (validateForm()) {
			// converting a password into a byte array it hide the exposure of the password in the UI.
			const encodedPassword = btoa(state.pass);
			const userCredentials = { email: state.email, pass: encodedPassword };

			dispatch(signinAPI(userCredentials));
		}
	};

	return (
		<>
			<div className="flex min-h-screen flex-1 w-screen">
				<Alert show={show} setShow={setShow} statusCode={statusCode} msg={popupMsg} desc={popupDesc} />
				<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<img
								className="h-28 w-auto"
								src="/logo.jpeg"
								alt="Company Logo"
							/>
							<h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Sign in to your account
							</h2>
						</div>

						<div className="mt-10">
							<div>
								<div className="space-y-4">
									{login && login.map((field, index) => {
										const { id, type, label } = field;
										return (
											<div key={index}>
												<label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
													{label} <span className="text-xs text-[#E0454B]">*</span>
												</label>
												<div className={`mt-2 relative ${errors[id] ? "" : "pb-5"}`}>
													<input
														id={id}
														name={id}
														type={type === "password" ? passType ? "text" : "password" : type}
														className={`block w-full rounded-md border-0 p-1.5 px-2 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors[id] ? "ring-[#E0454B]" : "ring-gray-300"}`}
														onChange={(e) => inputHandler(e.target.id, e.target.value)}
														onFocus={() => {
															setErrors((prev) => ({ ...prev, [id]: '' }))
														}}
													/>
													{
														errors[id] &&
														<p className="text-xs text-[#E0454B] text-right pt-1 pr-2">
															<i className="fa-solid fa-circle-info" style={{ color: '#f2071f' }}></i>
															{errors[id]}
														</p>
													}
													{
														id === "pass" &&
														<button className='absolute top-1.5 right-3 bg-white' onClick={(e) => passTypeHandler(e)}>
															<i className={passType ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
														</button>
													}
												</div>
											</div>
										)
									})}
									<div>
										<BtnComponent name={'Sign in'} fn={(e) => submitHandler(e)} />
									</div>
								</div>
							</div>

							<div className="mt-10">
								<div className="relative">
									<div className="absolute inset-0 flex items-center" aria-hidden="true">
										<div className="w-full border-t border-gray-200" />
									</div>
									<div className="relative flex justify-center text-sm font-medium leading-6">
										<p className="bg-white px-6 text-gray-900">Don't have account?{' '}
											<a href="/signup" className="font-semibold text-[#E0454B] hover:text-red-300">
												Sign up to create account
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="relative hidden flex-1 lg:block">
					<img
						className="absolute inset-0 h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt=""
					/>
				</div>
			</div>
		</>
	)
}
