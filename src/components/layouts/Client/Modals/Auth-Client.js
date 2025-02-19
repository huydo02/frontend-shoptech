// import React, { useState } from 'react'

// const ModalAuthClient = () => {
//     const [modal, setModal] = useState(false);
//     const [modalLogin, setModalLogin] = useState(false);
//     const [modalRegister, setModalregister] = useState(false);

//     function ModalLogin() {
//         setModalLogin(!modalLogin);
//         setModal(true);
//         setModalregister(false);

//     }
//     function ModalRegister() {
//         setModalregister(!modalRegister);
//         setModal(true);
//         setModalLogin(false);

//     }
//     function closeModal() {
//         setModal(false);
//         setModalLogin(false);
//         setModalregister(false);
//     }
//     return (
//         <>
//             <div className={"modal" + (modal === false ? "d-none" : "")}>
//                 <div className="modal-dialog modal-dialog-centered modal-md">
//                     <div className={"content-modal-login " + (modalLogin === false ? "d-none" : "")}>
//                         <div className="modal-header">
//                             <span className="title-modal">đăng nhập</span>
//                             <button onClick={() => { closeModal() }} id="close-modal-login">
//                                 <span className="material-symbols-outlined">
//                                     close
//                                 </span>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             <h1 id="errors-login"></h1>
//                             <form action="{{ route('user.login') }}" method="POST" id="login">
//                                 @csrf
//                                 <div className="input-group">
//                                     <input type="email" className="text-field" name="email" id="email" required />
//                                     <label htmlFor="" className="labelline">Email đăng nhập</label>
//                                 </div>
//                                 <div className="input-group">
//                                     <input type="password" className="text-field" id="password" name="password" required />
//                                     <label htmlFor="" className="labelline">Mật khẩu</label>
//                                     <a href="" id="eye" className="eye">
//                                         <span className="material-symbols-outlined eye-open">
//                                             visibility
//                                         </span>
//                                     </a>
//                                 </div>
//                                 <div className="input-group">
//                                     <a href="" className="forgot-password">Quên mật khẩu?</a>
//                                 </div>
//                                 <button type="submit" className="btn-login">Đăng nhập</button>
//                             </form>
//                             <div className="line">
//                                 <span>
//                                     Hoặc đăng nhập bằng
//                                 </span>
//                             </div>
//                             <div className="btn-social-list">
//                                 <button type="button" className="btn-gg">
//                                     <i className="fa-brands fa-google"></i>
//                                     <span>Google</span>

//                                 </button>
//                                 <button type="button" className="btn-fb">
//                                     <i className="fa-brands fa-facebook-f"></i>
//                                     <span>Facebook</span>

//                                 </button>
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <span>Bạn chưa có tài khoản?<button onClick={() => ModalRegister()} id="show-signup">Đăng ký ngay.</button></span>
//                         </div>
//                         {/* {{-- form đăng ký --}} */}

//                     </div>
//                     <div className={"content-modal-register " + (modalRegister === false ? "d-none" : "")}>
//                         <div className="modal-header">
//                             <span className="title-modal">đăng ký</span>
//                             <button onClick={() => { closeModal() }} id="close-modal-login">
//                                 <span className="material-symbols-outlined">
//                                     close
//                                 </span>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             <h1 id="errors-register"></h1>
//                             <form action="{{ route('user.register') }}" method="POST" id="register">
//                                 @csrf
//                                 <div className="input-group">
//                                     <input type="text" className="text-field" name="name" id="name_register" required />
//                                     <label htmlFor="" className="labelline">Họ và tên</label>

//                                 </div>
//                                 <div className="input-group">
//                                     <input type="Email" className="text-field" name="email" id="email_register" required />
//                                     <label htmlFor="" className="labelline">Email</label>

//                                 </div>
//                                 <div className="input-group">
//                                     <input type="password" className="text-field" id="password_signup" name="password" required />
//                                     <label htmlFor="" className="labelline">Mật khẩu</label>
//                                     <a href="" id="eye" className="eye">
//                                         <span className="material-symbols-outlined eye-open">
//                                             visibility
//                                         </span>
//                                     </a>

//                                 </div>
//                                 <div className="input-group">
//                                     <input type="password" className="text-field" id="password_confirmation"
//                                         name="password_confirmation" required />
//                                     <label htmlFor="" className="labelline">Xác nhận mật khẩu</label>

//                                 </div>
//                                 <button type="submit" className="btn-login">Tạo tài khoản</button>
//                             </form>
//                             <div className="line">
//                                 <span>
//                                     Hoặc đăng ký bằng
//                                 </span>
//                             </div>
//                             <div className="btn-social-list">
//                                 <button type="button" className="btn-gg">
//                                     <i className="fa-brands fa-google"></i>
//                                     <span>Google</span>

//                                 </button>
//                                 <button type="button" className="btn-fb">
//                                     <i className="fa-brands fa-facebook-f"></i>
//                                     <span>Facebook</span>

//                                 </button>
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <span>Bạn đã có tài khoản?<button onClick={() => ModalLogin()} id="show-login">Đăng nhập ngay.</button></span>
//                         </div>
//                         {/* {{-- form đăng ký --}} */}

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ModalAuthClient