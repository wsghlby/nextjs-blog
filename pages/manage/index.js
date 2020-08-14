import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import {Empty, Table, Tag, Space, Modal} from 'antd';
import WebHeader from '../../components/layout/header'
import ArticleBox from "@/components/ArticleBox";
import { useRouter } from 'next/router';

import {useSelector, useDispatch} from "react-redux";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import { removeArticle } from "@/actions/article";
import LargeSpinner from '@/components/LargeSpinner';

import './manage.module.scss';

// time, title, summary, content, selectedFolder, banner: url, commentNumber: 0








const Manage = () => {
    const articleListObj = useSelector(state => state.article.articleList);
    const [tableSource, setTableSource] = useState([]);
    const [spinnerHide, setSpinnerHide] = useState(false);
    // const [pagination, setPagination] = useState(false);
    const router = useRouter();
    const { confirm } = Modal;
    const dispatch = useDispatch();
    console.log(new Date().toLocaleString());
    // const tableSource = [];
    useEffect(() => {
        const tempList = [];
        for (const key in articleListObj){
            if (articleListObj.hasOwnProperty(key)){
                tempList.push({...articleListObj[key], key});
            }
        }
        setTableSource(tempList);
        setSpinnerHide(true);
    },[]);

    const showConfirm = (record) => {
        confirm({
            title: `Do you want to delete article \"${record.title}\"`,
            icon: <ExclamationCircleOutlined />,
            content: 'All data will lose',
            onOk() {
                setSpinnerHide(false);
                dispatch(removeArticle(record.key)).then(() => {
                    setSpinnerHide(true);
                });
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    const columns = [
        {
            title: 'Posted time',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: 'Title',
            dataIndex: 'title',
            // key: 'title',
            render: (text, record, index) => (
                <div className={'row-title'} onClick={() => {
                    console.log('click title');
                    setSpinnerHide(false);
                    router.push('/article/[id]', `/article/${record.key}`);
                }}>
                    {text}
                </div>
            ),
        }, {
            title: 'Comments',
            dataIndex: 'comments',
            key: 'comments',
            render: (text, record, index) => {
                if (!record.comments){
                    return (0)
                }else{
                    return record.comments.length;
                }
            }
        }, {
            title: 'Category',
            dataIndex: 'selectedFolder',
            render: selectedFolder => (
                <Tag color="default">{selectedFolder}</Tag>
            ),
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <a onClick={() => {setSpinnerHide(false); router.push('/editor/[id]', `/editor/${record.key}`);}}>Edit</a>
                    <a onClick={() => showConfirm(record)} >Delete</a>
                </Space>
            ),
        },
    ];



    return(
        <div className={'manage-page'}>
            <Head>
                <title>Manage</title>
            </Head>
            <WebHeader/>
            <LargeSpinner spinnerHide={spinnerHide}/>
            <div className={'table-container'}>
                <Table
                    columns={columns}
                    dataSource={tableSource}
                    pagination={tableSource.length > 10}
                />
            </div>

        </div>
    );
};


export default Manage
