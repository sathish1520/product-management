import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Drawer,
  Space,
  Popconfirm,
  message
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router';

import Layout from '../components/Layout'
import CreateUser from "./CreateUser";
import axios from "axios";
// import '../pages/assets/scss/main.scss'
const posts = () => {
  const [opened, setOpened] = useState("");
  const [courses, setCourses] = useState([]);
  const [editData, setEditdata] = useState({});
const router = useRouter();

  useEffect(() => {
    fetch('https://product-details.onrender.com/api/courses')
      .then((response) => response.json())
      .then((data) => { setCourses(data?.data) })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const closeModal = () => {
    setOpened(false);
  }

  const handleEdit = (value) => {
    setOpened("edit");
    setEditdata(value)
  }

  const handleformDelete=(value)=>{
    axios.delete(`https://product-details.onrender.com/api/courses/${value}`).then((res)=>{
      
      message.success('Product delete successfully');
      router.reload();
  }).catch((err)=>{
      message.error('Error in delete')
  })
  }
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',

      sorter: (a, b) => {
        const nameA = a?.title?.toLowerCase();
        const nameB = b?.title?.toLowerCase();
        return nameA?.localeCompare(nameB);
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Images',
      render: (value) => {
        return (
          <img src={value?.images} width={30} height={30}/>

        )
      }

    },
    {
      title: 'Category',
      render: (value) => {
        return (
          <p>{value?.category?.categorytitle}</p>

        )
      }
    },
    {
      title: 'Customer',
      dataIndex: 'author',
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          {/* edit button */}
          <Button
            // type="primary"
            icon={<EditOutlined />}
            size="medium"
            onClick={() => handleEdit(record)}
          />
          {/* delete button */}
          <Popconfirm
            title="Are you sure want delete the data"
            onConfirm={() => handleformDelete(record._id)}
            okType='default'
            style={{color:"black",borderColor:"black"}}
          >
            <Button style={{color:"black",borderColor:"black"}}  icon={<DeleteOutlined />} size="medium" />
          </Popconfirm>


        </Space>
      ),
    },

  ];
  return (
    <Layout>
      <div style={{ color: "black" }}>

        <div className='container-fluid' >
          <div className='create_user'>
            <h1>Product Details</h1>
            <Button
              className="add_user"
              icon={<PlusOutlined />}
              onClick={() => setOpened("create")}
            >
              Create New Product
            </Button>
          </div>
          <Table columns={columns} dataSource={courses} />
          {/* form open */}
          <Drawer
            className="drawer_sec"
            placement="right"
            open={opened?.length > 1 ? true : false}
            closable={false}
            onClose={() => setOpened(false)}
            title={
              <div className="create_user_sec">
               
                {opened === "create" ? <h2>Create Product</h2> : <></>}
                {opened === "edit" ? <h2>Edit Product</h2> : <></>}

              </div>
            }
            width="700px"
          >
            {opened === "create" ? (
              <>
                <CreateUser editData={null} closeModal={closeModal} />
              </>
            ) : (
              <></>
            )}

            {opened === "edit" ? (
              <>
                <CreateUser editData={editData} closeModal={closeModal} />
              </>
            ) : (
              <></>
            )}



          </Drawer>
        </div>
      </div>
    </Layout>
  )
}

export default posts