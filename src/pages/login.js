import React, { useEffect, useState } from 'react';
import iPhone from '../images/iphone-with-profile.jpg';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

// =====================
// Structure
// =====================
// - div (parent)
// 	- div (child)
// 	- div (child)
// 		- div (child of child)
// 		- div (child of child)

// A container div that holds children
// 	- div
// 		- image of src /images/iphone-with-profile.jpg & alt tag of "iPhone with Instagram app"

// 	- div to wrap the following children
// 		- div -> (another div to wrap the form (see below for further details of the form)
// 		- div -> a paragraph with a React router link that allows to the user to navigate to 'Sign up' - use the ROUTES file to link to this particular page

// A form for the user to login with a method of POST

// An input box for the user to enter their email address with a placeholder value of Email Address

// An input box for the user to enter their password with a placeholder value of Password

// A button so that the user can submit the form

// References:
// 	- Tailwind container: https://tailwindcss.com/docs/container
// 	- Tailwind flex: https://tailwindcss.com/docs/flex

// # Challenge
// Add a document title of 'Login - Instagram' 

// Hint: Think about what React hook you'd use to apply the title - make sure that the hook chosen only runs on first render

// # Challenge
// Manage input state validation before submitting

// Acceptance Criteria
//   - Store emailAddress, password, error in state
//   - Create a variable that can hold validate against input elements
//   - Use this variable as a source of truth to disable/enable the form button
//   - If the variable is not valid, use an opacity of 50 on the button; if the variable is valid, don't apply the opacity

// Hints
//   - you can use conditional template rendering tags for the opacity state
//   - useState

// References
//   - https://tailwindcss.com/docs/opacity 
//   - https://reactjs.org/docs/hooks-state.html

export default function Login() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    useEffect(() => {
        document.title = 'Login - Instagram'
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src={iPhone} alt="iPhone with Instagram app" />
            </div>
            
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src={logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>
                    
                    <form action="POST">
                        <input 
                        type="text" 
                        aria-label="Enter your email address" 
                        className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2" 
                        placeholder="Email address"
                        value={emailAddress}
                        onChange={({ target }) => setEmailAddress(target.value)} />

                        <input 
                        type="password" 
                        aria-label="Enter your password" 
                        className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2" 
                        placeholder="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)} />

                        <button
                        disabled={isInvalid} 
                        type="submit" 
                        className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}>
                            Log In
                        </button>
                    </form>
                </div>

                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm">
                        Don't have an account?{' '}
                        <Link to={ROUTES.SIGN_UP} className="font-bold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}