$.fn.scrollStopped = function( callback ) {          
	$(this).scroll(function() {
		var self = this, $this = $(self);
		if ( $this.data( 'scrollTimeout' ) ) {
			clearTimeout( $this.data('scrollTimeout' ) );
		}
		$this.data( 'scrollTimeout', setTimeout( callback, 100, self ) );
	});
};