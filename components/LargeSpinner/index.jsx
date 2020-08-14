import React from 'react'
import {Spin} from "antd";
import './large-spinner.module.scss'


const LargeSpinner = (props) => {
    const { spinnerHide } = props;
    return (
        <div className={'spinner-component ' + (spinnerHide? 'spinnerHide': '')}>
            <div className={'spinner'}>
                <Spin size="large" />
            </div>
        </div>
    );
};

export default LargeSpinner
