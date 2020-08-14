import React from "react";

import Editor from '@/components/Editor'


const NewEditor = () => {
    const editorInput = {
        key: null,
        articleObj: {
            title: '',
            content: '',
            summary: '',
            banner: null,
            selectedFolder: '',
        },
        mode: 'new'
    };

    return (
        <div >
            <Editor {...editorInput} />
        </div>
    )
};

export default NewEditor
