function DetailView()
{
	
	var self = Ti.UI.createView({
		backgroundColor: '#fff'
	});
	
	var lbl = Ti.UI.createLabel({
		top: 60,
		left: 5,
		text: '',
		height: 'auto',
		width: 'auto',
		color:'#000'
	});
	self.add(lbl);
	
	
	//webページをひらくボタン
	var button1 = Ti.UI.createButton({
		title: 'webサイトへ',
		top: 350,
		width: '100',
		left: 210
	});
	button1.addEventListener('click', function(e){
		self.fireEvent('toWebsite', {
			url: eventUrl
		});
	});
	self.add(button1);
	
	var eventUrl = '';
	self.addEventListener('editItem', function(e){
		getATND(e.eventId);
	});
	
	function getATND(eventId)
	{
		var url = 'http://api.atnd.org/events/?event_id=' + eventId + '&format=json';
		var client = Ti.Network.createHTTPClient({
			onload:function(e)
			{
				try{
					var jsondata = JSON.parse(this.responseText);
					var rowdata = jsondata.events[0].event;
					eventUrl = rowdata.event_url;
					var started_date = rowdata.started_at.substring(0,10);
					var started_time = rowdata.started_at.substring(11,16);
					var ended_date = rowdata.ended_at.substring(0,10);
					var ended_time = rowdata.ended_at.substring(11,16);
					
					lbl.text = '';
					lbl.text = 'イベントID：'+ rowdata.event_id + '\n'
								+ 'イベントタイトル：' + rowdata.title + '\n'
								+ '開催日時：' + started_date + ' ' + started_time + '\n'
								+ '終了日時：' + ended_date + ' ' + ended_time + '\n'
								+ '開催場所：' + rowdata.address + '\n'
								+ '開催会場：' + rowdata.place + '\n'
								+ 'URL：' + eventUrl + '\n'
								+'定員：' + rowdata.limit + '\n';
				}catch(err){
					alert('JSON変換エラー:'+err.message);
				}
				
			},
			onerror:function(e){
				alert('error');
			},
			timeout: 5000
		});
		
		client.open('GET', url);
		client.send();
	}
	
	return self;
	
}

module.exports = DetailView;
