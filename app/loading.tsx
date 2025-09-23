"use client";

import React from "react";
import { Layout, Spin, Typography } from "antd";

const { Content } = Layout;

const LoadingPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content className="flex justify-center items-center">
        <div className="text-center">
          <Spin size="large" />
          <Typography.Title level={4} style={{ marginTop: 16 }}>
            Loading...
          </Typography.Title>
        </div>
      </Content>
    </Layout>
  );
};

export default LoadingPage;
