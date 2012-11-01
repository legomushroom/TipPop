
$::tipPop = ( options = {} )->

	$parent = @

	methods = 

		destroy: ()->
			@destroyFocus()
			@destroyHover()

		destroyHover: ()->
			$parent.off 'mouseenter'
			$parent.off 'mouseleave'
			$parent.data 'hover', false
			$parent.find('div#tippop').hide()

			main.m.settings.type = 'focus'

		destroyFocus: ()->
			$parent.find('div#tippop_focus').each (  )->
				$.removeData $(@).data


			main.m.settings.type = 'hover'

			$parent.off 'focusin'
			$parent.off 'focusout'
			$parent.data 'focus', false
			$parent.find('div#tippop_focus').hide()
			
	main = 
		# model
		m : 
			# state of plugin
			state :
				# text from title attr
				titleText : ''
				# text from data-bind attr
				focusText : ''
				# try position priotity count
				tryPositionCount : 0

			# settings
			settings:{
				# tipTop
				$tipPop : ''
				# parentElement
				$that 	: ''
				# offset from init element
				offset 	: 0 
				# body
				$body 	: $('body')
				# window
				$window : $(window)
				# type => 	 title || focus || all
				type 	: 'all'

				positionPriority : 
										hover : [ ]

										focus : [ ]

			}

		# operations
		o:
			# initialization
			init: ( options = {} )=>

				# plugin defaults
				defaults = 
					# default title pop position => best || bottom	||   top 	|| left || right
					hoverPosition: 'best'
					# default focus pop position => best ||  left	||  right 	||  top	|| bottom
					focusPosition: 'best'
					# type => title || focus || all
					type 	: 'all'
					# delay before fadeOut
					delay 	: 2000
					# offset from init element
					offset 	: 8
					# position priority
					# for hover event
					hoverPriority : [ 'top', 'bottom', 'left', 'right' ]
					# for focus event
					focusPriority : [ 'left', 'right', 'bottom', 'top' ]
					# callback on click
					# hoverOnShow:(->)
					# focusOnShow:(->)
					# hoverOnHide:(->)
					# focusOnHide:(->)

				# extend defaults by options
				options = $.extend {}, defaults, options || {}

				# get tipPop or append if there is no it
				main.m.settings.$tipPop 		= main.o.getTipPop() 
				# buffer parent node
				main.m.settings.$that 			= @
				# offset from init element
				main.m.settings.offset 			= parseInt(options.offset,10)
				# tipPop type
				main.m.settings.type 			= options.type
				# hover onshow callback
				main.m.settings.hoverOnShow		= options.hoverOnShow
				# hover onhide callback
				main.m.settings.hoverOnHide		= options.hoverOnHide
				# focus onshow callback
				main.m.settings.focusOnShow		= options.focusOnShow
				# hover onhide callback
				main.m.settings.focusOnHide		= options.focusOnHide
				# default focus pop position => best ||  left	||  right 	||  top	||  bottom
				main.m.settings.focusPosition 	= options.focusPosition 
				# default title pop position => best || bottom	||   top 	|| left ||	right
				main.m.settings.titlePosition 	= options.hoverPosition 
				# default hover priority
				main.m.settings.positionPriority.hover = options.hoverPriority
				# default focus priority
				main.m.settings.positionPriority.focus = options.focusPriority
				# listen to plugin events
				main.e.listen main.m.settings.$that 

				return this

			getTipPop:()->

				$tipPop = $('body').find 'div#tippop'
				
				if  $tipPop.length is 0

					$('body').append '<div id="tippop"></div>'

					$tipPop = $('div#tippop')

				$tipPop

			focusSetEl:( $this )->
				if !$this.data().$el? 

					main.m.settings.$body.append '<div id="tippop_focus" class=""></div>'
					
					$this.$el  = main.m.settings.$body.find('div#tippop_focus').last()

					$this.data $el : $this.$el

				else $this.$el =  $this.data().$el

			getNormalize:( $this, type )->

				normalizeW = 0
				normalizeH = 0

				normalizeTipPop = ''

				if type is 'focus'

					normalizeTipPop = $this.$el.attr 'class', ''

					normalizeW = $this.$el.outerWidth()
					normalizeH = $this.$el.outerHeight()

				else 
					normalizeTipPop = main.m.settings.$tipPop.attr 'class', ''

					normalizeW = main.m.settings.$tipPop.outerWidth()
					normalizeH = main.m.settings.$tipPop.outerHeight()

				{ normH : normalizeH, normW: normalizeW, normTipPop: normalizeTipPop}

			makePosition:( opt )->

				if opt.type is 'hover'

				then callback = main.m.settings.hoverOnShow

				else callback = main.m.settings.focusOnShow

				fixedNormalize = 0

				if opt.positionType is 'fixed' 

					fixedNormalizeY = opt.$elem.offset().top - main.m.settings.$window.scrollTop()

				else

					fixedNormalizeY = opt.$elem.offset().top

				switch opt.titlePosition

					when 'left'
						# get normalize => focus or hover event?
						norm = main.o.getNormalize( opt.$elem, opt.type )

						# positioning tipPop arrow
						norm.normTipPop.addClass('left')
						# positioning tipPop
						.css
								# top 
								top 	: fixedNormalizeY + ( opt.$elem.outerHeight() / 2 ) - ( norm.normH / 2 ) - 5
								# left
								left 	: opt.$elem.offset().left - main.m.settings.offset - norm.normW
						# show tipPop
						.stop(true,false).fadeIn(500,callback)


					when 'right'
						# get normalize => focus or hover event?
						norm = main.o.getNormalize( opt.$elem, opt.type )
						# positioning tipPop arrow
						norm.normTipPop.addClass('right')
						# positioning tipPop
						.css
								# top 
								top 	: fixedNormalizeY + ( opt.$elem.outerHeight() / 2 ) - ( norm.normH / 2 ) - 5
								# left
								left 	: opt.$elem.offset().left + opt.$elem.outerWidth() + main.m.settings.offset
						# show tipPop
						.stop(true,false).fadeIn(500,callback)

					when 'top'
						# get normalize => focus or hover event?
						norm = main.o.getNormalize( opt.$elem, opt.type )
						# positioning tipPop arrow
						norm.normTipPop.addClass('top')
						# positioning tipPop
						.css
								# top 
								top 	: fixedNormalizeY - norm.normH - main.m.settings.offset - 4
								# left
								left 	: opt.$elem.offset().left + ( opt.$elem.outerWidth() / 2 ) - ( norm.normW / 2 ) - 5
						# show tipPop
						.stop(true,false).fadeIn(500,callback)

					when 'bottom'
						# get normalize => focus or hover event?
						norm = main.o.getNormalize( opt.$elem, opt.type )
						
						# positioning tipPop arrow
						norm.normTipPop.addClass('bottom')
						# positioning tipPop
						.css
								# top 
								top 	: fixedNormalizeY + opt.$elem.outerHeight() + main.m.settings.offset 
								# left
								left 	: opt.$elem.offset().left + ( opt.$elem.outerWidth() / 2 ) - ( norm.normW / 2 ) - 5
						# show tipPop
						.stop(true,false).fadeIn(500,callback)

					when 'best'
						
						i = main.m.state.tryPositionCount++

						if i < main.m.settings.positionPriority[opt.type].length

							main.o.makePosition
										$elem 			: opt.$elem
										titlePosition	: main.o.tryPosition[main.m.settings.positionPriority[opt.type][i]]( opt.$elem, opt.type )
										type 			: opt.type 
										positionType 	: opt.positionType

						else 
							# position found
							main.o.makePosition
										$elem 			: opt.$elem
										titlePosition 	: main.m.settings.positionPriority[opt.type][0]
										type 			: opt.type
										positionType	: opt.positionType
				opt.$elem



			isVisible:( $elem )->
				
				docViewTop = main.m.settings.$window.scrollTop();
				docViewBottom = docViewTop + main.m.settings.$window.height();

				elemTop = $elem.offset().top;
				elemBottom = elemTop + $elem.height();

				return ((elemBottom >= docViewTop) and (elemTop <= docViewBottom) and (elemBottom <= docViewBottom) and  (elemTop >= docViewTop) );

			tryPosition:

					left:( $this, type )->

						norm = main.o.getNormalize $this, type 

						if $this.offset().left - norm.normW - main.m.settings.offset > main.m.settings.$window.scrollLeft()

						then return 'left'

						else return 'best'

					right:( $this, type )->

						norm = main.o.getNormalize $this, type 

						if $this.offset().left + $this.outerWidth() + main.m.settings.offset + norm.normW < main.m.settings.$window.scrollLeft() + main.m.settings.$window.outerWidth()
						# if main.o.isVisible $this

						then return 'right'

						else return 'best'

					top:( $this, type )->

						norm = main.o.getNormalize $this, type 

						if $this.offset().top - norm.normH - main.m.settings.offset - 4 > main.m.settings.$window.scrollTop()
						# if main.o.isVisible $this

						then return 'top'

						else return 'best'

					bottom:( $this, type )->

						norm = main.o.getNormalize $this, type 

						if $this.offset().top +  $this.outerHeight() +  norm.normH - 10 + main.m.settings.offset < main.m.settings.$window.scrollTop() + main.m.settings.$window.outerHeight()
						# if main.o.isVisible $this

						then return 'bottom'

						else return 'best'

		e : 
			listen:( )->
				
				if ( main.m.settings.type is 'hover' ) or ( main.m.settings.type is 'all' )
					
					if !main.m.settings.$that.data().hover?
						main.m.settings.$that.data 'hover', false
					
					if !main.m.settings.$that.data().hover
						# listem for mouseenter event
						main.m.settings.$that.on 'mouseenter', '*[title]', main.e.mouseEnterEvent
						main.m.settings.$that.data 'hover', true

				if ( main.m.settings.type is 'focus' ) or ( main.m.settings.type is 'all' )


					if !main.m.settings.$that.data().focus?
						main.m.settings.$that.data 'focus', false


					if !main.m.settings.$that.data().focus
						# listem for focus event
						main.m.settings.$that.on 'focusin', '*[data-focus]', main.e.focusInEvent
						main.m.settings.$that.data 'focus', true



			focusInEvent:( )->

				# console.time "focusInEvent takes"

				$this = $ this

				# reset tryPosition priority
				main.m.state.tryPositionCount = 0

				# hide tipTop
				main.m.settings.$tipPop.stop().fadeOut(0, main.m.settings.hoverOnHide )

				$this.data allowPopOnHover : false

				# set element tipPop element
				main.o.focusSetEl $this

				# element has not empty title addttribute
				if $this.attr('data-focus')?
					# set tipPop text to title attribute
					main.m.state.focusText = $this.attr 'data-focus'
					# set tipPop text to title attr
					$this.$el.text main.m.state.focusText

					$parent =  $this.parent()

					fixed = $this.css 'position'
					if fixed is 'static' then fixed = 'absolute'

					#set parents position 'fixed' or 'absolute'
					$this.$el.css 'position': fixed 

					# remove title from element
					$this.attr 'title', ''

					# positioning tipPop
					main.o.makePosition

									$elem 			: $this
									titlePosition 	: main.m.settings.focusPosition
									type 			: 'focus'
									positionType 	: fixed 
									$parent 		: $parent

					$this.on 'focusout', ()=>

						$this.attr 'data-focus', main.m.state.focusText
				
						$this.$el.stop().fadeOut(0, main.m.settings.focusOnHide )

						$this.data allowPopOnHover : true

				else $this.$el.stop().fadeOut(0, main.m.settings.focusOnHide )
			
				# console.timeEnd ("focusInEvent takes")


			mouseLeaveEvent:( )->

				$this = $ @

				$this.attr 'title', $this.data().titleText

				if $this.data().allowPopOnHover

						main.m.settings.$tipPop.stop().fadeOut(0, main.m.settings.hoverOnHide )

			mouseEnterEvent:()->

					# console.time 'mouseEnterEvent takes'

					$this = $ this

					if !$this.data().allowPopOnHover?
						$this.data allowPopOnHover : 'true'

					skip = $this.attr('data-skip')
					if !skip? then skip = ''

					if $this.data().allowPopOnHover and ( skip.toLowerCase() != 'true')

						# reset tryPosition priority
						main.m.state.tryPositionCount = 0

						# element has not empty title attribute
						if $this.attr('title')?
							# set tipPop text to title attribute
							$this.data  'titleText', $this.attr('title')
							# set tipPop text to title attr
							main.m.settings.$tipPop.text($this.data().titleText)
# issue!					# after hover right side element isue hack
							.css 
							# set element height to it's height
								'height' 		: main.m.settings.$tipPop.height()


							$parent =  $this.parent()

							fixed = $this.css 'position'
							if fixed is 'static' then fixed = 'absolute'
							# find parent's position type
							# while !$parent.is 'body'
								
							# 	if $parent.css('position') is 'fixed'

							# 		fixed = 'fixed'

							# 		break

							# 	$parent = $parent.parent()

							#set parents position 'fixed' or 'absolute'
							main.m.settings.$tipPop.css 'position': fixed || 'absolute'
 
							# remove title from element
							$this.attr 'title', ''
							# positioning tipPop
							main.o.makePosition 
										
										$elem 			: $this
										titlePosition 	: main.m.settings.titlePosition
										type 			: 'hover'
										positionType 	: fixed 
										$parent 		: $parent

							$this.on('mouseleave',main.e.mouseLeaveEvent)




						else main.m.settings.$tipPop.hide()
					
					# console.timeEnd 'mouseEnterEvent takes'
	
	# what was passed as a parameter?
	switch typeof options
		# if method was passed
		when 'string'
			methods[options]()
		# if options were passed
		when 'object'
			main.o.init( options )