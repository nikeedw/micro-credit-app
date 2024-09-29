import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { useSendEmailMutation } from '../app/services/userApi'
import { useForm, Controller } from 'react-hook-form'
import { hasErrorField } from '../utils/has-error-field'
import { Button, MenuItem, TextField } from '@mui/material'
import { Input } from '../components/Input'
import { BiArrowBack } from 'react-icons/bi'
import { ErrorMessage } from '../components/ErrorMessage'

type EmailType = {
    amount: string
    term: string
}

export const Credit: React.FC = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) navigate('/auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [sendEmail, { isLoading }] = useSendEmailMutation()
    const [error, setError] = useState("")
    const [sent, setSent] = useState(false)

    const {
        handleSubmit,
        control,
        resetField,
    } = useForm<EmailType>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            amount: "",
            term: "",
        },
    })

    const onSubmit = async (data: EmailType) => {
        try {
            const res = await sendEmail(data).unwrap()
            if (res.status === "Accepted") {
                setSent(true)
            } else {
                setError(res.status)
            }
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error)
            }
        }
    }

    if (isAuthenticated) {
        return (
            <div>
                <Header />
                {sent ? (
                <div  className='flex items-center justify-center flex-col gap-6' style={{ 
                    height: 'calc(100vh - 63px)',
                }}>
                    <p className='text-2xl'>Проверьте почтовый ящик</p>
                    <Button variant='outlined' onClick={() => {
                        setSent(false)
                        resetField('amount')
                        resetField('term')
                    }} startIcon={<BiArrowBack />}>
                        Назад
                    </Button>
                </div>
            ) : (
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className='flex items-center justify-center flex-col gap-4'
                    style={{ 
                        height: 'calc(100vh - 63px)',
                    }}
                >
                <Input
                    control={control}
                    name="amount"
                    label="Cумма"
                    placeholder='Сумма'
                    type="text"
                    required="Обязательное поле"
                />
                
                <Controller
                    name="term"
                    control={control}
                    rules={{ required: "Обязательное поле" }}
                    render={({ field }) => (
                        <TextField
                            size='small'
                            {...field}
                            className='w-[210px]'
                            select
                            label="Срок"
                            placeholder='Срок'
                            error={!!error}
                            helperText={error ? error : ""}
                        >
                            <MenuItem value="1 месяц">1 месяц</MenuItem>
                            <MenuItem value="3 месяца">3 месяца</MenuItem>
                            <MenuItem value="6 месяцев">6 месяцев</MenuItem>
                            <MenuItem value="12 месяцев">12 месяцев</MenuItem>
                            <MenuItem value="18 месяцев">18 месяцев</MenuItem>
                            <MenuItem value="24 месяца">24 месяца</MenuItem>
                            <MenuItem value="36 месяцев">36 месяцев</MenuItem>
                            <MenuItem value="48 месяцев">48 месяцев</MenuItem>
                        </TextField>
                    )}
                />

                <ErrorMessage error={error} />
                
                <Button className='w-[210px]' color="primary" type="submit" variant='contained' size='small'>
                    {isLoading ? "Загрузка..." : "Получить"}
                </Button>
            </form>
            )}
            </div>
        )
    }
}
