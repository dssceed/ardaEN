import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.trycloudflare.com', 'localhost:3000'],
  // เพิ่มส่วนนี้เข้าไปครับ
  experimental: {
    serverActions: {
      allowedOrigins: ['*.trycloudflare.com'],
    },
  },
  // webpack: (config, { dev, isServer }) => {
  //   if (dev && !isServer) {
  //     config.watchOptions = {
  //       poll: 1000, // ใช้การเช็คไฟล์แบบวนรอบ แทน WebSocket ที่เสถียรน้อยกว่าบน Tunnel
  //       aggregateTimeout: 300,
  //     };

  //     // ลบส่วน config.devServer ที่ชี้ไป port 0 ออกไปเลยครับ
  //     // เพื่อให้ Next.js ใช้ค่าปกติ หน้าเว็บจะได้ไม่หน่วง

  //     // // ทำให้ HMR เชื่อมต่อไม่ได้โดยการส่งไปหา host ปลอม
  //     // config.devServer = {
  //     //   client: {
  //     //     webSocketURL: 'ws://0.0.0.0:0/ws',
  //     //   },
  //     // };
  //   }
  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arda.or.th',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
