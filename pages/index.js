import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button, Row, Col } from 'antd'
import WebHeader from '../components/layout/header'
import SideBar from '../components/layout/sidebar/home-left-sidebar'
import ArticleList from '../components/ArticleList'
import './home.scss'
import {useDispatch, useSelector} from "react-redux";
import {getArticleListOnce} from "@/actions/article";
import LargeSpinner from "@/components/LargeSpinner";
import {getFolderList} from "@/actions/folder-list";
import {getCurrUser} from "@/actions/auth";

import {connect} from "react-redux";


const responsiveLeft =   { xxl: 5, xl: 5, lg: 5, md: 0, xs: 0 };
const responsiveMiddle = { xxl: 19, xl: 19, lg: 19, md: 24, xs: 24 };
// const responsiveRight =  { xxl: 4, xl: 4, lg: 0, md: 0, xs: 0 };


const Home = () => {
    const articleListObj = useSelector(state => state.article.articleList);
    const [spinnerHide, setSpinnerHide] = useState(true);
    // const [listLoaded, setListLoaded] = useState(false);
    // const [articleList, setArticleList] = useState(articleListObj);
    // const dispatch = useDispatch();
    // useEffect( () => {
    //     if (!articleListObj) {
    //         dispatch(getArticleListOnce()).then( () => {
    //             // setListLoaded(true);
    //             setSpinnerHide(true);
    //             setArticleList(articleListObj);
    //             setListLoaded(true);
    //             // setSpinnerHide(true);
    //         } )
    //     }else{
    //         setSpinnerHide(true);
    //         setListLoaded(true);
    //     }
    // }, []);

    return(
    <div className={'home'}>
        <Head>
            <title>Home</title>
        </Head>
        <WebHeader menuKey={'home'} />
        <LargeSpinner spinnerHide={spinnerHide}/>
        <div className={'body-container'}>
            <Row>
                <Col {...responsiveLeft}>
                    <div className={'sidebar-container'}>
                        <SideBar />
                    </div>
                </Col>
                <Col {...responsiveMiddle}>
                    {/*{listLoaded ? (*/}
                    {/*    <ArticleList setSpinnerHide={setSpinnerHide} articleList={articleList}/>*/}
                    {/*) : (*/}
                    {/*    <></>*/}
                    {/*)}*/}
                    <ArticleList setSpinnerHide={setSpinnerHide} articleList={articleListObj}/>
                </Col>
                {/*<Col {...responsiveRight}>*/}
                {/*    <SideBar />*/}
                {/*</Col>*/}

            </Row>
        </div>
    </div>
)};



export default connect((state) => state)(Home)
