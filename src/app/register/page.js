"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { registerSuccess, registerFailure, clearMessages, } from "../store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ Ten: "", SDT: "", NgaySinh: "", DiaChi: "", Email: "", GioiTinh: "", MatKhau: "", TenDangNhap: "", confirmPassword: "", Anh: null, });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (success) {
      alert("Bạn đã đăng ký thành công!"); window.location.href = "/login"; dispatch(clearMessages());
    }

    if (error) {
      alert(error); dispatch(clearMessages());
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target; setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, Anh: e.target.files[0] });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      return dispatch(registerFailure("Bạn cần đồng ý với điều khoản."));
    } if (formData.MatKhau.length < 6) {
      return dispatch(registerFailure("Mật khẩu phải có ít nhất 6 ký tự."));
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(formData.MatKhau)) {
      return dispatch(registerFailure("Mật khẩu phải chứa ít nhất một ký tự số, một ký tự chữ hoa và một ký tự đặc biệt."));
    }

    if (formData.MatKhau !== formData.confirmPassword) {
      return dispatch(registerFailure("Mật khẩu và xác nhận mật khẩu không khớp!"));
    }

    const data = new FormData();
    data.append("Ten", formData.Ten);
    data.append("SDT", formData.SDT);
    data.append("NgaySinh", formData.NgaySinh);
    data.append("DiaChi", formData.DiaChi);
    data.append("GioiTinh", formData.GioiTinh);
    data.append("Email", formData.Email);
    data.append("TenDangNhap", formData.TenDangNhap);
    data.append("MatKhau", formData.MatKhau);
    data.append("Anh", formData.Anh);

    try {
      const response = await axios.post("http://localhost:3000/users/register", data, {
        headers: { "Content-Type": "multipart/form-data", },
      });

      if (response && response.data) { dispatch(registerSuccess(response.data.user)); }
    } catch (error) {
      dispatch(
        registerFailure(error.response?.data?.message || "Có lỗi xảy ra trong quá trình đăng ký"));
    }
  };

  return (
    <div className="flex justify-center items-center bg-cover bg-center py-4 w-full h-full bg-[url('../../public/images/10.jpg')]">
      <form
        className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} onSubmit={handleRegister} >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-4">Đăng ký</h1>

        <label htmlFor="Ten" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">Họ và tên <span className="text-red">*</span></label>
        <input type="text" id="Ten" placeholder="Họ và tên" required value={formData.Ten} onChange={handleChange} className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" />

        <label htmlFor="Anh" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]" >Chọn hình ảnh đại diện <span className="text-red">*</span> </label>
        <input type="file" id="Anh" accept="image/*" onChange={handleFileChange} className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" />

        <label htmlFor="SDT" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"> Số điện thoại <span className="text-red">*</span> </label>
        <input type="text" id="SDT" placeholder="Số điện thoại" required value={formData.SDT} onChange={handleChange} className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" />

        <label htmlFor="Email" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]" > Email <span className="text-red">*</span></label>
        <input type="email" id="Email" placeholder="email" required value={formData.Email} onChange={handleChange} className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" />

        <label htmlFor="TenDangNhap" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">  Tên đăng nhập <span className="text-red">*</span> </label>
        <input type="text" id="TenDangNhap" placeholder="Tên đăng nhập" required value={formData.TenDangNhap} onChange={handleChange} className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" />

        <label htmlFor="NgaySinh" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]" > Ngày sinh <span className="text-red">*</span> </label>
        <input type="date" id="NgaySinh" placeholder="Ngày sinh" required value={formData.NgaySinh} onChange={handleChange} className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" />

        <label htmlFor="DiaChi" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">Địa chỉ <span className="text-red">*</span> </label>
        <input type="text" id="DiaChi" placeholder="Địa chỉ" required value={formData.DiaChi} onChange={handleChange} className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" />

        <label htmlFor="GioiTinh" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]" > Giới tính <span className="text-red">*</span> </label>
        <select id="GioiTinh" required value={formData.GioiTinh} onChange={handleChange} className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" >
          <option value="">Giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nu">Nữ</option>
        </select>

        <label htmlFor="MatKhau" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px] relative" > Mật khẩu <span className="text-red">*</span>  </label>
        <div className="relative w-full md:w-[520px]">
          <input type={showPassword ? "text" : "password"} id="MatKhau" placeholder="Mật khẩu" required value={formData.MatKhau} onChange={handleChange} className="w-full h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black pr-10" />
          <span className="absolute right-3 top-[40%] transform -translate-y-1/2 text-black cursor-pointer" onClick={() => setShowPassword(!showPassword)}><i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" ></i></span>
        </div>

        <label htmlFor="confirmPassword" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px] relative"> Nhập lại mật khẩu <span className="text-red">*</span></label>
        <div className="relative w-full md:w-[520px]">
          <input type={showConfirmPassword ? "text" : "PassWord"} id="confirmPassword" placeholder="Nhập lại mật khẩu" required value={formData.confirmPassword} onChange={handleChange} className="w-full h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black pr-10" />
          <span className="absolute right-3 top-[40%] transform -translate-y-1/2 text-black cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}><i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" ></i></span>
        </div>

        <div className="flex items-center mb-4 w-full md:w-[520px]">
          <input type="checkbox" id="agreeTerms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mr-2" />
          <label htmlFor="agreeTerms" className="text-base sm:text-lg">Tôi đồng ý với{" "}<Link href="/terms" className="text-yellow">điều khoản sử dụng</Link></label>
        </div>

        <button type="submit" className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-black rounded-full text-sm sm:text-lg font-bold cursor-pointer"> Đăng ký</button>

        <div className="mt-4">
          <span className="text-sm"> Bạn đã có tài khoản?{" "} <Link href="/login" className="text-yellow"> Đăng nhập </Link> </span>
        </div>
      </form>
    </div>
  );
};

export default Register;