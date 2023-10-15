import { Form, Input, Button, message, InputNumber,Select } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
const Createcategory = ({ closeModal, editData }) => {
    const [form] = Form.useForm();
const router = useRouter();
   
    // edit form open
    useEffect(() => {
        if (editData) {
            let userObject = JSON.parse(JSON.stringify(editData));
            form.setFieldsValue(userObject);
        }
    }, [editData])

    // get data from localstorage
   

    // create  actions

  
   

    // onfinish action
    const handleCreate = (value) => {

        if(editData){
            axios.put(`https://product-details.onrender.com/api/category/${editData?._id}`,value).then((res)=>{
                closeModal(null);
                message.success('category edit successfully');
                router.reload();
            }).catch((err)=>{
                message.error('Error in edit form')
            })
        }else{
            axios.post(`https://product-details.onrender.com/api/category/`,value).then((res)=>{
                closeModal(null);
                message.success('category Created successfully')
                router.reload();
            }).catch((err)=>{
                message.error('Error in create form')
            })
        }

    }

    return (
        <div className='create_form_user'>
            <Form form={form} layout="vertical" onFinish={handleCreate}>


                <Form.Item name='categorytitle' label={<p className='create_User_lable'>Categorytitle</p>}
                    required={false} rules={[{ required: true, message: "Please enter your categorytitle" }]}
                >
                    <Input className="input_height" placeholder="Type your categorytitle" autoComplete="off" />
                </Form.Item>

                <Form.Item name='description' label={<p className='create_User_lable'>Description</p>}
                    required={false} rules={[{ required: true, message: "Please enter your description" }]}

                >
                    <Input className="input_height" placeholder="Type your description" autoComplete="off" />
                </Form.Item>

                <div className='create_flex'>

                    <Button className='cancel_bttn' onClick={() => closeModal(null)}>Cancel</Button>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='create_bttn'>{editData?.id ? "Edit" : "Create"} Category</Button>
                    </Form.Item>
                </div>

            </Form>
        </div>
    )
}

export default Createcategory