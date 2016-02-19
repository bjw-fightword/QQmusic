document.addEventListener('readystatechange',function(){
	if(document.readyState==='complete'){
		var audio = document.querySelector('audio');
		var state = document.querySelector('#spanplayer_bgbar');
		var statebtn = document.querySelector('#spanprogress_op');
		var time = document.querySelector('.time_show');
		var timeshow = document.querySelector('#time_show');
		var stateline = document.querySelector('#spanplaybar');
		var btnplay = document.querySelector('#btnplay');
		var vol = document.querySelector('#spanvolume');
		var volbtn = document.querySelector('#spanvolumeop');
		var mute = document.querySelector('#spanmute');
		var volline = document.querySelector('#spanvolumebar');
		var divsonglist = document.querySelector('#divsonglist');
		var musicname = document.querySelector('.music_name');
		var singername = document.querySelector('.singer_name');
		var ptime = document.querySelector('#ptime');
		var spansongnum1 = document.querySelector('#spansongnum1');
		var prevbt = document.querySelector('.prev_bt');
		var nextbt = document.querySelector('.next_bt');
		var musicop = document.querySelector('.music_op');
		var yinyueku=[
		{name:'雨一直下',src:'009.mp3',singer:'张宇',duration:'4:50'},
		{name:'Apologize',src:'005.mp3',singer:'Timbaland',duration:'3:04'},
		{name:'光辉岁月（国语）',src:'006.mp3',singer:'BEYOND',duration:'5:02'},
		{name:'突然的自我',src:'001.mp3',singer:'伍佰',duration:'3:35'},
		{name:'男人歌',src:'002.mp3',singer:'小沈阳',duration:'4:16'},
		{name:'芈月传',src:'016.mp3',singer:'原子霏',duration:'3:53'},
		];
//uireset
var uireset=function(){
	downloadbar.style.width=0;
	spanprogress_op.style.left=0;
	musicname.innerHTML='<span>听我喜欢的歌</span>';
	singername.innerHTML='<span>QQ音乐</span>';
	ptime.innerHTML='';
	audio.src='';
	btnplay.classList.remove('pause_bt');
	btnplay.classList.add('play_bt');

}
//player
btnfold.onclick = function(){
	if (divplayer.style.left == '0px') {
		divplayer.style.left = '-540px'
		this.title = '点击展开'
		divplayer.classList.add('m_player_folded')
		divplayer.classList.add('m_player_playing')
	}else{
		divplayer.style.left = 0
		this.title = '点击收起'
		divplayer.classList.remove('m_player_folded')
		divplayer.classList.remove('m_player_playing')
	}
}
//列表
var createlist = function(){
	var song = '';
	//展开播放列表
	spansongnum1.innerHTML = '<span>'+yinyueku.length+'</span>'
	spansongnum1.onclick = function(){
		if(divplayframe.style.display == 'block'){
			divplayframe.style.display = 'none';
		}else{
			divplayframe.style.display = 'block';
		}
	}
	btnclose.onclick = function(){
		if(divplayframe.style.display == 'block'){
			divplayframe.style.display = 'none';
		}else{
			divplayframe.style.display = 'block';
		}
	}


	if(yinyueku.length === 0){
		divsonglist.firstElementChild.innerHTML = '';
	}else{
		for (var i = 0; i < yinyueku.length; i++) {
			var sl = (i === songindex)?'play_current':'';
			song += '<li data-index="'+i+'"class="'+sl+'"><strong class="music_name" title="'+yinyueku[i].name+'">'+yinyueku[i].name+'</strong><strong class="singer_name" title="'+yinyueku[i].singer+'">'+yinyueku[i].singer+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_000Nz08A0aZNuz" mid="000Nz08A0aZNuz"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
			divsonglist.firstElementChild.innerHTML = song;
		}
	}
}
createlist();
//清空列表
var btndel;
clear_list.onclick = function(){
	yinyueku = [];
	uireset();
	createlist();
}
var delsong = function(){
	btndel = document.querySelectorAll('.btn_del');
	for(var i = 0;i < btndel.length;i++){
		btndel[i].index = i;
		btndel[i].onclick = function(ev){
			ev.stopPropagation();
			if(songindex > this.index){
				songindex -=1;
			}else if(songindex == this.index){
				if(songindex != yinyueku.length-1){
					audio.src = yinyueku[songindex+1].src;
					audio.play();
					musicname.innerHTML = yinyueku[songindex+1].name;
					musicname.title = yinyueku[songindex+1].name;
					singername.innerHTML = yinyueku[songindex+1].singer;
					singername.title = yinyueku[songindex+1].singer;
					ptime.innerHTML = yinyueku[songindex+1].duration;
				}else if(songindex == yinyueku.length-1 && songindex !=0){
					songindex = 0;
					audio.src = yinyueku[0].src;
					audio.play();
					musicname.innerHTML = yinyueku[0].name;
					musicname.title = yinyueku[0].name;
					singername.innerHTML = yinyueku[0].singer;
					singername.title = yinyueku[0].singer;
					ptime.innerHTML = yinyueku[0].duration;
				}else{
					audio.src = '';
					uireset();
				}
			}
			var newlist = [];
			for(var j = 0;j < yinyueku.length;j++){
				if(yinyueku[this.index] != yinyueku[j]){
					newlist.push(yinyueku[j]);
				}
			} 
			yinyueku = newlist;
			createlist();
			songlists();
		}
	}
}
delsong();
//列表播放
var songindex;
var songlist;
var songlists = function(){
	songlist = divsonglist.firstElementChild.children;
	for(var i = 0; i < songlist.length; i++){
		songlist[i].index = i;
		songlist[i].onclick = function(){
			songindex = this.index;
			onsongchange();
			audio.play();
		}
		songlist[i].onmouseover = function(){
			for(var i = 0; i <songlist.length; i++){
				songlist[i].classList.remove('play_hover');
			}
			this.classList.add('play_hover');
		}
		songlist[i].onmouseout = function(){
			for(var i = 0; i <songlist.length; i++){
				songlist[i].classList.remove('play_hover');
			}
		}
	}
	delsong();
}
songlists();
var onsongchange = function(){
	for(var i = 0; i <songlist.length; i++){
		songlist[i].classList.remove('play_current');
	}
	audio.src = yinyueku[songlist[songindex].getAttribute('data-index')].src;
	songlist[songindex].classList.add('play_current');
	musicname.innerHTML = yinyueku[songindex].name;
	musicname.title = yinyueku[songindex].name;
	singername.innerHTML = yinyueku[songindex].singer;
	singername.title = yinyueku[songindex].singer;
	ptime.innerHTML = yinyueku[songindex].duration;
	musicop.style.display = 'block';
}
//下一首
nextbt.onclick = function(){
			if(playway === UNORDERED){
				random();
			}else{
				next();
			}
		}
var next = function(){
			if(songindex === undefined){
				return;
			}else{
				songindex = (songindex == yinyueku.length-1)?0:songindex+=1;
				onsongchange();
				audio.play();
			}
		}
//上一首
prevbt.onclick = function(){
			if(playway === UNORDERED){
				random();
			}else{
				prev();
			}
		}
var prev = function(){
			if(songindex === undefined){
				return;
			}else{
				songindex = (songindex === 0)?yinyueku.length-1:songindex-=1;
				onsongchange();
				audio.play();
			}
		}

//播放模式
btnPlayway.onclick=function(){
	divselect.style.display='block';
}
setbofangmoshi=function(num){
	currentbofangmoshi=num;
	divselect.style.display='none';
	var data={
		1:'cycle_single_bt',
		2:'cycle_bt',
		3:'ordered_bt',
		4:'unordered_bt'
	};
	btnPlayway.className.add=data[num];
}

//循环
var CYCLE_SINGLE = 1,ORDERED = 2,CYCLE = 3,UNORDERED = 4;
var playway = CYCLE;
btnPlayway.onclick = function(){
	divselect.style.display = 'block';
}
playmode = function(num){
	playway = num;
	//1=>单曲 2=>顺序 3=>列表 4=>随机
	if(playway === CYCLE_SINGLE){
		audio.loop = true;
	}else{
		audio.loop = false;
	}
	var data = [
		{classname:'cycle_single_bt',modename:'单曲循环'},
		{classname:'ordered_bt',modename:'顺序播放'},
		{classname:'cycle_bt',modename:'列表循环'},
		{classname:'unordered_bt',modename:'随机播放'}
	]
	btnPlayway.className = data[num-1].classname;
	btnPlayway.innerHTML = '<span>'+data[num-1].modename+'</span>'
	btnPlayway.title = data[num-1].modename;
	divselect.style.display = 'none';
}
var random = function(){
	var oldindex = songindex;
	songindex = Math.floor(Math.random()*yinyueku.length);
	while(oldindex === songindex){
		songindex = Math.floor(Math.random()*yinyueku.length);
	}
	onsongchange();
	audio.play();
}













//进度控制
state.onclick = function(ev){
	audio.currentTime = audio.duration*ev.offsetX/state.offsetWidth;
		}
spanplaybar.onclick = function(ev){
			audio.currentTime = audio.duration*ev.offsetX/state.offsetWidth;
		}
statebtn.onclick = function(ev){
			ev.stopPropagation();
		}
audio.ontimeupdate = function(){
			var ste = state.offsetWidth * (audio.currentTime/audio.duration) - statebtn.offsetWidth/2;
			statebtn.style.left = ste + 'px';
			stateline.style.width = state.offsetWidth * (audio.currentTime/audio.duration) + 'px';
			if(audio.ended){
				if(playway === CYCLE){
					next();
				}else if(playway === ORDERED){
					if(songindex !== yinyueku.length-1){
						next();
					}
				}else if(playway === UNORDERED){
					random();
				}
			}
		}
//进度条悬浮显示
var zhuanhuan = function(a){
	if(a > 0){
		var az = parseInt(a);
		var min = parseInt(az/60);
		var s = az%60;
		return min+':'+s;
		}else{
			return '0:0';
		}
	}
state.onmouseover = spanplaybar.onmouseover = function(ev){
	time.style.display = 'block';
		var timepoint = audio.duration*ev.offsetX/state.offsetWidth;
		timeshow.innerHTML = zhuanhuan(timepoint);
		time.style.left = ev.offsetX - time.offsetWidth/2 + 'px';
		}
statebtn.onmouseover = function(ev){
			ev.stopPropagation();
		}
state.onmousemove = spanplaybar.onmousemove = function(ev){
	var timepoint = audio.duration*ev.offsetX/state.offsetWidth;
	timeshow.innerHTML = zhuanhuan(timepoint);
	time.style.left = ev.offsetX - time.offsetWidth/2 + 'px';
	}
state.onmouseout = function(ev){
	time.style.display = 'none';
	}
//音量
vol.onclick = function(ev){
	audio.volume = ev.offsetX/vol.offsetWidth;
}
mute.onclick = (function(){
	var oldvol;
	return function(){
		if(audio.volume !== 0){
			oldvol = audio.volume;
			audio.volume = 0;
		}else{
			audio.volume = oldvol;
		}
	} 
})();
audio.onvolumechange = function(){
	if(audio.volume === 0){
		mute.classList.remove('volume_icon');
		mute.classList.add('volume_mute');

	}else{
		mute.classList.remove('volume_mute');
		mute.classList.add('volume_icon');
	}
	var le = vol.offsetWidth*audio.volume - volbtn.offsetWidth/2;
	volbtn.style.left = le + 'px';
	volline.style.width = vol.offsetWidth*audio.volume + 'px';

}
volbtn.onclick = function(ev){
	ev.stopPropagation();
}
//播放暂停
btnplay.onclick = function(){
	if(audio.paused){
		audio.play();
	}else{
		audio.pause();
	}
		}
audio.onplay = function(){
	btnplay.classList.remove('play_bt');
	btnplay.classList.add('pause_bt');
		}
audio.onpause = function(){
	btnplay.classList.remove('pause_bt');
	btnplay.classList.add('play_bt');
		}
	}
},false)