import React from 'react'
import { Collapse } from 'antd';
function callback(key) {
    console.log(key);
  }
  
  const text = `
  ss
  `;
const { Panel } = Collapse;
function CheckBox() {
    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="지역별 케이크" key="1">
                <p>{text}</p>
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
