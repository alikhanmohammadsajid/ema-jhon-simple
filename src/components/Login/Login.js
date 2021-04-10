import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { signInWithEmailAndPassword, createUserWithEmailAndPassWord, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework } from "./LoginManager";


function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
    });

    initializeLoginFramework();


    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false)
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res)
        setLoggedInUser(res)
        if (redirect) {
            history.replace(from)
        }
    }

    const handleBlur = (e) => {
        let isFieldValid;

        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {

            const newUserInfo = { ...user };

            newUserInfo[e.target.name] = e.target.value;
            console.log(newUserInfo);
            setUser(newUserInfo);
        }
    };

    const handleSubmit = (e) => {

        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassWord(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
        }

        e.preventDefault();
    };


    return (
        <div style={{ textAlign: 'center' }}>
            {user.isSignedIn ? (
                <button onClick={signOut}>sign out</button>
            ) : (
                <button onClick={googleSignIn}>sign in with  Google</button>
            )}
            <br />
            <button onClick={fbSignIn}>Sign in with facebook</button>
            {user.isSignedIn && (
                <div>
                    <p>welcome {user.name}!</p>
                    <p>your email {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            )}


            
            <br />

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>
            <br />
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="email" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="password" required />
                <br />
                <input type="submit" value={newUser ? 'sing up' : 'sign in'} />
            </form>
            <p style={{ color: "red" }}>{user.error}</p>
            {user.success && (
                <p style={{ color: "green" }}> Account {newUser ? 'created' : 'logged in'} successfully </p>
            )}
        </div>
    );
}

export default Login;
