import React, { useEffect, useState } from "react";
import { Table, Tag, Space, notification } from 'antd';
import authAx from '../../configuration/authAx'
import { Button, TextField } from "@material-ui/core";
import { Modal } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkbox } from 'antd';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';



const initialState = {
  pageName: '',
  pageLink: '',
  hide: false,
  menuText: '',
  menuTootltip: '',
  menuOrder: '',
  pageTitle: '',
  pageText: '',
  actionType: 'add',
  id: '',
}

const validationSchema = Yup.object().shape({
  pageName: Yup.string().required('*page name is equired'),
  pageLink: Yup.string().required('*page link is required'),
  menuText: Yup.string().required('*menu text is required'),
  menuTootltip: Yup.string().required('*menu tooltip is required'),
  pageTitle: Yup.string().required('*page title is required'),
  pageText: Yup.string().required('*page text is required'),
});

function Pages(props) {

  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState(initialState)

  const [isUpdatetList, setisUpdatetList] = useState(false)

  const pagination = {
    pageSize: 5,
  }

  const handleClickEdit = (data) => {
    setForm({ ...data, actionType: 'edit', id: data.id });
    setIsModalVisible(true);
  }


  const sortString = (a,b, sortKey, direction) => {
      // a[sortKey] = a[sortKey].toLowerCase()
      // b[sortKey] = b[sortKey].toLowerCase()
      if( a[sortKey] < b[sortKey] ) { return -1; }
      if( a[sortKey] > b[sortKey] ) { return -1; }
      return 0;
  }


  const columns = [
    {
      title: 'Page Name',
      field: 'pageName',
      headerName: 'Page Name',
      dataIndex: 'pageName',
      key: 'pageName',
      render: text => <a>{text}</a>,
      sortDirections: ['descend', 'ascend'],
      sorter: (a,b , direction )=> sortString(a,b,'pageName', direction)
    },
    {
      title: 'Page Link',
      dataIndex: 'pageLink',
      field: 'pageName',
      headerName: 'Page Name',
      key: 'pageLink',
      sortDirections: ['descend', 'ascend'],
      sorter: (a,b)=> sortString(a,b,'pageLink')
    },
    {
      title: 'Hide',
      dataIndex: 'hide',
      field: 'pageName',
      headerName: 'Page Name',
      key: 'hide',
      render: text => <a>{text ? 'yes' : 'no'}</a>,
      sortDirections: ['descend', 'ascend'],
      sorter: (a,b)=> sortString(a,b,'hide')
    },
    {
      title: 'MenuText',
      dataIndex: 'menuText',
      field: 'pageName',
      headerName: 'Page Name',
      key: 'menuText',
      sortDirections: ['descend', 'ascend'],
      sorter: (a,b)=> sortString(a,b,'menuText')
    },
    {
      title: 'MenuTootltip',
      dataIndex: 'menuTootltip',
      field: 'pageName',
      headerName: 'Page Name',
      key: 'menuTootltip',
      sortDirections: ['descend', 'ascend'],
      sorter: (a,b)=> sortString(a,b,'menuTootltip')
    },
    {
      title: 'Menu Order',
      dataIndex: 'menuOrder',
      field: 'pageName',
      headerName: 'Page Name',
      key: 'menuOrder',
      sortDirections: ['descend', 'ascend'],
      sorter: (a,b)=> sortString(a,b,'menuOrder')
    },
    {
      title: 'Page Title',
      dataIndex: 'pageTitle',
      field: 'pageName',
      headerName: 'Page Name',
      key: 'pageTitle',
      sortDirections: ['descend', 'ascend'],
      sorter: (a,b)=> sortString(a,b,'pageTitle')
    },
    {
      title: 'Page Text',
      dataIndex: 'pageText',
      field: 'pageName',
      headerName: 'Page Name',
      key: 'pageText',
      sortDirections: ['descend', 'ascend'],
      sorter: (a,b)=> sortString(a,b,'pageText')
    },
    {
      title: 'Action',
      key: 'action',
      field: 'action',
      headerName: 'Action',
      render: (text, record) => (
        <Space size="middle">
          <EditIcon color="primary" onClick={() => handleClickEdit(text)} />
          <DeleteIcon color="error" onClick={() => handleClickDelete(text)} />
        </Space>
      ),
    },
  ];


  useEffect(() => {
    setForm(initialState)
    authAx.get("getPageList").then((res) => {
      let { status, data } = res.data;
      if (status) {
        setData(data);
      }
      else {
        setData([]);
      }
    });
    return () => {
      setData([]);
      setForm(initialState)
    };
  }, []);

  useEffect(() => {
    if (isUpdatetList) {
      setForm(initialState)
      setIsModalVisible(false)
      authAx.get("getPageList").then((res) => {
        let { status, data } = res.data;
        if (status) {
          setData(data);
        }
        else {
          setData([]);
        }
      });
      setisUpdatetList(false)
    }
    return () => {
      setisUpdatetList(false)
    };
  }, [isUpdatetList]);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setForm(initialState)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setForm(initialState)
    setIsModalVisible(false);
  };

  const handleChangeCheckBox = (ev) => {
    setForm({ ...form, hide: !form.hide })
  }

  const handleClickDelete = (data) => {
    if (window.confirm('Are you sure want to delete?')) {
      authAx.post("deletePage" ,{ id: data.id }).then((res) => {
        let { status, data, message } = res.data;
        if (status) {
          notification.success({ message })
          setisUpdatetList(true);
        }
        else {
          notification.error({ message })
        }
      });
    }
  }

  return (
    <div>
      <div>
        <Button color="primary" variant='contained' onClick={showModal} ><AddIcon style={{ color:'white' }} />Add</Button>
      </div>
      <Modal title="Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} >
        <Formik
          initialValues={form}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={values => {
            authAx.post('addEditPage', { ...values })
              .then(res => {
                let { status, message } = res.data;
                if (status) {
                  notification.success({ message });
                  setisUpdatetList(true);
                }
                else {
                  notification.error({ message });
                  console.log("opertaion failed");
                }
              })
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, validateForm, getFieldProps }) => (
            <Form onSubmit={handleSubmit} >
              <div className="mt-4" >
                <TextField
                  name='pageName'
                  {...getFieldProps('pageName')}
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  label="Page Name"
                  variant="outlined"
                  error={touched.pageName && errors.pageName}
                />
                <ErrorMessage className="error_msg" name='pageName' />
              </div>

              <div className="my-6" >
                <Checkbox onChange={handleChangeCheckBox} {...getFieldProps('hide')} checked={Boolean(values.hide)} >Hide</Checkbox>
              </div>

              <div className="mt-4" >
                <TextField
                  name='pageLink'
                  {...getFieldProps('pageLink')}
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  label="Page Link"
                  variant="outlined"
                  error={touched.pageLink && errors.pageLink}
                />
                <ErrorMessage className="error_msg" name='pageLink' />
              </div>

              <div className="mt-4" >
                <TextField
                  name='menuText'
                  {...getFieldProps('menuText')}
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  label="Menu Text"
                  variant="outlined"
                  error={touched.menuText && errors.menuText}
                />
                <ErrorMessage className="error_msg" name='menuText' />
              </div>

              <div className="mt-4" >
                <TextField
                  name='menuTootltip'
                  {...getFieldProps('menuTootltip')}
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  label="Menu Tootltip"
                  variant="outlined"
                  error={touched.menuTootltip && errors.menuTootltip}
                />
                <ErrorMessage className="error_msg" name='menuTootltip' />
              </div>

              <div className="mt-4" >
                <TextField
                  name='menuOrder'
                  {...getFieldProps('menuOrder')}
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  label="Menu Order"
                  variant="outlined"
                  error={touched.menuOrder && errors.menuOrder}
                />
                <ErrorMessage className="error_msg" name='menuOrder' />
              </div>

              <div className="mt-4" >
                <TextField
                  name='pageTitle'
                  {...getFieldProps('pageTitle')}
                  className="w-full border rounded p-2  outline-none focus:shadow-outline"
                  label="Page Title"
                  variant="outlined"
                  error={touched.pageTitle && errors.pageTitle}
                />
                <ErrorMessage className="error_msg" name='pageTitle' />
              </div>

              <div className="mt-4" >
                <TextField
                  name='pageText'
                  {...getFieldProps('pageText')}
                  className="w-full border rounded p-2  outline-none focus:shadow-outline"
                  label="Page Text"
                  multiline
                  rows={4}
                  variant="outlined"
                  error={touched.pageText && errors.pageText}
                />
                <ErrorMessage className="error_msg" name='pageText' />
              </div>

              <div className=" mt-4 " >
                <button disabled={!isValid} className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">{values.actionType === 'edit' ? 'Edit' : 'Add'}</button>
              </div>

            </Form>
          )}
        </Formik>
      </Modal>
      {/* <DataGrid rows={data} columns={columns} pageSize={5} /> */}
      <Table rowKey={record => record.id} columns={columns} pagination={pagination} dataSource={data} />
    </div>
  )
}

export default Pages;