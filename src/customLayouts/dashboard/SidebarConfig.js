// routes
import { PATH_DASHBOARD } from '../../routes/paths'
// components
import {
  COOLING,
  DIMENSIONS,
  FEA,
  LOSSES,
  LPTN,
  MODEL_TREE,
  RESULTS,
  CFD,
} from 'src/utils/constants'
import {AccountTree, FlashOn, ImageSearch, Straighten, Waves} from "@mui/icons-material";

// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: MODEL_TREE,
    path: PATH_DASHBOARD.projects,
    icon: <AccountTree />,
    disabled: false
  },
  {
    title: DIMENSIONS,
    path: PATH_DASHBOARD.dimensions,
    icon: <Straighten />,
    disabled: true
  },
  {
    title: COOLING,
    path: PATH_DASHBOARD.cooling,
    icon: <Waves />,
    disabled: true
  },
  {
    title: LOSSES,
    path: PATH_DASHBOARD.losses,
    icon: <FlashOn />,
    disabled: true
  },
  // {
  //   title: LPTN,
  //   path: PATH_DASHBOARD.lptn,
  //   icon: <AddCircleOutline />,
  //   disabled: true
  // },
  // {
  //   title: FEA,
  //   path: PATH_DASHBOARD.fea,
  //   icon: <AddCircleOutline />,
  //   disabled: true
  // },
  // {
  //   title: CFD,
  //   path: PATH_DASHBOARD.cfd,
  //   icon: <AddCircleOutline />,
  //   disabled: true
  // },
  {
    title: RESULTS,
    path: PATH_DASHBOARD.results,
    icon: <ImageSearch />,
    disabled: true
  },
];

export default sidebarConfig
