import { Button, message } from "antd"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
//import { addToCart } from "../../../../_actions/user_actions"
import { addToReservation } from "../../../../_actions/user_actions"

import ReservationModal from "../../ReservationModal/ReservationModal.js"

function ProductInfo(props) {

	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	}
	const closeModal = () => {
		message.success('This is a success message');
		setModalOpen(false);
	}
	const dispatch = useDispatch()
	const clickHandler = () => {
		//필요한 정보를 Cart 필드에 넣어준다.
		//dispatch(addToCart(props.detail._id))
	}

	return (
		<div>
			
			<br />
			<br />
			<br />
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				<Button size="large" shape="round" type="danger" onClick={clickHandler}>
					찜하기
				</Button>
				<Button size="large" shape="round" type="danger" onClick={openModal}> 예약하기 </Button>
				<ReservationModal open={modalOpen} close={closeModal} header="예약 정보 입력">

				</ReservationModal>
			</div>


		</div>
	)
}

export default ProductInfo
