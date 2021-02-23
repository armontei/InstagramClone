import React, { useContext, useEffect, useState } from 'react';
import logo from '../images/logo.png';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUernameExist } from '../services/firebase';

// # Challenge

// All inputs must be stored in state; state values on input elements; onChange handlers

// --

// - Create state for the following:
// 	- username
// 	- fullName
// 	- emailAddress
// 	- password
// 	- error

// - Make sure that username & email address are both lowercase before being submitted

// - Extra: what happens if a user enters spaces in the username? Validation against the username would be great!

// --

// Hints
// 	- useState
// 	- onChange
// 	- destructuring 

// # Challenge
// Sign a user up to our Instagram clone

// Acceptance Criteria
//   - Create a 'handleSignUp' async function (the work inside the function must be in a try/catch) that uses the firebase -> auth -> function 'createUserWithEmailAndPassword' - see references!
//   - Store the result of the creation into a variable ^^
//   - Update the user's profile, specifically the 'displayName' field with the username that the user has inputted (which is stored in state)
//   - Add a new user document to the collection of 'users' with the following values:

//      - userId (value: take the 'uid' from the created user object -- e.g. createdUserResult.user.uid)
//      - username
//      - fullName
//      - emailAddress
//      - following: []
//      - followers: []
//      - dateCreated (use the time right now)

// - If there's any errors, handle them! Make sure to clean out the form values as well

// References
//   - https://firebase.google.com/docs/auth/web/password-auth
//   - https://cloud.google.com/firestore/docs/manage-data/add-data

export default function SignUp() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = username === '' || fullName === '' || password === '' || emailAddress === '';

    const handleSignUp = async (e) => {
        e.preventDefault();

        // check if the usernameExists by using function we just created!

        const usernameExists = doesUernameExist(username);

        if (!usernameExists.length) {
            try {
                const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);

                await createdUserResult.user.updateProfile({
                    displayName: username
                });

                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message);
            }
        } else {
            setUsername('');
            setFullName('');
            setEmailAddress('');
            setPassword('');
            setError('That username is already taken, please  try another!');
        }
    }

    useEffect(() => {
        document.title = 'Sign Up - Instagram'
    }, []);

    return (
        <div className="container flex mx-auto max-w-xs items-center h-screen">
            <div className="flex flex-col">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src={logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-500 text-center">{error}</p>}

                    <form onSubmit={handleSignUp} method="POST">
                        <input 
                            type="text"
                            aria-label="Enter your username"
                            className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                            placeholder="Username" 
                            value={username}
                            onChange={({ target }) => setUsername(target.value.toLowerCase())}
                        />
                        <input
                            type="text"
                            aria-label="Enter your full name"
                            className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                            placeholder="Full name"
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value.toLowerCase())}
                        />
                        <input
                            type="text"
                            aria-label="Enter your email address"
                            className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value.toLowerCase())}
                        />
                        <input
                            type="password"
                            aria-label="Enter your password"
                            className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                            placeholder="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue" >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}