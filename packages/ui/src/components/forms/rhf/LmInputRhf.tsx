import {Controller} from "react-hook-form";
import {LmInput, LmInputProps} from "../LmInput";
import {RhfProps} from "./rhfProps";
import {memo} from "react";

type LmInputRhfProps = LmInputProps & RhfProps & {}

export const LmInputRhf = memo(function LmInputReactHookForm({
                                                                 name,
                                                                 control,
                                                                 rules = {},
                                                                 defaultValue,
                                                                 ...inputProps
                                                             }: LmInputRhfProps) {
    if (inputProps.required) {
        rules.required = 'This field is required'
    }
    return (
        <Controller name={name}
                    rules={rules}
                    control={control}
                    defaultValue={defaultValue}
                    render={({field: {onChange, value, onBlur}, fieldState: {error, invalid}}) => (
                        <LmInput {...inputProps}
                                 value={value ?? ''}
                                 onBlur={onBlur}
                                 error={invalid}
                                 onChangeText={onChange}
                                 helperText={error ? error.message : inputProps.helperText}
                        />
                    )}/>

    )
})