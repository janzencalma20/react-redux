// material
import { styled } from '@mui/styles';
// components
import Page from '../customComponents/Page';
import {
    LandingCleanInterfaces, LandingDarkMode,
    LandingHero, LandingHugePackElements,
    LandingMinimal, LandingPricingPlans,
    PageNotFound
} from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="The starting point for your next Simulation | Cohere" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingMinimal />
        {/*<LandingHugePackElements />*/}
        {/*<LandingCleanInterfaces />*/}
        {/*  <LandingDarkMode/>*/}
        {/*<LandingPricingPlans />*/}
        <PageNotFound/>

      </ContentStyle>
    </RootStyle>
  );
}
