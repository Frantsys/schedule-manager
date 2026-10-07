import { SignUpForm } from "@/modules/auth/components/SignUpForm";


export default function SignUp() {
    return (
        <main className="w-full h-full flex items-center justify-center">
                <section className="
            w-full
            h-full md:w-8/10 flex items-center justify-center">
                <SignUpForm />
            </section>
        </main>
    )
}