import React, { useState, useEffect } from "react";
import { message } from "antd";
import Editor from '@/components/Editor'
import LargeSpinner from "@/components/LargeSpinner";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import { persistor } from '@/redux'


const DynamicEditor = () => {
    const articleListObj = useSelector(state => state.article.articleList);
    const [spinnerHide, setSpinnerHide] = useState(false);
    const [editorInput, setEditorInput] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect( () => {
        // persistor.subscribe(() => {
        //     if (!articleListObj.hasOwnProperty(id)){
        //         message.error('Invalid article id');
        //         router.replace('/');
        //     } else {
        //         const articleObj = articleListObj[id];
        //         console.log(articleObj);
        //         setEditorInput({
        //             id,
        //             mode: 'edit',
        //             input_title: articleObj.title,
        //             input_content: articleObj.content,
        //             input_summary: articleObj.summary,
        //             input_banner: articleObj.banner,
        //             input_folder: articleObj.selectedFolder,
        //         });
        //         setSpinnerHide(true);
        //     }
        // })
        if (!articleListObj.hasOwnProperty(id)){
            message.error('Invalid article id');
            router.replace('/');
        } else {
            const articleObj = articleListObj[id];
            console.log(articleObj);
            setEditorInput({
                id,
                mode: 'edit',
                articleObj,
            });
            setSpinnerHide(true);
        }
    }, []);



    return (
        <div>
            <LargeSpinner spinnerHide={spinnerHide}/>
            {editorInput ?
                (<Editor { ...editorInput }/>)
                :
                (<></>)
            }

        </div>
    );
}

export default DynamicEditor

