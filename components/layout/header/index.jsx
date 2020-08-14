import React from 'react'
import { Layout, Row, Col } from 'antd'
import Left from './header-left'
import Right from './header-right'
import Middle from './header-middle'
import './header.module.scss'

// const responsiveLeft =   { xxl: 5, xl: 5, lg: 4, sm: 0, xs: 0 };
// const responsiveMiddle = { xxl: 14, xl: 14, lg: 14, sm: 20, xs: 20 };
// const responsiveRight =  { xxl: 5, xl: 5, lg: 4, sm: 4, xs: 4 };

const responsiveLeft =   { xxl: 5, xl: 5, lg: 5, md: 0, xs: 0 };
const responsiveMiddle = { xxl: 19, xl: 19, lg: 19, md: 24, xs: 24 };

const Header = Layout.Header;

const WebHeader = (props) => {
    const { menuKey } = props;
    const toMenu = {
        menuKey
    };
    return(
        <div className={'header-component'}>
            <Header className={"blog-header"} >
                <div className={'header-container'} >
                    <Row>
                        <Col {...responsiveLeft}>
                            <Left />
                        </Col>
                        <Col {...responsiveMiddle}>
                            <div className={'right-container'}>
                                <Middle { ...toMenu } />
                                <Right />
                            </div>
                        </Col>
                        {/*<Col {...responsiveRight}>*/}
                        {/*    <div className={'right-container'}>*/}
                        {/*        <Right />*/}
                        {/*    </div>*/}
                        {/*</Col>*/}
                    </Row>
                </div>
            </Header>
        </div>
    )
};

export default WebHeader
