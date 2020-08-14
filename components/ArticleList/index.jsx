import React, { useState, useEffect } from 'react'
import {Layout, Row, Col, List, Empty} from 'antd'
import Left from "../layout/header/header-left";
import Right from "../layout/header/header-right";
import './article-list.module.scss'
// import { getArticleList } from '@/actions/article'
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from 'next/router';
import { getArticleListOnce } from "@/actions/article";
import Link from "next/link";
import LargeSpinner from "@/components/LargeSpinner";

const imgCommPath = '/static/images/';


const ArticleList = (props) => {
    const {setSpinnerHide, articleList, emptyAlert} = props;
    // const articleListObj = useSelector(state => state.article.articleList);
    // const [spinnerHide, setSpinnerHide] = useState(false);
    // const [pageLoaded, setPageLoaded] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const defaultBanner ='/static/images/default_banner3.png';
    console.log('we are in article list, articleList:');
    console.log(articleList);

    const clickArticleHandler = ( key ) => {
        setSpinnerHide(false);
        // console.log(articleListObj);
        router.push('/article/[id]', `/article/${key}`);
    };


    return(
        <div className={'article-list-component'}>
            {/*<LargeSpinner spinnerHide={spinnerHide}/>*/}
            { articleList?
                    (<ul className={'article-list'}>
                        {Object.keys(articleList).map(key => {
                            console.log(key);
                            console.log(typeof key);
                            return (
                                <li key={key} onClick={console.log(key)}>
                                    {/*<div className={'list-item'} onClick={router.push('/article?id=' + key)}>*/}
                                    <div className={'list-item'} onClick={() => clickArticleHandler(key)}>
                                        <div className={'img-box'}>
                                            <img src={articleList[key].banner? articleList[key].banner : defaultBanner} alt={''}/>
                                        </div>
                                        <div className={'content-box'}>
                                            <div className={'content-main'}>
                                                <h2 className={'title'}>
                                                    {articleList[key].title}
                                                </h2>
                                                <p className={'short-intro'}>
                                                    {articleList[key].summary}
                                                </p>
                                            </div>
                                            <div className={'content-bottom'}>
                                                <div className={'left'}>
                                                    <span className={'post-time'}>{articleList[key].time}</span>
                                                </div>
                                                <div className={'right'}>
                                                    <div className={'comment-icon'}>
                                                        <svg className="icon" width="14px" height="14px"
                                                             viewBox="0 0 1024 1024" version="1.1"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M883.712 22.528H140.288C69.12 22.528 11.776 79.872 11.776 151.04v507.904c0 70.656 57.856 128.512 128.512 128.512h392.704l201.216 201.216c8.192 8.192 19.456 12.288 30.208 12.288 10.752 0 22.016-4.096 30.208-12.288 16.896-16.896 16.896-44.032 0-60.416l-205.312-205.312c-13.312-13.312-37.376-20.992-56.832-20.992H126.976c-23.552 0-36.864-18.944-36.864-43.008v-517.12c0-23.552 18.944-43.008 43.008-43.008h760.32c23.552 0 43.008 18.944 43.008 43.008v517.12c0 23.552-18.944 43.008-43.008 43.008h-106.496c-23.552 0-43.008 18.944-43.008 43.008 0 23.552 18.944 43.008 43.008 43.008h97.28c70.656 0 128.512-57.856 128.512-128.512V151.04c-0.512-70.656-58.368-128.512-129.024-128.512z"
                                                                fill="#333333"/>
                                                        </svg>
                                                    </div>
                                                    <span className={'comment-count'}>
                                            {articleList[key].commentNumber}
                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )})}
                    </ul>)
                    :
                    (<div className={'empty-box'}>
                        <Empty
                            description={
                                <span>{emptyAlert}</span>
                            }
                        />
                    </div>)
            }
        </div>
    )
};

export default ArticleList
