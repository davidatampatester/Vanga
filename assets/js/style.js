jQuery(document).ready(function($) {
    $('.menu-button').on('click', function() {
      $('body').toggleClass('open-menu');
      $('.nav-mobile').slideToggle(300);
    });
  
    $('.nav-mobile .menu-item-parent > .menu-link').on('click', function(e) {
      e.preventDefault(); 
  
      const parentItem = $(this).closest('.menu-item-parent');
      const subMenu = parentItem.find('.sub-menu').first();
  
      parentItem.toggleClass('open-sub');
      subMenu.stop(true, true).slideToggle(300);
    });

    const counters = jQuery('.counter');

    if (!counters.length) return;

    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    counters.each(function () {
      const $this = jQuery(this);
      const target = parseInt($this.data('target'), 10);
      const fullText = $this.text().trim();
      const suffix = fullText.replace(/[0-9.,]+/, '');

      if (isNaN(target) || target <= 0) return;

      const duration = 2000; 
      const startTime = performance.now();

      function updateCounter() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);

        $this.text(formatNumber(current) + suffix);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          $this.text(formatNumber(target) + suffix); 
        }
      }

      requestAnimationFrame(updateCounter);
    });
});