import React, { useState, useEffect } from 'react'
import {Layout, Row, Col, List, Empty} from 'antd'
import Left from "../layout/header/header-left";
import Right from "../layout/header/header-right";
import './category-list.module.scss'
// import { getArticleList } from '@/actions/article'

const imgCommPath = '/static/images/';


const CategoryList = (props) => {
    const {handleFolderClick, folderArticleObj} = props;
    // const folderList = useSelector(state => state.folder.foldersList);
    const [selectedItem, setSelectedItem] = useState(null);
    console.log('CategoryList');
    // console.log(folderArticleMap);
    console.log(folderArticleObj);

    const categoryClickHandle = (key) => {
        console.log(key);
        setSelectedItem(key);
        handleFolderClick(key);
    };

    return(
        <div className={'category-list-component'}>
            { folderArticleObj?
                (<div className={'category-list-container'}>
                    <div className={'category-list-header'}>
                        <span>CATEGORIES</span>
                    </div>
                    <ul className={'category-list'}>
                        {Object.keys(folderArticleObj).map(key => {
                            return(
                                <li key={key}
                                    className={'category-list-item ' + (
                                        selectedItem === key ? 'category-selected' : ''
                                    )}
                                    onClick={() => categoryClickHandle(key)}
                                >
                                    <div className={'item-box'}>
                                        <span className={'category-count'}>{folderArticleObj[key].count}</span>
                                        <span className={'category-name'}>{key}</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>)
                :
                (<div className={'empty-box'}>
                    <Empty
                        description={
                            <span>No folder</span>
                        }
                    />
                </div>)
            }
        </div>
    )
};


// <div className={'category-list'}>
//
// </div>

// {[...folderArticleMap.keys()].forEach( (folder) => {
//     console.log('iterate');
//     console.log(folder);
//     console.log(folderArticleMap.get(folder));
//     // return <li key={folder} onClick={() => handleFolderClick(folder)}>
//     //         <div className={'folder-container'}>
//     //         {folder} - {obj.count}
//     //         </div>
//     //     </li>
//     return <div className={'category-item'}>
//         {/*{folder} - {folderArticleMap.get(folder).count}*/}
//         {folder}
//     </div>
//
// })}
//
// {/*{[...folderArticleMap].forEach(([folder, obj]) => (*/}
// {/*       <li> li </li>*/}
// {/*    )*/}
// {/*)}*/}

export default CategoryList
