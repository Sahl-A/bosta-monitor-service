export default () => ({
  port: parseInt(process.env.PORT, 10) || 3009,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY,
});
