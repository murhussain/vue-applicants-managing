import type { SweetAlertIcon } from 'sweetalert2';
import Swal from 'sweetalert2';

export function useFlash() {
  function flash(title: string, message: string, level: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      text: message,
      icon: level,
      confirmButtonColor: '#7586ec',
      confirmButtonText: 'Okay',
      focusConfirm: false,
      showCloseButton: true
    });
  }
  return { flash };
}