/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_INITIAL_URL: "/dashboard",
    NEXT_PUBLIC_STATE_TYPE: "redux",
    NEXT_PUBLIC_FILESTACK_KEY: "Ach6MsgoQHGK6tCaq5uJgz",
    NEXT_PUBLIC_LAYOUT: "default",
    NEXT_PUBLIC_MULTILINGUAL: "true",
    NEXT_PUBLIC_PRIMARY_COLOR: "#0A8FDC",
    NEXT_PUBLIC_SECONDARY_COLOR: "#F04F47",
    NEXT_PUBLIC_THEME_MODE: "dark",
    NEXT_PUBLIC_NAV_STYLE: "mini-sidebar-toggle",
    NEXT_PUBLIC_LAYOUT_TYPE: "full-width",
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
