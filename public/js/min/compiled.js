!function n(t,e,r){function u(i,a){if(!e[i]){if(!t[i]){var c="function"==typeof require&&require;if(!a&&c)return c(i,!0);if(o)return o(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var s=e[i]={exports:{}};t[i][0].call(s.exports,function(n){var e=t[i][1][n];return u(e?e:n)},s,s.exports,n,t,e,r)}return e[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)u(r[i]);return u}({1:[function(n,t,e){var r="map-canvas",u=n("./lib/geo_lit");console.log(r),u.init(r,function(n){console.log(n?n:"map initialzed")});var o=n("./components/addPlaceForm.jsx");React.render(React.createElement("div",null,React.createElement(o,null)),document.getElementById("content"))},{"./components/addPlaceForm.jsx":3,"./lib/geo_lit":5}],2:[function(n,t,e){(function(n){var e={},e={};if(e.environment=n.env.NODE_ENV?n.env.NODE_ENV:"development","development"===e.environment)e.sessionSecret="super secret",e.cookieSecrety="super secret",e.mongoUrl="mongodb://localhost/test_point_db",e.geoLitEndpoint="http://localhost:3000",e.port=3e3;else if("production"!==e.environment)throw"Unkonwn config flag.";t.exports=e}).call(this,n("_process"))},{_process:8}],3:[function(n,t,e){var r=(n("../lib/services.js"),n("../lib/geo_lit.js"));t.exports=React.createClass({displayName:"exports",getInitialState:function(){return{placeValue:"",errorMessage:""}},render:function(){var n="js-add-place button expand";return React.createElement("div",null,React.createElement("div",null,this.state.errorMessage),React.createElement("form",null,React.createElement("div",{className:"row"},React.createElement("div",{className:"small-12 columns"},React.createElement("input",{type:"text",name:"title",placeholder:"Title",value:this.state.placeValue,onChange:this.updatePlaceValue}),React.createElement("a",{href:"javascript:void(0)",onClick:this.addPlace,className:n},"Add Place")))))},updatePlaceValue:function(n){this.setState({placeValue:n.target.value})},addPlace:function(n){var t=this;n.preventDefault(),r.addPlace(this.state.placeValue,function(n){n&&t.setState({errorMessage:n})})}})},{"../lib/geo_lit.js":5,"../lib/services.js":6}],4:[function(n,t,e){var r=n("../../../config.js");t.exports={log:function(n){r.debug&&console.log(n)}}},{"../../../config.js":2}],5:[function(n,t,e){var r={},u=n("underscore"),o=n("./user"),i=n("./services"),a=(n("./debug"),5),c=!1,l=.1,s="You must be logged in.";r.map=null,r.currentLatitude=null,r.currentLongitude=null,r.mapFollow=!0,r.intervalId=null,r.intervalTime=5e3,r.mapId=null,r.placeMarkers={},r.userMarker=null,r.zoomLevel=12,r.createMap=function(){var n={zoom:r.zoomLevel,center:new google.maps.LatLng(r.currentLatitude,r.currentLongitude)};r.map=new google.maps.Map(document.getElementById(r.mapId),n)},r.getPosition=function(n){navigator.geolocation.getCurrentPosition(function(t){n(null,{latitude:t.coords.latitude,longitude:t.coords.longitude})},n)},r.init=function(n,t){r.mapId=n,google.maps.event.addDomListener(window,"load",function(){r.updatePosition(function(n){n?t(n):(r.createMap(),r.updateUserMarker(),r.intervalId=window.setInterval(r.intervalCallback,r.intervalTime),t())})})},r.updatePosition=function(n){navigator.geolocation.getCurrentPosition(function(t){r.currentLatitude=t.coords.latitude,r.currentLongitude=t.coords.longitude,n()},n)},r.addPlacesToMap=function(n){u.each(n,function(n){var t=new google.maps.LatLng(n.location[1],n.location[0]);r.placeMarkers[n._id]=new google.maps.Marker({position:t,map:r.map,title:"Current Position",geoLit:{_id:n._id}}),google.maps.event.addListener(r.placeMarkers[n._id],"click",function(){})})},r.updatePlaces=function(n){i.findNear({latitude:r.currentLatitude,longitude:r.currentLongitude,range:a},function(n,t){var e=u.filter(t,function(n){return"undefined"==typeof r.placeMarkers[n._id]});r.addPlacesToMap(e)})},r.updateUserMarker=function(){null!==r.userMarker&&r.userMarker.setMap(null);var n=new google.maps.LatLng(r.currentLatitude+.002,r.currentLongitude+.002);r.userMarker=new google.maps.Marker({position:n,map:r.map,title:"Current Position"}),r.mapFollow&&r.recenterMap()},r.recenterMap=function(){var n=new google.maps.LatLng(r.currentLatitude,r.currentLongitude);r.map.panTo(n)},r.intervalCallback=function(){var n=!0;r.updatePosition(function(t){return c&&(r.currentLatitude+=Math.random()*l,r.currentLongitude+=Math.random()*l),t?void console.log(t):(r.updateUserMarker(),void(n&&r.updatePlaces(function(n){n&&console.log(n)})))})},r.addPlace=function(n,t){return o.isLoggedIn?void r.getPosition(function(e,r){if(e)return void t("Unable to find location.");var u={};u.location=[r.longitude,r.latitude],u.title=n,u.user=o.id,i.add(u,function(n,e){n?t(n):t()})}):void t(s)},t.exports=r},{"./debug":4,"./services":6,"./user":7,underscore:9}],6:[function(n,t,e){var r={},u=n("../../../config.js"),o=n("./debug"),i="A server error occurred.";r.add=function(n,t){$.ajax({type:"POST",url:u.geoLitEndpoint+"/position",data:n,success:function(n){"success"===n.status?t():t(n.errorMessage)},error:function(n){console.log(n),t(i)},dataType:"JSON"})},r.findNear=function(n,t){$.ajax({type:"GET",url:u.geoLitEndpoint+"/positions-near",data:n,success:function(n){"undefined"==typeof n.status||"success"!==n.status?t(n.errorMessage):t(null,n.data)},error:function(n){o.log(n),t(i)},dataType:"JSON"})},t.exports=r},{"../../../config.js":2,"./debug":4}],7:[function(n,t,e){var r={};r.data={},r.isLoggedIn=!0,r.id=777,t.exports=r},{}],8:[function(n,t,e){function r(){s=!1,a.length?l=a.concat(l):f=-1,l.length&&u()}function u(){if(!s){var n=setTimeout(r);s=!0;for(var t=l.length;t;){for(a=l,l=[];++f<t;)a[f].run();f=-1,t=l.length}a=null,s=!1,clearTimeout(n)}}function o(n,t){this.fun=n,this.array=t}function i(){}var a,c=t.exports={},l=[],s=!1,f=-1;c.nextTick=function(n){var t=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)t[e-1]=arguments[e];l.push(new o(n,t)),s||setTimeout(u,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=i,c.addListener=i,c.once=i,c.off=i,c.removeListener=i,c.removeAllListeners=i,c.emit=i,c.binding=function(n){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(n){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},{}],9:[function(n,t,e){(function(){function n(n){function t(t,e,r,u,o,i){for(;o>=0&&i>o;o+=n){var a=u?u[o]:o;r=e(r,t[a],a,t)}return r}return function(e,r,u,o){r=x(r,o,4);var i=!O(e)&&w.keys(e),a=(i||e).length,c=n>0?0:a-1;return arguments.length<3&&(u=e[i?i[c]:c],c+=n),t(e,r,u,i,c,a)}}function r(n){return function(t,e,r){e=_(e,r);for(var u=E(t),o=n>0?0:u-1;o>=0&&u>o;o+=n)if(e(t[o],o,t))return o;return-1}}function u(n,t,e){return function(r,u,o){var i=0,a=E(r);if("number"==typeof o)n>0?i=o>=0?o:Math.max(o+a,i):a=o>=0?Math.min(o+1,a):o+a+1;else if(e&&o&&a)return o=e(r,u),r[o]===u?o:-1;if(u!==u)return o=t(p.call(r,i,a),w.isNaN),o>=0?o+i:-1;for(o=n>0?i:a-1;o>=0&&a>o;o+=n)if(r[o]===u)return o;return-1}}function o(n,t){var e=I.length,r=n.constructor,u=w.isFunction(r)&&r.prototype||l,o="constructor";for(w.has(n,o)&&!w.contains(t,o)&&t.push(o);e--;)o=I[e],o in n&&n[o]!==u[o]&&!w.contains(t,o)&&t.push(o)}var i=this,a=i._,c=Array.prototype,l=Object.prototype,s=Function.prototype,f=c.push,p=c.slice,d=l.toString,v=l.hasOwnProperty,g=Array.isArray,h=Object.keys,m=s.bind,y=Object.create,b=function(){},w=function(n){return n instanceof w?n:this instanceof w?void(this._wrapped=n):new w(n)};"undefined"!=typeof e?("undefined"!=typeof t&&t.exports&&(e=t.exports=w),e._=w):i._=w,w.VERSION="1.8.3";var x=function(n,t,e){if(void 0===t)return n;switch(null==e?3:e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return function(){return n.apply(t,arguments)}},_=function(n,t,e){return null==n?w.identity:w.isFunction(n)?x(n,t,e):w.isObject(n)?w.matcher(n):w.property(n)};w.iteratee=function(n,t){return _(n,t,1/0)};var j=function(n,t){return function(e){var r=arguments.length;if(2>r||null==e)return e;for(var u=1;r>u;u++)for(var o=arguments[u],i=n(o),a=i.length,c=0;a>c;c++){var l=i[c];t&&void 0!==e[l]||(e[l]=o[l])}return e}},k=function(n){if(!w.isObject(n))return{};if(y)return y(n);b.prototype=n;var t=new b;return b.prototype=null,t},M=function(n){return function(t){return null==t?void 0:t[n]}},L=Math.pow(2,53)-1,E=M("length"),O=function(n){var t=E(n);return"number"==typeof t&&t>=0&&L>=t};w.each=w.forEach=function(n,t,e){t=x(t,e);var r,u;if(O(n))for(r=0,u=n.length;u>r;r++)t(n[r],r,n);else{var o=w.keys(n);for(r=0,u=o.length;u>r;r++)t(n[o[r]],o[r],n)}return n},w.map=w.collect=function(n,t,e){t=_(t,e);for(var r=!O(n)&&w.keys(n),u=(r||n).length,o=Array(u),i=0;u>i;i++){var a=r?r[i]:i;o[i]=t(n[a],a,n)}return o},w.reduce=w.foldl=w.inject=n(1),w.reduceRight=w.foldr=n(-1),w.find=w.detect=function(n,t,e){var r;return r=O(n)?w.findIndex(n,t,e):w.findKey(n,t,e),void 0!==r&&-1!==r?n[r]:void 0},w.filter=w.select=function(n,t,e){var r=[];return t=_(t,e),w.each(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r},w.reject=function(n,t,e){return w.filter(n,w.negate(_(t)),e)},w.every=w.all=function(n,t,e){t=_(t,e);for(var r=!O(n)&&w.keys(n),u=(r||n).length,o=0;u>o;o++){var i=r?r[o]:o;if(!t(n[i],i,n))return!1}return!0},w.some=w.any=function(n,t,e){t=_(t,e);for(var r=!O(n)&&w.keys(n),u=(r||n).length,o=0;u>o;o++){var i=r?r[o]:o;if(t(n[i],i,n))return!0}return!1},w.contains=w.includes=w.include=function(n,t,e,r){return O(n)||(n=w.values(n)),("number"!=typeof e||r)&&(e=0),w.indexOf(n,t,e)>=0},w.invoke=function(n,t){var e=p.call(arguments,2),r=w.isFunction(t);return w.map(n,function(n){var u=r?t:n[t];return null==u?u:u.apply(n,e)})},w.pluck=function(n,t){return w.map(n,w.property(t))},w.where=function(n,t){return w.filter(n,w.matcher(t))},w.findWhere=function(n,t){return w.find(n,w.matcher(t))},w.max=function(n,t,e){var r,u,o=-(1/0),i=-(1/0);if(null==t&&null!=n){n=O(n)?n:w.values(n);for(var a=0,c=n.length;c>a;a++)r=n[a],r>o&&(o=r)}else t=_(t,e),w.each(n,function(n,e,r){u=t(n,e,r),(u>i||u===-(1/0)&&o===-(1/0))&&(o=n,i=u)});return o},w.min=function(n,t,e){var r,u,o=1/0,i=1/0;if(null==t&&null!=n){n=O(n)?n:w.values(n);for(var a=0,c=n.length;c>a;a++)r=n[a],o>r&&(o=r)}else t=_(t,e),w.each(n,function(n,e,r){u=t(n,e,r),(i>u||u===1/0&&o===1/0)&&(o=n,i=u)});return o},w.shuffle=function(n){for(var t,e=O(n)?n:w.values(n),r=e.length,u=Array(r),o=0;r>o;o++)t=w.random(0,o),t!==o&&(u[o]=u[t]),u[t]=e[o];return u},w.sample=function(n,t,e){return null==t||e?(O(n)||(n=w.values(n)),n[w.random(n.length-1)]):w.shuffle(n).slice(0,Math.max(0,t))},w.sortBy=function(n,t,e){return t=_(t,e),w.pluck(w.map(n,function(n,e,r){return{value:n,index:e,criteria:t(n,e,r)}}).sort(function(n,t){var e=n.criteria,r=t.criteria;if(e!==r){if(e>r||void 0===e)return 1;if(r>e||void 0===r)return-1}return n.index-t.index}),"value")};var A=function(n){return function(t,e,r){var u={};return e=_(e,r),w.each(t,function(r,o){var i=e(r,o,t);n(u,r,i)}),u}};w.groupBy=A(function(n,t,e){w.has(n,e)?n[e].push(t):n[e]=[t]}),w.indexBy=A(function(n,t,e){n[e]=t}),w.countBy=A(function(n,t,e){w.has(n,e)?n[e]++:n[e]=1}),w.toArray=function(n){return n?w.isArray(n)?p.call(n):O(n)?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:O(n)?n.length:w.keys(n).length},w.partition=function(n,t,e){t=_(t,e);var r=[],u=[];return w.each(n,function(n,e,o){(t(n,e,o)?r:u).push(n)}),[r,u]},w.first=w.head=w.take=function(n,t,e){return null==n?void 0:null==t||e?n[0]:w.initial(n,n.length-t)},w.initial=function(n,t,e){return p.call(n,0,Math.max(0,n.length-(null==t||e?1:t)))},w.last=function(n,t,e){return null==n?void 0:null==t||e?n[n.length-1]:w.rest(n,Math.max(0,n.length-t))},w.rest=w.tail=w.drop=function(n,t,e){return p.call(n,null==t||e?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var N=function(n,t,e,r){for(var u=[],o=0,i=r||0,a=E(n);a>i;i++){var c=n[i];if(O(c)&&(w.isArray(c)||w.isArguments(c))){t||(c=N(c,t,e));var l=0,s=c.length;for(u.length+=s;s>l;)u[o++]=c[l++]}else e||(u[o++]=c)}return u};w.flatten=function(n,t){return N(n,t,!1)},w.without=function(n){return w.difference(n,p.call(arguments,1))},w.uniq=w.unique=function(n,t,e,r){w.isBoolean(t)||(r=e,e=t,t=!1),null!=e&&(e=_(e,r));for(var u=[],o=[],i=0,a=E(n);a>i;i++){var c=n[i],l=e?e(c,i,n):c;t?(i&&o===l||u.push(c),o=l):e?w.contains(o,l)||(o.push(l),u.push(c)):w.contains(u,c)||u.push(c)}return u},w.union=function(){return w.uniq(N(arguments,!0,!0))},w.intersection=function(n){for(var t=[],e=arguments.length,r=0,u=E(n);u>r;r++){var o=n[r];if(!w.contains(t,o)){for(var i=1;e>i&&w.contains(arguments[i],o);i++);i===e&&t.push(o)}}return t},w.difference=function(n){var t=N(arguments,!0,!0,1);return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){return w.unzip(arguments)},w.unzip=function(n){for(var t=n&&w.max(n,E).length||0,e=Array(t),r=0;t>r;r++)e[r]=w.pluck(n,r);return e},w.object=function(n,t){for(var e={},r=0,u=E(n);u>r;r++)t?e[n[r]]=t[r]:e[n[r][0]]=n[r][1];return e},w.findIndex=r(1),w.findLastIndex=r(-1),w.sortedIndex=function(n,t,e,r){e=_(e,r,1);for(var u=e(t),o=0,i=E(n);i>o;){var a=Math.floor((o+i)/2);e(n[a])<u?o=a+1:i=a}return o},w.indexOf=u(1,w.findIndex,w.sortedIndex),w.lastIndexOf=u(-1,w.findLastIndex),w.range=function(n,t,e){null==t&&(t=n||0,n=0),e=e||1;for(var r=Math.max(Math.ceil((t-n)/e),0),u=Array(r),o=0;r>o;o++,n+=e)u[o]=n;return u};var P=function(n,t,e,r,u){if(!(r instanceof t))return n.apply(e,u);var o=k(n.prototype),i=n.apply(o,u);return w.isObject(i)?i:o};w.bind=function(n,t){if(m&&n.bind===m)return m.apply(n,p.call(arguments,1));if(!w.isFunction(n))throw new TypeError("Bind must be called on a function");var e=p.call(arguments,2),r=function(){return P(n,r,t,this,e.concat(p.call(arguments)))};return r},w.partial=function(n){var t=p.call(arguments,1),e=function(){for(var r=0,u=t.length,o=Array(u),i=0;u>i;i++)o[i]=t[i]===w?arguments[r++]:t[i];for(;r<arguments.length;)o.push(arguments[r++]);return P(n,e,this,this,o)};return e},w.bindAll=function(n){var t,e,r=arguments.length;if(1>=r)throw new Error("bindAll must be passed function names");for(t=1;r>t;t++)e=arguments[t],n[e]=w.bind(n[e],n);return n},w.memoize=function(n,t){var e=function(r){var u=e.cache,o=""+(t?t.apply(this,arguments):r);return w.has(u,o)||(u[o]=n.apply(this,arguments)),u[o]};return e.cache={},e},w.delay=function(n,t){var e=p.call(arguments,2);return setTimeout(function(){return n.apply(null,e)},t)},w.defer=w.partial(w.delay,w,1),w.throttle=function(n,t,e){var r,u,o,i=null,a=0;e||(e={});var c=function(){a=e.leading===!1?0:w.now(),i=null,o=n.apply(r,u),i||(r=u=null)};return function(){var l=w.now();a||e.leading!==!1||(a=l);var s=t-(l-a);return r=this,u=arguments,0>=s||s>t?(i&&(clearTimeout(i),i=null),a=l,o=n.apply(r,u),i||(r=u=null)):i||e.trailing===!1||(i=setTimeout(c,s)),o}},w.debounce=function(n,t,e){var r,u,o,i,a,c=function(){var l=w.now()-i;t>l&&l>=0?r=setTimeout(c,t-l):(r=null,e||(a=n.apply(o,u),r||(o=u=null)))};return function(){o=this,u=arguments,i=w.now();var l=e&&!r;return r||(r=setTimeout(c,t)),l&&(a=n.apply(o,u),o=u=null),a}},w.wrap=function(n,t){return w.partial(t,n)},w.negate=function(n){return function(){return!n.apply(this,arguments)}},w.compose=function(){var n=arguments,t=n.length-1;return function(){for(var e=t,r=n[t].apply(this,arguments);e--;)r=n[e].call(this,r);return r}},w.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},w.before=function(n,t){var e;return function(){return--n>0&&(e=t.apply(this,arguments)),1>=n&&(t=null),e}},w.once=w.partial(w.before,2);var S=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];w.keys=function(n){if(!w.isObject(n))return[];if(h)return h(n);var t=[];for(var e in n)w.has(n,e)&&t.push(e);return S&&o(n,t),t},w.allKeys=function(n){if(!w.isObject(n))return[];var t=[];for(var e in n)t.push(e);return S&&o(n,t),t},w.values=function(n){for(var t=w.keys(n),e=t.length,r=Array(e),u=0;e>u;u++)r[u]=n[t[u]];return r},w.mapObject=function(n,t,e){t=_(t,e);for(var r,u=w.keys(n),o=u.length,i={},a=0;o>a;a++)r=u[a],i[r]=t(n[r],r,n);return i},w.pairs=function(n){for(var t=w.keys(n),e=t.length,r=Array(e),u=0;e>u;u++)r[u]=[t[u],n[t[u]]];return r},w.invert=function(n){for(var t={},e=w.keys(n),r=0,u=e.length;u>r;r++)t[n[e[r]]]=e[r];return t},w.functions=w.methods=function(n){var t=[];for(var e in n)w.isFunction(n[e])&&t.push(e);return t.sort()},w.extend=j(w.allKeys),w.extendOwn=w.assign=j(w.keys),w.findKey=function(n,t,e){t=_(t,e);for(var r,u=w.keys(n),o=0,i=u.length;i>o;o++)if(r=u[o],t(n[r],r,n))return r},w.pick=function(n,t,e){var r,u,o={},i=n;if(null==i)return o;w.isFunction(t)?(u=w.allKeys(i),r=x(t,e)):(u=N(arguments,!1,!1,1),r=function(n,t,e){return t in e},i=Object(i));for(var a=0,c=u.length;c>a;a++){var l=u[a],s=i[l];r(s,l,i)&&(o[l]=s)}return o},w.omit=function(n,t,e){if(w.isFunction(t))t=w.negate(t);else{var r=w.map(N(arguments,!1,!1,1),String);t=function(n,t){return!w.contains(r,t)}}return w.pick(n,t,e)},w.defaults=j(w.allKeys,!0),w.create=function(n,t){var e=k(n);return t&&w.extendOwn(e,t),e},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n},w.isMatch=function(n,t){var e=w.keys(t),r=e.length;if(null==n)return!r;for(var u=Object(n),o=0;r>o;o++){var i=e[o];if(t[i]!==u[i]||!(i in u))return!1}return!0};var T=function(n,t,e,r){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=d.call(n);if(u!==d.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var o="[object Array]"===u;if(!o){if("object"!=typeof n||"object"!=typeof t)return!1;var i=n.constructor,a=t.constructor;if(i!==a&&!(w.isFunction(i)&&i instanceof i&&w.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}e=e||[],r=r||[];for(var c=e.length;c--;)if(e[c]===n)return r[c]===t;if(e.push(n),r.push(t),o){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!T(n[c],t[c],e,r))return!1}else{var l,s=w.keys(n);if(c=s.length,w.keys(t).length!==c)return!1;for(;c--;)if(l=s[c],!w.has(t,l)||!T(n[l],t[l],e,r))return!1}return e.pop(),r.pop(),!0};w.isEqual=function(n,t){return T(n,t)},w.isEmpty=function(n){return null==n?!0:O(n)&&(w.isArray(n)||w.isString(n)||w.isArguments(n))?0===n.length:0===w.keys(n).length},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=g||function(n){return"[object Array]"===d.call(n)},w.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},w.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){w["is"+n]=function(t){return d.call(t)==="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return w.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(w.isFunction=function(n){return"function"==typeof n||!1}),w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!==+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===d.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return void 0===n},w.has=function(n,t){return null!=n&&v.call(n,t)},w.noConflict=function(){return i._=a,this},w.identity=function(n){return n},w.constant=function(n){return function(){return n}},w.noop=function(){},w.property=M,w.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},w.matcher=w.matches=function(n){return n=w.extendOwn({},n),function(t){return w.isMatch(t,n)}},w.times=function(n,t,e){var r=Array(Math.max(0,n));t=x(t,e,1);for(var u=0;n>u;u++)r[u]=t(u);return r},w.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},w.now=Date.now||function(){return(new Date).getTime()};var F={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},R=w.invert(F),B=function(n){var t=function(t){return n[t]},e="(?:"+w.keys(n).join("|")+")",r=RegExp(e),u=RegExp(e,"g");return function(n){return n=null==n?"":""+n,r.test(n)?n.replace(u,t):n}};w.escape=B(F),w.unescape=B(R),w.result=function(n,t,e){var r=null==n?void 0:n[t];return void 0===r&&(r=e),w.isFunction(r)?r.call(n):r};var C=0;w.uniqueId=function(n){var t=++C+"";return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,D={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},z=/\\|'|\r|\n|\u2028|\u2029/g,U=function(n){return"\\"+D[n]};w.template=function(n,t,e){!t&&e&&(t=e),t=w.defaults({},t,w.templateSettings);var r=RegExp([(t.escape||q).source,(t.interpolate||q).source,(t.evaluate||q).source].join("|")+"|$","g"),u=0,o="__p+='";n.replace(r,function(t,e,r,i,a){return o+=n.slice(u,a).replace(z,U),u=a+t.length,e?o+="'+\n((__t=("+e+"))==null?'':_.escape(__t))+\n'":r?o+="'+\n((__t=("+r+"))==null?'':__t)+\n'":i&&(o+="';\n"+i+"\n__p+='"),t}),o+="';\n",t.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{var i=new Function(t.variable||"obj","_",o)}catch(a){throw a.source=o,a}var c=function(n){return i.call(this,n,w)},l=t.variable||"obj";return c.source="function("+l+"){\n"+o+"}",c},w.chain=function(n){var t=w(n);return t._chain=!0,t};var V=function(n,t){return n._chain?w(t).chain():t};w.mixin=function(n){w.each(w.functions(n),function(t){var e=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),V(this,e.apply(w,n))}})},w.mixin(w),w.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=c[n];w.prototype[n]=function(){var e=this._wrapped;return t.apply(e,arguments),"shift"!==n&&"splice"!==n||0!==e.length||delete e[0],V(this,e)}}),w.each(["concat","join","slice"],function(n){var t=c[n];w.prototype[n]=function(){return V(this,t.apply(this._wrapped,arguments))}}),w.prototype.value=function(){return this._wrapped},w.prototype.valueOf=w.prototype.toJSON=w.prototype.value,w.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return w})}).call(this)},{}]},{},[1]);