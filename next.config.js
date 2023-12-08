/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
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
  output: "export",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
