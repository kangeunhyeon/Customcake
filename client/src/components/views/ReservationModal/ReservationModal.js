import React, { useState } from 'react';
import "./ReservationModal.css";
import { Input, Button, DatePicker, TimePicker, Row, Col, Select } from 'antd';
import FileUpload from '../../utils/FileUpload';

const ReservationModal = (props) => {

    
    const { Option } = Select;
    const [images, setImages] = useState([]);
    const { TextArea } = Input;
    const updateImages = (newPath) => {
        setImages(newPath);
    }

    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            { open ? (
                <section>
                    <header>
                        {header}
                        <Button className="close" onClick={close}> &times; </Button>
                    </header>
                    <main>
                        <Input.Group compact>
                            <Input style={{ width: '18%' }} defaultValue="주문자" />
                            <Input style={{ width: '50%' }}
                                name="name"
                                // className="loginId"
                                type="text"
                            // onChange={this.loginHandler}
                            />
                        </Input.Group>

                        <div style={{ margin: '20px 0' }} />
                        <Input.Group size="연락처">
                            <Row gutter={10}>
                                <Col span={4}>
                                    <Select defaultValue="---" style={{ width: '100%' }}>
                                        <Option value="jack">010</Option>
                                        <Option value="lucy">011</Option>
                                        <Option value="Yiminghe">012</Option>
                                    </Select>
                                </Col>

                                <Col span={4}>
                                    <Input placeholder="0000" />
                                </Col>
                                <Col span={4}>
                                    <Input placeholder="0000" />
                                </Col>
                            </Row>
                        </Input.Group>

                        <div style={{ margin: '20px 0' }} />
                        <Input.Group compact>
                            <Input style={{ width: '20%' }} defaultValue="예약 날짜" />
                            <DatePicker style={{ width: '50%' }} />
                        </Input.Group>

                        <div style={{ margin: '20px 0' }} />
                        <Input.Group compact>
                            <Input style={{ width: '20%' }} defaultValue="예약 시간" />
                            <TimePicker style={{ width: '50%' }} />
                        </Input.Group>

                        <div style={{ margin: '20px 0' }} />
                        <TextArea
                            // value={value}
                            // onChange={this.onChange}
                            placeholder="요구사항"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />

                        <div style={{ margin: '20px 0' }} />
                        <FileUpload style={{ width: '30%' }}
                            refreshFunction={updateImages}
                        />
                        <div style={{ margin: '20px 0' }} />
                        {props.children}
                    </main>
                    <footer>
                        <Button className="close" onClick={close}> OK </Button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}
export default ReservationModal
