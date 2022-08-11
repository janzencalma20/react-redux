import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import chevronRightFill from '@iconify/icons-eva/chevron-right-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Link,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  Input,
  TextField, makeStyles
} from '@mui/material';
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const LICENSES = ['Basic', 'Standard', 'Premium'];

const PLANS = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['Web based', '12 months updates', '6 months of support'],
  options: ['Standard Version', 'Web based', 'Expert Support', 'Customised for users', 'Cloud Computing'],
  icons: ['/static/home/ic_sketch.svg', '/static/home/ic_figma.svg', '/static/home/ic_js.svg', '/static/home/ic_ts.svg']
}));

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  cardIndex: PropTypes.number,
  plan: PropTypes.shape({
    license: PropTypes.any,
    commons: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.string)
  })
};

function PlanCard({ plan, cardIndex }) {
  const theme = useTheme();
  const { license, commons, options, icons } = plan;

  const isLight = theme.palette.mode === 'light';
  const useStyles = makeStyles(theme => ({
    root: { backgroundColor: "white" },
    box: { backgroundColor: "white" },
    input: {
      root: { backgroundColor: "white", color: "black" }
    }
  }));
  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) =>
          `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.12)}`,
        ...(cardIndex === 1 && {
          boxShadow: (theme) =>
            `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`
        })
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="overline" sx={{ mb: 2, color: 'text.disabled', display: 'block' }}>
            LICENSE
          </Typography>
          <Typography variant="h4">{license}</Typography>
        </div>

        {cardIndex === 0 ? (
          <Box component="img" src={icons[0]} sx={{ width: 40, height: 40 }} />
        ) : (
          <Stack direction="row" spacing={1}>
            {icons.map((icon) => (
              <Box key={icon} component="img" src={icon} sx={{ width: 40, height: 40 }} />
            ))}
          </Stack>
        )}

        <Stack spacing={2.5}>
          {commons.map((option) => (
            <Stack key={option} spacing={1.5} direction="row" alignItems="center">
              <Box component={Icon} icon={checkmarkFill} sx={{ color: 'primary.main', width: 20, height: 20 }} />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />

          {options.map((option, optionIndex) => {
            const disabledLine =
              (cardIndex === 0 && optionIndex === 1) ||
              (cardIndex === 0 && optionIndex === 2) ||
              (cardIndex === 0 && optionIndex === 3) ||
              (cardIndex === 1 && optionIndex === 3);

            return (
              <Stack
                spacing={1.5}
                direction="row"
                alignItems="center"
                sx={{
                  ...(disabledLine && { color: 'text.disabled' })
                }}
                key={option}
              >
                <Box
                  component={Icon}
                  icon={checkmarkFill}
                  sx={{
                    width: 20,
                    height: 20,
                    color: 'primary.main',
                    ...(disabledLine && { color: 'text.disabled' })
                  }}
                />
                <Typography variant="body2">{option}</Typography>
              </Stack>
            );
          })}
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Link
            color="text.secondary"
            underline="always"
            target="_blank"
            href=""
            sx={{
              typography: 'body2',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Learn more <Icon icon={chevronRightFill} width={20} height={20} />
          </Link>
        </Stack>

        <Button
          size="large"
          fullWidth
          variant={cardIndex === 1 ? 'contained' : 'outlined'}
          target="_blank"
          href=""
        >
          Choose Plan
        </Button>
      </Stack>
    </Card>
  );
}

export default function LandingPricingPlans() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        {/*<Box sx={{ mb: 10, textAlign: 'center' }}>*/}
        {/*  <MotionInView variants={varFadeInUp}>*/}
        {/*    <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>*/}
        {/*      pricing plans*/}
        {/*    </Typography>*/}
        {/*  </MotionInView>*/}
        {/*  <MotionInView variants={varFadeInDown}>*/}
        {/*    <Typography variant="h2" sx={{ mb: 3 }}>*/}
        {/*      The right plan for your business*/}
        {/*    </Typography>*/}
        {/*  </MotionInView>*/}
        {/*  <MotionInView variants={varFadeInDown}>*/}
        {/*    <Typography*/}
        {/*      sx={{*/}
        {/*        color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary')*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Choose the perfect plan for your needs. Always flexible to grow*/}
        {/*    </Typography>*/}
        {/*  </MotionInView>*/}
        {/*</Box>*/}

        {/*<Grid container spacing={5}>*/}
        {/*  {PLANS.map((plan, index) => (*/}
        {/*    <Grid key={plan.license} item xs={12} md={4}>*/}
        {/*      <MotionInView variants={index === 1 ? varFadeInDown : varFadeInUp}>*/}
        {/*        <PlanCard plan={plan} cardIndex={index} />*/}
        {/*      </MotionInView>*/}
        {/*    </Grid>*/}
        {/*  ))}*/}
        {/*</Grid>*/}

        <MotionInView variants={varFadeIn}>
          <Box sx={{ p: 5, mt: 10, textAlign: 'center' }}>
            <MotionInView variants={varFadeInDown}>
              <Typography variant="h3">Enter your mail below and we will get back to you</Typography>
              <TextField variant="filled"  type="email" label="Email here" size="large">Email</TextField>
            </MotionInView>
            {/*<Mailchimp*/}
            {/*  action='https://electricalcoolingsolutions.us14.list-manage.com/subscribe/post?u=916823f5173ae22cb5f27eb9b&amp;id=1091a93757'*/}
            {/*  fields={[*/}
            {/*    {*/}
            {/*      name: 'EMAIL',*/}
            {/*      placeholder: 'EMAIL',*/}
            {/*      type: 'email',*/}
            {/*      required: true*/}
            {/*    }*/}
            {/*  ]}*/}
            {/*  />*/}
            <MotionInView variants={varFadeInUp}>
              <Button
                size="large"
                variant="contained"
                href="mailto:info@electricalcoolingsolutions.com?subject=[Feedback] from Customer"
              >
                Submit
              </Button>
            </MotionInView>
          </Box>
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
