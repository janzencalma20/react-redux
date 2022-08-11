import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {TextField, Alert, Stack, InputAdornment, IconButton, Container, Box, Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import {Icon} from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import React, {useState} from "react";
import LogoOnlyLayout from "../../layouts/LogoOnlyLayout";
import {styled} from "@mui/styles";
import Page from "../../components/Page";
import validator from 'validator'
import {useNavigate} from "react-router";
import {PATH_DASHBOARD} from "../../routes/paths";

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

ChangePassword.propTypes = {
  uid: PropTypes.string,
  token: PropTypes.string,
  onSuccessConfirmPassword: PropTypes.func
};

export default function ChangePassword() {
  const { changePassword, user } = useAuth();
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

  const ChangePasswordConfirmSchema = Yup.object().shape({
    new_password: Yup.string().required('New Password is required'),
    re_new_password: Yup.string().required('New Confirm Password is required')
  });

  const formik = useFormik({
    initialValues: {
      id: user.id,
      new_password: '',
      re_new_password: ''
    },
    validationSchema: ChangePasswordConfirmSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      if (values.new_password === values.re_new_password) {
        if (validator.isStrongPassword(values.new_password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0
        })) {
          try {
            const res = await changePassword(values.id, values.new_password);
            if (isMountedRef.current) {
              if (res.data === 'success') {
                navigate(PATH_DASHBOARD.root);
              } else {
                setErrors({afterSubmit: 'Password is not updated. Please try again!'});
              }
              setSubmitting(false);
            }
          } catch (error) {
            if (isMountedRef.current) {
              setErrors({afterSubmit: error.message});
              setSubmitting(false);
            }
          }
        } else {
          setErrors({ beforeSubmit: true })
        }
    }
  }});

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleShowNewConfirmPassword = () => {
    setShowNewConfirmPassword((show) => !show);
  };

  return (
    <RootStyle title="Change Password | Minimal UI">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Typography variant="h3" paragraph>
            Change your password
          </Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {errors.beforeSubmit && <Alert severity="error">
                  This password is too short or common. It must contain at least 8 characters.<br />
                  It must contain at least 1 low, upper character and number.
                </Alert>}
                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

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
                  Change Password
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </RootStyle>
  );
}
