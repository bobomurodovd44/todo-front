"use client";
import { ConfigProvider, theme } from "antd";
import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import "antd/dist/reset.css";

import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
