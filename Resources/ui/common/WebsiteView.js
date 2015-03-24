function WebsiteView()
{
	var self = Ti.UI.createView();
	
	var webView = Ti.UI.createWebView({
	});
	self.add(webView);
	
	self.addEventListener('dispWeb', function(e){
		webView.url = e.url;
	});
	
	return self;
}

module.exports = WebsiteView;