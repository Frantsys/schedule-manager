"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { CircleAlertIcon, EyeClosedIcon, EyeIcon, LockIcon, UserRoundIcon } from "lucide-react"
import Image from "next/image"
import googleLogo from "@/public/official-Google-Logo-PNG-Image-1456013550.png"
import { startTransition, useActionState, useEffect, useState } from "react"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { LoginInput } from "../../types"
import Link from "next/link"
import { loginAction } from "../../services/login/login-action"
import { loginSchema } from "../../services/schemas"
import { motion } from "framer-motion"

function LoginFormCore() {
    const [seePassword, setSeePassword] = useState(false);
    const [state, action, pending] = useActionState(loginAction, { success: false });

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    useEffect(() => {
        if (!state.data && state.errors) {
            Object.entries(state.errors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    form.setError(field as keyof LoginInput, {
                        type: 'server',
                        message: messages[0],
                    });
                }
            });
        }
    }, [state, form.setError]);

    const onSubmit = (data: LoginInput) => {
        const formData = new FormData();
        formData.append('identifier', data.identifier);
        formData.append('password', data.password);

        startTransition(() => {
            action(formData);
        });
    }

    return (
        <div className="w-82 md:w-96 flex flex-col items-center gap-8">
            <section className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold font-heading">Login</h1>
                <p className="text-muted-foreground text-sm text-center">Bem vindo de volta! Entre com seus dados para seu acesso.</p>
            </section>
            
            <section className="w-full space-y-8">
                <div className="w-full space-y-4">
                    <Button variant={"outline"} className={"text-xs rounded! p-4 w-full h-8 bg-white gap-4"}>
                       <Image src={googleLogo} alt="google-logo" width={18} /> 
                       Entrar com o Google
                    </Button>
                </div>
                
                <Separator />
                
                <div className="w-full">
                    <form className="space-y-4 pb-4" onSubmit={form.handleSubmit((d) => onSubmit(d))}>
                        {state.message && !state.success && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-3 text-xs bg-red-100 text-red-700 rounded flex items-center gap-2 mb-4"
                            >
                                <CircleAlertIcon size={16} />
                                <p className="text-xs">{state.message}</p>
                            </motion.div>
                        )}
                        
                        <FieldGroup>
                            <Controller
                                control={form.control}
                                name="identifier"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Email:</FieldLabel>
                                        <FieldContent>
                                            <InputGroup className="h-8 rounded! bg-white">
                                                <InputGroupAddon><UserRoundIcon /></InputGroupAddon>
                                                <InputGroupInput {...field} aria-invalid={fieldState.invalid} placeholder="email@exemplo.com" className="text-xs! placeholder:text-xs" />
                                            </InputGroup>
                                        </FieldContent>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <Field aria-invalid={fieldState.invalid}>
                                        <FieldLabel>Senha:</FieldLabel>
                                        <FieldContent>
                                            <InputGroup className="h-8 rounded! bg-white">
                                                <InputGroupAddon><LockIcon /></InputGroupAddon>
                                                <InputGroupInput {...field} aria-invalid={fieldState.invalid} placeholder="*******" type={seePassword ? "text" : "password"} className="text-xs! placeholder:text-xs" />
                                                <InputGroupAddon onClick={() => setSeePassword(!seePassword)} className="cursor-default" align={"inline-end"}>
                                                    {seePassword ? <EyeClosedIcon /> : <EyeIcon />}
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FieldContent>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        
                        <div className="w-full text-center">
                            <a className="text-xs text-primary hover:underline cursor-default font-medium">Esqueci a senha</a>
                        </div>
                        
                        <Button disabled={pending} type="submit" className={"w-full text-xs h-8 font-bold rounded!"}>
                            {pending ? "Entrando..." : "Entrar"}
                        </Button>
                        
                        <div className="w-full text-center text-xs font-medium">
                            Não possui uma conta? <Link href={"/auth/signup"} className="text-primary font-medium hover:underline cursor-default">Cadastre-se.</Link>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export function LoginForm() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
            }}
            className="w-full flex justify-center"
        >
            <LoginFormCore />
        </motion.div>
    )
}