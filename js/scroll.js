//--SCROLLTOP--

//--FUNCIONES--------------------------------------
const scrollTopButton = (btn) => {
  const $ScrollBtn = $(btn);

  $(window).scroll(() => {
    let scrollTop = $(this).scrollTop();

    scrollTop > 400 ? $ScrollBtn.removeClass('scroll-hidden') : $ScrollBtn.addClass('scroll-hidden');
  });

  $ScrollBtn.click(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  });
}

scrollTopButton('.scroll-top-btn');

const scrollTop = () => {
  window.scrollTo(0, 0);
};