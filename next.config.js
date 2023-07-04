/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    // hide env variables from client side (use process.env.VAR_NAME in production)
    WEB3_PROJECT_ID: "27e6943270a07950e2f59c099fc5d3f1", // process.env.WEB3_PROJECT_ID
    CONTRACT_ADDRESS: "0xD9B8aBeAB6c96956c54E97a0148d503f3FEe2004", // process.env.CONTRACT_ADDRESS
    CI: false,
  },
};

module.exports = nextConfig;
