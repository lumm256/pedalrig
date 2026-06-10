import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 旧手写品牌页 → 数据驱动的 /brands/[slug]。permanent(308)传递权重，防掉收录。
  async redirects() {
    return [
      { source: "/boss", destination: "/brands/boss", permanent: true },
      { source: "/behringer", destination: "/brands/behringer", permanent: true },
    ];
  },
};

export default nextConfig;
