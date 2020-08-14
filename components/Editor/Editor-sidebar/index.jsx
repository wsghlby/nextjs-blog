import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload,  Modal } from 'antd';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { getFolderList, updateFolderList } from "@/actions/folder-list";
import {useDispatch, useSelector} from "react-redux";
import Selector from './Selector';
import Router , {useRouter}  from 'next/router';
import './editor-sidebar.module.scss';



const EditorSidebar = (props) => {

    const folderList = useSelector(state => state.folder.foldersList);
    const { mode, setSpinnerHide, handleSubmit, title, setTitle, summary, setSummary, setBanner, selectedFolder, setSelectedFolder } = props;
    // console.log('sidebar');
    // console.log(props);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const router = useRouter();
    const formLayout = 'vertical';

    const formItemLayout = null;
    const buttonItemLayout = null;

    const [newItem, setNewItem] = useState('');



    // const [selectedFolder, setSelectedFolder] = useState('');

    // const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    useEffect( () => {
        if (mode === 'new') {
            if (folderList && folderList[0]) {
                setSelectedFolder(folderList[0]);
            }else{
                setSelectedFolder('');
            }
        }
        if (mode === 'edit') {

        }
    }, []);
    const { confirm } = Modal;
    const showConfirm = () => {
        confirm({
            title: 'Do you Want to exit editor?',
            icon: <ExclamationCircleOutlined />,
            content: mode === 'new'? 'All data will lose' : 'All modification will lose',
            onOk() {
                router.back();
                setSpinnerHide(false);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    const toSelector = {
        selectedFolder, setSelectedFolder,
        newItem, setNewItem,
        folderList
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        fileList,
        // fileList: fileList,
        showUploadList: {
            showDownloadIcon: false,
        },
        onRemove: file => {
            setFileList([]);
            setBanner(null);
        },
        beforeUpload: file => {
            // const tempFileList = [file];
            setFileList([file]);
            // console.log('uploaded file');
            // console.log(file);
            // console.log('uploaded file list');
            // console.log(fileList2);
            setBanner(file);
            return false;
        },
        // onChange: info => {
        //     console.log('onchange');
        //     console.log(info);
        //     const tempFileList = [info.file];
        //     setFileList([...tempFileList]);
        //     console.log(fileList2);
        //     // setFileList([info.file]);
        // }
        // defaultFileList: [...fileList],
        // defaultFileList: fileList,

    };

    const normFile = e => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div className={'editor-sidebar-component'}>
            <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                    title,
                    summary,
                }}
            >
                <Form.Item label="Title" name='title' rules={[
                    { required: true },
                    {max: 30, message: 'Length of title must be smaller than 30'}]}>
                    <Input placeholder="title, length < 30" value={title} onChange={e => setTitle(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Summary" name='summary' rules={[
                    { required: true },
                    {max: 60, message: 'Length of summary must be smaller than 60'}]}>
                    <Input placeholder="summary, length < 60" value={summary} onChange={e => setSummary(e.target.value)}/>
                </Form.Item>
                {mode === 'new'?
                    (<Form.Item
                        name="upload"
                        label="Upload img in png format, suggested size: 800 * 400"
                        // valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            { ...uploadProps }
                            accept=".png"
                            name="logo"
                            // listType="picture"
                        >
                            <Button>
                                <UploadOutlined /> Click to upload
                            </Button>
                        </Upload>
                    </Form.Item>)
                    :
                    (<></>)
                }
                <Form.Item label="Select belonging folder" name="folder"
                           >
                    {/*{loaded? <Selector { ...toSelector }/>: <Spin />}*/}
                    <Selector { ...toSelector }/>

                </Form.Item>
                <Form.Item >
                    {/*<Button type="primary" OnClick={ dispatch(getFolderList())}>Submit</Button>*/}
                    <Button type="primary" onClick={ handleSubmit } htmlType="submit">
                        { mode === 'new'? 'Upload' : 'Update' }
                    </Button>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" danger onClick={showConfirm}>Exit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditorSidebar;
