import React, { useState, useEffect } from "react";
import EditorHeader from '@/components/Editor/Editor-header'
import Head from "next/head";
import {Button, Col, Row, Spin} from "antd";
import EditorSidebar from '@/components/Editor/Editor-sidebar'
import EditorMain from "@/components/Editor/Editor-main";
import ArticleBox from "@/components/ArticleBox";
import LargeSpinner from '@/components/LargeSpinner'
import { useSelector, useDispatch } from "react-redux";
import Router , {useRouter}  from 'next/router';

import { getFolderList, updateFolderList } from "@/actions/folder-list"
import { uploadArticle, UpdateArticle } from '@/actions/editor';
import './editor.module.scss'
const responsiveLeft =   { xxl: 6, xl: 6, lg: 6, md: 6, xs: 24 };
const responsiveRight =  { xxl: 18, xl: 18, lg: 18, md: 18, xs: 24 };


const Editor = (props) => {
    const {id,  mode, articleObj} = props;
    const {
        title:input_title,
        content:input_content,
        summary: input_summary,
        banner: input_banner,
        selectedFolder: input_folder
    } = articleObj;
    const dispatch = useDispatch();
    let newDate = new Date();
    const folderList = useSelector(state => state.folder.foldersList);
    const [title, setTitle] = useState(input_title);
    const [content, setContent] = useState(input_content);
    const [preview, setPreview] = useState(false);
    const [summary, setSummary] = useState(input_summary);
    const [banner, setBanner] = useState(input_banner);
    const [menuKey, setMenuKey] = useState('markdown');
    // const [folder, setFolder] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(input_folder);
    const [spinnerHide, setSpinnerHide] = useState(true);
    // const router = useRouter();

    const router = useRouter();


    const handleArticle = () => {
        setSpinnerHide(false);
        const newArticle = { ...articleObj, title, summary, content, selectedFolder, banner };
        if (mode === 'edit'){
            const updates = {};
            updates['/articleList/' + id] = newArticle;
            dispatch(UpdateArticle(updates)).then(() => {
                router.back();
                router.replace('/');
            }).catch((error) => {
                console.log(error);
            });
        } else if (mode === 'new') {
            dispatch(uploadArticle(newArticle)).then(() => {
                router.back();
                router.replace('/');
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    const handleSubmit = () => {
        // {title, summary, content, folder, banner}
        setSpinnerHide(false);
        const newArticle = {title, summary, content, selectedFolder, banner};
        if (!folderList.includes(selectedFolder)) {
            dispatch(updateFolderList(selectedFolder)).then(() => {
                handleArticle();
            }).catch((error) => {
                console.log(error);
            })
        } else {
            handleArticle();
        }

        console.log(newArticle);
        // dispatch(uploadArticle(articleInsert));
        console.log('submitting');
        // dispatch(updateFolderList('DevOps'));
    };

    const toMenu = {
        menuKey, setMenuKey, setPreview
    };
    const toSidebar = {
        mode,
        setSpinnerHide,
        handleSubmit,
        title, setTitle,
        summary, setSummary,
        setBanner,
        selectedFolder, setSelectedFolder
    };
    const toMain = {
        content, setContent,
    };
    const toPreview = {
        ...articleObj,
        banner,
        title,
        content,
        selectedFolder,
    };

    return (
        <div>
            <LargeSpinner spinnerHide={spinnerHide}/>
            <div className={'editor-component'}>
                <Head>
                    <title>Editor</title>
                </Head>
                <EditorHeader { ... toMenu }/>
                <div className={'body-container'}>
                    <div className={'editor-body ' + (preview? 'hide': 'show')}>
                        <Row>
                            <Col { ...responsiveLeft }>
                                <div className={'sidebar'}>
                                    <EditorSidebar { ...toSidebar }/>
                                </div>
                            </Col>
                            <Col { ...responsiveRight }>
                                <div className={'main'}>
                                    <EditorMain { ...toMain }/>
                                </div>
                            </Col>

                        </Row>
                    </div>
                    <div className={preview? 'show': 'hide'}>
                        <ArticleBox  articleObj={toPreview} preview={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor
