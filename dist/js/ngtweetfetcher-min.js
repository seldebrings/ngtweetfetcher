function tweetFactoryFunc(e,t,n,a,i){function r(e){h.maxTweets=e}function s(e){h.showReTweets=e}function l(e,t,n,a){this.profileName=e,this.userName=t,this.profileURL=n,this.imageURL=a}function w(e,t,n,a,i){this.id=e,this.url=t,this.tweetHtml=n,this.dateVO=a,this.authorVO=i}function c(e){this.dateHtml=e}function o(e){T=[];var t=document.createElement("div");t.innerHTML=e.body;for(var n=t.getElementsByClassName("timeline-TweetList-tweet"),a=n.length>h.maxTweets&&h.maxTweets?h.maxTweets:n.length,i=0;a>i;){var r=n[i].getElementsByClassName("timeline-Tweet-retweetCredit").length>0?!0:!1;if(!r||h.showReTweets){var s=n[i].getElementsByClassName("timeline-Tweet")[0],l=s.getElementsByClassName("timeline-Tweet-text")[0],o=s.getElementsByClassName("dt-updated")[0],u=new c(o.innerText),d=s.getElementsByClassName("timeline-Tweet-author")[0],p=m(d),g=s.getElementsByClassName("timeline-Tweet-timestamp")[0].href;T.push(new w("",g,l.innerHTML,u,p)),i++}else a<n.length&&a++,i++}return T}function m(e){var t=e.getElementsByClassName("TweetAuthor-name")[0].innerText,n=e.getElementsByClassName("TweetAuthor-screenName")[0].innerText,a=e.getElementsByTagName("img")[0].getAttribute("data-src-2x"),i=e.getElementsByTagName("a")[0].href;return new l(t,n,i,a)}function u(e){return T=o(e)}var h=this,T=[];return{tweets:[],setMaxTweets:r,setShowReTweets:s,parse:u}}function tweetServiceFunc(e,t){function n(n){var r=i+n+"?";return e.jsonp(r,a).then(function(e){return"object"==typeof e.data?e.data:t.reject(e.data)},function(e){return t.reject(e.data)})}var a={params:{lang:"en",suppress_response_codes:!0,rnd:Math.random(),callback:"JSON_CALLBACK"}},i="https://cdn.syndication.twimg.com/widgets/timelines/";return{load:n}}function tweetTimelineFunc(){return{restrict:"AECM",bindToController:!0,controllerAs:"vm",templateUrl:"templates/tweetTimeline.template.html",replace:!0,scope:{twitterId:"@",maxTweets:"@",showReTweets:"=?",isTicker:"=?",interval:"@"},controller:"TweetTimelineCtrl"}}function timelineTweetFunc(e){return{restrict:"E",replace:!0,scope:{tweet:"="},templateUrl:"templates/timelineTweet.template.html",compile:function(e,t){return{post:function(e,t,n){var a=t[0].getElementsByTagName("p")[0];a.innerHTML=e.tweet.tweetHtml}}}}}function tweetTimelineControllerFunc(e,t,n,a){var i=this;i.showReTweets=angular.isDefined(i.showReTweets)?i.showReTweets:!0,i.maxTweets=angular.isDefined(i.maxTweets)?i.maxTweets:0,i.isTicker=angular.isDefined(i.isTicker)?i.isTicker:!1,i.interval=angular.isDefined(i.interval)?i.interval:2e3,n.setMaxTweets(i.maxTweets),n.setShowReTweets(i.showReTweets),a.load(i.twitterId).then(function(e){i.tweets=n.parse(e),i.isTicker&&setInterval(i.refresh,i.interval)}),i.activeTweet=0,i.setTickerActive=function(e){return i.isTicker?e==i.activeTweet?1:0:!0},i.refresh=function(){e.$apply(function(){i.activeTweet++,i.activeTweet>=i.tweets.length&&(i.activeTweet=0)})}}angular.module("ng.tweetfetcher",[]),angular.module("ng.tweetfetcher").factory("TweetFactory",["$document","$http","$log","$q","$window",tweetFactoryFunc]),angular.module("ng.tweetfetcher").factory("TweetService",["$http","$q",tweetServiceFunc]),angular.module("ng.tweetfetcher").directive("tweetTimeline",["TweetFactory","TweetService",tweetTimelineFunc]),angular.module("ng.tweetfetcher").directive("timelineTweet",["$compile",timelineTweetFunc]),angular.module("ng.tweetfetcher").controller("TweetTimelineCtrl",["$scope","$http","TweetFactory","TweetService",tweetTimelineControllerFunc]),angular.module("ng.tweetfetcher").run(["$templateCache",function(e){e.put("templates/timelineTweet.template.html",'<li class="tweet-item">\n\n    <div class="tweet-content">\n        <div class="tweet-header">\n            <div class="tweet-avatar">\n                <a ng-href="{{tweet.authorVO.profileURL}}"\n                   data-scribe="element:user_link" target="_blank">\n                    <img class="tweet-img" alt="" ng-src="{{tweet.authorVO.imageURL}}">\n                </a>\n            </div>\n            <span>\n                <span><a ng-href="{{tweet.authorVO.profileURL}}">{{tweet.authorVO.profileName}}</a></span>\n                <span><a ng-href="{{tweet.authorVO.profileURL}}">{{tweet.authorVO.userName}}</a></span>\n            </span>\n            <span class="tweetTimePosted"><a ng-href="{{tweet.url}}">{{ tweet.dateVO.dateHtml }}</a></span>\n        </div>\n\n\n        <p class="tweet-text"></p>\n        <a class="tweet-expand" ng-href="{{ tweet.url }}"><b>Expand</b></a>\n    </div>\n    </div>\n <!--   TODO add show controls option -->\n<!--    <div class="tweet-interact">\n\n        <a ng-href="https://twitter.com/intent/tweet?in_reply_to={{ tweet.id }}" class="twitter_reply_icon" target="_blank">Reply</a>\n        <a ng-href="https://twitter.com/intent/retweet?tweet_id={{ tweet.id }}" class="twitter_retweet_icon" target="_blank">Retweet</a>\n        <a ng-href="https://twitter.com/intent/favorite?tweet_id={{ tweet.id }}" class="twitter_fav_icon" target="_blank">Favorite</a>\n\n    </div>-->\n\n</li>')}]),angular.module("ng.tweetfetcher").run(["$templateCache",function(e){e.put("templates/tweetTimeline.template.html","<ol class=\"tweet-list\" >\n\n    <timeline-tweet ng-show=\"vm.setTickerActive($index)\" ng-repeat='tweet in vm.tweets track by $index'  tweet='tweet'>\n    </timeline-tweet>\n</ol>\n\n")}]);