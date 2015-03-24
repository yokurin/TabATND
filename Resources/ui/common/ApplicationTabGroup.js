function ApplicationTabGroup(Window) {
	//import
	var MasterView = require('ui/common/MasterView');
	var DetailView = require('ui/common/DetailView');
	var WebsiteView = require('ui/common/WebsiteView');
	
	//create module instance
	var self = Ti.UI.createTabGroup();

	
	var masterView = new MasterView();
	var detailView = new DetailView();
	var websiteView = new WebsiteView();
	
	console.log('master-view:', masterView);
	
	
	var masterContainerWindow = Ti.UI.createWindow({
		title: 'イベント一覧'
	});
	masterContainerWindow.add(masterView);
	
	var detailContainerWindow = Ti.UI.createWindow({
		title: 'イベント詳細'
	});
	detailContainerWindow.add(detailView);
	
	var websiteContainerWindow = Ti.UI.createWindow({
		title: 'イベントページ'
	});
	websiteContainerWindow.add(websiteView);
	
	
	var tab1 = Ti.UI.createTab({
		title: 'イベント一覧',
		icon: '/images/KS_nav_views.png',
		window: masterContainerWindow
	});
	
	var tab2 = Ti.UI.createTab({
		title: 'イベント詳細',
		icon: '/images/KS_nav_views.png',
		window: detailContainerWindow
	});
	
	
	//add beghavior for masterView
	//console.log('=====master====', masterView);
	masterView.addEventListener('itemSelected' , function(e){
		detailView.fireEvent('editItem',e);
		tab2.open(detailContainerWindow);
		self.activeTab = 1;
	});
	
	
	//add beghavior for detailView
	detailView.addEventListener('toWebsite', function(e){
		websiteView.fireEvent('dispWeb', e);
		tab2.open(websiteContainerWindow);
	});
	
	self.addTab(tab1);
	self.addTab(tab2);


	return self;
};


module.exports = ApplicationTabGroup;
