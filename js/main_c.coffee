# show noty fadeOut with delay fun
$.fn.fadeOutWithDelay = (delay)->
	self = this
	setTimeout (->
		self.fadeOut(400)
	), delay

window.main = {

	# MVC MOVE model
	m : 
		
		#vars to debug in console here
		debug:{}
		
		#settungs to main class
		settings:
			console 			: $('div#console')			# console container
			$notification 		: $('div#notification_wrap')# notification container
		
		#current state of main class
		state:{}

		fetchPosts:()->
			main.makeProfile 		'fetchPost','Collapsed' 
			main.makeProfileEnd 	'fetchPost','Collapsed'

	# MVC MOVE operations
	o :
		init: ()->
			#console log global debug object
			#consoles to zero-level console
			console.log main.m.debug
			main.makeProfile('init');
			#----------body------------
			main.v.console 'init ok' 
			main.v.console 'init warning', 'warning' 
			main.v.console 'init alert', 'alert' 

			#listen to global events
			main.e.listen()

			$('div#button').eq(4).trigger 'click'

			main.v.showNoty 'alert', 'alert', 6000
			main.v.showNoty 'warning', 'warning', 6000
			main.v.showNoty 'ok', 'ok', 6000
			#----------body ends-------
			main.makeProfileEnd('init');


	# MVC MOVE views
	v : 
		console: (string,type)->
			main.m.settings.console.prepend "<p class=\"#{(type||'ok')}\">#{string}<p>" 

		showNoty : (options) ->

			defaults = {
				text: 'I\'m default noty'
				type: 'ok'
				hide: 4000
				callback:(->)
			}

			options = $.extend {}, defaults, options || {}

			#prepend noty
			main.m.settings.$notification.prepend "<div id=\"noty\" class=\"#{options.type}\">#{options.text}</div>"
			
			#get current noty
			$curr_noty = main.m.settings.$notification.find('div#noty').first()

			$curr_noty.fadeOutWithDelay options.hide
			
			# show noty
			$curr_noty.fadeIn() 

			# write callback to data object, to get it on click
			$curr_noty.data 
				callback: options.callback




	# MVC MOVE events
	e : 
		listen: ()->
			main.makeProfile 		'listen','Collapsed'
			#----------body------------

			$('div#buttons').on 'click', '#button', ()->

				$this = $ @
				
				console.log $this.index()

				switch $this.index()
					
					when 0
						$('input').animate 'top' : '20'

					when 1
						$('input').animate 'top' : $(window).outerHeight() - $('input').outerHeight() - 20

					when 2
						$('input').animate 'left' : '20'

					when 3
						$('input').animate 'left' : $(window).outerWidth() - $('input').outerWidth() - 20

					when 4
						$('input').animate 

									'top' : $(window).outerHeight()/2 - $('input').outerHeight()/2 - 20

									'left' : $(window).outerWidth()/2 - $('input').outerWidth()/2 - 20

					when 5 

						if !$this.data().fixed || !$this.data().fixed?

							$('input').css 'position' : 'fixed'

							$this.text 'fixed'

							$this.data().fixed = true

						else

							$('input').css 'position' : 'absolute'

							$this.text 'fix'

							$this.data().fixed = false
					
				

			# notification on click->close listener
			main.m.settings.$notification.on 'click', 'div#noty', (->
				$(this).fadeOut 500,(->
					$(this).remove()
				)

				if $(this).data().callback then $(this).data().callback()
			)

			#----------body ends-------
			main.makeProfileEnd 	'listen'

	# // generate profile end
	makeProfile : (name,type)->
		console["group#{type||''}"] name
		console.profile name
		console.time ("#{name} takes")
	# 	// generate console.profile end
	makeProfileEnd :(name)->
		console.timeEnd ("#{name} takes")
		console.profileEnd name
		console.groupEnd name
}

# init main class
main.o.init()