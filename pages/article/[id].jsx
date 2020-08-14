import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { Empty } from 'antd';
import WebHeader from '../../components/layout/header'
import ArticleBox from "@/components/ArticleBox";
import { useRouter } from 'next/router';
import './article.module.scss';
import {useDispatch, useSelector} from "react-redux";


const Article = () => {
    const router = useRouter();
    const { id } = router.query;
    const articleListObj = useSelector(state => state.article.articleList);

    console.log('get id!');
    console.log(id);


    return(
        <div className={'article-page'}>
            <Head>
                <title>Article</title>
            </Head>
            <WebHeader/>
            {articleListObj.hasOwnProperty(id) ?
                <div className={'article-box'}>
                    <ArticleBox articleObj={articleListObj[id]} id={id} emptyAlert={'No article, go and write! > w <'}/>
                </div>
                :
                <div className={'empty-box'}>
                    <Empty
                        description={
                            <span>No article found</span>
                        }
                    />
                </div>
            }

        </div>
    );
};


export default Article
