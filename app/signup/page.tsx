"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, Layout } from "antd";
import Link from "next/link";
import firebaseSignUp from "@/lib/firebase/firebaseSignup";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [form] = Form.useForm();
  const { Content } = Layout;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    email: string;
    password: string;
    full_name: string;
  }) => {
    setLoading(true);
    try {
      await firebaseSignUp(values.email, values.password, values.full_name);
      router.push("/");
    } catch (err) {
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Layout className="min-h-screen">
      <Content className="w-full p-3 h-screen flex justify-center items-center">
        <Form
          form={form}
          layout="vertical"
          className=" max-w-[400px] w-full"
          onFinish={handleSubmit}
        >
          <Typography.Title level={3} className="text-center">
            Signup
          </Typography.Title>
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[{ required: true, message: "Ism kiritish shart" }]}
          >
            <Input
              placeholder="To'liq Ismingizni kiriting"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "email formati noto'g'ri" },
              { required: true, message: "email kiritish shart" },
            ]}
          >
            <Input
              placeholder="Emailingizni kiriting"
              type="email"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Parol kiritilishi shart" },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                message:
                  "Parolda kamida 6 belgi, bitta harf va bitta raqam bo‘lishi kerak",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" disabled={loading} block htmlType="submit">
              {loading ? "loading..." : "Sign Up"}
            </Button>
          </Form.Item>
          <Typography.Paragraph>
            Already have an Account ?
            <Button color="primary" variant="link">
              <Link href="/login">Log in</Link>
            </Button>
          </Typography.Paragraph>
        </Form>
      </Content>
    </Layout>
  );
};

export default LoginPage;
