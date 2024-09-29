import { type Control, useController } from "react-hook-form"
import { TextField } from "@mui/material"

type Props = {
    name: string
    label: string
    placeholder?: string
    type?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>
    required?: string
    endContent?: JSX.Element
}

export const Input: React.FC<Props> = ({
    name,
    label,
    placeholder,
    type,
    control,
    required = "",
    endContent,
}) => {
    const {
        field,
        fieldState: { invalid },
        formState: { errors },
    } = useController({
        name,
        control,
        rules: { required },
    })

    return (
        <TextField
            id={name}
            label={label}
            type={type}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            error={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            helperText={`${errors[name]?.message ?? ""}`}
            size={name === 'amount' || name === 'term' ? 'small' : 'medium'}
            // endContent={endContent}
            slotProps={{
                input: {
                    endAdornment: endContent,
                },
            }}
        />
    )
}