import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {TextField, Alert, Stack, InputAdornment, IconButton} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import {Icon} from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import React, {useState} from "react";

// ----------------------------------------------------------------------

ResetPasswordConfirmForm.propTypes = {
  uid: PropTypes.string,
  token: PropTypes.string,
  onSuccessConfirmPassword: PropTypes.func
};

export default function ResetPasswordConfirmForm({ uid, token, onSuccessConfirmPassword }) {
  const { resetPasswordConfirm } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

  const ResetPasswordConfirmSchema = Yup.object().shape({
    new_password: Yup.string().required('New Password is required'),
    re_new_password: Yup.string().required('New Confirm Password is required')
  });

  const formik = useFormik({
    initialValues: {
      uid,
      token,
      new_password: '',
      re_new_password: ''
    },
    validationSchema: ResetPasswordConfirmSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      if (values.new_password === values.re_new_password) {
        try {
          await resetPasswordConfirm(values.uid, values.token, values.new_password, values.re_new_password);
          if (isMountedRef.current) {
            setSubmitting(false);
            onSuccessConfirmPassword();
          }
        } catch (error) {
          if (isMountedRef.current) {
            const errData = error.response.data;
            let errMsg = '';
            let messages = [];
            if (errData && errData.new_password) {
              messages = errData.new_password;
            } else if (errData && errData.token) {
              messages = errData.token;
            }
            for (let i = 0; i < messages.length; i ++) {
              errMsg += messages[i]
            }
            setErrors({afterSubmit: errMsg});
            setSubmitting(false);
          }
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleShowNewConfirmPassword = () => {
    setShowNewConfirmPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{ errors.afterSubmit }</Alert>}

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showNewPassword ? 'text' : 'password'}
            label="New Password"
            {...getFieldProps('new_password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowNewPassword} edge="end">
                    <Icon icon={showNewPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.new_password && errors.new_password)}
            helperText={touched.new_password && errors.new_password}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showNewConfirmPassword ? 'text' : 'password'}
            label="Confirm New Password"
            {...getFieldProps('re_new_password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowNewConfirmPassword} edge="end">
                    <Icon icon={showNewConfirmPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.re_new_password && errors.re_new_password)}
            helperText={touched.re_new_password && errors.re_new_password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={
              formik.values.new_password.trim() === ''
              || formik.values.new_password !== formik.values.re_new_password
            }
          >
            Reset Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
