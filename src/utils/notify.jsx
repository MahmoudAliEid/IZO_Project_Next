import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//to make notifactio to any componentet
const notify = (msg, type) => {
  if (type === 'warn') toast.warn(msg, { toastId: 'unique-random-text-xAu9C9-' })
  else if (type === 'success') toast.success(msg, { toastId: 'unique-random-text-xAu9C9-' })
  else if (type === 'error') toast.error(msg, { toastId: 'unique-random-text-xAu9C9-' })
}

export default notify
