import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import menu2Fill from '@iconify/icons-eva/menu-2-fill'
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer'
// components
import { MHidden } from '../../customComponents/@material-extend'
import AccountPopover from './AccountPopover'
import {alpha, styled} from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 220
const COLLAPSE_WIDTH = 102

const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 72

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
}))

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
}

export default function DashboardNavbar({ onOpenSidebar }) {
  const { isCollapse } = useCollapseDrawer()

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` },
        }),
      }}
    >
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" align="center" sx={{ color: 'black' }}>
            Cohere
          </Typography>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  )
}
