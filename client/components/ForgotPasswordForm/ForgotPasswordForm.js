import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

// components
import Button from '@components/Button'
import Textbox from '@components/Textbox'

const ForgotPasswordForm = ({ initialValues, onSubmit, validationSchema }) => (
    <Fragment>
        <div className="container mx-auto flex justify-center">
            <div className="max-w-md-1/2 mx-3 my-12 w-full">
                <h1 className="text-center font-primary font-semibold text-gold">
                    Forgot Password
                </h1>
                <div className="bg-white shadow-md my-12 p-16 rounded w-full">
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Textbox
                                    type="email"
                                    name="email"
                                    onBlur={handleBlur}
                                    value={values.email}
                                    onChange={handleChange}
                                    data-testid={'email-field'}
                                    placeholder={'Enter your email'}
                                    error={touched.email && errors.email}
                                />
                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    data-testid="submit-button"
                                >
                                    Send Password Reset Link
                                </Button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </Fragment>
)

ForgotPasswordForm.propTypes = {
    initialValues: PropTypes.shape({
        email: PropTypes.string
    }).isRequired,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

export default ForgotPasswordForm
