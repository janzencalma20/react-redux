// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`
}
const ROOTS_AUTH = '/auth';

const ROOTS_DASHBOARD = '/dashboard'

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  projects: path(ROOTS_DASHBOARD, '/projects'),
  modelTree: path(ROOTS_DASHBOARD, '/modelTree'),
  dimensions: path(ROOTS_DASHBOARD, '/dimensions'),
  cooling: path(ROOTS_DASHBOARD, '/cooling'),
  losses: path(ROOTS_DASHBOARD, '/losses'),
  lptn: path(ROOTS_DASHBOARD, '/lptn'),
  fea: path(ROOTS_DASHBOARD, '/fea'),
  cfd: path(ROOTS_DASHBOARD, '/cfd'),
  results: path(ROOTS_DASHBOARD, '/results'),
}
export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};