import { Input } from "../components/Input"
import { useForm } from "react-hook-form"
import { Button, Link } from "@mui/material"
import { useRegisterMutation } from "../app/services/userApi"
import { ErrorMessage } from "../components/ErrorMessage"
import { hasErrorField } from "../utils/has-error-field"
import { useState } from "react"
import { AuthTypes } from "../interfaces/types"

type RegisterType = {
    email: string
    username: string
    password: string
}

type Props = {
    setSelected: (value: AuthTypes) => void
}

export const Register = ({ setSelected }: Props) => {
    const {
        handleSubmit,
        control,
        // formState: { errors },
    } = useForm<RegisterType>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
        email: "",
        password: "",
        username: "",
        },
    })

    const [register, { isLoading }] = useRegisterMutation()
    const [error, setError] = useState("")

    const onSubmit = async (data: RegisterType) => {
        try {
            await register(data).unwrap()
            setSelected(0)
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error)
            }
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                control={control}
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                required="Обязательное поле"
            />
            <Input
                control={control}
                required="Обязательное поле"
                label="Имя пользователя"
                placeholder="Имя пользователя"
                name="username"
            />
            <Input
                control={control}
                name="password"
                label="Пароль"
                placeholder="Пароль"
                type="password"
                required="Обязательное поле"
            />
            <ErrorMessage error={error} />

            <p className="text-center text-small">
                Уже есть аккаунт?{" "}
                <Link
                    className="cursor-pointer"
                    onClick={() => setSelected(0)}
                >
                    Войдите
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" size="large" variant="contained">
                    {isLoading ? "Загрука..." : "Зарегестрироваться"}
                </Button>
            </div>
        </form>
    )
}