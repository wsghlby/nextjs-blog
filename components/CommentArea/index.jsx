import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button, Row, Col, Form, Input, List, Comment, Avatar, message } from 'antd'
import ReactMarkdown from 'react-markdown'
import WebHeader from '../../components/layout/header'
import SideBar from '../../components/layout/sidebar/article-sidebar'
import {useDispatch, useSelector} from "react-redux";
import './comment-area.module.scss'
import {updateFolderList} from "@/actions/folder-list";
import {UpdateArticle} from "@/actions/editor";



const { TextArea } = Input;

const CommentEditor = (props) => {
    const { onChange, onSubmit, submitting, value } = props;
    return(
        <Form>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button className={'button'} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </Form>
    )
};

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => (<Comment {...props} />)}
    />
);


const CommentArea = (props) => {
    const { articleObj, id } = props;
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(articleObj.comments);
    const [commentNumber, setCommentNumber] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const username = useSelector(state => state.auth.username);
    const admin = useSelector(state => state.auth.admin);
    const login = useSelector(state => state.auth.login);
    const dispatch = useDispatch();
    const avatarCommonPath = '/static/images/';

    // const comments = [
    //     {
    //         author: 'Han Solo',
    //         avatar: avatarCommonPath + 'avatar.jpg',
    //         content: <p>hello</p>,
    //         datetime: new Date().toDateString(),
    //     }
    // ];

    useEffect( () => {
        if (articleObj.comments) {
            setCommentNumber(articleObj.comments.length);
        }
    }, []);



    const handleSubmit = () => {
        if (!newComment) {
            message.warning('Comment can\'t be empty');
            return;
        }

        setTimeout(() => {
            setSubmitting(true);
            const newCommentObj = {
                author: username,
                avatar: '/static/images/' + (admin? 'avatar.jpg': 'defaultavatar.svg'),
                content: newComment,
                datetime: new Date().toISOString().slice(0, 10),
            };
            let newCommentList;
            if (commentList) {
                newCommentList = [...commentList, newCommentObj];
            } else {
                newCommentList = [newCommentObj]
            }
            const newArticle = {...articleObj, comments: newCommentList};
            const updates = {};
            updates['/articleList/' + id] = newArticle;
            console.log('editor updates');
            console.log(updates);
            dispatch(UpdateArticle(updates)).then(() => {
                setCommentList( newCommentList );
                setCommentNumber(newCommentList.length);
                setSubmitting(false);
            }).catch((error) => {
                console.log(error);
            });
        }, 100);
    };

    const handleChange = e => {
        setNewComment(e.target.value)
        // this.setState({
        //     value: e.target.value,
        // });
    };


    return (
        <div className={'comment-area-component'} id={'comment-area'}>
            <div className={'comment-area-header-container'}>
                <h3 className={'comment-area-header'}>{ commentNumber + (commentNumber <= 1? ' Comment': ' Comments') }</h3>
            </div>
            {/*<Card title={ commentNumber + (commentNumber <= 1? 'Comment': 'Comments') }*/}
            {/*      bordered={false} style={{ width: '100%' }}>*/}
                {login?
                    (<Comment
                        avatar={
                            <Avatar
                                src={avatarCommonPath + (admin? 'avatar.jpg': 'defaultavatar.svg')}
                                alt={username}
                            />
                        }
                        content={
                            <CommentEditor
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                submitting={submitting}
                                value={newComment}
                            />
                        }
                    />)
                    :
                    // (<div className={'no-login-box'}>Please login before comment</div>)
                    (<div className={'no-login-box'}><span>! Please login before comment</span></div>)
                }
            <div className={'comment-list'}>
            {commentList && commentList.length > 0 && <CommentList comments={commentList} />}
            {/*</Card>*/}
            </div>
        </div>
    );
};


export default CommentArea
