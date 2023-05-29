import { Formik, FormikHelpers } from "formik"
import React from "react"
import { Button, Div, Input } from "react-native-magnus"
import * as Yup from "yup"

import ErrorMessage from "components/FormErrorMessage"
import Text from "components/Text"

import useToggleableSecureEntry from "hooks/useToggleableSecureEntry"

export type LoginFormInput = { email: string; password: string }

type PropTypes = {
  initialValues?: LoginFormInput
  onSubmit?: (
    values: LoginFormInput,
    formikHelpers: FormikHelpers<any>,
  ) => void | Promise<any>
  submitButtonText?: string
}

const initialVal: LoginFormInput = {
  email: "",
  password: "",
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Mohon isi email"),
  password: Yup.string().required("Mohon isi password"),
})

export default ({
  initialValues = initialVal,
  onSubmit = () => Promise.resolve(),
  submitButtonText = "Login",
}: PropTypes) => {
  const { secureTextEntry, eyeIcon } = useToggleableSecureEntry()

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnBlur
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isSubmitting,
        setFieldValue,
      }) => (
        <Div w={"100%"} px={40}>
          <Input
            placeholder="Email"
            placeholderTextColor="grey"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            keyboardType="email-address"
            testID="loginEmailInput"
            borderColor="#000"
            bg="white"
            color="#000"
            mb={5}
          />
          <ErrorMessage name="email" />
          <Input
            placeholder="Password"
            placeholderTextColor="grey"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            secureTextEntry={secureTextEntry}
            suffix={eyeIcon()}
            testID="loginPasswordInput"
            borderColor="#000"
            bg="white"
            color="#000"
            mt={10}
            mb={5}
          />
          <ErrorMessage name="password" />

          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            onPress={() => handleSubmit()}
            testID="loginButton"
            bg="primary"
            mt={30}
            px={20}
            alignSelf="center"
          >
            <Text fontWeight="bold" color="white">
              {submitButtonText}
            </Text>
          </Button>

          {!!__DEV__ && (
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              onPress={() => {
                setFieldValue("email", "sales@general.com")
                setFieldValue("password", "12345678")
                return Promise.resolve()
              }}
              testID="loginButton"
              bg="primary"
              mt={30}
              px={20}
              alignSelf="center"
            >
              <Text fontWeight="bold" color="white">
                Dev
              </Text>
            </Button>
          )}
        </Div>
      )}
    </Formik>
  )
}
