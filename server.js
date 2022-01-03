const linebot = require('linebot');
const config  = require('./config/config.json');
var users=[];

var userConfig = {};


var bot = linebot({
    "channelId": '1656774503',
    "channelSecret": 'bfc320f2d75a5dfa1bdcbee8dacd0a44',
    "channelAccessToken": 'PTZLWgy09+ybBrR5c4lcbblPf3y8vZsqrIwbgwlOmXfAzOsHwBUTBPg3bHN3HjvOVWYvXDijBxf1skk2HmNDFyz+kPI5a4BVmPRspm8tw99gB8w14bxVzzY5oRFmlyxZHOY147svwCXoFgdIHhb4rgdB04t89/1O/w1cDnyilFU='
});
bot.on('follow', function(event){
    event.source.profile().then(function (profile) {
        var replyMsg = [];
        var userName = profile.displayName;
        console.log("New Follow: "+userName);
        replyMsg.push('我是施利辰。\n感謝你願意協助我。');
        sendMessage(event,replyMsg,'');
    });
});

bot.on('message', function (event) {
    var replyMsg = [];
    event.source.profile().then(function (profile){
        var uid=profile.userId;
        if (users[uid]==undefined){
            users[uid]=[];
            users[uid].name=profile.displayName;
        }
        var msgtext = event.message.text;
        switch (msgtext){
            case '你好':
                sendMessage(event, '你好，之後也請多多指教了。');
                break;
            case '談鬼俱樂部':
                replyMsg.push('我對談鬼俱樂部知道的不多\n或許是因為我的經歷，呃，比起說故事的人更像參與者。');
                sendMessage(event, replyMsg);
                break;
            case '到此為止':
                sendMessage(event, '好的，我先暫停講話。');
                userConfig[uid] = evnet.timestamp+180;
                break;
            case '你還好嗎':
                sendMessage(event, '我很好。\n謝謝你關心。');
                break;
        }
        
        
    });
});


bot.on('join',function(event){
    var replyMsg = [];
    event.source.profile().then(function (profile){
        replyMsg.push(defaultReply(users[userId]));
        sendMessage(event,replyMsg);
    });
});
function sendMessage(event, replyMsg){
    event.source.profile().then(function (profile) {
        event.reply(replyMsg).then(function (data){
            console.log(replyMsg);
        }).catch(function (error) {
            console.log("--Reply Fail--");
            console.log(error);
        });
    });
}


const port = process.env.PORT;
bot.listen('/linewebhook', port, function () {
    console.log('Linebot Cat is running'); 
});