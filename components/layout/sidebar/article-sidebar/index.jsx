import React, { useState, useEffect } from 'react'
import {notification} from 'antd'
import {user} from '@/public/static/website-data/data'
import './article-side.module.scss'

// const logo = require('/static/images/avatar.jpg');
const SideBar = () => {
    const [supportCopy, setSupportCopy] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [onUp, setOnUp] = useState(true);

    const clickShare = () => {
        let copyText = document.getElementById("dummy");
        copyText.type = 'text';
        copyText.select();
        document.execCommand("copy");
        copyText.type = 'hidden';

        notification['success']({
            placement: 'topLeft',
            duration: 3,
            message: 'Website URL Copied to Clipboard',
            description:
                'URL of current website is copied to your clipboard. You could share it with others',
        });
    };

    const scrollToComment = () => {
        document.getElementById('comment-area').scrollIntoView({
            behavior: 'smooth'
        });
    };

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const onScroll = e => {
        // console.log('window.scrollY' + window.scrollY);
        // console.log('window.screenY' + window.innerHeight);
        if (window.scrollY > 0 ) {
            if(onUp) {
                setOnUp(false);
            }
        } else {
            if(!onUp) {
                setOnUp(true);
            }
        }
    };

    useEffect( () => {
        setPageLoaded(true);
        window.addEventListener("scroll", onScroll);
        if (document.queryCommandSupported('copy')) {
            setSupportCopy(true);
        }
    }, []);




    const commonPath = '/static/images/';
    return (
        <div className={'article-sidebar-component'}>
            <aside className={'blog-sidebar'}>
                <img className={'sidebar-avatar'} src={commonPath + user.avatar} alt={''}/>

                <h2 className={'sidebar-user-name'}>{user.name}</h2>


                <div className={'icon-list'}>
                    <div className={'comment-icon'} onClick={scrollToComment}>
                        <svg className="icon" width="20px" height="20px"
                             viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M883.712 22.528H140.288C69.12 22.528 11.776 79.872 11.776 151.04v507.904c0 70.656 57.856 128.512 128.512 128.512h392.704l201.216 201.216c8.192 8.192 19.456 12.288 30.208 12.288 10.752 0 22.016-4.096 30.208-12.288 16.896-16.896 16.896-44.032 0-60.416l-205.312-205.312c-13.312-13.312-37.376-20.992-56.832-20.992H126.976c-23.552 0-36.864-18.944-36.864-43.008v-517.12c0-23.552 18.944-43.008 43.008-43.008h760.32c23.552 0 43.008 18.944 43.008 43.008v517.12c0 23.552-18.944 43.008-43.008 43.008h-106.496c-23.552 0-43.008 18.944-43.008 43.008 0 23.552 18.944 43.008 43.008 43.008h97.28c70.656 0 128.512-57.856 128.512-128.512V151.04c-0.512-70.656-58.368-128.512-129.024-128.512z"
                                fill="#888"/>
                        </svg>
                    </div>
                    {
                        supportCopy && (
                            <div className={'share'} onClick={clickShare}>
                                <svg className="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M509.453838 0a43.312432 43.312432 0 1 1 0 86.624865c-233.582703 0-422.939676 189.384649-422.939676
                                422.939676S275.871135 932.393514 509.453838 932.393514c233.582703 0 422.939676-189.356973
                                422.939676-422.939676a43.312432 43.312432 0 1 1 86.514162 0c0 281.350919-228.102919
                                509.453838-509.453838 509.453838S0 790.804757 0 509.453838 228.102919 0 509.453838 0z
                                m262.227027 216.617514a42.592865 42.592865 0 0 1 60.471351-59.834811l74.585946 74.641297a57.510054
                                57.510054 0 0 1 0 81.421838l-74.585946 74.585946a42.537514 42.537514 0 0
                                1-60.111567-60.166919l12.647783-12.620108h-54.936216c-149.337946 0-200.039784 63.571027-200.039784
                                255.861621 0 23.552-18.985514 42.537514-42.565189 42.537514a42.454486 42.454486 0 0
                                1-42.509838-42.537514c0-237.76173 86.790919-340.936649 285.114811-340.936648h54.880865l-12.952216-12.952216z"
                                        fill="#888"
                                    />
                                </svg>
                            </div>
                        )
                    }

                    {
                        !onUp && (
                            <div className={'up'} onClick={scrollToTop}>
                                <svg version="1.1" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512"  >
                                    <g>
                                        <g>
                                            <path d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
                                        c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659c119.295,0,216.341,97.046,216.341,216.341
                                        S375.275,472.341,256,472.341z"
                                                  fill="#888"/>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M369.227,283.365l-99.148-99.148c-7.734-7.694-20.226-7.694-27.96,0l-99.148,99.148c-6.365,7.416-6.365,18.382,0,25.798
                                        c7.119,8.309,19.651,9.28,27.96,2.161L256,226.256l85.267,85.069c7.734,7.694,20.226,7.694,27.96,0
                                        C376.921,303.591,376.921,291.098,369.227,283.365z"
                                                  fill="#888"/>
                                        </g>
                                    </g>
                                </svg>

                            </div>
                        )
                    }

                </div>


            </aside>
            {pageLoaded && (
                <input id="dummy" name="dummy" type="hidden" value={window.location.href}/>
            )}
        </div>
    );
};

export default SideBar
