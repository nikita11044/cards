import { InputText } from "../../../components/InputText";
import { Button } from "../../../components/Button";
import React from "react";
import {useDispatch} from "react-redux";
import { useFormik } from "formik";
import styled from "styled-components/macro";
import {passwordRecoveryTC} from "./password-recovery-reducer";
import { StyledForm } from "../../../components/StyledForm";

export const PasswordRecoverForm = React.memo(() => {
    const dispatch = useDispatch();

    const formik = useFormik({

        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            return errors;
        },
        initialValues: {
            email: ""
        },
        onSubmit: values => {
            dispatch(passwordRecoveryTC(values.email, 'test-front-admin <nikita11042000@gmail.com>'))
        }
    });

    return (
        <StyledForm onSubmit={formik.handleSubmit}>
            <InputText placeholder={"Email"} error={formik.errors.email} {...formik.getFieldProps("email")} />
            <Button type="submit">Recover</Button>
        </StyledForm>
    );
})

// Types
type FormikErrorType = {
    email?: string
}