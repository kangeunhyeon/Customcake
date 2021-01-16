import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginWithNaver } from "../../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { message } from "antd";
import axios from 'axios';
import NaverLogin from "react-login-by-naver";
function NaverLoginPage(props) {
  
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const dispatch = useDispatch();
  const responseNaver = response => {
    dispatch(loginWithNaver(response)).then(response => {
      console.log(response,"sdfs")
      if (response.payload) {
        window.localStorage.setItem('x_token', response.payload.token);
        window.localStorage.setItem('x_tokenExp', response.payload.tokenExp);
        window.localStorage.setItem('userId', response.payload.userId);
        console.log(response.payload)
        
        message.success(response.payload.msg);
        const request = axios.get(`http://localhost:3000/api/users/naver/callback`)
        .then(response => response.data);
        console.log(request, ',으느으능');
        return {
            payload: request
        }
        //props.history.push("/api/users/naver/callback");
      } else {
        console.log(response.payload,'asd')
        setFormErrorMessage('Check out your Account or Password again')
      }
    });
  };
  return (
    <div className="pb-3">
      {formErrorMessage && (
        <label>
          <p
            style={{
              color: "#ff0000bf",
              fontSize: "0.7rem",
              border: "1px solid",
              padding: "1rem",
              borderRadius: "10px"
            }}
          >
            {formErrorMessage}
          </p>
        </label>
      )}
      <NaverLogin 
        clientId="qTbOqBYovcn5ShbkqgHR"
        callbackUrl="http://localhost:3000/api/users/naver"
        render={(props) => <button style={{
          backgroundColor:'lightgreen',
          width: '350px',
          height: '100%',
        }}onClick={responseNaver}>
      </button>}
        onSuccess={(res) => responseNaver(res, 'naver')}
        onFailure={() => console.log('naver login fail')}
      />
    </div>
  );
}

export default withRouter(NaverLoginPage);