import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { styled } from '@mui/styles';
import {Box, Button, Container, Typography} from '@mui/material';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import {PATH_AUTH} from '../../routes/paths';
import Page from '../../components/Page';
import ResetPasswordConfirmForm from "../../components/authentication/reset-password/ResetPasswordConfirmForm";
import {useParams} from "react-router";

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const onSuccessConfirmPassword = () => {
    navigate(PATH_AUTH.login);
  };

  return (
    <RootStyle title="Reset Password Confirm | Minimal UI">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Typography variant="h3" paragraph>
            Reset your password
          </Typography>
          <ResetPasswordConfirmForm
            uid={uid}
            token={token}
            onSuccessConfirmPassword={onSuccessConfirmPassword}
          />

          <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
            Back
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
