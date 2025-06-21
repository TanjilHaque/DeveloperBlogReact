import { toast, Bounce } from "react-toastify";
import moment from "moment/moment";
const _ = {};

_.SucessToast = (msg = "sucess msg missing", positon = "top-right") => {
  toast.success(msg, {
    position: positon,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

_.ErrorToast = (msg = "Error here") => {
  toast.error(msg, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

_.infoToast = (msg = "info Missing") => {
  toast.info(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

// time and data
_.getTimeNow = () => {
  return moment().format("MM DD YYYY, h:mm:ss a");
};

_.modalCustomStyle = () => {
  return {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "40%",
      transform: "translate(-50%, -50%)",
    },
  };
};
export default _;