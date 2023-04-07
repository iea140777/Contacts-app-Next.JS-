import { Button, Form, Input } from "antd";

import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  loginHandler: (values: { email: string; password: string }) => void;
}

function LoginForm({ loginHandler }: LoginFormProps) {
  return (
    <div className={styles.container}>
      <span>Please, enter your email and password to login:</span>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={loginHandler}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export { LoginForm };
