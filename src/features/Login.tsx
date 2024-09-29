import { Input } from "../components/Input"
import { useForm } from "react-hook-form"
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ErrorMessage } from "../components/ErrorMessage"
import { hasErrorField } from "../utils/has-error-field"
import { Button, Link } from "@mui/material"
import { AuthTypes } from "../interfaces/types"

type LoginType = {
    username: string
    password: string
}

type Props = {
    setSelected: (value: AuthTypes) => void
}

export const Login = ({ setSelected }: Props) => {
    const {
        handleSubmit,
        control,
        // formState: { errors },
    } = useForm<LoginType>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
        username: "",
        password: "",
        },
    })

    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [triggerCurrentQuery] = useLazyCurrentQuery()

    const onSubmit = async (data: LoginType) => {
        try {
            await login(data).unwrap()
            const res = await triggerCurrentQuery().unwrap()
            console.info(res)
            navigate("/")
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
                name="username"
                label="Имя пользователя"
                placeholder="Имя пользователя"
                type="text"
                required="Обязательное поле"
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
                    Нет аккаутна?{" "}
                <Link
                    className="cursor-pointer"
                    onClick={() => setSelected(1)}
                >
                    Зарегистрируйтесь
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" size="large" variant="contained">
                    {isLoading ? "Загрука..." : "Войти"}
                </Button>
            </div>
        </form>
    )
}