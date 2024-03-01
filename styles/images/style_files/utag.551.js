//tealium universal tag - utag.551 ut4.0.202402200729, Copyright 2024 Tealium.com Inc. All Rights Reserved.
!function(w){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments);};p.callQueue=[];}}(window);try{(function(id,loader){var u={"id":id};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}
var match=/ut\d\.(\d*)\..*/.exec(utag.cfg.v);if(utag.ut.loader===undefined||!match||parseInt(match[1])<41){u.loader=function(o,a,b,c,l,m){utag.DB(o);a=document;if(o.type=="iframe"){m=a.getElementById(o.id);if(m&&m.tagName=="IFRAME"){b=m;}else{b=a.createElement("iframe");}o.attrs=o.attrs||{};utag.ut.merge(o.attrs,{"height":"1","width":"1","style":"display:none"},0);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";}if(o.id){b.id=o.id;}for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l]);}b.setAttribute("src",o.src);if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){this.onreadystatechange=null;o.cb();}};}}if(o.type!="img"&&!m){l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}}};}else{u.loader=utag.ut.loader;}
if(utag.ut.typeOf===undefined){u.typeOf=function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};}else{u.typeOf=utag.ut.typeOf;}
u.ev={"view":1,"link":1};u.initialized=false;u.scriptrequested=false;u.queue=[];u.toBoolean=function(val){val=String(val)||"";return val===true||val.toLowerCase()==="true"||val.toLowerCase()==="on";};u.map={};u.extend=[function(a,b){try{if(1){if(((utag.data.page_type=='PDP'||utag.data.page_type=='detail')||(window.location.href.indexOf("/products/")>-1))&&typeof utag.data.product_id!=='undefined'&&utag.data.page_type!=='ShoppingCart'&&typeof utag.data.dockedCartView=='undefined'){setTimeout(function(){rdt('track','ViewContent');},2000);}
jQuery('body').on('mousedown','#add-to-cart, #add-all-to-cart, .js-addToCartBtn, .js-add-to-cart',function(){var prodPrice=jQuery(this).attr('data-analytics-product-list-price').length?jQuery(this).attr('data-analytics-product-list-price'):0;prodPrice=Number(prodPrice.replace(/[^0-9\.-]+/g,""));rdt('track','AddToCart',{itemCount:1,value:prodPrice,currency:'USD'});});setTimeout(function(){if((typeof utag.data.order_id!=='undefined')){var prodCount=Array.isArray(utag.data.product_id)?utag.data.product_id.length:1;rdt('track','Purchase',{itemCount:prodCount,value:utag.data.order_subtotal,currency:'USD',transactionId:utag.data.order_id});}},500);jQuery('body').on('click','.mktoButtonRow .mktoButton',function(){setTimeout(function(){if((jQuery('#confirmform').is(':visible'))||(jQuery('.form-confirmation').is(':visible'))){rdt('track','SignUp');}},2000);});if(utag.data.page_type=='Search'){setTimeout(function(){rdt('track','Search');},2000);}}}catch(e){utag.DB(e)}}];u.send=function(utag_event,data_layer){if(u.ev[utag_event]||u.ev.all!==undefined){utag.DB("send:551");utag.DB(data_layer);var a,b,c,d,e,f,h,_event;a=utag_event;b=data_layer;u.data={"account_id":"t2_3be6iuok","send_page_visit":"true","base_url":"//www.redditstatic.com/ads/pixel.js","event":[]};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};utag.DB("send:551:EXTENSIONS");utag.DB(data_layer);for(d in utag.loader.GV(u.map)){if(data_layer[d]!==undefined&&data_layer[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=data_layer[d];}}else{h=d.split(":");if(h.length===2&&String(data_layer[h[0]])===h[1]){if(u.map[d]){u.data.event=u.data.event.concat(u.map[d].split(","));}}}}
utag.DB("send:551:MAPPINGS");utag.DB(u.data);u.data.order_id=u.data.order_id||data_layer._corder||"";if(u.data.event.length===0&&data_layer._cevent!==undefined){u.data.event=(u.typeOf(data_layer._cevent)==="array")?data_layer._cevent.slice(0):[data_layer._cevent];}
if(!u.data.account_id){utag.DB(u.id+": Tag not fired: Required attribute not populated");return;}
if(!u.initialized){rdt("init",u.data.account_id);if(u.toBoolean(u.data.send_page_visit)){rdt("track","PageVisit");}}
var events=["PageVisit","ViewContent","Search","AddToCart","AddToWishlist","Purchase","Lead","SignUp"];u.data.event.forEach(function(e){_event=e;if(events.indexOf(_event)>-1){rdt("track",_event);}});if(!u.scriptrequested){u.initialized=true;u.scriptrequested=true;u.loader({"type":"script","src":u.data.base_url,"cb":null,"loc":"script","id":"utag_551","attrs":{}});}
utag.DB("send:551:COMPLETE");}};utag.o[loader].loader.LOAD(id);}("551","logitech.g"));}catch(error){utag.DB(error);}
