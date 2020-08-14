import React from 'react'
import './header-left.module.scss'
import {user} from "@/public/static/website-data/data";
// import { BLOG_NAME } from '@/config'

const HeaderLeft = () => {
    return (
        <div className={"header-left-component"}>
            <div className={'icon'}>
                <img className={'sidebar-avatar'} src={'/static/images/star-3.svg'} alt={''}/>
            </div>

            <span className={"blog-name"}>WXM-BLOG</span>
        </div>
    );
};

export default HeaderLeft
