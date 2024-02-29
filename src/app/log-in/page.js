"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import 'react-phone-number-input/style.css'

import { signUp, confirmSignUp, signIn, getCurrentUser  } from 'aws-amplify/auth';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-number-input'
import Loader from "@/components/Loader";


export default function page() {
  const router = useRouter();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [toggleSignUpForm, setToggleSignUpForm] = useState(true)
  const [showSignInForm, setShowSignInForm] = useState(true)
  const [errorMsg, setErrorMessage] = useState("")
  const [confirmationMessage, setConfirmationMessage] = useState("")



  async function handleSignUp(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
  
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number // E.164 number convention
          },
          // optional
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });
      console.log(isSignUpComplete, userId, nextStep, "from reg");
      if(userId){
        setToggleSignUpForm(!toggleSignUpForm)
        setConfirmationMessage(`An OTP has been sent to ${nextStep.codeDeliveryDetails.destination} via ${nextStep.codeDeliveryDetails.deliveryMedium}`)
      } else {
        setErrorMessage("Your input is not valid")
      }
    } catch (error) {
      setErrorMessage('error signing up:', error);
    }
  }


  async function handleSignUpConfirmation(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username");
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });
      console.log(isSignUpComplete, nextStep, "from conf")
      if(isSignUpComplete){
        router.push("/");
      }
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }


  async function handleSignIn(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(username, password)
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      router.push("/");
      console.log(isSignedIn, nextStep)
    } catch (error) {
      console.log('error signing in', error);
    }
  }
  
  
  
  return (
    <div >
      <div className="flex flex-col items-center h-screen">
      {(showSignInForm === false && toggleSignUpForm) &&  <form onSubmit={handleSignUp}  className='w-[35%] flex flex-col gap-3 mt-20'>
          <h1 className="text-center header_text text-3xl font-bold">Sign Up</h1>
          {errorMsg && <p className='text-red-800 text-sm'>{errorMsg}!</p>}
          {confirmationMessage && <p className='text-green-700 text-sm'>{confirmationMessage}!</p>}
          <input className='outline-none bg-slate-50 p-3 w-full' type="text" name="username" required placeholder='Type username' />
          <input className='outline-none bg-slate-50 p-3 w-full' type="email" name="email" required placeholder='Type email'/>
          <PhoneInput
            className='outline-none bg-slate-50 p-3 w-full'
            placeholder="Enter phone number"
            value={phone_number}
            onChange={setPhoneNumber} />
          <input className='outline-none bg-slate-50 p-3 w-full' type="password" name="password" required  placeholder='Type password'/>
          <input type="submit" value="Sign up" className='bg-black p-3 w-full text-white hover:bg-slate-800 cursor-pointer' />
          <p onClick={()=> setShowSignInForm(true)} className='text-sky-600 underline hover:text-sky-400 cursor-pointer'>Already have an account ?</p>
        </form>}

      { (showSignInForm === false && !toggleSignUpForm) &&  <form className='w-[35%] flex flex-col gap-3 mt-20' onSubmit={handleSignUpConfirmation} >
          <h1 className="text-center header_text text-3xl font-bold">Enter the OTP</h1>
          {errorMsg && <p className='text-red-800 text-sm'>{errorMsg}!</p>}
          {confirmationMessage && <p className='text-green-700 text-sm'>{confirmationMessage}!</p>}
          <input className='outline-none bg-slate-50 p-3 w-full' type="text" name="username" required placeholder='Type username' />
          <OtpInput
              value={confirmationCode}
              onChange={setConfirmationCode}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          <input type="submit" value="Confirm" className='bg-black p-3 w-full text-white hover:bg-slate-800 cursor-pointer' />
        </form>}


        {showSignInForm && <form className='w-[35%] flex flex-col gap-3 mt-20' onSubmit={handleSignIn} >
            <h1 className="text-center header_text text-3xl font-bold">Sign In</h1>
            {errorMsg && <p className='text-red-800 text-sm'>{errorMsg}!</p>}
            {confirmationMessage && <p className='text-green-700 text-sm'>{confirmationMessage}!</p>}
            <input className='outline-none bg-slate-50 p-3 w-full' type="text" name="username" required placeholder='Type username' />
            <input className='outline-none bg-slate-50 p-3 w-full' type="password" name="password" required  placeholder='Type password'/>
            <input type="submit" value="Sign In"  className='bg-black p-3 w-full text-white hover:bg-slate-800 cursor-pointer' />
            <p onClick={()=> setShowSignInForm(false)} className='text-sky-600 underline hover:text-sky-400 cursor-pointer'>Create an account ?</p>
          </form>}
        

      </div>
      
    </div>
  );
}

















//Use for future

      // const createUser = async (e) => {
      //   try {
      //     const response = await fetch("/api/create-user", {
      //       method: "POST",
      //       body: JSON.stringify(data?.user),
      //     });
          
      //     console.log(response)
      //     if (response.ok) {
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
    
      // createUser();