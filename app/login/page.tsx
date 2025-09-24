"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, Layout, Divider } from "antd";
import Link from "next/link";
import firebaseLogin from "@/lib/firebase/firebaseLogin"; // sizning login funksiyangiz
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebase/firebaseGoogle";
import { GoogleOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { Content } = Layout;

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await firebaseLogin(values.email, values.password);
      router.push("/");
    } catch (err) {
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      console.error("Google login xatosi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Content className="w-full p-3 h-screen flex justify-center items-center">
        <Form
          form={form}
          layout="vertical"
          className="max-w-[400px] w-full"
          onFinish={handleSubmit}
        >
          <Typography.Title level={3} className="text-center">
            Login
          </Typography.Title>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Email formati noto'g'ri" },
              { required: true, message: "Email kiritish shart" },
            ]}
          >
            <Input placeholder="Emailingizni kiriting" autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Parol kiritish shart" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" disabled={loading} block htmlType="submit">
              {loading ? "loading..." : "Log in"}
            </Button>
          </Form.Item>

          <Divider size="large">or</Divider>

          <Form.Item>
            <Button
              color="default"
              variant="filled"
              disabled={loading}
              block
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              size="large"
            >
              Sign in with Google
            </Button>
          </Form.Item>

          <Typography.Paragraph>
            Don't have an Account?{" "}
            <Button type="link">
              <Link href="/signup">Sign up</Link>
            </Button>
          </Typography.Paragraph>
        </Form>
      </Content>
    </Layout>
  );
};

export default LoginPage;
