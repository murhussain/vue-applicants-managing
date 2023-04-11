import Swal from 'sweetalert2'

export function useConfirmFlash() {
  function confirmFlash(title, message, level = 'info') {
    return Swal.fire({
      title: title,
      text: message,
      icon: level,
      confirmButtonColor: '#7586ec',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#6b7280'
    });
  }
  return { confirmFlash };
}
