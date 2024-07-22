import { SignIn } from "@clerk/nextjs"

const SignInpage = () => {
  return (
   <main className="auth-page">
    <SignIn/>
   </main>
  )
}
export default SignInpage