// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Upload,  Modal } from 'antd';
// import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
//
//
//
// const EditorSidebar = (props) => {
//
//     const [form] = Form.useForm();
//     // const [fileList, setFileList] = useState([]);
//     const [fileList2, setFileList2] = useState([]);
//     const formLayout = 'vertical';
//
//     const formItemLayout = null;
//
//     const uploadProps = {
//         name: 'file',
//         multiple: false,
//         // fileList: fileList,
//         showUploadList: {
//             showDownloadIcon: false,
//         },
//         onRemove: file => {
//             setFileList2([]);
//             // setBanner(null);
//         },
//         beforeUpload: file => {
//             // const tempFileList = [file];
//             // setFileList([...tempFileList]);
//             console.log('uploaded file');
//             console.log(file);
//             console.log('uploaded file list');
//             console.log(fileList2);
//             // setBanner(file);
//             return false;
//         },
//         onChange: info => {
//             console.log('onchange');
//             console.log(info);
//             const tempFileList = [info.file];
//             setFileList2([...tempFileList]);
//             console.log(fileList2);
//             // setFileList([info.file]);
//         }
//         // defaultFileList: [...fileList],
//         // defaultFileList: fileList,
//
//     };
//
//     const normFile = e => {
//         console.log('Upload event:', e);
//         if (Array.isArray(e)) {
//             return e;
//         }
//         return e && e.fileList;
//     };
//
//     return (
//         <div className={'editor-sidebar-component'}>
//             <Form
//                 {...formItemLayout}
//                 layout={formLayout}
//                 form={form}
//                 // initialValues={{
//                 //     layout: formLayout,
//                 //     title,
//                 //     summary,
//                 // }}
//             >
//                 <Form.Item
//                         name="upload"
//                         label="Upload img in png format, suggested size: 800 * 400"
//                         valuePropName="fileList"
//                         getValueFromEvent={normFile}
//                     >
//                         <Upload
//                             { ...uploadProps }
//                             accept=".png"
//                             name="logo"
//                             fileList={fileList2}
//                             listType="picture" >
//                             <Button>
//                                 <UploadOutlined /> Click to upload
//                             </Button>
//                         </Upload>
//                     </Form.Item>
//             </Form>
//         </div>
//     );
// };
//
// export default EditorSidebar;




import React, { useState } from 'react';
import { Modal, Upload, Button, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons/lib';


const UploadModal = props => {
    // const { visible, onCancel, projectId } = props;
    const [fileList, setFileList] = useState();

    const uploadProps = {
        name: 'file',
        fileList,
        listType: 'text',
        action: 'http://localhost:8080/v1/artifacts',
        // data: { project_id: projectId, type: 'application/json' },

        beforeUpload(file) {
            return false
        },
        onChange(info) {
            setFileList([info.file]);
            // setFileList(info.fileList.slice(0, 1)); // Note: A new object must be used here!!!

            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(file) {
            // const promise: PromiseLike = deleteArtifact({ filename: file.response });
            // promise.then((value: any) => {
            //     if (value === '' || value instanceof Response && value.status === 205) {
            //         const index = fileList.indexOf(file);
            //         const newFileList = fileList.slice();
            //         newFileList.splice(index, 1);
            //         setFileList(newFileList);
            //     }
            // });
        },



    };
    //
    // {...formItemLayout}
    // layout={formLayout}
    // form={form}

        const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        setFileList([e.file]);
        return e && e.fileList;
    };

    return (
        // <Modal
        //     destroyOnClose
        //     title='上传归档文件'
        //     // visible={visible}
        //     // onCancel={onCancel}
        // >

        <Form

        // initialValues={{
        //     layout: formLayout,
        //     title,
        //     summary,
        // }}
    >
        <Form.Item
                name="upload"
                label="Upload img in png format, suggested size: 800 * 400"
                // valuePropName="fileList"
                getValueFromEvent={normFile}
            >
            <Upload
                {...uploadProps}
            >
                <Button>
                    <UploadOutlined/> Click to Upload
                </Button>
            </Upload>
        </Form.Item>
            </Form>
        // </Modal>
    );
};

export default UploadModal;
