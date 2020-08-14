import {Col, Layout, Menu, Row} from "antd";
import React from "react";
import './editor-header.module.scss'

// const responsiveLeft =   { xxl: 5, xl: 5, lg: 5, sm: 0, xs: 0 };
// const responsiveRight =  { xxl: 19, xl: 19, lg: 19, sm: 24, xs: 24 };
const Header = Layout.Header;

const EditorHeader = (props) => {
    const { setPreview, menuKey, setMenuKey } = props;
    return(
        <div className={'editor-header-component'}>
            <Header className={"blog-header"}
                    style={{padding: '0 60px'}}>
                <div className={'editor-menu-container'}>
                    <Menu mode="horizontal" selectedKeys={[menuKey]}>
                        <Menu.Item key="markdown" onClick={() => {setPreview(false); setMenuKey('markdown');}}>
                            <span>MarkDown</span>
                        </Menu.Item>
                        <Menu.Item key="preview" onClick={() => {setPreview(true); setMenuKey('preview');}}>
                            <span>Preview</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>
        </div>
    )
};

export default EditorHeader
