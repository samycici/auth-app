import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React, { Fragment } from 'react'

// components
import Button from '@components/Button'
import Textbox from '@components/Textbox'

const LoginForm = ({ initialValues, onSubmit, validationSchema }) => (
    <Fragment>
        <div className="container mx-auto flex justify-center">
            <div className="max-w-md-1/2 mx-3 my-12 w-full">
                <h1 className="text-center font-primary font-semibold text-gold">
                    Login
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
                            handleChange,
                            isSubmitting,
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
                                <Textbox
                                    type="password"
                                    name="password"
                                    onBlur={handleBlur}
                                    value={values.password}
                                    onChange={handleChange}
                                    data-testid={'password-field'}
                                    placeholder={'Enter your password'}
                                    error={touched.password && errors.password}
                                />
                                <div className="text-center my-12">
                                    <Link
                                        to="/auth/passwords/email"
                                        className="font-primary text-brown no-underline"
                                    >
                                        Forgot Password ?
                                    </Link>
                                </div>
                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    data-testid="submit-button"
                                >
                                    Submit
                                </Button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </Fragment>
)

LoginForm.propTypes = {
    initialValues: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string
    }).isRequired,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

export default LoginForm
