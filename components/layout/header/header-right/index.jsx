import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Menu, Dropdown, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import SignModal from "./SignModal"
import { useRouter } from 'next/router';
import { user } from '@/public/static/website-data/data'
import { logout, getCurrUser } from '@/actions/auth'
import './header-right.module.scss';
import LargeSpinner from "@/components/LargeSpinner";

// import { BLOG_NAME } from '@/config'

const HeaderRight = () => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.auth.username);
    const admin = useSelector(state => state.auth.admin);
    const login = useSelector(state => state.auth.login);
    console.log('user-info');
    console.log(login);
    const router = useRouter();
    // const { username, role } = userInfo;
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('login');
    const [load, setLoad] = useState(true);
    const [spinnerHide, setSpinnerHide] = useState(true);
    const finish = () => {
        setVisible(false);
    };
    const commonPath = '/static/images/';

    useEffect(() => {
        console.log(login);
        if (!login) {
            dispatch(getCurrUser()).then(setLoad(true));
        }else{
            setLoad(true);
        }
    }, []);



    const MenuOverLay = (
        <Menu>
            {admin && (
                <Menu.Item>
                    {/*<span onClick={e => bus.emit('openUploadModal')}>导入文章</span>*/}
                    <div className={'write-menu-box'}
                         onClick={() => {setSpinnerHide(false); router.push('/editor');}}>
                        write
                    </div>
                </Menu.Item>
            )}
            {admin && (
                <Menu.Item>
                    <div className={'write-menu-box'}
                         onClick={() => {setSpinnerHide(false); router.push('/manage');}}>
                        manage
                    </div>
                    {/*<span onClick={e => props.history.push('/admin')}>后台管理</span>*/}
                </Menu.Item>
            )}
            <Menu.Item>
                <span className='user-logout' onClick={e => {dispatch(logout()); console.log('click logout');}}>
                  Logout
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={'header-right-component'}>
            <LargeSpinner spinnerHide={spinnerHide}/>
            <div className={'header-userInfo ' + (load? 'show': 'hide')}>
                {login ? (
                    // <div className={'user-avatar'}>
                        <Dropdown overlay={ MenuOverLay } placement="bottomCenter" arrow>
                            {admin? (
                                <img src={commonPath + user.avatar} alt=''/>
                                ):(
                                <img src={commonPath + 'defaultavatar.svg'} alt=''/>
                            )}
                            {/*<Button>bottomCenter</Button>*/}
                        </Dropdown>
                    // </div>
                    )
                    : (
                        <>
                            <Button
                                ghost
                                type='primary'
                                size='small'
                                style={{ marginRight: 20 }}
                                onClick={e => {setType('register');
                                setVisible(true)}}>
                                Register
                            </Button>
                            <Button
                                ghost
                                type='primary'
                                size='small'
                                onClick={e => {setType('login');
                                setVisible(true)}}>
                                Login
                            </Button>

                            <SignModal type={type} finish={finish} visible={visible} />
                        </>
                    )}
            </div>
            <div className={'spinner ' + (load? 'hide': 'show')}>
                <Spin />
            </div>
        </div>
    );
};

export default HeaderRight
