import { CustomerSignUp } from "@/modules/auth/components/CustomerSignUp";
import { SignUpForm } from "@/modules/auth/components/SignUpForm";



export default function SignIn() {
    return (
        <main className="w-full h-full flex items-center justify-center">
                <section className="
            w-full
            h-full md:w-8/12 flex items-center justify-center">
                <CustomerSignUp />
            </section>
        </main>
    )
}