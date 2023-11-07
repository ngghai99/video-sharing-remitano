module.exports = {
  experimental: {
    appDir: true,
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    IP_SERVER: process.env.IP_SERVER,
    IP_CLIENT: process.env.IP_CLIENT,
    IP_CLIENT_NO_PORT: process.env.IP_CLIENT_NO_PORT,
    CABLE: process.env.CABLE
  },
  reactStrictMode: false
}
