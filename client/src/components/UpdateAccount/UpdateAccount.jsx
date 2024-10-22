import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const UpdateAccount = ({ account, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  // Khởi tạo formData với account, nếu date không hợp lệ thì đặt về Date.now()
  const [formData, setFormData] = useState({
    ...account,
    date: account.date ? account.date : Date.now(), // Đặt về thời gian hiện tại nếu không có date
  });

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const timeStamp = new Date(formData.date).getTime();
      const inputDate = new Date(timeStamp);
      const currentDate = new Date();

      if (inputDate > currentDate) {
        alert("Ngày không được lớn hơn ngày hiện tại.");
        return;
      }

      const newformData = {
        ...formData,
        date: timeStamp,
      };
      dispatch(actions.updateAccount.updateAccountRequest(newformData));
      onSuccess();
      onClose();
    },
    [formData, dispatch, onSuccess, onClose]
  );

  const handleCancel = () => {
    onSuccess();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-bg-overlay z-[2]"
      onClick={handleOverlayClick}
    >
      <div
        className="w-[400px] h-[430px] flex flex-col items-center bg-bg-light z-6 rounded-[5px] opacity-1 p-[10px] z-[3]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">
          <h1 className="font-bold text-[1.2rem]">Cập nhật tài khoản</h1>
        </div>
        <form
          className="flex flex-col gap-[10px] w-full z-[4]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="idTiktok"
            className="w-full h-[36px] border-[1px] border-cl-border-input rounded-[5px] px-[5px] text-[0.8rem] mt-[20px]"
            placeholder="Nhập id tiktok..."
            value={formData.idTiktok}
            onChange={handleChange}
          />
          <input
            type="email"
            name="accountGoogle"
            className="w-full h-[36px] border-[1px] border-cl-border-input rounded-[5px] px-[5px] text-[0.8rem] mt-[20px]"
            placeholder="Nhập account Google..."
            value={formData.accountGoogle}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="w-full h-[36px] border-[1px] border-cl-border-input rounded-[5px] px-[5px] text-[0.8rem] mt-[20px]"
            value={formatDate(formData.date)} // Đảm bảo giá trị date hợp lệ
            onChange={handleChange}
          />
          <select
            name="pertain"
            className="w-full h-[36px] border-[1px] border-cl-border-input rounded-[5px] px-[5px] text-[0.8rem] mt-[20px]"
            value={formData.pertain}
            onChange={handleChange}
          >
            <option value="0">Chưa Đăng nhập trên máy nào</option>
            {Array.from({ length: 15 }, (_, index) => (
              <option key={index} value={index + 1}>
                Máy {index + 1}
              </option>
            ))}
          </select>
          <div className="w-full mt-[30px] flex flex-col justify-between">
            <button
              type="submit"
              className="w-full h-[36px] bg-bg-btn-light rounded-[5px] text-[1rem] text-text-light font-bold text-text-light"
            >
              Cập nhật
            </button>
            <button
              type="button"
              className="w-full h-[36px] mt-[10px] bg-bg-light rounded-[5px] border-[1px] border-cl-border-input text-[1rem] text-text-dark font-bold"
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccount;