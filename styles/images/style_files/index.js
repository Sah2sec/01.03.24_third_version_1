import common from './common.js';
import {smoochConfig} from './config/smoochConfig.js';

let isFirstMsg = true;
let isFirstConversation = true;

if(smoochMetadata && smoochMetadata.type === "support") {
	smoochMetadata["locale"] = common.getLocale({ source:"zendesk_locale", target: "smooch_locale", value: smoochMetadata["locale"] });
}
if(smoochMetadata && smoochMetadata.type === "dtx") {
	smoochMetadata["region"] = common.getRegion(smoochMetadata["localeFormat1"]);
	smoochMetadata["zdLocale"] = common.getLocale({ source: "smooch_locale", target: "zendesk_locale",
    value: smoochMetadata["locale"] });
	//customizeWidgetDTX();
  	window.addEventListener("resize", customizeWidgetDTX);
}

const textCalloutString = common.getTextCallout(smoochMetadata["locale"]);
var metadata = smoochMetadata;
let smoochInitOption = smoochConfig.getInitOptions(metadata);

function customizeWidgetDTX() {
  if (window.screen.width < 768) {
    smoochInitOption.enableTextCallout = false;
    hideCallout();
  } else {
	smoochInitOption.enableTextCallout = true;
    showCallout();
  }
}
function hideCallout() {
  if (document.getElementById("callOut")) {
    document.getElementById("callOut").style.display = "none";
  }
}
function showCallout() {  	
  if (document.getElementById("callOut")) {
    document.getElementById("callOut").style.display = "block";
  } else {
	buildCallout();
  }
}
function buildCallout() {
	setTimeout(function () {
		if (window.Messaging && !window.Messaging?.isOpened() && !document.getElementById("callOut")) {
			var callOutWrapper = document.createElement("div");
			callOutWrapper.setAttribute("id", "callOut");
			callOutWrapper.style.cssText =
				"position:fixed;bottom:38px;right:90px;width:200px;z-index:9997;background:#fff;color:#303233;padding:10px;border:1px solid #ccc;border-radius:5px;box-shadow:0 0 10px #333;font-size:14px";
			var callOutHTML = `<div class="closeCallout" style="position:absolute;right: 1px;top: -2px;cursor:pointer;font-weight: 600;padding: 0px 5px;font-size: 18px;">x</div><div class="callOutText">${textCalloutString}</div>`;
			callOutWrapper.innerHTML = callOutHTML;
			document.body.appendChild(callOutWrapper);
			const callOutElement = document.getElementById("callOut");
			callOutElement.querySelector(".closeCallout").addEventListener("click", hideCallout.bind(this));
		}
  	}, smoochInitOption.textCalloutdelay);
}

window.smoochInit = () => {
	smoochInitOption.delegate = {
		beforeSend(message) {
			if (isFirstMsg) {
				isFirstMsg = false;
				message.metadata = window.smoochMetadata;
			}
			return message;
		}
	};
	Messaging.init(smoochInitOption).then(function() {
		console.log('Smooch chat Initiated!!!');
		window.smoochMetadata.isLoggedIn = smoochInitOption.jwt ? true : false;
		smoochMetadata && smoochMetadata.type === "dtx" ? customizeWidgetDTX() : smoochMetadata && smoochMetadata.type === "support" && smoochInitOption.enableTextCallout ? buildCallout() : "";
	}, function(err) {
		console.log(err); // Something went wrong during initialization
		window.smoochMetadata.isLoggedIn = false;
	});
	Messaging.on('connected', function(data) {
		console.log('Connected with conversation');
		if(window.smoochMetadata.type == "dtx") {
			window.smoochMetadata.name = localStorage.getItem('usercardinfo') && JSON.parse(localStorage.getItem('usercardinfo')).hasOwnProperty("given_name") && JSON.parse(localStorage.getItem('usercardinfo'))["given_name"];
			window.smoochMetadata.email = localStorage.getItem('usercardinfo') && JSON.parse(localStorage.getItem('usercardinfo')).hasOwnProperty("email") && JSON.parse(localStorage.getItem('usercardinfo'))["email"];
		}
		if(data && data.conversation && data.conversation.id && data.conversation.id !== "TEMPORARY_CONVERSATION") {
			Messaging.updateConversation(data.conversation.id, {
				metadata: window.smoochMetadata
			}).then((updatedConversation) => {
				console.log(updatedConversation);
			});
		}
	});
	Messaging.on('message:sent', function(message, data) {
		if (isFirstConversation) {
			isFirstConversation = false;
			Messaging.updateConversation(data.conversation.id, {
				metadata: window.smoochMetadata
			}).then((updatedConversation) => {

			});
		}
	});
}

window.loadSmooch = () => {
	common.injectScript(smoochConfig.libFilePath).then(function() {
		console.log('Smooch Library loaded!');
		//smooch hide/show config		
		if (common.loadBot(metadata.type)) {
			setTimeout(function() {
				setTimeout(function() {
					metadata = smoochMetadata;
					if(metadata && (metadata.userId || metadata.token)) {
					//if(window.HC.data && window.HC.data.userId) {
						fetch(sunco_login_endpoint, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								"API-TOKEN": sunco_apitoken
							},
							body: JSON.stringify({
								/*userId: window.HC.data.userId,
								sessionId: window.HC.data.sessionId*/
								type: metadata.type,
								userId: metadata.userId,
								sessionId: metadata.sessionId,
								token: metadata.token,
								userAgent: navigator.userAgent
							})
						}).then(resp => resp.json()).then(data => {
							if(data.userId === "LIDS ERROR") {
								return;
							}
							if (data.jwt) {
								smoochInitOption.jwt = data.jwt;
								smoochInitOption.externalId = data.userId;
							}
							smoochInit();
						}).catch(error => {
							console.error(`Login failed : ${error}`);
						});
					} else {
						smoochInit();
					}
				}, common.getRenderDelay(metadata))
			}, 0);
		}
	}).catch(error => {
		console.error(error);
	});
}