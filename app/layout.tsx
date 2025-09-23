import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import "antd/dist/reset.css";

import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {" "}
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
