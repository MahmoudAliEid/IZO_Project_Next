import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//to make notifactio to any componentet

const notify = (msg, type) => {
  const config = {
    position: 'bottom-right',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    hideProgressBar: true,
    closeButton: false,
    icon: false
  }
  if (type === 'warn') toast.warn(msg, config)
  else if (type === 'success') toast.success(msg, config)
  else if (type === 'error') toast.error(msg, config)
}

export default notify
