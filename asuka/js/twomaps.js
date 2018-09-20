var aerial_layer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
    attribution: 'map data &copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル（写真および国土画像情報（第一期：1974～1978年撮影）</a>',
    maxZoom: 18,
    maxNativeZoom: 18
});

var aerial_old_layer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg', {
    attribution: 'map data &copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル（写真および国土画像情報（第一期：1974～1978年撮影）</a>',
    maxZoom: 18,
    maxNativeZoom: 18
});

var kawahara_layer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: 'map data &copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル（標準地図）</a>',
    maxZoom: 18,
    maxNativeZoom: 18
});

var options1 = {
  center : [34.473037,135.814040],
  zoom : 16,
  maxBounds: [[34.465882,135.796530],[34.483916,135.829446]],
  minZoom : 15,
  maxZoom : 18,
};

var options2 = {
  center : [34.473037,135.814040],
  zoom : 16,
  maxBounds: [[34.465882,135.796530],[34.483916,135.829446]],
  minZoom : 15,
  maxZoom : 18,
};



var map1 = L.map('map1', options1).addLayer(aerial_layer);

 var aerial = {
  "航空写真（2011年）": aerial_layer,
  "航空写真（1974-1978年）": aerial_old_layer
 };


var map2 = L.map('map2', options2).addLayer(kawahara_layer);


L.control.layers(aerial,null,
  {
  collapsed: false
 }
).addTo(map1);



var moveOtherMap= function(target,center,zoom){
    offHandler(target);
    target.setView(center,zoom);
};

var offHandler = function(target){
    target.off("move");
};

var onHandler = function(this_map){
    var other_map;
    if (this_map == map1){
        other_map = map2;
    }else{
        other_map = map1;
    }

    this_map.on("move",function(e){
        moveOtherMap(other_map,this.getCenter(),this.getZoom());
    },this_map);
};

L.DomEvent.on(map1.getContainer(),"touchstart mouseover",function(e){
    onHandler(this);
},map1);

L.DomEvent.on(map2.getContainer(),"touchstart mouseover",function(e){
    onHandler(this);
},map2);
