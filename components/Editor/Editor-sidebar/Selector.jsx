import React, { useState } from 'react';
import {useSelector} from "react-redux";
import {Divider, Input, message, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const { Option } = Select;

// let index = 0;

const Selector = (props) => {
    const {newItem, setNewItem, selectedFolder, setSelectedFolder } = props;
    // console.log('in selector');
    // console.log(folderList);
    const folderList = useSelector(state => state.folder.foldersList);
    const [itemsList, setItemsList] = useState(folderList);
    // setSelectedFolder(folderList && folderList[0]? folderList[0]: '');
    // dispatch(getFolderList());



    const onNameChange = event => {
        setNewItem(event.target.value);

    };

    const addItem = () => {
        console.log('addItem');
        // console.log([...items, newItem]);
        if (folderList.includes(newItem)) {
            message.warning('Folder already exist');
        }else{
            setItemsList([...folderList, newItem]);
            setSelectedFolder(newItem);
            setNewItem('');
        }
    };

    const selectItem = value => {
        setSelectedFolder(value);
    };

    return (
        <Select
            style={{ width: 240 }}
            placeholder="custom dropdown render"
            onChange={selectItem}
            value={selectedFolder}
            dropdownRender={menu => (
                <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                        <Input style={{ flex: 'auto' }} value={newItem} onChange={onNameChange} />
                        <a
                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                            onClick={addItem}
                        >
                            <PlusOutlined /> Add item
                        </a>
                    </div>
                </div>
            )}
        >
            {itemsList.map(item => (
                <Option key={item}>{item}</Option>
            ))}
        </Select>
    );
};

export default Selector;
