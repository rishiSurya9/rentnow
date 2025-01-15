import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useRouter } from "next/navigation";

export const OAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleGoogleClick = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_FIRE_BASE_API);

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${process.env.PUBLIC_API}/api/auth/google`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const rawData = await res.text(); // Use .text() to get raw response as a string
      console.log("Raw response:", rawData); // Log raw response to see what is being returned
      const data = JSON.parse(rawData);
      console.log(data);
      dispatch(signInSuccess(data));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <button onClick={handleGoogleClick}
        className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Sign in with Google
        </button> */}
      <button
        onClick={handleGoogleClick}
        className="flex items-center  gap-2 bg-white text-black hover:bg-gray-100 font-bold py-1 px-4 rounded-lg disabled:opacity-90  flex-1 mx-auto p-3 w-[450px] justify-center  border border-white"
      >
        <svg
          className="w-7 h-auto  justify-center items-center  "
          height="800px"
          viewBox="-3 0 262 262"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <path
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            fill="#4285F4"
          />
          <path
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            fill="#34A853"
          />
          <path
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            fill="#FBBC05"
          />
          <path
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            fill="#EB4335"
          />
        </svg>
        <span className="">Signup with Google</span>
      </button>
    </>
  );
};
