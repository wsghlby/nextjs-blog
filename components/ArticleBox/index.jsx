import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button, Row, Col } from 'antd'
import ReactMarkdown from 'react-markdown'
import WebHeader from '../../components/layout/header'
import SideBar from '../../components/layout/sidebar/article-sidebar'
import CommentArea from '@/components/CommentArea'
import ArticleNav from '@/components/ArticleNav'
import './article-box.module.scss'

const responsiveLeft =   { xxl: 5, xl: 5, lg: 3, sm: 0, xs: 0 };
const responsiveMiddle = { xxl: 14, xl: 14, lg: 18, sm: 24, xs: 24 };
const responsiveRight =  { xxl: 5, xl: 5, lg: 3, sm: 0, xs: 0 };



const ArticleBox = ({articleObj, id, preview}) => {
    const { content, title, banner, time, selectedFolder } = articleObj;

    const [scrollTop, setScrollTop] = useState(true);
    const [url, setUrl] = useState(banner? banner :'/static/images/default_banner3.png');
    let navList = [];
    let keyN = 0;

    const Banner = () => {
        if ( banner ) {
            if ( typeof banner === 'string' ) {
                setUrl(banner);
            } else {
                const reader = new FileReader();
                reader.addEventListener("load",  () => {
                    // convert image file to base64 string
                    let tempUrl = reader.result;
                    setUrl(tempUrl);
                }, false);
                reader.readAsDataURL(banner);
            }
        } else {
            setUrl('/static/images/default_banner3.png');
        }
        return ( <img className={'banner'} src={ url } alt=''/> )
    };

    const onScroll = e => {
        // console.log('window.scrollY' + window.scrollY);
        // console.log('window.screenY' + window.innerHeight);
        if (window.scrollY > 434 - (window.innerHeight * 0.3)) {
            console.log('go down');
            return setScrollTop(false);
        } else {
            return setScrollTop(true);
        }
    };


    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);


    const flatten = (text, child) => {
        return typeof child === 'string'
            ? text + child
            : React.Children.toArray(child.props.children).reduce(flatten, text);
    };
    /**
     * HeadingRenderer is a custom renderer
     * It parses the heading and attaches an id to it to be used as an anchor
     */
    const HeadingRenderer = props => {
        const children = React.Children.toArray(props.children);
        const text = children.reduce(flatten, '');
        const slug = text.toLowerCase().replace(/\W/g, '-') + keyN;
        if (props.level === 1) {
            navList.push({
                level: 1,
                title: text,
                href: `#${slug}`,
                children: [],
            })
        } else if (props.level === 2) {
            const tempObj = {
                level: 2,
                title: text,
                href: `#${slug}`,
                children: [],
            };
            if (navList.length > 0) {
                navList[navList.length-1].children.push(tempObj);
            } else {
                navList.push(tempObj);
            }
        }
        return React.createElement('h' + props.level, { id: slug }, props.children);
    };



    return(
        <div className={'article-box-component'}>
            <div className={'article-header'}>
                <div className={'gray-box'}>
                </div>
                <div className={'article-banner'} id={'banner-top'}>
                    <Banner/>
                </div>
            </div>
            <div className={'article-content'}>
                <Row>
                    <Col {...responsiveLeft} >
                        {preview ?
                            (<></>)
                            :
                            (<div className={'left-sidebar ' + (scrollTop? 'top': 'down')}>
                            <SideBar/>
                            </div>)
                        }
                    </Col>
                    <Col {...responsiveMiddle}>
                        <div className={'article-col'}>
                            <div className={'article-title-box'}>
                                <div className={'title'}>{title}</div>
                                <div className={'category-time-box'}>
                                    <div className={'category-icon-container'}>
                                        <div className={'category-icon'}>
                                            <svg  height="16pt" width="16pt" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M359.944 64.076H189.987c-68.57 0-125.998 56.888-125.998 125.46v169.956c0 68.57 57.427 123.117 125.998 123.117h292.535V189.536c0-68.571-54.007-125.46-122.578-125.46z m61.18 357.134H189.986c-34.286 0-63.576-27.433-63.576-61.718V189.536c0-34.286 29.29-63.038 63.576-63.038h169.956c34.286 0 61.18 28.752 61.18 63.038V421.21zM836.65 64.076H666.693c-68.57 0-125.843 56.888-125.843 125.46v293.073h295.8c68.57 0 122.732-54.547 122.732-123.117V189.536c0-68.571-54.161-125.46-122.732-125.46z m60.31 295.416c0 34.285-26.025 61.718-60.31 61.718H602.248V189.536c0-34.286 30.16-63.038 64.445-63.038H836.65c34.286 0 60.31 28.752 60.31 63.038v169.956zM63.99 666.242v169.956c0 68.57 57.426 123.271 125.997 123.271h169.956c68.57 0 122.579-54.7 122.579-123.271v-295.26H189.987c-68.57 0-125.998 56.733-125.998 125.304z m357.133 169.957c0 34.286-26.894 60.85-61.18 60.85H189.987c-34.286 0-63.576-26.564-63.576-60.85V666.242c0-34.286 29.29-63.907 63.576-63.907h231.136V836.2zM836.65 540.937h-295.8v295.26c0 68.571 57.272 123.272 125.843 123.272H836.65c68.57 0 122.732-54.7 122.732-123.271V666.242c0.001-68.57-54.16-125.305-122.731-125.305zM896.96 836.2c0 34.286-26.025 60.85-60.31 60.85H666.693c-34.286 0-64.445-26.564-64.445-60.85V602.335H836.65c34.286 0 60.31 29.621 60.31 63.907v169.957z"  /></svg>
                                        </div>
                                        <div className={'category-detail'}>
                                            {selectedFolder}
                                        </div>
                                    </div>
                                    <div className={'time-container'}>
                                        {time?
                                            (time)
                                            :
                                            (new Date().toISOString().slice(0, 10))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={'article-body-box'}>
                                <ReactMarkdown source={content} escapeHtml={false} renderers={{ heading: HeadingRenderer }}/>
                            </div>
                            {preview ?
                                (<></>)
                                :
                                (<div className={'comments-box'} id={'comments-box'}>
                                        <CommentArea articleObj={articleObj} id={id}/>
                                </div>)
                            }
                        </div>
                    </Col>
                    <Col {...responsiveRight}>
                        {preview?
                            (<></>)
                            :
                            (<div className={'right-sidebar '}>
                                <ArticleNav navList={navList}/>
                            </div>)
                        }
                    </Col>

                </Row>
            </div>
        </div>
    );
};


export default ArticleBox
