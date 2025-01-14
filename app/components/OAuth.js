import {GoogleAuthProvider, getAuth , signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
export const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch(`${process.env.PUBLIC_API}/api/auth/google`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name : result.user.displayName, email:result.user.email, photo:result.user.photoURL }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
        } catch(error) {
            console.log(error);
        }
    };
    return (
        <button onClick={handleGoogleClick}
        className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Sign in with Google
        </button>
    );
};