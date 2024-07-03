import { Card, Form, Input, Checkbox, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logohm from '@/assets/logohm.png';
import './index.scss'
import { getToken } from '@/store/modules/user';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const { userInfo, token } = useSelector(state => state.user);

    const onFinish = async (values) => {
        // if (userInfo.username === values.username && userInfo.password === values.password) {
        //     navigate('/artical');
        // } 
        await dispatch(getToken(values));
        // if(token) {
            navigate('/');
        // }
        // else {
        //     onFinishFailed('Username or password is incorrect!');
        // }

    };

    const onFinishFailed = (errMsg) => {
        if(typeof errMsg === 'string') {
            loginFail(errMsg);
        }
        
    };

    const loginFail = (errMsg) => {
        messageApi.open({
            type: 'error',
            content: errMsg,
        });
    };

    return (
        <div className='login'>
            {contextHolder}
            <Card className='login-container'>
                <img className='login-logo' src={logohm} alt=''></img>
                {/* login form */}
                <Form validateTrigger='onBlur'
                    className='login-form'
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number.'
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: 'Please input correct phone number'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password.'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name='remember'
                        valuePropName='checked'
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}>
                        <Button type='primary' htmlType='submit'>Submit</Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>

    );
}

export default Login;