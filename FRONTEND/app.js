const modalFactura = () => {

  Swal.fire({
    title: '<strong>¿El Cliente ya está registrado?</strong>',
    icon: 'info',
    // html:
    //   'You can use <b>bold text</b>, ' +
    //   '<a href="//sweetalert2.github.io">links</a> ' +
    //   'and other HTML tags',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
    
      '<a href="./nuevaFactura.html"><i class="fa fa-circle-check" style="color: #1dac1b;"></i>Si</a>',
    // confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>No',
    cancelButtonAriaLabel: 'Thumbs down'
  });
}










