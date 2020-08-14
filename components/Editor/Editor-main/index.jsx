import React from 'react';
import { Input } from 'antd';
import './editor-main.module.scss';
const { TextArea } = Input;

const EditorMain = (props) => {
    const { content, setContent } = props;
    return (
        <div className={'editor-main-component'}>
            <TextArea className={'textarea'}
                  style={{minHeight: '400px', height: 'calc(100vh - 180px)'}}
                  value={content} onChange={e => setContent(e.target.value)}/>
        </div>
    );
};

export default EditorMain;
