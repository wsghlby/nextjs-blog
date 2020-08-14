import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {Button, Row, Col, Empty} from 'antd'
import WebHeader from '@/components/layout/header'
import ArticleList from '@/components/ArticleList'

import {useDispatch, useSelector} from "react-redux";
import LargeSpinner from "@/components/LargeSpinner";
import CategoryList from "@/components/CategoryList";
import './category.module.scss'


// {
//     xs: '480px',
//     sm: '576px',
//     md: '768px',
//     lg: '992px',
//     xl: '1200px',
//     xxl: '1600px',
// }

const responsiveLeft =   { xxl: 5, xl: 5, lg: 5, md: 24, xs: 24 };
const responsiveMiddle = { xxl: 19, xl: 19, lg: 19, md: 24, xs: 24 };
// const responsiveRight =  { xxl: 4, xl: 4, lg: 0, md: 0, xs: 0 };


const Category = () => {
    const articleListObj = useSelector(state => state.article.articleList);
    const folderList = useSelector(state => state.folder.foldersList);
    const [spinnerHide, setSpinnerHide] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [folderArticleObj, setFolderArticleObj] = useState({});
    const [articleList, setArticleList] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleFolderClick = (folder) => {
        if (selectedFolder !== folder) {
            setSelectedFolder(folder);
            if (folderArticleObj[folder].count === 0){
                setArticleList(null);
            } else {
                setArticleList(folderArticleObj[folder].articleListObj);
            }
        }
    };

    const toCategoryList = {
        handleFolderClick,
        folderArticleObj
    };

    const toArticleList = {
        setSpinnerHide,
        articleList: articleList,
        emptyAlert: `No article found in category: ${selectedFolder}`
    };

    useEffect(() => {
        const tempObj = {};
        for (const folder of folderList) {
            tempObj[folder] = {count: 0, articleListObj: {}};
        }
        for (const key in articleListObj) {
            if(articleListObj.hasOwnProperty(key)) {
                const folder = articleListObj[key].selectedFolder;
                const tempListObj = tempObj[folder];
                tempListObj.count = tempListObj.count + 1;
                tempListObj.articleListObj[key] = articleListObj[key];
            }
        }
        setFolderArticleObj(tempObj);

        setPageLoaded(true);
        setSpinnerHide(true);
    }, []);

    return(
        <div className={'category-page'}>
            <Head>
                <title>Category</title>
            </Head>
            <WebHeader menuKey={'category'} />
            <LargeSpinner spinnerHide={spinnerHide}/>
            {pageLoaded ? (
                <div className={'body-container'}>
                    <Row>
                        <Col {...responsiveLeft}>
                            <div className={'category-list-box'}>
                                <CategoryList {...toCategoryList} />
                            </div>
                        </Col>
                        <Col {...responsiveMiddle}>
                            { selectedFolder ? (
                                <ArticleList {...toArticleList} />
                            ) : (
                                <div className={'empty-box'}>
                                    <Empty
                                        description={
                                            <span>Please select a category to load article</span>
                                        }
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            ) : (
                <></>
            )}

        </div>
    )};


export default Category
// export default connect((state) => state)(Category)
