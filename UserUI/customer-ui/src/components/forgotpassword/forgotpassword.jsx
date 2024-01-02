import React, { useState } from "react";
import './style.css';
import { Link } from "react-router-dom";

function ForgotPassword() {
   const [email, setEmail] = useState("");
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         // Gọi API để gửi email quên mật khẩu
         const response = await fetch("http://localhost:8080/tai_khoan/quenMatKhau", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchString: email }),
         });

         if (response.ok) {
            setSuccess(true);
            setError(null);
            setTimeout(() => {
               window.location.href = (`/login`);
            }, 2000);
         } else {
            setSuccess(false);
            setError("Gửi mật khẩu mới thất bại. Vui lòng kiểm tra lại địa chỉ email.");
         }
      } catch (error) {
         console.error("Lỗi khi gọi API:", error);
         setSuccess(false);
         setError("Đã xảy ra lỗi khi gửi mật khẩu mới. Vui lòng thử lại sau.");
      }
   };

   return (
       <div className="container">
          <div className="d-flex justify-content-center mt-5">
             <div className="col-md-7">
                <div className="card rounded-0 shadow">
                   <div className="card-body">
                      <h3>Forget Password</h3>
                      {success && (
                          <div className="alert alert-success" role="alert">
                             Mật khẩu mới đã được gửi thành công! Vui lòng kiểm tra email.
                          </div>
                      )}
                      {error && (
                          <div className="alert alert-danger" role="alert">
                             {error}
                          </div>
                      )}
                      <form onSubmit={handleSubmit}>
                         <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Địa chỉ email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
