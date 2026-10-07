"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import googleLogo from "@/public/official-Google-Logo-PNG-Image-1456013550.png"
import { Separator } from "@/components/ui/separator";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { CircleAlertIcon, EyeClosedIcon, EyeIcon, LockIcon, MailBadgeIcon, MailIcon, PhoneIcon, UserRoundIcon } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { signupSchema } from "../../services/schemas";
import { signUpAction } from "../../services/signup/signup-action";


type SignUpSchema = z.infer<typeof signupSchema>;

export function SignUpForm() {
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
    const [state, action, pending] = useActionState(signUpAction, { success: false, data: null, message: "" })


    

    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })


    useEffect(() => {
        console.log("Tester: ")
        if (!state.success && state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
            form.setError(field as keyof SignUpSchema, {
                type: 'server',
                message: messages[0],
            });
            }
        });

        console.log("Tester: " + state.errors)
        }
  }, [state, form.setError]);

    const onSubmit = (data: SignUpSchema) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        
        startTransition(() => {
            action(formData); 
        });

    }

    return(
        <div className="
        
        w-82
        h-256
        pb-8
        max-h-full
        overflow-y-auto
        scrollbar-none
        md:pt-6 md:h-fit
        
        
        md:w-full flex flex-col items-center gap-8">
            
            <section className="
            mt-18
            flex flex-col items-center gap-2 md:mt-0">
                <h1 className="text-2xl font-bold font-heading">Criar conta</h1>
                <p className="text-sm text-center text-muted-foreground">Encontre profissionais de diversas especialidades próximos de você.</p>
            </section>
            <section className="w-full space-y-4">
                <div className="w-full flex justify-center space-y-4">
                    <Button
                    variant={"outline"}
                    className={"text-xs rounded! p-4 w-full md:md:w-5/10 h-8 bg-white gap-4"}>
                       <Image
                       src={googleLogo}
                       alt="google-logo"
                       width={18}
                       /> Entrar com o Google
                    </Button>
                </div>
                <Separator />
                <div className="w-full">
                    {state.message && !state.success && (
                            <div className="p-3 text-xs bg-red-100 text-red-700 rounded flex items-center gap-2">
                                
                                    <CircleAlertIcon size={16} />
                                
                            <p className=" text-xs">{state.message}</p>
                            </div>
                    )}
                    <form 
                    onSubmit={form.handleSubmit((d) => onSubmit(d))}
                    className="
                    pb-8
                    w-full
                    mt-4
                    space-y-4 md:pb-4">
                        <main className="
                        flex-col md:flex-row
                        w-full flex gap-8">
                            <section className="w-full space-y-4
                            md:w-1/2
                            ">
                                <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Nome Completo
                                </FieldLabel>
                                <FieldContent>
                                    <InputGroup className="h-8 rounded! bg-white">
                                        <InputGroupAddon>
                                            <UserRoundIcon />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Nome" className="text-xs placeholder:text-xs" />
                                    </InputGroup>
                                </FieldContent>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                            )}
                            />
                            <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <Field aria-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Email
                                </FieldLabel>
                                <FieldContent>
                                    <InputGroup className="h-8 rounded! bg-white">
                                        <InputGroupAddon>
                                            <MailIcon />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="email@exemplo.com" className="text-xs! placeholder:text-xs" />
                                    </InputGroup>
                                </FieldContent>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                            )}
                            />
                            </section>
                            <section className="w-full space-y-4
                            md:w-1/2
                            ">
                                    <Controller
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <Field aria-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Senha
                                </FieldLabel>
                                <FieldContent>
                                    <InputGroup className="h-8 rounded! bg-white">
                                        <InputGroupAddon>
                                            <LockIcon />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="*******" type={seePassword ? "text" : "password"} className="text-xs! placeholder:text-xs" />
                                        <InputGroupAddon onClick={() => setSeePassword(!seePassword)} className="cursor-default" align={"inline-end"}>
                                            {
                                                seePassword ? <EyeClosedIcon /> : <EyeIcon />
                                            }
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FieldContent>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                            )}
                            />
                            <Controller
                            control={form.control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => (
                                <Field aria-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Confirmar Senha
                                </FieldLabel>
                                <FieldContent>
                                    <InputGroup className="h-9 rounded! bg-white">
                                        <InputGroupAddon>
                                            <LockIcon />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                        aria-invalid={fieldState.invalid}
                                        {...field}
                                        placeholder="*******" type={seeConfirmPassword ? "text" : "password"} className="text-xs! placeholder:text-xs" />
                                        <InputGroupAddon onClick={() => setSeeConfirmPassword(!seeConfirmPassword)} className="cursor-default" align={"inline-end"}>
                                            {
                                                seeConfirmPassword ? <EyeClosedIcon /> : <EyeIcon />
                                            }
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FieldContent>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                                                )}
                            
                            />
                            
                            
                            
                            </section>
                        </main>
                        <div className="w-full flex justify-center">
                            <Button type="submit" className={" w-full md:w-5/10 mt-5 text-xs h-8 font-bold rounded!"}>
                                Criar conta
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="w-full text-center text-xs font-medium">
                    Já possui uma conta? <Link href={"/auth/login"} className=" text-primary font-medium hover:underline cursor-default">Fazer Login.</Link>
                </div>
            </section>
        </div>
    )
}