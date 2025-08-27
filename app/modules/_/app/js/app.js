var xAjax = null;

var app = new Framework7({
	theme : 'md',
	root: '#app',
	name: app_name,
	id: 'id.clickpay.apps',
	modalTitle: app_name,
	material: true,
	routes: app_routes,
	view: {
		pushState: true,
	},
	cache: false,
	cacheDuration: 0,
});
var $$ = //app.$;
		 Dom7;

function ptrDone() {
	$$('.popover-backdrop').click();
	app.preloader.hide();
	app.ptr.done();
}
function loadHome() {
	$('.home-area').load(url_home, function(){
		ptrDone();
	});
/*
	app.request.get(url_home, { }, function (data, status, xhr) {
		$$('.home-area').html(data);
		ptrDone();
	}, function (xhr, status) {
		ptrDone();
	});
/**/
}
var mainView = app.views.create('.view-main', {
		on: {
			pageInit: function(page) {
				console.log('pageInit:' + page.name);
				switch( page.name ) {
					case 'index':
						app.preloader.show();

						var $ptrContent = $$('.ptr-home');
						$ptrContent.on('ptr:refresh', function (e) {
							loadHome();
						});
							loadHome();
					break;
					case 'keuangan-lists':
					break;
					default:
						ptrDone();
					break;
				}
			},
			pageAfterAnimation: function(page) {
				console.log('pageAfterAnimation:' + page.name);
				console.log('pageAfterAnimation:' + page.from);
			},
		},
});

function refreshCurrent() {
	//mainView.router.refreshPage();
	app.preloader.show();
	loadHome();
}

$$('.link:not(.popover-open):not([data-login-screen])').on('click', function () {
	app.preloader.show('multi');
});

app.request.setup({
	headers: {
		'Authorization': 'tes:tes',
		'Idusers': '1',
	},
});

function toast(title, message) {
	var notificationWithButton = app.notification.create({
		//icon: '<i class="icon demo-icon">7</i>',
		title: title,
		//subtitle: 'Notification with close button',
		text: message,
		closeButton: true,
		closeTimeout: 3000,
	});
	notificationWithButton.open();
}

app.on('formAjaxError', function (formEl, data, xhr) {
	toast(app_name, 'formAjaxError');
	console.log(xhr);
});

if( typeof(time)==='undefined' ) {
	function time() {
		now = new Date();
		return now.getTime();
	}
}


/*
 * Application BEGIN
 */
app.on('formAjaxBeforeSend', function (formEl, data, xhr) {
	switch( $$(formEl).attr('id') ) {
		case 'inv-datas-detail-form':
			$$('.inv-datas-detail-area').html('<div class="preloader color-blue"></div>');
		break;
	}
});
app.on('formAjaxSuccess', function (formEl, data, xhr) {
	switch( $$(formEl).attr('id') ) {
		case 'inv-datas-detail-form':
			$$('.inv-datas-detail-area').html( xhr['response'] );
		break;
	}
});


var keuangan_allowInfinite = true;
function loadMoreDataKeuangan() {
	if(!keuangan_allowInfinite) return;
	keuangan_allowInfinite = false;
	URI = $('.journal-lists .keuangan-infinite-link:last').attr('href');
	if( URI != '' ) {
		$.ajax({
			url: URI,
			success: function(data){
				$('.journal-lists').append(data);
				keuangan_allowInfinite = true;
				ptrDone();
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}
var loadDataKeuangan_url = null;
function loadDataKeuangan(URI) {
	if( typeof(URI)!=='undefined' )
		loadDataKeuangan_url = URI;
	$$('.keuangan-infinite-loader').show();
	$('.journal-lists').html('');
	if( loadDataKeuangan_url != '' ) {
		$.ajax({
			url: loadDataKeuangan_url,
			success: function(data){
				$('.journal-lists').html(data);
				ptrDone();
				keuangan_allowInfinite = true;
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}
function keuangan_cud(URI, DATA, onSuccess, onError){
	app.preloader.show('multi');
	if(xAjax != null) xAjax.abort();
	xAjax = $.ajax({
		url: URI,
		data: DATA,
		type: 'POST',
		success: function(data){
			obj = jQuery.parseJSON(data);
			if( obj.success ) {
				$$('.journal-lists').html( $$('.journal-lists-first').html() );
				$$('.keuangan-infinite-loader').show();
				loadDataKeuangan();
			}else{
				app.dialog.confirm(obj.error,
				function(value){ // OK
				}, function(value){ // Cancel
				});
			}
			ptrDone();
			keuangan_allowInfinite = true;
		},
		error: function(){
			ptrDone();
		},
	});
}


var inventori_allowInfinite = true;
function loadMoreDataInventori() {
	if(!inventori_allowInfinite) return;
	inventori_allowInfinite = false;
	URI = $('.inventori-lists .inventori-infinite-link:last').attr('href');
	if( URI != '' ) {
		$.ajax({
			url: URI,
			success: function(data){
				$('.inventori-lists').append(data);
				inventori_allowInfinite = true;
				ptrDone();
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}
var loadDataInventori_url = null;
function loadDataInventori(URI) {
	if( typeof(URI)!=='undefined' )
		loadDataInventori_url = URI;
	$$('.inventori-infinite-loader').show();
	$('.inventori-lists').html('');
	if( loadDataInventori_url != '' ) {
		$.ajax({
			url: loadDataInventori_url,
			success: function(data){
				$('.inventori-lists').html(data);
				ptrDone();
				inventori_allowInfinite = true;
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}
function inventori_cud(URI, DATA, onSuccess, onError){
	app.preloader.show('multi');
	if(xAjax != null) xAjax.abort();
	xAjax = $.ajax({
		url: URI,
		data: DATA,
		type: 'POST',
		success: function(data){
			obj = jQuery.parseJSON(data);
			if( obj.success ) {
				$$('.inventori-lists').html( $$('.inventori-lists-first').html() );
				$$('.inventori-infinite-loader').show();
				loadDataInventori();
			}else{
				app.dialog.confirm(obj.error,
				function(value){ // OK
				}, function(value){ // Cancel
				});
			}
			ptrDone();
		},
		error: function(){
			ptrDone();
		},
	});
}

var loadDatasInventori_url = null;
function loadDatasInventori(URI) {
	if( typeof(URI)!=='undefined' )
		loadDatasInventori_url = URI;
	$$('.inventori-data-infinite-loader').show();
	$('.inventori-data-lists').html('');
	if( loadDatasInventori_url != '' ) {
		$.ajax({
			url: loadDatasInventori_url,
			success: function(data){
				$('.inventori-data-lists').html(data);
				ptrDone();
				inventori_allowInfinite = true;
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}
function loadMoreDatasInventori() {
	if(!inventori_allowInfinite) return;
	inventori_allowInfinite = false;
	URI = $('.inventori-data-lists .inventori-data-infinite-link:last').attr('href');
	if( URI != '' ) {
		$.ajax({
			url: URI,
			success: function(data){
				$('.inventori-data-lists').append(data);
				inventori_allowInfinite = true;
				ptrDone();
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}

var loadUsersInventori_url = null;
function loadUsersInventori(URI) {
	if( typeof(URI)!=='undefined' )
		loadUsersInventori_url = URI;
	$$('.inventori-users-infinite-loader').show();
	$('.inventori-users-lists').html('');
	if( loadUsersInventori_url != '' ) {
		$.ajax({
			url: loadUsersInventori_url,
			success: function(data){
				$('.inventori-users-lists').html(data);
				ptrDone();
				inventori_allowInfinite = true;
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}
function loadMoreUsersInventori() {
	if(!inventori_allowInfinite) return;
	inventori_allowInfinite = false;
	URI = $('.inventori-users-lists .inventori-users-infinite-link:last').attr('href');
	if( URI != '' ) {
		$.ajax({
			url: URI,
			success: function(data){
				$('.inventori-users-lists').append(data);
				inventori_allowInfinite = true;
				ptrDone();
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}

var loadHistoryInventori_url = null;
function loadHistoriesInventori(URI) {
	if( typeof(URI)!=='undefined' )
		loadHistoryInventori_url = URI;
	$$('.inventori-history-infinite-loader').show();
	$('.inventori-history-lists').html('');
	if( loadHistoryInventori_url != '' ) {
		$.ajax({
			url: loadHistoryInventori_url,
			success: function(data){
				$('.inventori-history-lists').html(data);
				ptrDone();
				inventori_allowInfinite = true;
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}
function loadMoreHistoriesInventori() {
	if(!inventori_allowInfinite) return;
	inventori_allowInfinite = false;
	URI = $('.inventori-history-lists .inventori-history-infinite-link:last').attr('href');
	if( URI != '' ) {
		$.ajax({
			url: URI,
			success: function(data){
				$('.inventori-history-lists').append(data);
				inventori_allowInfinite = true;
				ptrDone();
			},
			error: function(){
				ptrDone();
			},
		});
	}else{
		ptrDone();
	}
}
