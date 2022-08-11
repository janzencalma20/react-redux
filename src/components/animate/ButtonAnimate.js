import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { varSmallClick, varMediumClick } from './variants';
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

ButtonAnimate.propTypes = {
  mediumClick: PropTypes.bool,
  children: PropTypes.node,
  sx: PropTypes.object
};

export default function ButtonAnimate({ mediumClick = false, children, sx, ...other }) {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      sx={{ display: 'inline-flex', ...sx }}
      {...other}
    >
      {children}
    </Box>
  );
}
