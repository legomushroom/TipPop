# show noty fadeOut with delay fun
$.fn.fadeOutWithDelay = (delay)->
	self = this
	setTimeout (->
		self.fadeOut(400)
	), delay

window.main = {

	m : 
		#vars to debug in console here
		debug:{}
		
		#settungs to main class
		settings:
			console 			: $('div#console')			# console container
			$notification 		: $('div#notification_wrap')# notification container
			$input 				: $('input') 				# input in JQ
			$window 			: $(window) 				# window wrapped in JQ
			$select 			: $('select') 				# select wrapped in JQ
		
		#current state of main class
		state:{}

		fetchPosts:()->
			main.makeProfile 		'fetchPost','Collapsed' 
			main.makeProfileEnd 	'fetchPost','Collapsed'

	o :
		init: ()->
			#console log global debug object
			#consoles to zero-level console
			# console.log main.m.debug
			main.makeProfile('init');
			#----------body------------
			main.v.console 'init ok' 
			main.v.console 'init warning', 'warning' 
			main.v.console 'init alert', 'alert' 

			#listen to global events
			main.e.listen()

			$('div#button').eq(0).trigger 'click'

			main.v.showNoty 'alert', 'alert', 6000
			main.v.showNoty 'warning', 'warning', 6000
			main.v.showNoty 'ok', 'ok', 6000
			#----------body ends-------
			main.makeProfileEnd('init');


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




	e : 
		listen: ()->
			main.makeProfile 		'listen','Collapsed'
			#----------body------------

			main.m.settings.$window.on 'keydown',(e)->
				
				if e.altKey

					e.preventDefault()

					switch e.keyCode

						when 37

							main.m.settings.$input.stop(true,false).animate 'left' : '-=20'

						when 38

							main.m.settings.$input.stop(true,false).animate 'top' : '-=20'

						when 39

							main.m.settings.$input.stop(true,false).animate 'left' : '+=20'

						when 40

							main.m.settings.$input.stop(true,false).animate 'top' : '+=20'


			main.m.settings.$select.on 'change',()->
				$this = $(@)
				console.log $this.find(':selected').index()

				switch $this.find(':selected').index()

					when 1
							main.m.settings.$input.animate 'top' : '20'

					when 2
						main.m.settings.$input.animate 'top' : main.m.settings.$window.outerHeight() - main.m.settings.$input.outerHeight() - 20

					when 3
						main.m.settings.$input.animate 'left' : '20'

					when 4
						main.m.settings.$input.animate 'left' : main.m.settings.$window.outerWidth() - main.m.settings.$input.outerWidth() - 20

					when 5
						main.m.settings.$input.animate 

											'top'  : - ( main.m.settings.$input.outerHeight()/2)
											'left' : - (main.m.settings.$input.outerWidth()/2)

					when 6
						main.m.settings.$input.animate 
											'top'  : - ( main.m.settings.$input.outerHeight()/2)
											'left' : main.m.settings.$window.outerWidth() - main.m.settings.$input.outerWidth() + (main.m.settings.$input.outerWidth()/2)

					when 7
						main.m.settings.$input.animate 
											'left' : - main.m.settings.$input.outerWidth()/2
											'top'  : main.m.settings.$window.outerHeight() - ( main.m.settings.$input.outerHeight()/2)

					when 8
						main.m.settings.$input.animate 
											'top'  : main.m.settings.$window.outerHeight() - ( main.m.settings.$input.outerHeight()/2)
											'left' : main.m.settings.$window.outerWidth() - main.m.settings.$input.outerWidth() + (main.m.settings.$input.outerWidth()/2)


			$('div#buttons').on 'click', '#button', ()->

				$this = $ @
				
				switch $this.index()
					
					when 1
						main.m.settings.$input.animate 

									'top' : main.m.settings.$window.outerHeight()/2 - main.m.settings.$input.outerHeight()/2 - 20

									'left' : main.m.settings.$window.outerWidth()/2 - main.m.settings.$input.outerWidth()/2 - 20

						main.m.settings.$select.find(':selected').attr 'selected', false

					when 2 

						if !$this.data().fixed || !$this.data().fixed?

							main.m.settings.$input.css 'position' : 'fixed'

							$this.text 'fixed'

							$this.data().fixed = true

						else

							main.m.settings.$input.css 'position' : 'absolute'

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
		# console["group#{type||''}"] name
		# console.profile name
		# console.time ("#{name} takes")
	# 	// generate console.profile end
	makeProfileEnd :(name)->
		# console.timeEnd ("#{name} takes")
		# console.profileEnd name
		# console.groupEnd name
}

# init main class
main.o.init()