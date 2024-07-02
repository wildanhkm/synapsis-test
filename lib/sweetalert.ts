import Swal from 'sweetalert2';

export const dangerSwal = Swal.mixin({
  customClass: {
    confirmButton: 'bg-red-500',
    cancelButton: 'bg-white',
  },
});

export const warningSwal = Swal.mixin({
  customClass: {
    confirmButton: 'bg-red-500',
    cancelButton: 'bg-white',
  },
});

export const successSwal = Swal.mixin({
  customClass: {
    confirmButton: 'bg-red-500',
    cancelButton: 'bg-white',
  },
});
