import type { SweetAlertIcon } from 'sweetalert2';
import Swal from 'sweetalert2';

export function useConfirmFlash() {
  function confirmFlash(title: string, message: string, level: SweetAlertIcon = 'info') {
    return Swal.fire({
      title: title,
      text: message,
      icon: level,
      showCancelButton: true,
      focusConfirm: false,
      showCloseButton: true,
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#9eaaf2',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }
  return { confirmFlash };
}
