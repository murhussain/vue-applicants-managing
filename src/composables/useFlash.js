import Swal from 'sweetalert2'

export function useFlash() {
  function flash(title, message, level) {
    return Swal.fire({
      title: title,
      text: message,
      icon: level,
      confirmButtonColor: '#7586ec',
      confirmButtonText: 'Okay'
    });
  }
  return { flash };
}