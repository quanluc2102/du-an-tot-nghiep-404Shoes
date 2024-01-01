import React from "react";
import './style.css';
import { Link } from "react-router-dom";

function ForgotPassword() {
   return (
       <div className="container">
          <div className="d-flex justify-content-center mt-5">
             <div className="col-md-7">
                <div className="card rounded-0 shadow">
                   <div className="card-body">
                      <h3>Forget Password</h3>
                      <form>
                         <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Địa chỉ email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                            <small id="emailHelp" className="form-text text-muted">
                               Chúng tôi sẽ gửi mật khẩu mới cho bạn vào email(sau khi nhận được mật khẩu mới vui lòng tiến hành đăng nhập và đổi mật khẩu)
                            </small>
                         </div>
                         <button type="submit" className="btn btn-primary">
                            Gửi mật khẩu mới
                         </button>
                      </form>
                   </div>
                </div>
             </div>
          </div>
       </div>
   );
}

export default ForgotPassword;
