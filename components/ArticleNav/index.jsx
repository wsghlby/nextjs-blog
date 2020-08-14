import React, { useEffect, useState } from 'react'
import { Anchor } from 'antd'
import { user } from '@/public/static/website-data/data'

// const logo = require('/static/images/avatar.jpg');
const { Link } = Anchor;

const ArticleNav = ({navList}) => {
    const [targetOffset, setTargetOffset] = useState(undefined);
    const [offsetTop, setOffsetTop] = useState(undefined);
    useEffect(() => {
        setTargetOffset(150);
        setOffsetTop(window.innerHeight * 0.33);
    }, []);
    const renderLink = ({ href, title, children }) => {
        console.log(navList);
        return (
            <Link key={href} href={href} title={title}>
                {children.length > 0 && children.map(sub => renderLink(sub))}
            </Link>
        )
    };
    return (
        <Anchor targetOffset={targetOffset} offsetTop={offsetTop}>
        {navList.map(renderLink)}
    </Anchor>)

};

export default ArticleNav
