import { Button, Form, Input,Row,Col, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
function LoginPage() {
  const [form] = Form.useForm();
const router = useRouter();

  const onFinish = async (values) => {


    let config = {  password: values?.password ,email:values?.email,username:values?.username};

    axios.post(`https://product-details.onrender.com/login`,values).then((res)=>{
        // router.reload();
        console.log(res,"loginsucc")
        router.replace("/categorys");
        window.location.href = '/categorys';
        message.success('Login success')

    }).catch((err)=>{
        console.log(err,"loginerr")
    })
  }
  return (
    <div className="sec_of_login">
        <div className="cnt_color">
          <div className="total_sec_login">
            <div className="sec">
              <div className="Img_business">
              </div>
              <div className="Sign__in">
                <p>Sign in</p>
              </div>
              <Row className="Input_gmail">
                <Col md="12" className="account_col-align">
                  <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                  >


                    <Form.Item
                      className="input_section"
                      label="Email"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input
                        required
                        maxLength="254"
                      />
                    </Form.Item>

                    <Form.Item
                      className="input_section"
                      label="Username"
                      name="username"
                      rules={[
                       
                        {
                          required: true,
                          message: "Please input your Username!",
                        },
                      ]}
                    >
                      <Input
                        required
                        maxLength="254"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
                      className="input_section"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input
                        type="password"
                        required
                        maxLength="254"
                      />
                    </Form.Item>


                    <div className="form_margin">
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Col>

              </Row>
              <Link href='/Register'>
                            <h3 style={{float:'right',paddingTop:"10px"}}>Sign Up</h3>
                        </Link>
            </div>

          </div>
          
        </div>
      </div>
  );
}

export default LoginPage;
