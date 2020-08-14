import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Modal } from 'antd'

// redux
import { login, register } from '@/actions/auth'
import { useDispatch } from 'react-redux'


const FormItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};

const tailLayout = {
    wrapperCol: {
        span: 24,
    },
};

const validateService = (form) => {
    return {
        confirmPassword: (rule, value) => {
            if (value && value !== form.getFieldValue('password')) {
                return Promise.reject('Two passwords that you enter is inconsistent!');
            } else {
                return Promise.resolve();
            }
        },
        validateUsername: (rule, value) =>{
            if (/^[A-Za-z0-9]+$/.test(value)) {
                return Promise.resolve();

            }else{
                return Promise.reject('Username could only contain letter & number');
            }
        }
    }
};


function SignModal(props) {
    const { type, finish, visible } = props;
    const dispatch = useDispatch(); // dispatch hooks
    const [form] = Form.useForm();
    const service = validateService(form);
    // const [visible, setVisible] = useState(false);

    const onFinish = values => {
        console.log('finish!');
        console.log(values);
        const action = type === 'login' ? login : register;
        dispatch(action(values)).then(() => {
            finish();
        });
        // form.validateFields((errors, values) => {
        //     if (errors) return;
        //     const action = type === 'login' ? login : register;
        //     dispatch(action(values)).then(() => {
        //         finish();
        //         // setVisible(false) // type =  login | register
        //     })
        // })
    };



    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
    };

    return (
        <Modal
            width={460}
            title={type}
            visible={visible}
            onCancel={e => finish()}
            footer={null}>

            <Form {...FormItemLayout} form={form} onFinish={onFinish} layout='horizontal' validateMessages={validateMessages} >
                {type === 'login' ? (
                        <>
                            <Form.Item label='Email' name='email' rules={[{ required: true, type: 'email' }]}>
                                <Input placeholder='Please enter user name, ' />
                            </Form.Item>
                            <Form.Item label='Password' name='password' rules={[{ required: true }]}>
                                <Input placeholder='Please enter password' type='password' />
                            </Form.Item>
                        </>
                    )
                    : (
                        <>
                            <Form.Item label='Email' name='email' rules={[{ type: 'email', required: true }]}>
                                <Input placeholder='Please enter your email' />
                            </Form.Item>
                            <Form.Item label='Username' name='username' rules={[
                                { type: 'string', required: true },
                                {min: 4, message: 'Length of username must be greater than 4'},
                                {max: 8, message: 'Length of username must be smaller than 8'},
                                {validator: service.validateUsername}]}>
                                <Input placeholder='Only letter & number, 4-8 characters' />
                            </Form.Item>
                            <Form.Item label='Password' name='password' rules={[
                                { type: 'string', required: true },
                                {min: 6, message: 'Length of password must be greater than 6'},
                                {max: 8, message: 'Length of password must be smaller than 8'}, ]}>
                                <Input placeholder='Length between 6-8' type='password' />
                            </Form.Item>
                            <Form.Item label='Confirm Password' name='confirmPassword' rules={[
                            { required: true },
                            { validator: service.confirmPassword }]}>
                                <Input placeholder='Confirm password' type='password' />
                            </Form.Item>

                        </>
                    )}
                    <Form.Item {...tailLayout}>
                        <Button type='primary' block htmlType="submit">
                            {type}
                        </Button>
                    </Form.Item>
            </Form>

        </Modal>
    )
}

export default SignModal
