var bjq = require("bacon.jquery"),
	$ = require('jquery')

$(function() {
	bjq.ajax("/oegy-cms/rest/sites").onValue(function(sites) {
		console.log(sites)
	})

	$('#oegy-cms-compile-button').clickE().onValue(function() {
		bjq.ajaxPost('/oegy-cms/rest/compile')
	})

	bjq.ajax("/oegy-cms/rest/site/oegy-site/index.html").onValue(function(itemSource) {
		$('#oegy-cms-site-source').text(itemSource)
	})
})