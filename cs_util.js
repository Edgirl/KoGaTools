const pageData = parsePageData(retrieveCorrectScript());
const clientID = (pageData.current_user || {id:0}).id;
const [server] = /www|friends|br/.exec(location.host);
const isClientProfile = (pageData.object || {is_me:false}).is_me;

// Networking
class NetworkError extends Error {
	constructor(response) {
		super(response.statusMessage);
		if (Error.captureStackTrace) Error.captureStackTrace(this, NetworkError);
		this.name = "NetworkError";
		this.response = response;
	}
	get code() {
		return this.response.status;
	}
}
const fetchJSON = (url, opts) => fetch(url[0] === "/" ? location.origin + url : url, opts).then(r => r.json());
const safeFetch = (resource, options) => {
	const url = resource[0] === "/" ? location.origin + resource : resource;
	return fetch(url, options).then(response => {
		if (!response.ok) throw new NetworkError(response);
		return response;
	});
};

//	retrieveCorrectScript: Retrieves the script element containing the page data
function retrieveCorrectScript() {
	return [...document.getElementsByTagName("script")]
		.find(script => script.innerText.includes("options.bootstrap"))
		.innerText;
}

//	parsePageData: Accepts page body as string; Returns object with data from options.bootstrap
function parsePageData(body) {
	const firstIndex = body.indexOf("options.bootstrap = {") + 20;
	const lastIndex = body.indexOf("};", firstIndex) + 1;
	const data = body.substring(firstIndex, lastIndex);
	return JSON.parse(data);
}

//	getLocaleString: Request a string's translation; Returns Promise<String>
function getLocaleString(language, string) {
	return browser.runtime.sendMessage({
		type: "GET_LOCALE_STRING",
		data: {
			language,
			string
		}
	});
}

//	getLocaleStrings: Request multiple string translations; Returns Promise<Array<String>>
function getLocaleStrings(language, strings) {
	return browser.runtime.sendMessage({
		type: "GET_LOCALE_STRINGS",
		data: {
			language,
			strings
		}
	});
}

function getStoredData(key, fallback="") {
	return browser.storage.local.get({
		[key]: fallback
	}).then(docs => docs[key]);
}

function setStoredData(key, value) {
	return browser.storage.local.set({
		[key]: value
	});
}

function sendMessage(type, data) {
	return browser.runtime.sendMessage({ type, data });
}

const domParser = new DOMParser();
function createHTMLTemplate(htmlString) {
	return (opts) => {
		const builtString = htmlString.replace(/{{(\w+)}}/g, (_, prop) => opts[prop]);
		const builtDOM = domParser.parseFromString(builtString, "text/html");
		return builtDOM.body.childNodes[0];
	};
}
function decodeEntities(str) {
	const builtDOM = domParser.parseFromString(`<!DOCTYPE html><html><body>${str}</body></html>`, "text/html");
	return builtDOM.body.textContent;
}

//	"Shim" for String.prototype.matchAll (FF67+)
function* matchAll(str, pattern) {
	let match;
	while (match = pattern.exec(str)) {
		yield match;
	}
}

function waitForMutation(node, opts) {
	return new Promise(resolve => {
		const nodeObserver = new MutationObserver(() => {
			nodeObserver.disconnect();
			return resolve(true);
		});
		nodeObserver.observe(node, opts);
	});
}

function displayNotification(message, classname="warning") {
	const notification = document.createElement("LI");
	notification.setAttribute("class", `${classname} alert`);
	notification.appendChild(document.createTextNode(message));
	document.querySelector("ul.notifications").appendChild(notification);
	setTimeout(() => notification.parentNode.removeChild(notification), 5000);
}

function observeAddedNodes(
	target,
	handleNodeFn,
	options = { childList: true, subtree: true }
) {
	const element = target instanceof HTMLElement
		? target
		: document.querySelector(target);
	let isDestroyed = false;
	const destroyObserver = () => isDestroyed = true;
	return new MutationObserver((mutations, self) => {
		for (const record of mutations) {
			for (const node of record.addedNodes) {
				handleNodeFn(node, destroyObserver);
				if (isDestroyed) {
					self.disconnect();
					break;
				}
			}
		}
	}).observe(element, options);
}

const debounce = (fn, wait) => {
	let timeoutID;
	return (...args) => {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(fn, wait, ...args);
	};
};

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const createElement = (tag, ...args) => {
	const [tagName, ...tagAttributeMatches] = tag.split(/(?=[\.#])/);
	const element = document.createElement(tagName);
	const tagAttributes = tagAttributeMatches.reduce((object, value) => {
		if (value[0] === ".") {
			if (!object.class) object.class = value.slice(1);
			else object.class += value.replace(".", " ");
		} else object.id = value.slice(1);
		return object;
	}, {});
	const argAttributes = (typeof args[0] === "object" && !Array.isArray(args[0]))
		? args.shift()
		: {};
	const children = (Array.isArray(args[0]) || typeof args[0] === "string")
		? args.shift()
		: [];
	const attributes = ({ ...tagAttributes, ...argAttributes });
	for (const name of Object.keys(attributes)) {
		if (name.startsWith("on")) {
			const event = name.slice(2).toLowerCase();
			const handler = attributes[name];
			element.addEventListener(event, handler.bind(element));
		} else {
			element.setAttribute(name, attributes[name]);
		}
	}
	typeof children === "string"
		? element.appendChild(document.createTextNode(children))
		: element.append(...children);
	return element;
};