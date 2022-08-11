import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { varWrapEnter } from './variants';
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

MotionContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default function MotionContainer({ open, children, ...other }) {
  return (
    <Box component={motion.div} initial={false} animate={open ? 'animate' : 'exit'} variants={varWrapEnter} {...other}>
      {children}
    </Box>
  );
}
