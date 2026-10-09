import { Suspense } from "react"
import { SignUpForm } from "@/modules/auth/components/SignUpForm"
import { AuthErrorHandler } from "@/modules/auth/components/AuthErrorHandler"

export default function SignUp() {
    return (
        <main className="w-full h-full flex items-center justify-center relative">
            
            <Suspense fallback={null}>
                <AuthErrorHandler />
            </Suspense>

            <section className="w-full h-full md:w-8/12 flex items-center justify-center">
                <SignUpForm />
            </section>
        </main>
    )
}