$(function(){
	$('.js-MoreOrders').on('click',
		function(ev){
			ev.preventDefault();
			$this = $('.hits-wrap');
			if ($this.children().hasClass('show'))
				{$this.children('.show').removeClass('show').addClass('hide');}
			else
				$this.children('.hide').removeClass('hide').addClass('show');
	});
});
