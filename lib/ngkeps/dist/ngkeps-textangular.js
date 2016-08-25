!function(a,b){b["true"]=a,function(b,c){"function"==typeof define&&define.amd?define(b):"undefined"!=typeof module&&"object"==typeof a?module.exports=b():c.rangy=b()}(function(){function a(a,b){var c=typeof a[b];return c==u||!(c!=t||!a[b])||"unknown"==c}function b(a,b){return!(typeof a[b]!=t||!a[b])}function c(a,b){return typeof a[b]!=v}function d(a){return function(b,c){for(var d=c.length;d--;)if(!a(b,c[d]))return!1;return!0}}function e(a){return a&&A(a,z)&&C(a,y)}function f(a){return b(a,"body")?a.body:a.getElementsByTagName("body")[0]}function g(b){typeof console!=v&&a(console,"log")&&console.log(b)}function h(a,b){F&&b?alert(a):g(a)}function i(a){H.initialized=!0,H.supported=!1,h("Rangy is not supported in this environment. Reason: "+a,H.config.alertOnFail)}function j(a){h("Rangy warning: "+a,H.config.alertOnWarn)}function k(a){return a.message||a.description||String(a)}function l(){if(F&&!H.initialized){var b,c=!1,d=!1;a(document,"createRange")&&(b=document.createRange(),A(b,x)&&C(b,w)&&(c=!0));var h=f(document);if(!h||"body"!=h.nodeName.toLowerCase())return void i("No body element found");if(h&&a(h,"createTextRange")&&(b=h.createTextRange(),e(b)&&(d=!0)),!c&&!d)return void i("Neither Range nor TextRange are available");H.initialized=!0,H.features={implementsDomRange:c,implementsTextRange:d};var j,l;for(var m in E)(j=E[m])instanceof p&&j.init(j,H);for(var n=0,o=K.length;o>n;++n)try{K[n](H)}catch(q){l="Rangy init listener threw an exception. Continuing. Detail: "+k(q),g(l)}}}function m(a,b,c){c&&(a+=" in module "+c.name),H.warn("DEPRECATED: "+a+" is deprecated. Please use "+b+" instead.")}function n(a,b,c,d){a[b]=function(){return m(b,c,d),a[c].apply(a,G.toArray(arguments))}}function o(a){a=a||window,l();for(var b=0,c=L.length;c>b;++b)L[b](a)}function p(a,b,c){this.name=a,this.dependencies=b,this.initialized=!1,this.supported=!1,this.initializer=c}function q(a,b,c){var d=new p(a,b,function(b){if(!b.initialized){b.initialized=!0;try{c(H,b),b.supported=!0}catch(d){var e="Module '"+a+"' failed to load: "+k(d);g(e),d.stack&&g(d.stack)}}});return E[a]=d,d}function r(){}function s(){}var t="object",u="function",v="undefined",w=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],x=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],y=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],z=["collapse","compareEndPoints","duplicate","moveToElementText","parentElement","select","setEndPoint","getBoundingClientRect"],A=d(a),B=d(b),C=d(c),D=[].forEach?function(a,b){a.forEach(b)}:function(a,b){for(var c=0,d=a.length;d>c;++c)b(a[c],c)},E={},F=typeof window!=v&&typeof document!=v,G={isHostMethod:a,isHostObject:b,isHostProperty:c,areHostMethods:A,areHostObjects:B,areHostProperties:C,isTextRange:e,getBody:f,forEach:D},H={version:"1.3.0",initialized:!1,isBrowser:F,supported:!0,util:G,features:{},modules:E,config:{alertOnFail:!1,alertOnWarn:!1,preferTextRange:!1,autoInitialize:typeof rangyAutoInitialize==v?!0:rangyAutoInitialize}};H.fail=i,H.warn=j;var I;({}).hasOwnProperty?(G.extend=I=function(a,b,c){var d,e;for(var f in b)b.hasOwnProperty(f)&&(d=a[f],e=b[f],c&&null!==d&&"object"==typeof d&&null!==e&&"object"==typeof e&&I(d,e,!0),a[f]=e);return b.hasOwnProperty("toString")&&(a.toString=b.toString),a},G.createOptions=function(a,b){var c={};return I(c,b),a&&I(c,a),c}):i("hasOwnProperty not supported"),F||i("Rangy can only run in a browser"),function(){var a;if(F){var b=document.createElement("div");b.appendChild(document.createElement("span"));var c=[].slice;try{1==c.call(b.childNodes,0)[0].nodeType&&(a=function(a){return c.call(a,0)})}catch(d){}}a||(a=function(a){for(var b=[],c=0,d=a.length;d>c;++c)b[c]=a[c];return b}),G.toArray=a}();var J;F&&(a(document,"addEventListener")?J=function(a,b,c){a.addEventListener(b,c,!1)}:a(document,"attachEvent")?J=function(a,b,c){a.attachEvent("on"+b,c)}:i("Document does not have required addEventListener or attachEvent method"),G.addListener=J);var K=[];G.deprecationNotice=m,G.createAliasForDeprecatedMethod=n,H.init=l,H.addInitListener=function(a){H.initialized?a(H):K.push(a)};var L=[];H.addShimListener=function(a){L.push(a)},F&&(H.shim=H.createMissingNativeApi=o,n(H,"createMissingNativeApi","shim")),p.prototype={init:function(){for(var a,b,c=this.dependencies||[],d=0,e=c.length;e>d;++d){if(b=c[d],a=E[b],!(a&&a instanceof p))throw new Error("required module '"+b+"' not found");if(a.init(),!a.supported)throw new Error("required module '"+b+"' not supported")}this.initializer(this)},fail:function(a){throw this.initialized=!0,this.supported=!1,new Error(a)},warn:function(a){H.warn("Module "+this.name+": "+a)},deprecationNotice:function(a,b){H.warn("DEPRECATED: "+a+" in module "+this.name+" is deprecated. Please use "+b+" instead")},createError:function(a){return new Error("Error in Rangy "+this.name+" module: "+a)}},H.createModule=function(a){var b,c;2==arguments.length?(b=arguments[1],c=[]):(b=arguments[2],c=arguments[1]);var d=q(a,c,b);H.initialized&&H.supported&&d.init()},H.createCoreModule=function(a,b,c){q(a,b,c)},H.RangePrototype=r,H.rangePrototype=new r,H.selectionPrototype=new s,H.createCoreModule("DomUtil",[],function(a,b){function c(a){var b;return typeof a.namespaceURI==F||null===(b=a.namespaceURI)||"http://www.w3.org/1999/xhtml"==b}function d(a){var b=a.parentNode;return 1==b.nodeType?b:null}function e(a){for(var b=0;a=a.previousSibling;)++b;return b}function f(a){switch(a.nodeType){case 7:case 10:return 0;case 3:case 8:return a.length;default:return a.childNodes.length}}function g(a,b){var c,d=[];for(c=a;c;c=c.parentNode)d.push(c);for(c=b;c;c=c.parentNode)if(K(d,c))return c;return null}function h(a,b,c){for(var d=c?b:b.parentNode;d;){if(d===a)return!0;d=d.parentNode}return!1}function i(a,b){return h(a,b,!0)}function j(a,b,c){for(var d,e=c?a:a.parentNode;e;){if(d=e.parentNode,d===b)return e;e=d}return null}function k(a){var b=a.nodeType;return 3==b||4==b||8==b}function l(a){if(!a)return!1;var b=a.nodeType;return 3==b||8==b}function m(a,b){var c=b.nextSibling,d=b.parentNode;return c?d.insertBefore(a,c):d.appendChild(a),a}function n(a,b,c){var d=a.cloneNode(!1);if(d.deleteData(0,b),a.deleteData(b,a.length-b),m(d,a),c)for(var f,g=0;f=c[g++];)f.node==a&&f.offset>b?(f.node=d,f.offset-=b):f.node==a.parentNode&&f.offset>e(a)&&++f.offset;return d}function o(a){if(9==a.nodeType)return a;if(typeof a.ownerDocument!=F)return a.ownerDocument;if(typeof a.document!=F)return a.document;if(a.parentNode)return o(a.parentNode);throw b.createError("getDocument: no document found for node")}function p(a){var c=o(a);if(typeof c.defaultView!=F)return c.defaultView;if(typeof c.parentWindow!=F)return c.parentWindow;throw b.createError("Cannot get a window object for node")}function q(a){if(typeof a.contentDocument!=F)return a.contentDocument;if(typeof a.contentWindow!=F)return a.contentWindow.document;throw b.createError("getIframeDocument: No Document object found for iframe element")}function r(a){if(typeof a.contentWindow!=F)return a.contentWindow;if(typeof a.contentDocument!=F)return a.contentDocument.defaultView;throw b.createError("getIframeWindow: No Window object found for iframe element")}function s(a){return a&&G.isHostMethod(a,"setTimeout")&&G.isHostObject(a,"document")}function t(a,b,c){var d;if(a?G.isHostProperty(a,"nodeType")?d=1==a.nodeType&&"iframe"==a.tagName.toLowerCase()?q(a):o(a):s(a)&&(d=a.document):d=document,!d)throw b.createError(c+"(): Parameter must be a Window object or DOM node");return d}function u(a){for(var b;b=a.parentNode;)a=b;return a}function v(a,c,d,f){var h,i,k,l,m;if(a==d)return c===f?0:f>c?-1:1;if(h=j(d,a,!0))return c<=e(h)?-1:1;if(h=j(a,d,!0))return e(h)<f?-1:1;if(i=g(a,d),!i)throw new Error("comparePoints error: nodes have no common ancestor");if(k=a===i?i:j(a,i,!0),l=d===i?i:j(d,i,!0),k===l)throw b.createError("comparePoints got to case 4 and childA and childB are the same!");for(m=i.firstChild;m;){if(m===k)return-1;if(m===l)return 1;m=m.nextSibling}}function w(a){var b;try{return b=a.parentNode,!1}catch(c){return!0}}function x(a){if(!a)return"[No node]";if(L&&w(a))return"[Broken node]";if(k(a))return'"'+a.data+'"';if(1==a.nodeType){var b=a.id?' id="'+a.id+'"':"";return"<"+a.nodeName+b+">[index:"+e(a)+",length:"+a.childNodes.length+"]["+(a.innerHTML||"[innerHTML not supported]").slice(0,25)+"]"}return a.nodeName}function y(a){for(var b,c=o(a).createDocumentFragment();b=a.firstChild;)c.appendChild(b);return c}function z(a,b,c){var d=H(a),e=a.createElement("div");e.contentEditable=""+!!c,b&&(e.innerHTML=b);var f=d.firstChild;return f?d.insertBefore(e,f):d.appendChild(e),e}function A(a){return a.parentNode.removeChild(a)}function B(a){this.root=a,this._next=a}function C(a){return new B(a)}function D(a,b){this.node=a,this.offset=b}function E(a){this.code=this[a],this.codeName=a,this.message="DOMException: "+this.codeName}var F="undefined",G=a.util,H=G.getBody;G.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||b.fail("document missing a Node creation method"),G.isHostMethod(document,"getElementsByTagName")||b.fail("document missing getElementsByTagName method");var I=document.createElement("div");G.areHostMethods(I,["insertBefore","appendChild","cloneNode"]||!G.areHostObjects(I,["previousSibling","nextSibling","childNodes","parentNode"]))||b.fail("Incomplete Element implementation"),G.isHostProperty(I,"innerHTML")||b.fail("Element is missing innerHTML property");var J=document.createTextNode("test");G.areHostMethods(J,["splitText","deleteData","insertData","appendData","cloneNode"]||!G.areHostObjects(I,["previousSibling","nextSibling","childNodes","parentNode"])||!G.areHostProperties(J,["data"]))||b.fail("Incomplete Text Node implementation");var K=function(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1},L=!1;!function(){var b=document.createElement("b");b.innerHTML="1";var c=b.firstChild;b.innerHTML="<br />",L=w(c),a.features.crashyTextNodes=L}();var M;typeof window.getComputedStyle!=F?M=function(a,b){return p(a).getComputedStyle(a,null)[b]}:typeof document.documentElement.currentStyle!=F?M=function(a,b){return a.currentStyle?a.currentStyle[b]:""}:b.fail("No means of obtaining computed style properties found"),B.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var a,b,c=this._current=this._next;if(this._current)if(a=c.firstChild)this._next=a;else{for(b=null;c!==this.root&&!(b=c.nextSibling);)c=c.parentNode;this._next=b}return this._current},detach:function(){this._current=this._next=this.root=null}},D.prototype={equals:function(a){return!!a&&this.node===a.node&&this.offset==a.offset},inspect:function(){return"[DomPosition("+x(this.node)+":"+this.offset+")]"},toString:function(){return this.inspect()}},E.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11,INVALID_NODE_TYPE_ERR:24},E.prototype.toString=function(){return this.message},a.dom={arrayContains:K,isHtmlNamespace:c,parentElement:d,getNodeIndex:e,getNodeLength:f,getCommonAncestor:g,isAncestorOf:h,isOrIsAncestorOf:i,getClosestAncestorIn:j,isCharacterDataNode:k,isTextOrCommentNode:l,insertAfter:m,splitDataNode:n,getDocument:o,getWindow:p,getIframeWindow:r,getIframeDocument:q,getBody:H,isWindow:s,getContentDocument:t,getRootContainer:u,comparePoints:v,isBrokenNode:w,inspectNode:x,getComputedStyleProperty:M,createTestElement:z,removeNode:A,fragmentFromNodeChildren:y,createIterator:C,DomPosition:D},a.DOMException=E}),H.createCoreModule("DomRange",["DomUtil"],function(a,b){function c(a,b){return 3!=a.nodeType&&(P(a,b.startContainer)||P(a,b.endContainer))}function d(a){return a.document||Q(a.startContainer)}function e(a){return W(a.startContainer)}function f(a){return new L(a.parentNode,O(a))}function g(a){return new L(a.parentNode,O(a)+1)}function h(a,b,c){var d=11==a.nodeType?a.firstChild:a;return N(b)?c==b.length?J.insertAfter(a,b):b.parentNode.insertBefore(a,0==c?b:S(b,c)):c>=b.childNodes.length?b.appendChild(a):b.insertBefore(a,b.childNodes[c]),d}function i(a,b,c){if(z(a),z(b),d(b)!=d(a))throw new M("WRONG_DOCUMENT_ERR");var e=R(a.startContainer,a.startOffset,b.endContainer,b.endOffset),f=R(a.endContainer,a.endOffset,b.startContainer,b.startOffset);return c?0>=e&&f>=0:0>e&&f>0}function j(a){for(var b,c,e,f=d(a.range).createDocumentFragment();c=a.next();){if(b=a.isPartiallySelectedSubtree(),c=c.cloneNode(!b),b&&(e=a.getSubtreeIterator(),c.appendChild(j(e)),e.detach()),10==c.nodeType)throw new M("HIERARCHY_REQUEST_ERR");f.appendChild(c)}return f}function k(a,b,c){var d,e;c=c||{stop:!1};for(var f,g;f=a.next();)if(a.isPartiallySelectedSubtree()){if(b(f)===!1)return void(c.stop=!0);if(g=a.getSubtreeIterator(),k(g,b,c),g.detach(),c.stop)return}else for(d=J.createIterator(f);e=d.next();)if(b(e)===!1)return void(c.stop=!0)}function l(a){for(var b;a.next();)a.isPartiallySelectedSubtree()?(b=a.getSubtreeIterator(),l(b),b.detach()):a.remove()}function m(a){for(var b,c,e=d(a.range).createDocumentFragment();b=a.next();){if(a.isPartiallySelectedSubtree()?(b=b.cloneNode(!1),c=a.getSubtreeIterator(),b.appendChild(m(c)),c.detach()):a.remove(),10==b.nodeType)throw new M("HIERARCHY_REQUEST_ERR");e.appendChild(b)}return e}function n(a,b,c){var d,e=!(!b||!b.length),f=!!c;e&&(d=new RegExp("^("+b.join("|")+")$"));var g=[];return k(new p(a,!1),function(b){if(!(e&&!d.test(b.nodeType)||f&&!c(b))){var h=a.startContainer;if(b!=h||!N(h)||a.startOffset!=h.length){var i=a.endContainer;b==i&&N(i)&&0==a.endOffset||g.push(b)}}}),g}function o(a){var b="undefined"==typeof a.getName?"Range":a.getName();return"["+b+"("+J.inspectNode(a.startContainer)+":"+a.startOffset+", "+J.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function p(a,b){if(this.range=a,this.clonePartiallySelectedTextNodes=b,!a.collapsed){this.sc=a.startContainer,this.so=a.startOffset,this.ec=a.endContainer,this.eo=a.endOffset;var c=a.commonAncestorContainer;this.sc===this.ec&&N(this.sc)?(this.isSingleCharacterDataNode=!0,this._first=this._last=this._next=this.sc):(this._first=this._next=this.sc!==c||N(this.sc)?T(this.sc,c,!0):this.sc.childNodes[this.so],this._last=this.ec!==c||N(this.ec)?T(this.ec,c,!0):this.ec.childNodes[this.eo-1])}}function q(a){return function(b,c){for(var d,e=c?b:b.parentNode;e;){if(d=e.nodeType,V(a,d))return e;e=e.parentNode}return null}}function r(a,b){if(ea(a,b))throw new M("INVALID_NODE_TYPE_ERR")}function s(a,b){if(!V(b,a.nodeType))throw new M("INVALID_NODE_TYPE_ERR")}function t(a,b){if(0>b||b>(N(a)?a.length:a.childNodes.length))throw new M("INDEX_SIZE_ERR")}function u(a,b){if(ca(a,!0)!==ca(b,!0))throw new M("WRONG_DOCUMENT_ERR")}function v(a){if(da(a,!0))throw new M("NO_MODIFICATION_ALLOWED_ERR")}function w(a,b){if(!a)throw new M(b)}function x(a,b){return b<=(N(a)?a.length:a.childNodes.length)}function y(a){return!!a.startContainer&&!!a.endContainer&&!(X&&(J.isBrokenNode(a.startContainer)||J.isBrokenNode(a.endContainer)))&&W(a.startContainer)==W(a.endContainer)&&x(a.startContainer,a.startOffset)&&x(a.endContainer,a.endOffset)}function z(a){if(!y(a))throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: ("+a.inspect()+")")}function A(a,b){z(a);var c=a.startContainer,d=a.startOffset,e=a.endContainer,f=a.endOffset,g=c===e;N(e)&&f>0&&f<e.length&&S(e,f,b),N(c)&&d>0&&d<c.length&&(c=S(c,d,b),g?(f-=d,e=c):e==c.parentNode&&f>=O(c)&&f++,d=0),a.setStartAndEnd(c,d,e,f)}function B(a){z(a);var b=a.commonAncestorContainer.parentNode.cloneNode(!1);return b.appendChild(a.cloneContents()),b.innerHTML}function C(a){a.START_TO_START=ka,a.START_TO_END=la,a.END_TO_END=ma,a.END_TO_START=na,a.NODE_BEFORE=oa,a.NODE_AFTER=pa,a.NODE_BEFORE_AND_AFTER=qa,a.NODE_INSIDE=ra}function D(a){C(a),C(a.prototype)}function E(a,b){return function(){z(this);var c,d,e=this.startContainer,f=this.startOffset,h=this.commonAncestorContainer,i=new p(this,!0);e!==h&&(c=T(e,h,!0),d=g(c),e=d.node,f=d.offset),k(i,v),i.reset();var j=a(i);return i.detach(),b(this,e,f,e,f),j}}function F(b,d){function e(a,b){return function(c){s(c,Z),s(W(c),$);var d=(a?f:g)(c);(b?h:i)(this,d.node,d.offset)}}function h(a,b,c){var e=a.endContainer,f=a.endOffset;(b!==a.startContainer||c!==a.startOffset)&&((W(b)!=W(e)||1==R(b,c,e,f))&&(e=b,f=c),d(a,b,c,e,f))}function i(a,b,c){var e=a.startContainer,f=a.startOffset;(b!==a.endContainer||c!==a.endOffset)&&((W(b)!=W(e)||-1==R(b,c,e,f))&&(e=b,f=c),d(a,e,f,b,c))}var j=function(){};j.prototype=a.rangePrototype,b.prototype=new j,K.extend(b.prototype,{setStart:function(a,b){r(a,!0),t(a,b),h(this,a,b)},setEnd:function(a,b){r(a,!0),t(a,b),i(this,a,b)},setStartAndEnd:function(){var a=arguments,b=a[0],c=a[1],e=b,f=c;switch(a.length){case 3:f=a[2];break;case 4:e=a[2],f=a[3]}d(this,b,c,e,f)},setBoundary:function(a,b,c){this["set"+(c?"Start":"End")](a,b)},setStartBefore:e(!0,!0),setStartAfter:e(!1,!0),setEndBefore:e(!0,!1),setEndAfter:e(!1,!1),collapse:function(a){z(this),a?d(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):d(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(a){r(a,!0),d(this,a,0,a,U(a))},selectNode:function(a){r(a,!1),s(a,Z);var b=f(a),c=g(a);d(this,b.node,b.offset,c.node,c.offset)},extractContents:E(m,d),deleteContents:E(l,d),canSurroundContents:function(){z(this),v(this.startContainer),v(this.endContainer);var a=new p(this,!0),b=a._first&&c(a._first,this)||a._last&&c(a._last,this);return a.detach(),!b},splitBoundaries:function(){A(this)},splitBoundariesPreservingPositions:function(a){A(this,a)},normalizeBoundaries:function(){z(this);var a,b=this.startContainer,c=this.startOffset,e=this.endContainer,f=this.endOffset,g=function(a){var b=a.nextSibling;b&&b.nodeType==a.nodeType&&(e=a,f=a.length,a.appendData(b.data),Y(b))},h=function(a){var d=a.previousSibling;if(d&&d.nodeType==a.nodeType){b=a;var g=a.length;if(c=d.length,a.insertData(0,d.data),Y(d),b==e)f+=c,e=b;else if(e==a.parentNode){var h=O(a);f==h?(e=a,f=g):f>h&&f--}}},i=!0;if(N(e))f==e.length?g(e):0==f&&(a=e.previousSibling,a&&a.nodeType==e.nodeType&&(f=a.length,b==e&&(i=!1),a.appendData(e.data),Y(e),e=a));else{if(f>0){var j=e.childNodes[f-1];j&&N(j)&&g(j)}i=!this.collapsed}if(i){if(N(b))0==c?h(b):c==b.length&&(a=b.nextSibling,a&&a.nodeType==b.nodeType&&(e==a&&(e=b,f+=b.length),b.appendData(a.data),Y(a)));else if(c<b.childNodes.length){var k=b.childNodes[c];k&&N(k)&&h(k)}}else b=e,c=f;d(this,b,c,e,f)},collapseToPoint:function(a,b){r(a,!0),t(a,b),this.setStartAndEnd(a,b)}}),D(b)}function G(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset,a.commonAncestorContainer=a.collapsed?a.startContainer:J.getCommonAncestor(a.startContainer,a.endContainer)}function H(a,b,c,d,e){a.startContainer=b,a.startOffset=c,a.endContainer=d,a.endOffset=e,a.document=J.getDocument(b),G(a)}function I(a){this.startContainer=a,this.startOffset=0,this.endContainer=a,this.endOffset=0,this.document=a,G(this)}var J=a.dom,K=a.util,L=J.DomPosition,M=a.DOMException,N=J.isCharacterDataNode,O=J.getNodeIndex,P=J.isOrIsAncestorOf,Q=J.getDocument,R=J.comparePoints,S=J.splitDataNode,T=J.getClosestAncestorIn,U=J.getNodeLength,V=J.arrayContains,W=J.getRootContainer,X=a.features.crashyTextNodes,Y=J.removeNode;p.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:!1,reset:function(){this._current=null,this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;return a&&(this._next=a!==this._last?a.nextSibling:null,N(a)&&this.clonePartiallySelectedTextNodes&&(a===this.ec&&(a=a.cloneNode(!0)).deleteData(this.eo,a.length-this.eo),this._current===this.sc&&(a=a.cloneNode(!0)).deleteData(0,this.so))),a},remove:function(){var a,b,c=this._current;!N(c)||c!==this.sc&&c!==this.ec?c.parentNode&&Y(c):(a=c===this.sc?this.so:0,b=c===this.ec?this.eo:c.length,a!=b&&c.deleteData(a,b-a))},isPartiallySelectedSubtree:function(){var a=this._current;return c(a,this.range)},getSubtreeIterator:function(){var a;if(this.isSingleCharacterDataNode)a=this.range.cloneRange(),a.collapse(!1);else{a=new I(d(this.range));var b=this._current,c=b,e=0,f=b,g=U(b);P(b,this.sc)&&(c=this.sc,e=this.so),P(b,this.ec)&&(f=this.ec,g=this.eo),H(a,c,e,f,g)}return new p(a,this.clonePartiallySelectedTextNodes)},detach:function(){this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};var Z=[1,3,4,5,7,8,10],$=[2,9,11],_=[5,6,10,12],aa=[1,3,4,5,7,8,10,11],ba=[1,3,4,5,7,8],ca=q([9,11]),da=q(_),ea=q([6,10,12]),fa=document.createElement("style"),ga=!1;try{fa.innerHTML="<b>x</b>",ga=3==fa.firstChild.nodeType}catch(ha){}a.features.htmlParsingConforms=ga;var ia=ga?function(a){var b=this.startContainer,c=Q(b);if(!b)throw new M("INVALID_STATE_ERR");var d=null;return 1==b.nodeType?d=b:N(b)&&(d=J.parentElement(b)),d=null===d||"HTML"==d.nodeName&&J.isHtmlNamespace(Q(d).documentElement)&&J.isHtmlNamespace(d)?c.createElement("body"):d.cloneNode(!1),d.innerHTML=a,J.fragmentFromNodeChildren(d)}:function(a){var b=d(this),c=b.createElement("body");return c.innerHTML=a,J.fragmentFromNodeChildren(c)},ja=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],ka=0,la=1,ma=2,na=3,oa=0,pa=1,qa=2,ra=3;K.extend(a.rangePrototype,{compareBoundaryPoints:function(a,b){z(this),u(this.startContainer,b.startContainer);var c,d,e,f,g=a==na||a==ka?"start":"end",h=a==la||a==ka?"start":"end";return c=this[g+"Container"],d=this[g+"Offset"],e=b[h+"Container"],f=b[h+"Offset"],R(c,d,e,f)},insertNode:function(a){if(z(this),s(a,aa),v(this.startContainer),P(a,this.startContainer))throw new M("HIERARCHY_REQUEST_ERR");var b=h(a,this.startContainer,this.startOffset);this.setStartBefore(b)},cloneContents:function(){z(this);var a,b;if(this.collapsed)return d(this).createDocumentFragment();if(this.startContainer===this.endContainer&&N(this.startContainer))return a=this.startContainer.cloneNode(!0),a.data=a.data.slice(this.startOffset,this.endOffset),b=d(this).createDocumentFragment(),b.appendChild(a),b;var c=new p(this,!0);return a=j(c),c.detach(),a},canSurroundContents:function(){z(this),v(this.startContainer),v(this.endContainer);var a=new p(this,!0),b=a._first&&c(a._first,this)||a._last&&c(a._last,this);return a.detach(),!b},surroundContents:function(a){if(s(a,ba),!this.canSurroundContents())throw new M("INVALID_STATE_ERR");var b=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);h(a,this.startContainer,this.startOffset),a.appendChild(b),this.selectNode(a)},cloneRange:function(){z(this);for(var a,b=new I(d(this)),c=ja.length;c--;)a=ja[c],b[a]=this[a];return b},toString:function(){z(this);var a=this.startContainer;if(a===this.endContainer&&N(a))return 3==a.nodeType||4==a.nodeType?a.data.slice(this.startOffset,this.endOffset):"";var b=[],c=new p(this,!0);return k(c,function(a){(3==a.nodeType||4==a.nodeType)&&b.push(a.data)}),c.detach(),b.join("")},compareNode:function(a){z(this);var b=a.parentNode,c=O(a);if(!b)throw new M("NOT_FOUND_ERR");var d=this.comparePoint(b,c),e=this.comparePoint(b,c+1);return 0>d?e>0?qa:oa:e>0?pa:ra},comparePoint:function(a,b){return z(this),w(a,"HIERARCHY_REQUEST_ERR"),u(a,this.startContainer),R(a,b,this.startContainer,this.startOffset)<0?-1:R(a,b,this.endContainer,this.endOffset)>0?1:0},createContextualFragment:ia,toHtml:function(){return B(this)},intersectsNode:function(a,b){if(z(this),W(a)!=e(this))return!1;var c=a.parentNode,d=O(a);if(!c)return!0;var f=R(c,d,this.endContainer,this.endOffset),g=R(c,d+1,this.startContainer,this.startOffset);return b?0>=f&&g>=0:0>f&&g>0},isPointInRange:function(a,b){return z(this),w(a,"HIERARCHY_REQUEST_ERR"),u(a,this.startContainer),R(a,b,this.startContainer,this.startOffset)>=0&&R(a,b,this.endContainer,this.endOffset)<=0},intersectsRange:function(a){return i(this,a,!1)},intersectsOrTouchesRange:function(a){return i(this,a,!0)},intersection:function(a){if(this.intersectsRange(a)){var b=R(this.startContainer,this.startOffset,a.startContainer,a.startOffset),c=R(this.endContainer,this.endOffset,a.endContainer,a.endOffset),d=this.cloneRange();return-1==b&&d.setStart(a.startContainer,a.startOffset),1==c&&d.setEnd(a.endContainer,a.endOffset),d}return null},union:function(a){if(this.intersectsOrTouchesRange(a)){var b=this.cloneRange();return-1==R(a.startContainer,a.startOffset,this.startContainer,this.startOffset)&&b.setStart(a.startContainer,a.startOffset),1==R(a.endContainer,a.endOffset,this.endContainer,this.endOffset)&&b.setEnd(a.endContainer,a.endOffset),b}throw new M("Ranges do not intersect")},containsNode:function(a,b){return b?this.intersectsNode(a,!1):this.compareNode(a)==ra},containsNodeContents:function(a){return this.comparePoint(a,0)>=0&&this.comparePoint(a,U(a))<=0},containsRange:function(a){var b=this.intersection(a);return null!==b&&a.equals(b)},containsNodeText:function(a){var b=this.cloneRange();b.selectNode(a);var c=b.getNodes([3]);if(c.length>0){b.setStart(c[0],0);var d=c.pop();return b.setEnd(d,d.length),this.containsRange(b)}return this.containsNodeContents(a)},getNodes:function(a,b){return z(this),n(this,a,b)},getDocument:function(){return d(this)},collapseBefore:function(a){this.setEndBefore(a),this.collapse(!1)},collapseAfter:function(a){this.setStartAfter(a),this.collapse(!0)},getBookmark:function(b){var c=d(this),e=a.createRange(c);b=b||J.getBody(c),e.selectNodeContents(b);var f=this.intersection(e),g=0,h=0;return f&&(e.setEnd(f.startContainer,f.startOffset),g=e.toString().length,h=g+f.toString().length),{start:g,end:h,containerNode:b}},moveToBookmark:function(a){var b=a.containerNode,c=0;this.setStart(b,0),this.collapse(!0);for(var d,e,f,g,h=[b],i=!1,j=!1;!j&&(d=h.pop());)if(3==d.nodeType)e=c+d.length,!i&&a.start>=c&&a.start<=e&&(this.setStart(d,a.start-c),i=!0),i&&a.end>=c&&a.end<=e&&(this.setEnd(d,a.end-c),j=!0),c=e;else for(g=d.childNodes,f=g.length;f--;)h.push(g[f])},getName:function(){return"DomRange"},equals:function(a){return I.rangesEqual(this,a)},isValid:function(){return y(this)},inspect:function(){return o(this)},detach:function(){}}),F(I,H),K.extend(I,{rangeProperties:ja,RangeIterator:p,copyComparisonConstants:D,createPrototypeRange:F,inspect:o,toHtml:B,getRangeDocument:d,rangesEqual:function(a,b){return a.startContainer===b.startContainer&&a.startOffset===b.startOffset&&a.endContainer===b.endContainer&&a.endOffset===b.endOffset}}),a.DomRange=I}),H.createCoreModule("WrappedRange",["DomRange"],function(a,b){var c,d,e=a.dom,f=a.util,g=e.DomPosition,h=a.DomRange,i=e.getBody,j=e.getContentDocument,k=e.isCharacterDataNode;if(a.features.implementsDomRange&&!function(){function d(a){for(var b,c=m.length;c--;)b=m[c],a[b]=a.nativeRange[b];a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset}function g(a,b,c,d,e){var f=a.startContainer!==b||a.startOffset!=c,g=a.endContainer!==d||a.endOffset!=e,h=!a.equals(a.nativeRange);(f||g||h)&&(a.setEnd(d,e),a.setStart(b,c))}var k,l,m=h.rangeProperties;c=function(a){if(!a)throw b.createError("WrappedRange: Range must be specified");this.nativeRange=a,d(this)},h.createPrototypeRange(c,g),k=c.prototype,k.selectNode=function(a){this.nativeRange.selectNode(a),d(this)},k.cloneContents=function(){return this.nativeRange.cloneContents()},k.surroundContents=function(a){this.nativeRange.surroundContents(a),d(this)},k.collapse=function(a){this.nativeRange.collapse(a),d(this)},k.cloneRange=function(){return new c(this.nativeRange.cloneRange())},k.refresh=function(){d(this)},k.toString=function(){return this.nativeRange.toString()};var n=document.createTextNode("test");i(document).appendChild(n);var o=document.createRange();o.setStart(n,0),o.setEnd(n,0);try{o.setStart(n,1),k.setStart=function(a,b){this.nativeRange.setStart(a,b),d(this)},k.setEnd=function(a,b){this.nativeRange.setEnd(a,b),d(this)},l=function(a){return function(b){this.nativeRange[a](b),d(this)}}}catch(p){k.setStart=function(a,b){try{this.nativeRange.setStart(a,b)}catch(c){this.nativeRange.setEnd(a,b),this.nativeRange.setStart(a,b)}d(this)},k.setEnd=function(a,b){try{this.nativeRange.setEnd(a,b)}catch(c){this.nativeRange.setStart(a,b),this.nativeRange.setEnd(a,b)}d(this)},l=function(a,b){return function(c){try{this.nativeRange[a](c)}catch(e){this.nativeRange[b](c),this.nativeRange[a](c)}d(this)}}}k.setStartBefore=l("setStartBefore","setEndBefore"),k.setStartAfter=l("setStartAfter","setEndAfter"),k.setEndBefore=l("setEndBefore","setStartBefore"),k.setEndAfter=l("setEndAfter","setStartAfter"),k.selectNodeContents=function(a){this.setStartAndEnd(a,0,e.getNodeLength(a))},o.selectNodeContents(n),o.setEnd(n,3);var q=document.createRange();q.selectNodeContents(n),q.setEnd(n,4),q.setStart(n,2),-1==o.compareBoundaryPoints(o.START_TO_END,q)&&1==o.compareBoundaryPoints(o.END_TO_START,q)?k.compareBoundaryPoints=function(a,b){return b=b.nativeRange||b,a==b.START_TO_END?a=b.END_TO_START:a==b.END_TO_START&&(a=b.START_TO_END),this.nativeRange.compareBoundaryPoints(a,b)}:k.compareBoundaryPoints=function(a,b){return this.nativeRange.compareBoundaryPoints(a,b.nativeRange||b)};var r=document.createElement("div");r.innerHTML="123";var s=r.firstChild,t=i(document);t.appendChild(r),o.setStart(s,1),o.setEnd(s,2),o.deleteContents(),"13"==s.data&&(k.deleteContents=function(){this.nativeRange.deleteContents(),d(this)},k.extractContents=function(){var a=this.nativeRange.extractContents();return d(this),a}),t.removeChild(r),t=null,f.isHostMethod(o,"createContextualFragment")&&(k.createContextualFragment=function(a){return this.nativeRange.createContextualFragment(a)}),i(document).removeChild(n),k.getName=function(){return"WrappedRange"},a.WrappedRange=c,a.createNativeRange=function(a){return a=j(a,b,"createNativeRange"),a.createRange()}}(),a.features.implementsTextRange){var l=function(a){var b=a.parentElement(),c=a.duplicate();c.collapse(!0);var d=c.parentElement();c=a.duplicate(),c.collapse(!1);var f=c.parentElement(),g=d==f?d:e.getCommonAncestor(d,f);return g==b?g:e.getCommonAncestor(b,g)},m=function(a){return 0==a.compareEndPoints("StartToEnd",a)},n=function(a,b,c,d,f){var h=a.duplicate();h.collapse(c);var i=h.parentElement();if(e.isOrIsAncestorOf(b,i)||(i=b),!i.canHaveHTML){var j=new g(i.parentNode,e.getNodeIndex(i));return{boundaryPosition:j,nodeInfo:{nodeIndex:j.offset,containerElement:j.node}}}var l=e.getDocument(i).createElement("span");l.parentNode&&e.removeNode(l);for(var m,n,o,p,q,r=c?"StartToStart":"StartToEnd",s=f&&f.containerElement==i?f.nodeIndex:0,t=i.childNodes.length,u=t,v=u;;){if(v==t?i.appendChild(l):i.insertBefore(l,i.childNodes[v]),h.moveToElementText(l),m=h.compareEndPoints(r,a),0==m||s==u)break;if(-1==m){if(u==s+1)break;s=v}else u=u==s+1?s:v;v=Math.floor((s+u)/2),i.removeChild(l)}if(q=l.nextSibling,-1==m&&q&&k(q)){h.setEndPoint(c?"EndToStart":"EndToEnd",a);var w;if(/[\r\n]/.test(q.data)){var x=h.duplicate(),y=x.text.replace(/\r\n/g,"\r").length;for(w=x.moveStart("character",y);-1==(m=x.compareEndPoints("StartToEnd",x));)w++,x.moveStart("character",1)}else w=h.text.length;p=new g(q,w)}else n=(d||!c)&&l.previousSibling,o=(d||c)&&l.nextSibling,p=o&&k(o)?new g(o,0):n&&k(n)?new g(n,n.data.length):new g(i,e.getNodeIndex(l));return e.removeNode(l),{boundaryPosition:p,nodeInfo:{nodeIndex:v,containerElement:i}}},o=function(a,b){var c,d,f,g,h=a.offset,j=e.getDocument(a.node),l=i(j).createTextRange(),m=k(a.node);return m?(c=a.node,d=c.parentNode):(g=a.node.childNodes,c=h<g.length?g[h]:null,d=a.node),f=j.createElement("span"),f.innerHTML="&#feff;",c?d.insertBefore(f,c):d.appendChild(f),l.moveToElementText(f),l.collapse(!b),d.removeChild(f),m&&l[b?"moveStart":"moveEnd"]("character",h),l};d=function(a){this.textRange=a,this.refresh()},d.prototype=new h(document),
d.prototype.refresh=function(){var a,b,c,d=l(this.textRange);m(this.textRange)?b=a=n(this.textRange,d,!0,!0).boundaryPosition:(c=n(this.textRange,d,!0,!1),a=c.boundaryPosition,b=n(this.textRange,d,!1,!1,c.nodeInfo).boundaryPosition),this.setStart(a.node,a.offset),this.setEnd(b.node,b.offset)},d.prototype.getName=function(){return"WrappedTextRange"},h.copyComparisonConstants(d);var p=function(a){if(a.collapsed)return o(new g(a.startContainer,a.startOffset),!0);var b=o(new g(a.startContainer,a.startOffset),!0),c=o(new g(a.endContainer,a.endOffset),!1),d=i(h.getRangeDocument(a)).createTextRange();return d.setEndPoint("StartToStart",b),d.setEndPoint("EndToEnd",c),d};if(d.rangeToTextRange=p,d.prototype.toTextRange=function(){return p(this)},a.WrappedTextRange=d,!a.features.implementsDomRange||a.config.preferTextRange){var q=function(a){return a("return this;")()}(Function);"undefined"==typeof q.Range&&(q.Range=d),a.createNativeRange=function(a){return a=j(a,b,"createNativeRange"),i(a).createTextRange()},a.WrappedRange=d}}a.createRange=function(c){return c=j(c,b,"createRange"),new a.WrappedRange(a.createNativeRange(c))},a.createRangyRange=function(a){return a=j(a,b,"createRangyRange"),new h(a)},f.createAliasForDeprecatedMethod(a,"createIframeRange","createRange"),f.createAliasForDeprecatedMethod(a,"createIframeRangyRange","createRangyRange"),a.addShimListener(function(b){var c=b.document;"undefined"==typeof c.createRange&&(c.createRange=function(){return a.createRange(c)}),c=b=null})}),H.createCoreModule("WrappedSelection",["DomRange","WrappedRange"],function(a,b){function c(a){return"string"==typeof a?/^backward(s)?$/i.test(a):!!a}function d(a,c){if(a){if(C.isWindow(a))return a;if(a instanceof r)return a.win;var d=C.getContentDocument(a,b,c);return C.getWindow(d)}return window}function e(a){return d(a,"getWinSelection").getSelection()}function f(a){return d(a,"getDocSelection").document.selection}function g(a){var b=!1;return a.anchorNode&&(b=1==C.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset)),b}function h(a,b,c){var d=c?"end":"start",e=c?"start":"end";a.anchorNode=b[d+"Container"],a.anchorOffset=b[d+"Offset"],a.focusNode=b[e+"Container"],a.focusOffset=b[e+"Offset"]}function i(a){var b=a.nativeSelection;a.anchorNode=b.anchorNode,a.anchorOffset=b.anchorOffset,a.focusNode=b.focusNode,a.focusOffset=b.focusOffset}function j(a){a.anchorNode=a.focusNode=null,a.anchorOffset=a.focusOffset=0,a.rangeCount=0,a.isCollapsed=!0,a._ranges.length=0}function k(b){var c;return b instanceof F?(c=a.createNativeRange(b.getDocument()),c.setEnd(b.endContainer,b.endOffset),c.setStart(b.startContainer,b.startOffset)):b instanceof G?c=b.nativeRange:J.implementsDomRange&&b instanceof C.getWindow(b.startContainer).Range&&(c=b),c}function l(a){if(!a.length||1!=a[0].nodeType)return!1;for(var b=1,c=a.length;c>b;++b)if(!C.isAncestorOf(a[0],a[b]))return!1;return!0}function m(a){var c=a.getNodes();if(!l(c))throw b.createError("getSingleElementFromRange: range "+a.inspect()+" did not consist of a single element");return c[0]}function n(a){return!!a&&"undefined"!=typeof a.text}function o(a,b){var c=new G(b);a._ranges=[c],h(a,c,!1),a.rangeCount=1,a.isCollapsed=c.collapsed}function p(b){if(b._ranges.length=0,"None"==b.docSelection.type)j(b);else{var c=b.docSelection.createRange();if(n(c))o(b,c);else{b.rangeCount=c.length;for(var d,e=L(c.item(0)),f=0;f<b.rangeCount;++f)d=a.createRange(e),d.selectNode(c.item(f)),b._ranges.push(d);b.isCollapsed=1==b.rangeCount&&b._ranges[0].collapsed,h(b,b._ranges[b.rangeCount-1],!1)}}}function q(a,c){for(var d=a.docSelection.createRange(),e=m(c),f=L(d.item(0)),g=M(f).createControlRange(),h=0,i=d.length;i>h;++h)g.add(d.item(h));try{g.add(e)}catch(j){throw b.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")}g.select(),p(a)}function r(a,b,c){this.nativeSelection=a,this.docSelection=b,this._ranges=[],this.win=c,this.refresh()}function s(a){a.win=a.anchorNode=a.focusNode=a._ranges=null,a.rangeCount=a.anchorOffset=a.focusOffset=0,a.detached=!0}function t(a,b){for(var c,d,e=ba.length;e--;)if(c=ba[e],d=c.selection,"deleteAll"==b)s(d);else if(c.win==a)return"delete"==b?(ba.splice(e,1),!0):d;return"deleteAll"==b&&(ba.length=0),null}function u(a,c){for(var d,e=L(c[0].startContainer),f=M(e).createControlRange(),g=0,h=c.length;h>g;++g){d=m(c[g]);try{f.add(d)}catch(i){throw b.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)")}}f.select(),p(a)}function v(a,b){if(a.win.document!=L(b))throw new H("WRONG_DOCUMENT_ERR")}function w(b){return function(c,d){var e;this.rangeCount?(e=this.getRangeAt(0),e["set"+(b?"Start":"End")](c,d)):(e=a.createRange(this.win.document),e.setStartAndEnd(c,d)),this.setSingleRange(e,this.isBackward())}}function x(a){var b=[],c=new I(a.anchorNode,a.anchorOffset),d=new I(a.focusNode,a.focusOffset),e="function"==typeof a.getName?a.getName():"Selection";if("undefined"!=typeof a.rangeCount)for(var f=0,g=a.rangeCount;g>f;++f)b[f]=F.inspect(a.getRangeAt(f));return"["+e+"(Ranges: "+b.join(", ")+")(anchor: "+c.inspect()+", focus: "+d.inspect()+"]"}a.config.checkSelectionRanges=!0;var y,z,A="boolean",B="number",C=a.dom,D=a.util,E=D.isHostMethod,F=a.DomRange,G=a.WrappedRange,H=a.DOMException,I=C.DomPosition,J=a.features,K="Control",L=C.getDocument,M=C.getBody,N=F.rangesEqual,O=E(window,"getSelection"),P=D.isHostObject(document,"selection");J.implementsWinGetSelection=O,J.implementsDocSelection=P;var Q=P&&(!O||a.config.preferTextRange);if(Q)y=f,a.isSelectionValid=function(a){var b=d(a,"isSelectionValid").document,c=b.selection;return"None"!=c.type||L(c.createRange().parentElement())==b};else{if(!O)return b.fail("Neither document.selection or window.getSelection() detected."),!1;y=e,a.isSelectionValid=function(){return!0}}a.getNativeSelection=y;var R=y();if(!R)return b.fail("Native selection was null (possibly issue 138?)"),!1;var S=a.createNativeRange(document),T=M(document),U=D.areHostProperties(R,["anchorNode","focusNode","anchorOffset","focusOffset"]);J.selectionHasAnchorAndFocus=U;var V=E(R,"extend");J.selectionHasExtend=V;var W=typeof R.rangeCount==B;J.selectionHasRangeCount=W;var X=!1,Y=!0,Z=V?function(b,c){var d=F.getRangeDocument(c),e=a.createRange(d);e.collapseToPoint(c.endContainer,c.endOffset),b.addRange(k(e)),b.extend(c.startContainer,c.startOffset)}:null;D.areHostMethods(R,["addRange","getRangeAt","removeAllRanges"])&&typeof R.rangeCount==B&&J.implementsDomRange&&!function(){var b=window.getSelection();if(b){for(var c=b.rangeCount,d=c>1,e=[],f=g(b),h=0;c>h;++h)e[h]=b.getRangeAt(h);var i=C.createTestElement(document,"",!1),j=i.appendChild(document.createTextNode("   ")),k=document.createRange();if(k.setStart(j,1),k.collapse(!0),b.removeAllRanges(),b.addRange(k),Y=1==b.rangeCount,b.removeAllRanges(),!d){var l=window.navigator.appVersion.match(/Chrome\/(.*?) /);if(l&&parseInt(l[1])>=36)X=!1;else{var m=k.cloneRange();k.setStart(j,0),m.setEnd(j,3),m.setStart(j,2),b.addRange(k),b.addRange(m),X=2==b.rangeCount}}for(C.removeNode(i),b.removeAllRanges(),h=0;c>h;++h)0==h&&f?Z?Z(b,e[h]):(a.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend"),b.addRange(e[h])):b.addRange(e[h])}}(),J.selectionSupportsMultipleRanges=X,J.collapsedNonEditableSelectionsSupported=Y;var $,_=!1;T&&E(T,"createControlRange")&&($=T.createControlRange(),D.areHostProperties($,["item","add"])&&(_=!0)),J.implementsControlRange=_,z=U?function(a){return a.anchorNode===a.focusNode&&a.anchorOffset===a.focusOffset}:function(a){return a.rangeCount?a.getRangeAt(a.rangeCount-1).collapsed:!1};var aa;E(R,"getRangeAt")?aa=function(a,b){try{return a.getRangeAt(b)}catch(c){return null}}:U&&(aa=function(b){var c=L(b.anchorNode),d=a.createRange(c);return d.setStartAndEnd(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset),d.collapsed!==this.isCollapsed&&d.setStartAndEnd(b.focusNode,b.focusOffset,b.anchorNode,b.anchorOffset),d}),r.prototype=a.selectionPrototype;var ba=[],ca=function(a){if(a&&a instanceof r)return a.refresh(),a;a=d(a,"getNativeSelection");var b=t(a),c=y(a),e=P?f(a):null;return b?(b.nativeSelection=c,b.docSelection=e,b.refresh()):(b=new r(c,e,a),ba.push({win:a,selection:b})),b};a.getSelection=ca,D.createAliasForDeprecatedMethod(a,"getIframeSelection","getSelection");var da=r.prototype;if(!Q&&U&&D.areHostMethods(R,["removeAllRanges","addRange"])){da.removeAllRanges=function(){this.nativeSelection.removeAllRanges(),j(this)};var ea=function(a,b){Z(a.nativeSelection,b),a.refresh()};W?da.addRange=function(b,d){if(_&&P&&this.docSelection.type==K)q(this,b);else if(c(d)&&V)ea(this,b);else{var e;X?e=this.rangeCount:(this.removeAllRanges(),e=0);var f=k(b).cloneRange();try{this.nativeSelection.addRange(f)}catch(g){}if(this.rangeCount=this.nativeSelection.rangeCount,this.rangeCount==e+1){if(a.config.checkSelectionRanges){var i=aa(this.nativeSelection,this.rangeCount-1);i&&!N(i,b)&&(b=new G(i))}this._ranges[this.rangeCount-1]=b,h(this,b,ha(this.nativeSelection)),this.isCollapsed=z(this)}else this.refresh()}}:da.addRange=function(a,b){c(b)&&V?ea(this,a):(this.nativeSelection.addRange(k(a)),this.refresh())},da.setRanges=function(a){if(_&&P&&a.length>1)u(this,a);else{this.removeAllRanges();for(var b=0,c=a.length;c>b;++b)this.addRange(a[b])}}}else{if(!(E(R,"empty")&&E(S,"select")&&_&&Q))return b.fail("No means of selecting a Range or TextRange was found"),!1;da.removeAllRanges=function(){try{if(this.docSelection.empty(),"None"!=this.docSelection.type){var a;if(this.anchorNode)a=L(this.anchorNode);else if(this.docSelection.type==K){var b=this.docSelection.createRange();b.length&&(a=L(b.item(0)))}if(a){var c=M(a).createTextRange();c.select(),this.docSelection.empty()}}}catch(d){}j(this)},da.addRange=function(b){this.docSelection.type==K?q(this,b):(a.WrappedTextRange.rangeToTextRange(b).select(),this._ranges[0]=b,this.rangeCount=1,this.isCollapsed=this._ranges[0].collapsed,h(this,b,!1))},da.setRanges=function(a){this.removeAllRanges();var b=a.length;b>1?u(this,a):b&&this.addRange(a[0])}}da.getRangeAt=function(a){if(0>a||a>=this.rangeCount)throw new H("INDEX_SIZE_ERR");return this._ranges[a].cloneRange()};var fa;if(Q)fa=function(b){var c;a.isSelectionValid(b.win)?c=b.docSelection.createRange():(c=M(b.win.document).createTextRange(),c.collapse(!0)),b.docSelection.type==K?p(b):n(c)?o(b,c):j(b)};else if(E(R,"getRangeAt")&&typeof R.rangeCount==B)fa=function(b){if(_&&P&&b.docSelection.type==K)p(b);else if(b._ranges.length=b.rangeCount=b.nativeSelection.rangeCount,b.rangeCount){for(var c=0,d=b.rangeCount;d>c;++c)b._ranges[c]=new a.WrappedRange(b.nativeSelection.getRangeAt(c));h(b,b._ranges[b.rangeCount-1],ha(b.nativeSelection)),b.isCollapsed=z(b)}else j(b)};else{if(!U||typeof R.isCollapsed!=A||typeof S.collapsed!=A||!J.implementsDomRange)return b.fail("No means of obtaining a Range or TextRange from the user's selection was found"),!1;fa=function(a){var b,c=a.nativeSelection;c.anchorNode?(b=aa(c,0),a._ranges=[b],a.rangeCount=1,i(a),a.isCollapsed=z(a)):j(a)}}da.refresh=function(a){var b=a?this._ranges.slice(0):null,c=this.anchorNode,d=this.anchorOffset;if(fa(this),a){var e=b.length;if(e!=this._ranges.length)return!0;if(this.anchorNode!=c||this.anchorOffset!=d)return!0;for(;e--;)if(!N(b[e],this._ranges[e]))return!0;return!1}};var ga=function(a,b){var c=a.getAllRanges();a.removeAllRanges();for(var d=0,e=c.length;e>d;++d)N(b,c[d])||a.addRange(c[d]);a.rangeCount||j(a)};_&&P?da.removeRange=function(a){if(this.docSelection.type==K){for(var b,c=this.docSelection.createRange(),d=m(a),e=L(c.item(0)),f=M(e).createControlRange(),g=!1,h=0,i=c.length;i>h;++h)b=c.item(h),b!==d||g?f.add(c.item(h)):g=!0;f.select(),p(this)}else ga(this,a)}:da.removeRange=function(a){ga(this,a)};var ha;!Q&&U&&J.implementsDomRange?(ha=g,da.isBackward=function(){return ha(this)}):ha=da.isBackward=function(){return!1},da.isBackwards=da.isBackward,da.toString=function(){for(var a=[],b=0,c=this.rangeCount;c>b;++b)a[b]=""+this._ranges[b];return a.join("")},da.collapse=function(b,c){v(this,b);var d=a.createRange(b);d.collapseToPoint(b,c),this.setSingleRange(d),this.isCollapsed=!0},da.collapseToStart=function(){if(!this.rangeCount)throw new H("INVALID_STATE_ERR");var a=this._ranges[0];this.collapse(a.startContainer,a.startOffset)},da.collapseToEnd=function(){if(!this.rangeCount)throw new H("INVALID_STATE_ERR");var a=this._ranges[this.rangeCount-1];this.collapse(a.endContainer,a.endOffset)},da.selectAllChildren=function(b){v(this,b);var c=a.createRange(b);c.selectNodeContents(b),this.setSingleRange(c)},da.deleteFromDocument=function(){if(_&&P&&this.docSelection.type==K){for(var a,b=this.docSelection.createRange();b.length;)a=b.item(0),b.remove(a),C.removeNode(a);this.refresh()}else if(this.rangeCount){var c=this.getAllRanges();if(c.length){this.removeAllRanges();for(var d=0,e=c.length;e>d;++d)c[d].deleteContents();this.addRange(c[e-1])}}},da.eachRange=function(a,b){for(var c=0,d=this._ranges.length;d>c;++c)if(a(this.getRangeAt(c)))return b},da.getAllRanges=function(){var a=[];return this.eachRange(function(b){a.push(b)}),a},da.setSingleRange=function(a,b){this.removeAllRanges(),this.addRange(a,b)},da.callMethodOnEachRange=function(a,b){var c=[];return this.eachRange(function(d){c.push(d[a].apply(d,b||[]))}),c},da.setStart=w(!0),da.setEnd=w(!1),a.rangePrototype.select=function(a){ca(this.getDocument()).setSingleRange(this,a)},da.changeEachRange=function(a){var b=[],c=this.isBackward();this.eachRange(function(c){a(c),b.push(c)}),this.removeAllRanges(),c&&1==b.length?this.addRange(b[0],"backward"):this.setRanges(b)},da.containsNode=function(a,b){return this.eachRange(function(c){return c.containsNode(a,b)},!0)||!1},da.getBookmark=function(a){return{backward:this.isBackward(),rangeBookmarks:this.callMethodOnEachRange("getBookmark",[a])}},da.moveToBookmark=function(b){for(var c,d,e=[],f=0;c=b.rangeBookmarks[f++];)d=a.createRange(this.win),d.moveToBookmark(c),e.push(d);b.backward?this.setSingleRange(e[0],"backward"):this.setRanges(e)},da.saveRanges=function(){return{backward:this.isBackward(),ranges:this.callMethodOnEachRange("cloneRange")}},da.restoreRanges=function(a){this.removeAllRanges();for(var b,c=0;b=a.ranges[c];++c)this.addRange(b,a.backward&&0==c)},da.toHtml=function(){var a=[];return this.eachRange(function(b){a.push(F.toHtml(b))}),a.join("")},J.implementsTextRange&&(da.getNativeTextRange=function(){var c;if(c=this.docSelection){var d=c.createRange();if(n(d))return d;throw b.createError("getNativeTextRange: selection is a control selection")}if(this.rangeCount>0)return a.WrappedTextRange.rangeToTextRange(this.getRangeAt(0));throw b.createError("getNativeTextRange: selection contains no range")}),da.getName=function(){return"WrappedSelection"},da.inspect=function(){return x(this)},da.detach=function(){t(this.win,"delete"),s(this)},r.detachAll=function(){t(null,"deleteAll")},r.inspect=x,r.isDirectionBackward=c,a.Selection=r,a.selectionPrototype=da,a.addShimListener(function(a){"undefined"==typeof a.getSelection&&(a.getSelection=function(){return ca(a)}),a=null})});var M=!1,N=function(a){M||(M=!0,!H.initialized&&H.config.autoInitialize&&l())};return F&&("complete"==document.readyState?N():(a(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",N,!1),J(window,"load",N))),H},this),function(b,c){"function"==typeof define&&define.amd?define(["./rangy-core"],b):"undefined"!=typeof module&&"object"==typeof a?module.exports=b(require("rangy")):b(c.rangy)}(function(a){return a.createModule("SaveRestore",["WrappedRange"],function(a,b){function c(a,b){return(b||document).getElementById(a)}function d(a,b){var c,d="selectionBoundary_"+ +new Date+"_"+(""+Math.random()).slice(2),e=o.getDocument(a.startContainer),f=a.cloneRange();return f.collapse(b),c=e.createElement("span"),c.id=d,c.style.lineHeight="0",c.style.display="none",c.className="rangySelectionBoundary",c.appendChild(e.createTextNode(r)),f.insertNode(c),c}function e(a,d,e,f){var g=c(e,a);g?(d[f?"setStartBefore":"setEndBefore"](g),p(g)):b.warn("Marker element has been removed. Cannot restore selection.")}function f(a,b){return b.compareBoundaryPoints(a.START_TO_START,a)}function g(b,c){var e,f,g=a.DomRange.getRangeDocument(b),h=b.toString(),i=q(c);return b.collapsed?(f=d(b,!1),{document:g,markerId:f.id,collapsed:!0}):(f=d(b,!1),e=d(b,!0),{document:g,startMarkerId:e.id,endMarkerId:f.id,collapsed:!1,backward:i,toString:function(){return"original text: '"+h+"', new text: '"+b.toString()+"'"}})}function h(d,f){var g=d.document;"undefined"==typeof f&&(f=!0);var h=a.createRange(g);if(d.collapsed){var i=c(d.markerId,g);if(i){i.style.display="inline";var j=i.previousSibling;j&&3==j.nodeType?(p(i),h.collapseToPoint(j,j.length)):(h.collapseBefore(i),p(i))}else b.warn("Marker element has been removed. Cannot restore selection.")}else e(g,h,d.startMarkerId,!0),e(g,h,d.endMarkerId,!1);return f&&h.normalizeBoundaries(),h}function i(b,d){var e,h,i=[],j=q(d);b=b.slice(0),b.sort(f);for(var k=0,l=b.length;l>k;++k)i[k]=g(b[k],j);for(k=l-1;k>=0;--k)e=b[k],h=a.DomRange.getRangeDocument(e),e.collapsed?e.collapseAfter(c(i[k].markerId,h)):(e.setEndBefore(c(i[k].endMarkerId,h)),e.setStartAfter(c(i[k].startMarkerId,h)));return i}function j(c){if(!a.isSelectionValid(c))return b.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus."),null;var d=a.getSelection(c),e=d.getAllRanges(),f=1==e.length&&d.isBackward(),g=i(e,f);return f?d.setSingleRange(e[0],f):d.setRanges(e),{win:c,rangeInfos:g,restored:!1}}function k(a){for(var b=[],c=a.length,d=c-1;d>=0;d--)b[d]=h(a[d],!0);return b}function l(b,c){if(!b.restored){var d=b.rangeInfos,e=a.getSelection(b.win),f=k(d),g=d.length;1==g&&c&&a.features.selectionHasExtend&&d[0].backward?(e.removeAllRanges(),e.addRange(f[0],!0)):e.setRanges(f),b.restored=!0}}function m(a,b){var d=c(b,a);d&&p(d)}function n(a){for(var b,c=a.rangeInfos,d=0,e=c.length;e>d;++d)b=c[d],b.collapsed?m(a.doc,b.markerId):(m(a.doc,b.startMarkerId),m(a.doc,b.endMarkerId))}var o=a.dom,p=o.removeNode,q=a.Selection.isDirectionBackward,r="\ufeff";a.util.extend(a,{saveRange:g,restoreRange:h,saveRanges:i,restoreRanges:k,saveSelection:j,restoreSelection:l,removeMarkerElement:m,removeMarkers:n})}),a},this)}({},function(){return this}());
!function(a,b){b["true"]=a,/**
 * @license AngularJS v1.3.10
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
function(a,b,c){"use strict";function d(){this.$get=["$$sanitizeUri",function(a){return function(b){var c=[];return g(b,l(c,function(b,c){return!/^unsafe/.test(a(b,c))})),c.join("")}}]}function e(a){var c=[],d=l(c,b.noop);return d.chars(a),c.join("")}function f(a){var b,c={},d=a.split(",");for(b=0;b<d.length;b++)c[d[b]]=!0;return c}function g(a,c){function d(a,d,f,g){if(d=b.lowercase(d),B[d])for(;k.last()&&C[k.last()];)e("",k.last());A[d]&&k.last()==d&&e("",d),g=x[d]||!!g,g||k.push(d);var i={};f.replace(p,function(a,b,c,d,e){var f=c||d||e||"";i[b]=h(f)}),c.start&&c.start(d,i,g)}function e(a,d){var e,f=0;if(d=b.lowercase(d))for(f=k.length-1;f>=0&&k[f]!=d;f--);if(f>=0){for(e=k.length-1;e>=f;e--)c.end&&c.end(k[e]);k.length=f}}"string"!=typeof a&&(a=null===a||"undefined"==typeof a?"":""+a);var f,g,i,j,k=[],l=a;for(k.last=function(){return k[k.length-1]};a;){if(j="",g=!0,k.last()&&E[k.last()]?(a=a.replace(new RegExp("([^]*)<\\s*\\/\\s*"+k.last()+"[^>]*>","i"),function(a,b){return b=b.replace(s,"$1").replace(u,"$1"),c.chars&&c.chars(h(b)),""}),e("",k.last())):(0===a.indexOf("<!--")?(f=a.indexOf("--",4),f>=0&&a.lastIndexOf("-->",f)===f&&(c.comment&&c.comment(a.substring(4,f)),a=a.substring(f+3),g=!1)):t.test(a)?(i=a.match(t),i&&(a=a.replace(i[0],""),g=!1)):r.test(a)?(i=a.match(o),i&&(a=a.substring(i[0].length),i[0].replace(o,e),g=!1)):q.test(a)&&(i=a.match(n),i?(i[4]&&(a=a.substring(i[0].length),i[0].replace(n,d)),g=!1):(j+="<",a=a.substring(1))),g&&(f=a.indexOf("<"),j+=0>f?a:a.substring(0,f),a=0>f?"":a.substring(f),c.chars&&c.chars(h(j)))),a==l)throw m("badparse","The sanitizer was unable to parse the following block of html: {0}",a);l=a}e()}function h(a){if(!a)return"";var b=L.exec(a),c=b[1],d=b[3],e=b[2];return e&&(K.innerHTML=e.replace(/</g,"&lt;"),e="textContent"in K?K.textContent:K.innerText),c+e+d}function i(a){return a.replace(/&/g,"&amp;").replace(v,function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1);return"&#"+(1024*(b-55296)+(c-56320)+65536)+";"}).replace(w,function(a){var b=a.charCodeAt(0);return 159>=b||173==b||b>=1536&&1540>=b||1807==b||6068==b||6069==b||b>=8204&&8207>=b||b>=8232&&8239>=b||b>=8288&&8303>=b||65279==b||b>=65520&&65535>=b?"&#"+b+";":a}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function j(a){var c="",d=a.split(";");return b.forEach(d,function(a){var d=a.split(":");if(2==d.length){var e=M(b.lowercase(d[0])),a=M(b.lowercase(d[1]));(("color"===e||"background-color"===e)&&(a.match(/^rgb\([0-9%,\. ]*\)$/i)||a.match(/^rgba\([0-9%,\. ]*\)$/i)||a.match(/^hsl\([0-9%,\. ]*\)$/i)||a.match(/^hsla\([0-9%,\. ]*\)$/i)||a.match(/^#[0-9a-f]{3,6}$/i)||a.match(/^[a-z]*$/i))||"text-align"===e&&("left"===a||"right"===a||"center"===a||"justify"===a)||"float"===e&&("left"===a||"right"===a||"none"===a)||("width"===e||"height"===e)&&a.match(/[0-9\.]*(px|em|rem|%)/)||"direction"===e&&a.match(/^ltr|rtl|initial|inherit$/))&&(c+=e+": "+a+";")}}),c}function k(a,b,c,d){return"img"===a&&b["ta-insert-video"]&&("ta-insert-video"===c||"allowfullscreen"===c||"frameborder"===c||"contenteditable"===c&&"false"===d)?!0:!1}function l(a,c){var d=!1,e=b.bind(a,a.push);return{start:function(a,f,g){a=b.lowercase(a),!d&&E[a]&&(d=a),d||F[a]!==!0||(e("<"),e(a),b.forEach(f,function(d,g){var h=b.lowercase(g),l="img"===a&&"src"===h||"background"===h;("style"===h&&""!==(d=j(d))||k(a,f,h,d)||J[h]===!0&&(G[h]!==!0||c(d,l)))&&(e(" "),e(g),e('="'),e(i(d)),e('"'))}),e(g?"/>":">"))},end:function(a){a=b.lowercase(a),d||F[a]!==!0||(e("</"),e(a),e(">")),a==d&&(d=!1)},chars:function(a){d||e(i(a))}}}var m=b.$$minErr("$sanitize"),n=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,o=/^<\/\s*([\w:-]+)[^>]*>/,p=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,q=/^</,r=/^<\//,s=/<!--(.*?)-->/g,t=/<!DOCTYPE([^>]*?)>/i,u=/<!\[CDATA\[(.*?)]]>/g,v=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,w=/([^\#-~| |!])/g,x=f("area,br,col,hr,img,wbr,input"),y=f("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),z=f("rp,rt"),A=b.extend({},z,y),B=b.extend({},y,f("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),C=b.extend({},z,f("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),D=f("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use"),E=f("script,style"),F=b.extend({},x,B,C,A,D),G=f("background,cite,href,longdesc,src,usemap,xlink:href"),H=f("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,id,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"),I=f("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan"),J=b.extend({},G,I,H),K=document.createElement("pre"),L=/^(\s*)([\s\S]*?)(\s*)$/,M=function(){return String.prototype.trim?function(a){return b.isString(a)?a.trim():a}:function(a){return b.isString(a)?a.replace(/^\s\s*/,"").replace(/\s\s*$/,""):a}}();b.module("ngSanitize",[]).provider("$sanitize",d),b.module("ngSanitize").filter("linky",["$sanitize",function(a){var c=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/,d=/^mailto:/;return function(f,g){function h(a){a&&n.push(e(a))}function i(a,c){n.push("<a "),b.isDefined(g)&&n.push('target="',g,'" '),n.push('href="',a.replace(/"/g,"&quot;"),'">'),h(c),n.push("</a>")}if(!f)return f;for(var j,k,l,m=f,n=[];j=m.match(c);)k=j[0],j[2]||j[4]||(k=(j[3]?"http://":"mailto:")+k),l=j.index,h(m.substr(0,l)),i(k,j[0].replace(d,"")),m=m.substring(l+j[0].length);return h(m),a(n.join(""))}}])}(window,window.angular)}({},function(){return this}());
/*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.3.7

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/
angular.module('textAngularSetup', [])

// Here we set up the global display defaults, to set your own use a angular $provider#decorator.
.value('taOptions',  {
	toolbar: [
		['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
		['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
		['justifyLeft','justifyCenter','justifyRight','indent','outdent'],
		['html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
	],
	classes: {
		focussed: "focussed",
		toolbar: "btn-toolbar",
		toolbarGroup: "btn-group",
		toolbarButton: "btn btn-default",
		toolbarButtonActive: "active",
		disabled: "disabled",
		textEditor: 'form-control',
		htmlEditor: 'form-control'
	},
	defaultTagAttributes : {
		a: {target:""}
	},
	setup: {
		// wysiwyg mode
		textEditorSetup: function($element){ /* Do some processing here */ },
		// raw html
		htmlEditorSetup: function($element){ /* Do some processing here */ }
	},
	defaultFileDropHandler:
		/* istanbul ignore next: untestable image processing */
		function(file, insertAction){
			var reader = new FileReader();
			if(file.type.substring(0, 5) === 'image'){
				reader.onload = function() {
					if(reader.result !== '') insertAction('insertImage', reader.result, true);
				};

				reader.readAsDataURL(file);
				// NOTE: For async procedures return a promise and resolve it when the editor should update the model.
				return true;
			}
			return false;
		}
})

// This is the element selector string that is used to catch click events within a taBind, prevents the default and $emits a 'ta-element-select' event
// these are individually used in an angular.element().find() call. What can go here depends on whether you have full jQuery loaded or just jQLite with angularjs.
// div is only used as div.ta-insert-video caught in filter.
.value('taSelectableElements', ['a','img'])

// This is an array of objects with the following options:
//				selector: <string> a jqLite or jQuery selector string
//				customAttribute: <string> an attribute to search for
//				renderLogic: <function(element)>
// Both or one of selector and customAttribute must be defined.
.value('taCustomRenderers', [
	{
		// Parse back out: '<div class="ta-insert-video" ta-insert-video src="' + urlLink + '" allowfullscreen="true" width="300" frameborder="0" height="250"></div>'
		// To correct video element. For now only support youtube
		selector: 'img',
		customAttribute: 'ta-insert-video',
		renderLogic: function(element){
			var iframe = angular.element('<iframe></iframe>');
			var attributes = element.prop("attributes");
			// loop through element attributes and apply them on iframe
			angular.forEach(attributes, function(attr) {
				iframe.attr(attr.name, attr.value);
			});
			iframe.attr('src', iframe.attr('ta-insert-video'));
			element.replaceWith(iframe);
		}
	}
])

.value('taTranslations', {
	// moved to sub-elements
	//toggleHTML: "Toggle HTML",
	//insertImage: "Please enter a image URL to insert",
	//insertLink: "Please enter a URL to insert",
	//insertVideo: "Please enter a youtube URL to embed",
	html: {
		tooltip: 'Toggle html / Rich Text'
	},
	// tooltip for heading - might be worth splitting
	heading: {
		tooltip: 'Heading '
	},
	p: {
		tooltip: 'Paragraph'
	},
	pre: {
		tooltip: 'Preformatted text'
	},
	ul: {
		tooltip: 'Unordered List'
	},
	ol: {
		tooltip: 'Ordered List'
	},
	quote: {
		tooltip: 'Quote/unquote selection or paragraph'
	},
	undo: {
		tooltip: 'Undo'
	},
	redo: {
		tooltip: 'Redo'
	},
	bold: {
		tooltip: 'Bold'
	},
	italic: {
		tooltip: 'Italic'
	},
	underline: {
		tooltip: 'Underline'
	},
	strikeThrough:{
		tooltip: 'Strikethrough'
	},
	justifyLeft: {
		tooltip: 'Align text left'
	},
	justifyRight: {
		tooltip: 'Align text right'
	},
	justifyCenter: {
		tooltip: 'Center'
	},
	indent: {
		tooltip: 'Increase indent'
	},
	outdent: {
		tooltip: 'Decrease indent'
	},
	clear: {
		tooltip: 'Clear formatting'
	},
	insertImage: {
		dialogPrompt: 'Please enter an image URL to insert',
		tooltip: 'Insert image',
		hotkey: 'the - possibly language dependent hotkey ... for some future implementation'
	},
	insertVideo: {
		tooltip: 'Insert video',
		dialogPrompt: 'Please enter a youtube URL to embed'
	},
	insertLink: {
		tooltip: 'Insert / edit link',
		dialogPrompt: "Please enter a URL to insert"
	},
	editLink: {
		reLinkButton: {
			tooltip: "Relink"
		},
		unLinkButton: {
			tooltip: "Unlink"
		},
		targetToggle: {
			buttontext: "Open in New Window"
		}
	},
	wordcount: {
		tooltip: 'Display words Count'
	},
		charcount: {
		tooltip: 'Display characters Count'
	}
})
.factory('taToolFunctions', ['$window','taTranslations', function($window, taTranslations) {
	return {
		imgOnSelectAction: function(event, $element, editorScope){
			// setup the editor toolbar
			// Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic/display
			var finishEdit = function(){
				editorScope.updateTaBindtaTextElement();
				editorScope.hidePopover();
			};
			event.preventDefault();
			editorScope.displayElements.popover.css('width', '375px');
			var container = editorScope.displayElements.popoverContainer;
			container.empty();
			var buttonGroup = angular.element('<div class="btn-group" style="padding-right: 6px;">');
			var fullButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
			fullButton.on('click', function(event){
				event.preventDefault();
				$element.css({
					'width': '100%',
					'height': ''
				});
				finishEdit();
			});
			var halfButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
			halfButton.on('click', function(event){
				event.preventDefault();
				$element.css({
					'width': '50%',
					'height': ''
				});
				finishEdit();
			});
			var quartButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
			quartButton.on('click', function(event){
				event.preventDefault();
				$element.css({
					'width': '25%',
					'height': ''
				});
				finishEdit();
			});
			var resetButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
			resetButton.on('click', function(event){
				event.preventDefault();
				$element.css({
					width: '',
					height: ''
				});
				finishEdit();
			});
			buttonGroup.append(fullButton);
			buttonGroup.append(halfButton);
			buttonGroup.append(quartButton);
			buttonGroup.append(resetButton);
			container.append(buttonGroup);

			buttonGroup = angular.element('<div class="btn-group" style="padding-right: 6px;">');
			var floatLeft = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
			floatLeft.on('click', function(event){
				event.preventDefault();
				// webkit
				$element.css('float', 'left');
				// firefox
				$element.css('cssFloat', 'left');
				// IE < 8
				$element.css('styleFloat', 'left');
				finishEdit();
			});
			var floatRight = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
			floatRight.on('click', function(event){
				event.preventDefault();
				// webkit
				$element.css('float', 'right');
				// firefox
				$element.css('cssFloat', 'right');
				// IE < 8
				$element.css('styleFloat', 'right');
				finishEdit();
			});
			var floatNone = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
			floatNone.on('click', function(event){
				event.preventDefault();
				// webkit
				$element.css('float', '');
				// firefox
				$element.css('cssFloat', '');
				// IE < 8
				$element.css('styleFloat', '');
				finishEdit();
			});
			buttonGroup.append(floatLeft);
			buttonGroup.append(floatNone);
			buttonGroup.append(floatRight);
			container.append(buttonGroup);

			buttonGroup = angular.element('<div class="btn-group">');
			var remove = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
			remove.on('click', function(event){
				event.preventDefault();
				$element.remove();
				finishEdit();
			});
			buttonGroup.append(remove);
			container.append(buttonGroup);

			editorScope.showPopover($element);
			editorScope.showResizeOverlay($element);
		},
		aOnSelectAction: function(event, $element, editorScope){
			// setup the editor toolbar
			// Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic
			event.preventDefault();
			editorScope.displayElements.popover.css('width', '436px');
			var container = editorScope.displayElements.popoverContainer;
			container.empty();
			container.css('line-height', '28px');
			var link = angular.element('<a href="' + $element.attr('href') + '" target="_blank">' + $element.attr('href') + '</a>');
			link.css({
				'display': 'inline-block',
				'max-width': '200px',
				'overflow': 'hidden',
				'text-overflow': 'ellipsis',
				'white-space': 'nowrap',
				'vertical-align': 'middle'
			});
			container.append(link);
			var buttonGroup = angular.element('<div class="btn-group pull-right">');
			var reLinkButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + taTranslations.editLink.reLinkButton.tooltip + '"><i class="fa fa-edit icon-edit"></i></button>');
			reLinkButton.on('click', function(event){
				event.preventDefault();
				var urlLink = $window.prompt(taTranslations.insertLink.dialogPrompt, $element.attr('href'));
				if(urlLink && urlLink !== '' && urlLink !== 'http://'){
					$element.attr('href', urlLink);
					editorScope.updateTaBindtaTextElement();
				}
				editorScope.hidePopover();
			});
			buttonGroup.append(reLinkButton);
			var unLinkButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + taTranslations.editLink.unLinkButton.tooltip + '"><i class="fa fa-unlink icon-unlink"></i></button>');
			// directly before this click event is fired a digest is fired off whereby the reference to $element is orphaned off
			unLinkButton.on('click', function(event){
				event.preventDefault();
				$element.replaceWith($element.contents());
				editorScope.updateTaBindtaTextElement();
				editorScope.hidePopover();
			});
			buttonGroup.append(unLinkButton);
			var targetToggle = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">' + taTranslations.editLink.targetToggle.buttontext + '</button>');
			if($element.attr('target') === '_blank'){
				targetToggle.addClass('active');
			}
			targetToggle.on('click', function(event){
				event.preventDefault();
				$element.attr('target', ($element.attr('target') === '_blank') ? '' : '_blank');
				targetToggle.toggleClass('active');
				editorScope.updateTaBindtaTextElement();
			});
			buttonGroup.append(targetToggle);
			container.append(buttonGroup);
			editorScope.showPopover($element);
		}
	};
}])
.run(['taRegisterTool', '$window', 'taTranslations', 'taSelection', 'taToolFunctions', function(taRegisterTool, $window, taTranslations, taSelection, taToolFunctions){
	taRegisterTool("html", {
		iconclass: 'fa fa-code',
		tooltiptext: taTranslations.html.tooltip,
		action: function(){
			this.$editor().switchView();
		},
		activeState: function(){
			return this.$editor().showHtml;
		}
	});
	// add the Header tools
	// convenience functions so that the loop works correctly
	var _retActiveStateFunction = function(q){
		return function(){ return this.$editor().queryFormatBlockState(q); };
	};
	var headerAction = function(){
		return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() +">");
	};
	angular.forEach(['h1','h2','h3','h4','h5','h6'], function(h){
		taRegisterTool(h.toLowerCase(), {
			buttontext: h.toUpperCase(),
			tooltiptext: taTranslations.heading.tooltip + h.charAt(1),
			action: headerAction,
			activeState: _retActiveStateFunction(h.toLowerCase())
		});
	});
	taRegisterTool('p', {
		buttontext: 'P',
		tooltiptext: taTranslations.p.tooltip,
		action: function(){
			return this.$editor().wrapSelection("formatBlock", "<P>");
		},
		activeState: function(){ return this.$editor().queryFormatBlockState('p'); }
	});
	// key: pre -> taTranslations[key].tooltip, taTranslations[key].buttontext
	taRegisterTool('pre', {
		buttontext: 'pre',
		tooltiptext: taTranslations.pre.tooltip,
		action: function(){
			return this.$editor().wrapSelection("formatBlock", "<PRE>");
		},
		activeState: function(){ return this.$editor().queryFormatBlockState('pre'); }
	});
	taRegisterTool('ul', {
		iconclass: 'fa fa-list-ul',
		tooltiptext: taTranslations.ul.tooltip,
		action: function(){
			return this.$editor().wrapSelection("insertUnorderedList", null);
		},
		activeState: function(){ return this.$editor().queryCommandState('insertUnorderedList'); }
	});
	taRegisterTool('ol', {
		iconclass: 'fa fa-list-ol',
		tooltiptext: taTranslations.ol.tooltip,
		action: function(){
			return this.$editor().wrapSelection("insertOrderedList", null);
		},
		activeState: function(){ return this.$editor().queryCommandState('insertOrderedList'); }
	});
	taRegisterTool('quote', {
		iconclass: 'fa fa-quote-right',
		tooltiptext: taTranslations.quote.tooltip,
		action: function(){
			return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>");
		},
		activeState: function(){ return this.$editor().queryFormatBlockState('blockquote'); }
	});
	taRegisterTool('undo', {
		iconclass: 'fa fa-undo',
		tooltiptext: taTranslations.undo.tooltip,
		action: function(){
			return this.$editor().wrapSelection("undo", null);
		}
	});
	taRegisterTool('redo', {
		iconclass: 'fa fa-repeat',
		tooltiptext: taTranslations.redo.tooltip,
		action: function(){
			return this.$editor().wrapSelection("redo", null);
		}
	});
	taRegisterTool('bold', {
		iconclass: 'fa fa-bold',
		tooltiptext: taTranslations.bold.tooltip,
		action: function(){
			return this.$editor().wrapSelection("bold", null);
		},
		activeState: function(){
			return this.$editor().queryCommandState('bold');
		},
		commandKeyCode: 98
	});
	taRegisterTool('justifyLeft', {
		iconclass: 'fa fa-align-left',
		tooltiptext: taTranslations.justifyLeft.tooltip,
		action: function(){
			return this.$editor().wrapSelection("justifyLeft", null);
		},
		activeState: function(commonElement){
			/* istanbul ignore next: */
			if (commonElement && commonElement.nodeName === '#document') return false;
			var result = false;
			if (commonElement)
				result =
					commonElement.css('text-align') === 'left' ||
					commonElement.attr('align') === 'left' ||
					(
						commonElement.css('text-align') !== 'right' &&
						commonElement.css('text-align') !== 'center' &&
						commonElement.css('text-align') !== 'justify' && !this.$editor().queryCommandState('justifyRight') && !this.$editor().queryCommandState('justifyCenter')
					) && !this.$editor().queryCommandState('justifyFull');
			result = result || this.$editor().queryCommandState('justifyLeft');
			return result;
		}
	});
	taRegisterTool('justifyRight', {
		iconclass: 'fa fa-align-right',
		tooltiptext: taTranslations.justifyRight.tooltip,
		action: function(){
			return this.$editor().wrapSelection("justifyRight", null);
		},
		activeState: function(commonElement){
			/* istanbul ignore next: */
			if (commonElement && commonElement.nodeName === '#document') return false;
			var result = false;
			if(commonElement) result = commonElement.css('text-align') === 'right';
			result = result || this.$editor().queryCommandState('justifyRight');
			return result;
		}
	});
	taRegisterTool('justifyCenter', {
		iconclass: 'fa fa-align-center',
		tooltiptext: taTranslations.justifyCenter.tooltip,
		action: function(){
			return this.$editor().wrapSelection("justifyCenter", null);
		},
		activeState: function(commonElement){
			/* istanbul ignore next: */
			if (commonElement && commonElement.nodeName === '#document') return false;
			var result = false;
			if(commonElement) result = commonElement.css('text-align') === 'center';
			result = result || this.$editor().queryCommandState('justifyCenter');
			return result;
		}
	});
	taRegisterTool('indent', {
		iconclass: 'fa fa-indent',
		tooltiptext: taTranslations.indent.tooltip,
		action: function(){
			return this.$editor().wrapSelection("indent", null);
		},
		activeState: function(){
			return this.$editor().queryFormatBlockState('blockquote');
		},
		commandKeyCode: 'TabKey'
	});
	taRegisterTool('outdent', {
		iconclass: 'fa fa-outdent',
		tooltiptext: taTranslations.outdent.tooltip,
		action: function(){
			return this.$editor().wrapSelection("outdent", null);
		},
		activeState: function(){
			return false;
		},
		commandKeyCode: 'ShiftTabKey'
	});
	taRegisterTool('italics', {
		iconclass: 'fa fa-italic',
		tooltiptext: taTranslations.italic.tooltip,
		action: function(){
			return this.$editor().wrapSelection("italic", null);
		},
		activeState: function(){
			return this.$editor().queryCommandState('italic');
		},
		commandKeyCode: 105
	});
	taRegisterTool('underline', {
		iconclass: 'fa fa-underline',
		tooltiptext: taTranslations.underline.tooltip,
		action: function(){
			return this.$editor().wrapSelection("underline", null);
		},
		activeState: function(){
			return this.$editor().queryCommandState('underline');
		},
		commandKeyCode: 117
	});
	taRegisterTool('strikeThrough', {
		iconclass: 'fa fa-strikethrough',
		tooltiptext: taTranslations.strikeThrough.tooltip,
		action: function(){
			return this.$editor().wrapSelection("strikeThrough", null);
		},
		activeState: function(){
			return document.queryCommandState('strikeThrough');
		}
	});
	taRegisterTool('clear', {
		iconclass: 'fa fa-ban',
		tooltiptext: taTranslations.clear.tooltip,
		action: function(deferred, restoreSelection){
			var i;
			this.$editor().wrapSelection("removeFormat", null);
			var possibleNodes = angular.element(taSelection.getSelectionElement());
			// remove lists
			var removeListElements = function(list){
				list = angular.element(list);
				var prevElement = list;
				angular.forEach(list.children(), function(liElem){
					var newElem = angular.element('<p></p>');
					newElem.html(angular.element(liElem).html());
					prevElement.after(newElem);
					prevElement = newElem;
				});
				list.remove();
			};
			angular.forEach(possibleNodes.find("ul"), removeListElements);
			angular.forEach(possibleNodes.find("ol"), removeListElements);
			if(possibleNodes[0].tagName.toLowerCase() === 'li'){
				var _list = possibleNodes[0].parentNode.childNodes;
				var _preLis = [], _postLis = [], _found = false;
				for(i = 0; i < _list.length; i++){
					if(_list[i] === possibleNodes[0]){
						_found = true;
					}else if(!_found) _preLis.push(_list[i]);
					else _postLis.push(_list[i]);
				}
				var _parent = angular.element(possibleNodes[0].parentNode);
				var newElem = angular.element('<p></p>');
				newElem.html(angular.element(possibleNodes[0]).html());
				if(_preLis.length === 0 || _postLis.length === 0){
					if(_postLis.length === 0) _parent.after(newElem);
					else _parent[0].parentNode.insertBefore(newElem[0], _parent[0]);

					if(_preLis.length === 0 && _postLis.length === 0) _parent.remove();
					else angular.element(possibleNodes[0]).remove();
				}else{
					var _firstList = angular.element('<'+_parent[0].tagName+'></'+_parent[0].tagName+'>');
					var _secondList = angular.element('<'+_parent[0].tagName+'></'+_parent[0].tagName+'>');
					for(i = 0; i < _preLis.length; i++) _firstList.append(angular.element(_preLis[i]));
					for(i = 0; i < _postLis.length; i++) _secondList.append(angular.element(_postLis[i]));
					_parent.after(_secondList);
					_parent.after(newElem);
					_parent.after(_firstList);
					_parent.remove();
				}
				taSelection.setSelectionToElementEnd(newElem[0]);
			}
			// clear out all class attributes. These do not seem to be cleared via removeFormat
			var $editor = this.$editor();
			var recursiveRemoveClass = function(node){
				node = angular.element(node);
				if(node[0] !== $editor.displayElements.text[0]) node.removeAttr('class');
				angular.forEach(node.children(), recursiveRemoveClass);
			};
			angular.forEach(possibleNodes, recursiveRemoveClass);
			// check if in list. If not in list then use formatBlock option
			if(possibleNodes[0].tagName.toLowerCase() !== 'li' &&
				possibleNodes[0].tagName.toLowerCase() !== 'ol' &&
				possibleNodes[0].tagName.toLowerCase() !== 'ul') this.$editor().wrapSelection("formatBlock", "default");
			restoreSelection();
		}
	});


	taRegisterTool('insertImage', {
		iconclass: 'fa fa-picture-o',
		tooltiptext: taTranslations.insertImage.tooltip,
		action: function(){
			var imageLink;
			imageLink = $window.prompt(taTranslations.insertImage.dialogPrompt, 'http://');
			if(imageLink && imageLink !== '' && imageLink !== 'http://'){
				return this.$editor().wrapSelection('insertImage', imageLink, true);
			}
		},
		onElementSelect: {
			element: 'img',
			action: taToolFunctions.imgOnSelectAction
		}
	});
	taRegisterTool('insertVideo', {
		iconclass: 'fa fa-youtube-play',
		tooltiptext: taTranslations.insertVideo.tooltip,
		action: function(){
			var urlPrompt;
			urlPrompt = $window.prompt(taTranslations.insertVideo.dialogPrompt, 'https://');
			if (urlPrompt && urlPrompt !== '' && urlPrompt !== 'https://') {
				// get the video ID
				var ids = urlPrompt.match(/(\?|&)v=[^&]*/);
				/* istanbul ignore else: if it's invalid don't worry - though probably should show some kind of error message */
				if(ids && ids.length > 0){
					// create the embed link
					var urlLink = "https://www.youtube.com/embed/" + ids[0].substring(3);
					// create the HTML
					// for all options see: http://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
					// maxresdefault.jpg seems to be undefined on some.
					var embed = '<img class="ta-insert-video" src="https://img.youtube.com/vi/' + ids[0].substring(3) + '/hqdefault.jpg" ta-insert-video="' + urlLink + '" contenteditable="false" allowfullscreen="true" frameborder="0" />';
					// insert
					return this.$editor().wrapSelection('insertHTML', embed, true);
				}
			}
		},
		onElementSelect: {
			element: 'img',
			onlyWithAttrs: ['ta-insert-video'],
			action: taToolFunctions.imgOnSelectAction
		}
	});
	taRegisterTool('insertLink', {
		tooltiptext: taTranslations.insertLink.tooltip,
		iconclass: 'fa fa-link',
		action: function(){
			var urlLink;
			urlLink = $window.prompt(taTranslations.insertLink.dialogPrompt, 'http://');
			if(urlLink && urlLink !== '' && urlLink !== 'http://'){
				return this.$editor().wrapSelection('createLink', urlLink, true);
			}
		},
		activeState: function(commonElement){
			if(commonElement) return commonElement[0].tagName === 'A';
			return false;
		},
		onElementSelect: {
			element: 'a',
			action: taToolFunctions.aOnSelectAction
		}
	});
	taRegisterTool('wordcount', {
		display: '<div id="toolbarWC" style="display:block; min-width:100px;">Words: <span ng-bind="wordcount"></span></div>',
		disabled: true,
		wordcount: 0,
		activeState: function(){ // this fires on keyup
			var textElement = this.$editor().displayElements.text;
			/* istanbul ignore next: will default to '' when undefined */
			var workingHTML = textElement[0].innerHTML || '';
			var noOfWords = 0;

			/* istanbul ignore if: will default to '' when undefined */
			if (workingHTML.replace(/\s*<[^>]*?>\s*/g, '') !== '') {
				noOfWords = workingHTML.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi, '') // remove inline tags without adding spaces
										.replace(/(<[^>]*?>\s*<[^>]*?>)/ig, ' ') // replace adjacent tags with possible space between with a space
										.replace(/(<[^>]*?>)/ig, '') // remove any singular tags
										.replace(/\s+/ig, ' ') // condense spacing
										.match(/\S+/g).length; // count remaining non-space strings
			}

			//Set current scope
			this.wordcount = noOfWords;
			//Set editor scope
			this.$editor().wordcount = noOfWords;

			return false;
		}
	});
	taRegisterTool('charcount', {
		display: '<div id="toolbarCC" style="display:block; min-width:120px;">Characters: <span ng-bind="charcount"></span></div>',
		disabled: true,
		charcount: 0,
		activeState: function(){ // this fires on keyup
			var textElement = this.$editor().displayElements.text;
			var sourceText = textElement[0].innerText || textElement[0].textContent; // to cover the non-jquery use case.

			// Caculate number of chars
			var noOfChars = sourceText.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+/g,' ').replace(/\s+$/g, ' ').length;
			//Set current scope
			this.charcount = noOfChars;
			//Set editor scope
			this.$editor().charcount = noOfChars;
			return false;
		}
	});
}]);

!function(a,b){b["true"]=a,/*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.3.7

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/
angular.module("textAngularSetup",[]).value("taOptions",{toolbar:[["h1","h2","h3","h4","h5","h6","p","pre","quote"],["bold","italics","underline","strikeThrough","ul","ol","redo","undo","clear"],["justifyLeft","justifyCenter","justifyRight","indent","outdent"],["html","insertImage","insertLink","insertVideo","wordcount","charcount"]],classes:{focussed:"focussed",toolbar:"btn-toolbar",toolbarGroup:"btn-group",toolbarButton:"btn btn-default",toolbarButtonActive:"active",disabled:"disabled",textEditor:"form-control",htmlEditor:"form-control"},defaultTagAttributes:{a:{target:""}},setup:{textEditorSetup:function(a){},htmlEditorSetup:function(a){}},defaultFileDropHandler:function(a,b){var c=new FileReader;return"image"===a.type.substring(0,5)?(c.onload=function(){""!==c.result&&b("insertImage",c.result,!0)},c.readAsDataURL(a),!0):!1}}).value("taSelectableElements",["a","img"]).value("taCustomRenderers",[{selector:"img",customAttribute:"ta-insert-video",renderLogic:function(a){var b=angular.element("<iframe></iframe>"),c=a.prop("attributes");angular.forEach(c,function(a){b.attr(a.name,a.value)}),b.attr("src",b.attr("ta-insert-video")),a.replaceWith(b)}}]).value("taTranslations",{html:{tooltip:"Toggle html / Rich Text"},heading:{tooltip:"Heading "},p:{tooltip:"Paragraph"},pre:{tooltip:"Preformatted text"},ul:{tooltip:"Unordered List"},ol:{tooltip:"Ordered List"},quote:{tooltip:"Quote/unquote selection or paragraph"},undo:{tooltip:"Undo"},redo:{tooltip:"Redo"},bold:{tooltip:"Bold"},italic:{tooltip:"Italic"},underline:{tooltip:"Underline"},strikeThrough:{tooltip:"Strikethrough"},justifyLeft:{tooltip:"Align text left"},justifyRight:{tooltip:"Align text right"},justifyCenter:{tooltip:"Center"},indent:{tooltip:"Increase indent"},outdent:{tooltip:"Decrease indent"},clear:{tooltip:"Clear formatting"},insertImage:{dialogPrompt:"Please enter an image URL to insert",tooltip:"Insert image",hotkey:"the - possibly language dependent hotkey ... for some future implementation"},insertVideo:{tooltip:"Insert video",dialogPrompt:"Please enter a youtube URL to embed"},insertLink:{tooltip:"Insert / edit link",dialogPrompt:"Please enter a URL to insert"},editLink:{reLinkButton:{tooltip:"Relink"},unLinkButton:{tooltip:"Unlink"},targetToggle:{buttontext:"Open in New Window"}},wordcount:{tooltip:"Display words Count"},charcount:{tooltip:"Display characters Count"}}).factory("taToolFunctions",["$window","taTranslations",function(a,b){return{imgOnSelectAction:function(a,b,c){var d=function(){c.updateTaBindtaTextElement(),c.hidePopover()};a.preventDefault(),c.displayElements.popover.css("width","375px");var e=c.displayElements.popoverContainer;e.empty();var f=angular.element('<div class="btn-group" style="padding-right: 6px;">'),g=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');g.on("click",function(a){a.preventDefault(),b.css({width:"100%",height:""}),d()});var h=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');h.on("click",function(a){a.preventDefault(),b.css({width:"50%",height:""}),d()});var i=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');i.on("click",function(a){a.preventDefault(),b.css({width:"25%",height:""}),d()});var j=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');j.on("click",function(a){a.preventDefault(),b.css({width:"",height:""}),d()}),f.append(g),f.append(h),f.append(i),f.append(j),e.append(f),f=angular.element('<div class="btn-group" style="padding-right: 6px;">');var k=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');k.on("click",function(a){a.preventDefault(),b.css("float","left"),b.css("cssFloat","left"),b.css("styleFloat","left"),d()});var l=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');l.on("click",function(a){a.preventDefault(),b.css("float","right"),b.css("cssFloat","right"),b.css("styleFloat","right"),d()});var m=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');m.on("click",function(a){a.preventDefault(),b.css("float",""),b.css("cssFloat",""),b.css("styleFloat",""),d()}),f.append(k),f.append(m),f.append(l),e.append(f),f=angular.element('<div class="btn-group">');var n=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');n.on("click",function(a){a.preventDefault(),b.remove(),d()}),f.append(n),e.append(f),c.showPopover(b),c.showResizeOverlay(b)},aOnSelectAction:function(c,d,e){c.preventDefault(),e.displayElements.popover.css("width","436px");var f=e.displayElements.popoverContainer;f.empty(),f.css("line-height","28px");var g=angular.element('<a href="'+d.attr("href")+'" target="_blank">'+d.attr("href")+"</a>");g.css({display:"inline-block","max-width":"200px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap","vertical-align":"middle"}),f.append(g);var h=angular.element('<div class="btn-group pull-right">'),i=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="'+b.editLink.reLinkButton.tooltip+'"><i class="fa fa-edit icon-edit"></i></button>');i.on("click",function(c){c.preventDefault();var f=a.prompt(b.insertLink.dialogPrompt,d.attr("href"));f&&""!==f&&"http://"!==f&&(d.attr("href",f),e.updateTaBindtaTextElement()),e.hidePopover()}),h.append(i);var j=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="'+b.editLink.unLinkButton.tooltip+'"><i class="fa fa-unlink icon-unlink"></i></button>');j.on("click",function(a){a.preventDefault(),d.replaceWith(d.contents()),e.updateTaBindtaTextElement(),e.hidePopover()}),h.append(j);var k=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">'+b.editLink.targetToggle.buttontext+"</button>");"_blank"===d.attr("target")&&k.addClass("active"),k.on("click",function(a){a.preventDefault(),d.attr("target","_blank"===d.attr("target")?"":"_blank"),k.toggleClass("active"),e.updateTaBindtaTextElement()}),h.append(k),f.append(h),e.showPopover(d)}}}]).run(["taRegisterTool","$window","taTranslations","taSelection","taToolFunctions",function(a,b,c,d,e){a("html",{iconclass:"fa fa-code",tooltiptext:c.html.tooltip,action:function(){this.$editor().switchView()},activeState:function(){return this.$editor().showHtml}});var f=function(a){return function(){return this.$editor().queryFormatBlockState(a)}},g=function(){return this.$editor().wrapSelection("formatBlock","<"+this.name.toUpperCase()+">")};angular.forEach(["h1","h2","h3","h4","h5","h6"],function(b){a(b.toLowerCase(),{buttontext:b.toUpperCase(),tooltiptext:c.heading.tooltip+b.charAt(1),action:g,activeState:f(b.toLowerCase())})}),a("p",{buttontext:"P",tooltiptext:c.p.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<P>")},activeState:function(){return this.$editor().queryFormatBlockState("p")}}),a("pre",{buttontext:"pre",tooltiptext:c.pre.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<PRE>")},activeState:function(){return this.$editor().queryFormatBlockState("pre")}}),a("ul",{iconclass:"fa fa-list-ul",tooltiptext:c.ul.tooltip,action:function(){return this.$editor().wrapSelection("insertUnorderedList",null)},activeState:function(){return this.$editor().queryCommandState("insertUnorderedList")}}),a("ol",{iconclass:"fa fa-list-ol",tooltiptext:c.ol.tooltip,action:function(){return this.$editor().wrapSelection("insertOrderedList",null)},activeState:function(){return this.$editor().queryCommandState("insertOrderedList")}}),a("quote",{iconclass:"fa fa-quote-right",tooltiptext:c.quote.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<BLOCKQUOTE>")},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")}}),a("undo",{iconclass:"fa fa-undo",tooltiptext:c.undo.tooltip,action:function(){return this.$editor().wrapSelection("undo",null)}}),a("redo",{iconclass:"fa fa-repeat",tooltiptext:c.redo.tooltip,action:function(){return this.$editor().wrapSelection("redo",null)}}),a("bold",{iconclass:"fa fa-bold",tooltiptext:c.bold.tooltip,action:function(){return this.$editor().wrapSelection("bold",null)},activeState:function(){return this.$editor().queryCommandState("bold")},commandKeyCode:98}),a("justifyLeft",{iconclass:"fa fa-align-left",tooltiptext:c.justifyLeft.tooltip,action:function(){return this.$editor().wrapSelection("justifyLeft",null)},activeState:function(a){if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="left"===a.css("text-align")||"left"===a.attr("align")||"right"!==a.css("text-align")&&"center"!==a.css("text-align")&&"justify"!==a.css("text-align")&&!this.$editor().queryCommandState("justifyRight")&&!this.$editor().queryCommandState("justifyCenter")&&!this.$editor().queryCommandState("justifyFull")),b=b||this.$editor().queryCommandState("justifyLeft")}}),a("justifyRight",{iconclass:"fa fa-align-right",tooltiptext:c.justifyRight.tooltip,action:function(){return this.$editor().wrapSelection("justifyRight",null)},activeState:function(a){if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="right"===a.css("text-align")),b=b||this.$editor().queryCommandState("justifyRight")}}),a("justifyCenter",{iconclass:"fa fa-align-center",tooltiptext:c.justifyCenter.tooltip,action:function(){return this.$editor().wrapSelection("justifyCenter",null)},activeState:function(a){if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="center"===a.css("text-align")),b=b||this.$editor().queryCommandState("justifyCenter")}}),a("indent",{iconclass:"fa fa-indent",tooltiptext:c.indent.tooltip,action:function(){return this.$editor().wrapSelection("indent",null)},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")},commandKeyCode:"TabKey"}),a("outdent",{iconclass:"fa fa-outdent",tooltiptext:c.outdent.tooltip,action:function(){return this.$editor().wrapSelection("outdent",null)},activeState:function(){return!1},commandKeyCode:"ShiftTabKey"}),a("italics",{iconclass:"fa fa-italic",tooltiptext:c.italic.tooltip,action:function(){return this.$editor().wrapSelection("italic",null)},activeState:function(){return this.$editor().queryCommandState("italic")},commandKeyCode:105}),a("underline",{iconclass:"fa fa-underline",tooltiptext:c.underline.tooltip,action:function(){return this.$editor().wrapSelection("underline",null)},activeState:function(){return this.$editor().queryCommandState("underline")},commandKeyCode:117}),a("strikeThrough",{iconclass:"fa fa-strikethrough",tooltiptext:c.strikeThrough.tooltip,action:function(){return this.$editor().wrapSelection("strikeThrough",null)},activeState:function(){return document.queryCommandState("strikeThrough")}}),a("clear",{iconclass:"fa fa-ban",tooltiptext:c.clear.tooltip,action:function(a,b){var c;this.$editor().wrapSelection("removeFormat",null);var e=angular.element(d.getSelectionElement()),f=function(a){a=angular.element(a);var b=a;angular.forEach(a.children(),function(a){var c=angular.element("<p></p>");c.html(angular.element(a).html()),b.after(c),b=c}),a.remove()};if(angular.forEach(e.find("ul"),f),angular.forEach(e.find("ol"),f),"li"===e[0].tagName.toLowerCase()){var g=e[0].parentNode.childNodes,h=[],i=[],j=!1;for(c=0;c<g.length;c++)g[c]===e[0]?j=!0:j?i.push(g[c]):h.push(g[c]);var k=angular.element(e[0].parentNode),l=angular.element("<p></p>");if(l.html(angular.element(e[0]).html()),0===h.length||0===i.length)0===i.length?k.after(l):k[0].parentNode.insertBefore(l[0],k[0]),0===h.length&&0===i.length?k.remove():angular.element(e[0]).remove();else{var m=angular.element("<"+k[0].tagName+"></"+k[0].tagName+">"),n=angular.element("<"+k[0].tagName+"></"+k[0].tagName+">");for(c=0;c<h.length;c++)m.append(angular.element(h[c]));for(c=0;c<i.length;c++)n.append(angular.element(i[c]));k.after(n),k.after(l),k.after(m),k.remove()}d.setSelectionToElementEnd(l[0])}var o=this.$editor(),p=function(a){a=angular.element(a),a[0]!==o.displayElements.text[0]&&a.removeAttr("class"),angular.forEach(a.children(),p)};angular.forEach(e,p),"li"!==e[0].tagName.toLowerCase()&&"ol"!==e[0].tagName.toLowerCase()&&"ul"!==e[0].tagName.toLowerCase()&&this.$editor().wrapSelection("formatBlock","default"),b()}}),a("insertImage",{iconclass:"fa fa-picture-o",tooltiptext:c.insertImage.tooltip,action:function(){var a;return a=b.prompt(c.insertImage.dialogPrompt,"http://"),a&&""!==a&&"http://"!==a?this.$editor().wrapSelection("insertImage",a,!0):void 0},onElementSelect:{element:"img",action:e.imgOnSelectAction}}),a("insertVideo",{iconclass:"fa fa-youtube-play",tooltiptext:c.insertVideo.tooltip,action:function(){var a;if(a=b.prompt(c.insertVideo.dialogPrompt,"https://"),a&&""!==a&&"https://"!==a){var d=a.match(/(\?|&)v=[^&]*/);if(d&&d.length>0){var e="https://www.youtube.com/embed/"+d[0].substring(3),f='<img class="ta-insert-video" src="https://img.youtube.com/vi/'+d[0].substring(3)+'/hqdefault.jpg" ta-insert-video="'+e+'" contenteditable="false" allowfullscreen="true" frameborder="0" />';return this.$editor().wrapSelection("insertHTML",f,!0)}}},onElementSelect:{element:"img",onlyWithAttrs:["ta-insert-video"],action:e.imgOnSelectAction}}),a("insertLink",{tooltiptext:c.insertLink.tooltip,iconclass:"fa fa-link",action:function(){var a;return a=b.prompt(c.insertLink.dialogPrompt,"http://"),a&&""!==a&&"http://"!==a?this.$editor().wrapSelection("createLink",a,!0):void 0},activeState:function(a){return a?"A"===a[0].tagName:!1},onElementSelect:{element:"a",action:e.aOnSelectAction}}),a("wordcount",{display:'<div id="toolbarWC" style="display:block; min-width:100px;">Words: <span ng-bind="wordcount"></span></div>',disabled:!0,wordcount:0,activeState:function(){var a=this.$editor().displayElements.text,b=a[0].innerHTML||"",c=0;return""!==b.replace(/\s*<[^>]*?>\s*/g,"")&&(c=b.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi,"").replace(/(<[^>]*?>\s*<[^>]*?>)/gi," ").replace(/(<[^>]*?>)/gi,"").replace(/\s+/gi," ").match(/\S+/g).length),this.wordcount=c,this.$editor().wordcount=c,!1}}),a("charcount",{display:'<div id="toolbarCC" style="display:block; min-width:120px;">Characters: <span ng-bind="charcount"></span></div>',disabled:!0,charcount:0,activeState:function(){var a=this.$editor().displayElements.text,b=a[0].innerText||a[0].textContent,c=b.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+/g," ").replace(/\s+$/g," ").length;return this.charcount=c,this.$editor().charcount=c,!1}})}]),/*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.4.2

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/
function(){"use strict";function a(a){try{return 0!==angular.element(a).length}catch(b){return!1}}function b(b,c){if(!b||""===b||r.hasOwnProperty(b))throw"textAngular Error: A unique name is required for a Tool Definition";if(c.display&&(""===c.display||!a(c.display))||!c.display&&!c.buttontext&&!c.iconclass)throw'textAngular Error: Tool Definition for "'+b+'" does not have a valid display/iconclass/buttontext value';r[b]=c}var c={ie:function(){for(var a,b=3,c=document.createElement("div"),d=c.getElementsByTagName("i");c.innerHTML="<!--[if gt IE "+ ++b+"]><i></i><![endif]-->",d[0];);return b>4?b:a}(),webkit:/AppleWebKit\/([\d.]+)/i.test(navigator.userAgent)},d=!1;c.webkit&&(document.addEventListener("mousedown",function(a){var b=a||window.event,c=b.target;if(d&&null!==c){for(var e=!1,f=c;null!==f&&"html"!==f.tagName.toLowerCase()&&!e;)e="true"===f.contentEditable,f=f.parentNode;e||(document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0,0),c.focus(),c.select&&c.select())}d=!1},!1),angular.element(document).ready(function(){angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" class="ta-hidden-input" aria-hidden="true" unselectable="on" tabIndex="-1">'))}));var e=/^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/i,f=/^(ul|li|ol)$/i,g=/^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video|li)$/i;String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var h,i,j,k,l,m;if(c.ie>8||void 0===c.ie){for(var n=document.styleSheets,o=0;o<n.length;o++)if((0===n[o].media.length||n[o].media.mediaText.match(/(all|screen)/gi))&&n[o].href&&n[o].href.match(/textangular\.(min\.|)css/gi)){h=n[o];break}h||(h=function(){var a=document.createElement("style");return c.webkit&&a.appendChild(document.createTextNode("")),document.getElementsByTagName("head")[0].appendChild(a),a.sheet}()),i=function(a,b){return k(h,a,b)},k=function(a,b,c){var d,e;return a.cssRules?d=Math.max(a.cssRules.length-1,0):a.rules&&(d=Math.max(a.rules.length-1,0)),a.insertRule?a.insertRule(b+"{"+c+"}",d):a.addRule(b,c,d),h.rules?e=h.rules[d]:h.cssRules&&(e=h.cssRules[d]),e},m=function(a,b){var c,d;for(c=0;c<b.length;c++)if(b[c].cssText===a.cssText){d=c;break}return d},j=function(a){l(h,a)},l=function(a,b){var c=a.cssRules||a.rules;if(c){var d=m(b,c);a.removeRule?a.removeRule(d):a.deleteRule(d)}}}angular.module("textAngular.factories",[]).factory("taBrowserTag",[function(){return function(a){return a?""===a?void 0===c.ie?"div":c.ie<=8?"P":"p":c.ie<=8?a.toUpperCase():a:c.ie<=8?"P":"p"}}]).factory("taApplyCustomRenderers",["taCustomRenderers","taDOM",function(a,b){return function(c){var d=angular.element("<div></div>");return d[0].innerHTML=c,angular.forEach(a,function(a){var c=[];a.selector&&""!==a.selector?c=d.find(a.selector):a.customAttribute&&""!==a.customAttribute&&(c=b.getByAttribute(d,a.customAttribute)),angular.forEach(c,function(b){b=angular.element(b),a.selector&&""!==a.selector&&a.customAttribute&&""!==a.customAttribute?void 0!==b.attr(a.customAttribute)&&a.renderLogic(b):a.renderLogic(b)})}),d[0].innerHTML}}]).factory("taFixChrome",function(){var a=function(a){if(!a||!angular.isString(a)||a.length<=0)return a;for(var b,c,d,e=/<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi,f="",g=0;b=e.exec(a);)c=b[3]||b[4],c&&c.match(/line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;/i)&&(c=c.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;/gi,""),d="<"+b[1].trim(),c.trim().length>0&&(d+=" style="+b[2].substring(0,1)+c+b[2].substring(0,1)),d+=b[5].trim()+">",f+=a.substring(g,b.index)+d,g=b.index+b[0].length);return f+=a.substring(g),g>0?f.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/gi,"$1"):a};return a}).factory("taSanitize",["$sanitize",function(a){function b(a,b){for(var c,d=0,e=0,f=/<[^>]*>/gi;c=f.exec(a);)if(e=c.index,"/"===c[0].substr(1,1)){if(0===d)break;d--}else d++;return b+a.substring(0,e)+angular.element(b)[0].outerHTML.substring(b.length)+a.substring(e)}function c(a){if(!a||!angular.isString(a)||a.length<=0)return a;for(var d,f,g,h,i,k,l=/<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi,m="",n="",o=0;f=l.exec(a);){h=f[3]||f[4];var p=new RegExp(j,"i");if(angular.isString(h)&&p.test(h)){i="";for(var q=new RegExp(j,"ig");g=q.exec(h);)for(d=0;d<e.length;d++)g[2*d+2]&&(i+="<"+e[d].tag+">");k=c(a.substring(o,f.index)),n+=m.length>0?b(k,m):k,h=h.replace(new RegExp(j,"ig"),""),n+="<"+f[1].trim(),h.length>0&&(n+=' style="'+h+'"'),n+=f[5]+">",o=f.index+f[0].length,m=i}}return n+=m.length>0?b(a.substring(o),m):a.substring(o)}function d(a){if(!a||!angular.isString(a)||a.length<=0)return a;for(var b,c=/<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/gi,d="",e=0;b=c.exec(a);){d+=a.substring(e,b.index),e=b.index+b[0].length;var f="<"+b[1]+b[5];/style=("([^"]+)"|'([^']+)')/gi.test(f)?f=f.replace(/style=("([^"]+)"|'([^']+)')/i,'style="$2$3 text-align:'+(b[3]||b[4])+';"'):f+=' style="text-align:'+(b[3]||b[4])+';"',f+=">",d+=f}return d+a.substring(e)}for(var e=[{property:"font-weight",values:["bold"],tag:"b"},{property:"font-style",values:["italic"],tag:"i"}],f=[],g=0;g<e.length;g++){for(var h="("+e[g].property+":\\s*(",i=0;i<e[g].values.length;i++)i>0&&(h+="|"),h+=e[g].values[i];h+=");)",f.push(h)}var j="("+f.join("|")+")";return function(b,e,f){if(!f)try{b=c(b)}catch(g){}b=d(b);var h;try{h=a(b),f&&(h=b)}catch(g){h=e||""}var i,j=h.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/gi),k=h.replace(/(&#(9|10);)*/gi,""),l=/<pre[^>]*>.*?<\/pre[^>]*>/gi,m=0,n=0;for(h="";null!==(i=l.exec(k))&&m<j.length;)h+=k.substring(n,i.index)+j[m],n=i.index+i[0].length,m++;return h+k.substring(n)}}]).factory("taToolExecuteAction",["$q","$log",function(a,b){return function(c){void 0!==c&&(this.$editor=function(){return c});var d,e=a.defer(),f=e.promise,g=this.$editor();try{d=this.action(e,g.startAction()),f["finally"](function(){g.endAction.call(g)})}catch(h){b.error(h)}(d||void 0===d)&&e.resolve()}}]),angular.module("textAngular.DOM",["textAngular.factories"]).factory("taExecCommand",["taSelection","taBrowserTag","$document",function(a,b,c){var d=function(b,c){var d,e,f=b.find("li");for(e=f.length-1;e>=0;e--)d=angular.element("<"+c+">"+f[e].innerHTML+"</"+c+">"),b.after(d);b.remove(),a.setSelectionToElementEnd(d[0])},g=function(b){/(<br(|\/)>)$/i.test(b.innerHTML.trim())?a.setSelectionBeforeElement(angular.element(b).find("br")[0]):a.setSelectionToElementEnd(b)},h=function(a,b){var c=angular.element("<"+b+">"+a[0].innerHTML+"</"+b+">");a.after(c),a.remove(),g(c.find("li")[0])},i=function(a,c,d){for(var e="",f=0;f<a.length;f++)e+="<"+b("li")+">"+a[f].innerHTML+"</"+b("li")+">";var h=angular.element("<"+d+">"+e+"</"+d+">");c.after(h),c.remove(),g(h.find("li")[0])};return function(g,j){return g=b(g),function(k,l,m,n){var o,p,q,r,s,t,u,v=angular.element("<"+g+">");try{u=a.getSelectionElement()}catch(w){}var x=angular.element(u);if(void 0!==u){var y=u.tagName.toLowerCase();if("insertorderedlist"===k.toLowerCase()||"insertunorderedlist"===k.toLowerCase()){var z=b("insertorderedlist"===k.toLowerCase()?"ol":"ul");if(y===z)return d(x,g);if("li"===y&&x.parent()[0].tagName.toLowerCase()===z&&1===x.parent().children().length)return d(x.parent(),g);if("li"===y&&x.parent()[0].tagName.toLowerCase()!==z&&1===x.parent().children().length)return h(x.parent(),z);if(y.match(e)&&!x.hasClass("ta-bind")){if("ol"===y||"ul"===y)return h(x,z);var A=!1;return angular.forEach(x.children(),function(a){a.tagName.match(e)&&(A=!0)}),A?i(x.children(),x,z):i([angular.element("<div>"+u.innerHTML+"</div>")[0]],x,z)}if(y.match(e)){if(r=a.getOnlySelectedElements(),0===r.length)p=angular.element("<"+z+"><li>"+u.innerHTML+"</li></"+z+">"),x.html(""),x.append(p);else{if(1===r.length&&("ol"===r[0].tagName.toLowerCase()||"ul"===r[0].tagName.toLowerCase()))return r[0].tagName.toLowerCase()===z?d(angular.element(r[0]),g):h(angular.element(r[0]),z);q="";var B=[];for(o=0;o<r.length;o++)if(3!==r[o].nodeType){var C=angular.element(r[o]);if("li"===r[o].tagName.toLowerCase())continue;q+="ol"===r[o].tagName.toLowerCase()||"ul"===r[o].tagName.toLowerCase()?C[0].innerHTML:"span"!==r[o].tagName.toLowerCase()||"ol"!==r[o].childNodes[0].tagName.toLowerCase()&&"ul"!==r[o].childNodes[0].tagName.toLowerCase()?"<"+b("li")+">"+C[0].innerHTML+"</"+b("li")+">":C[0].childNodes[0].innerHTML,B.unshift(C)}p=angular.element("<"+z+">"+q+"</"+z+">"),B.pop().replaceWith(p),angular.forEach(B,function(a){a.remove()})}return void a.setSelectionToElementEnd(p[0])}}else{if("formatblock"===k.toLowerCase()){for(t=m.toLowerCase().replace(/[<>]/gi,""),"default"===t.trim()&&(t=g,m="<"+g+">"),p="li"===y?x.parent():x;!p[0].tagName||!p[0].tagName.match(e)&&!p.parent().attr("contenteditable");)p=p.parent(),y=(p[0].tagName||"").toLowerCase();if(y===t){r=p.children();var D=!1;for(o=0;o<r.length;o++)D=D||r[o].tagName.match(e);D?(p.after(r),s=p.next(),p.remove(),p=s):(v.append(p[0].childNodes),p.after(v),p.remove(),p=v)}else if(p.parent()[0].tagName.toLowerCase()!==t||p.parent().hasClass("ta-bind"))if(y.match(f))p.wrap(m);else{for(r=a.getOnlySelectedElements(),0===r.length&&(r=[p[0]]),o=0;o<r.length;o++)if(3===r[o].nodeType||!r[o].tagName.match(e))for(;3===r[o].nodeType||!r[o].tagName||!r[o].tagName.match(e);)r[o]=r[o].parentNode;if(angular.element(r[0]).hasClass("ta-bind"))p=angular.element(m),p[0].innerHTML=r[0].innerHTML,r[0].innerHTML=p[0].outerHTML;else if("blockquote"===t){for(q="",o=0;o<r.length;o++)q+=r[o].outerHTML;for(p=angular.element(m),p[0].innerHTML=q,r[0].parentNode.insertBefore(p[0],r[0]),o=r.length-1;o>=0;o--)r[o].parentNode&&r[o].parentNode.removeChild(r[o])}else for(o=0;o<r.length;o++)p=angular.element(m),p[0].innerHTML=r[o].innerHTML,r[o].parentNode.insertBefore(p[0],r[o]),r[o].parentNode.removeChild(r[o])}else{var E=p.parent(),F=E.contents();for(o=0;o<F.length;o++)E.parent().hasClass("ta-bind")&&3===F[o].nodeType&&(v=angular.element("<"+g+">"),v[0].innerHTML=F[o].outerHTML,F[o]=v[0]),E.parent()[0].insertBefore(F[o],E[0]);E.remove()}return void a.setSelectionToElementEnd(p[0])}if("createlink"===k.toLowerCase()){var G='<a href="'+m+'" target="'+(n.a.target?n.a.target:"")+'">',H="</a>",I=a.getSelection();if(I.collapsed)a.insertHtml(G+m+H,j);else if(rangy.getSelection().getRangeAt(0).canSurroundContents()){var J=angular.element(G+H)[0];rangy.getSelection().getRangeAt(0).surroundContents(J)}return}if("inserthtml"===k.toLowerCase())return void a.insertHtml(m,j)}}try{c[0].execCommand(k,l,m)}catch(w){}}}}]).service("taSelection",["$window","$document","taDOM",function(a,b,c){var d=b[0],f=a.rangy,h=function(a,b){return a.tagName&&a.tagName.match(/^br$/i)&&0===b&&!a.previousSibling?{element:a.parentNode,offset:0}:{element:a,offset:b}},i={getSelection:function(){var a=f.getSelection().getRangeAt(0),b=a.commonAncestorContainer,c={start:h(a.startContainer,a.startOffset),end:h(a.endContainer,a.endOffset),collapsed:a.collapsed};return b=3===b.nodeType?b.parentNode:b,b.parentNode===c.start.element||b.parentNode===c.end.element?c.container=b.parentNode:c.container=b,c},getOnlySelectedElements:function(){var a=f.getSelection().getRangeAt(0),b=a.commonAncestorContainer;return b=3===b.nodeType?b.parentNode:b,a.getNodes([1],function(a){return a.parentNode===b})},getSelectionElement:function(){return i.getSelection().container},setSelection:function(a,b,c){var d=f.createRange();d.setStart(a,b),d.setEnd(a,c),f.getSelection().setSingleRange(d)},setSelectionBeforeElement:function(a){var b=f.createRange();b.selectNode(a),b.collapse(!0),f.getSelection().setSingleRange(b)},setSelectionAfterElement:function(a){var b=f.createRange();b.selectNode(a),b.collapse(!1),f.getSelection().setSingleRange(b)},setSelectionToElementStart:function(a){var b=f.createRange();b.selectNodeContents(a),b.collapse(!0),f.getSelection().setSingleRange(b)},setSelectionToElementEnd:function(a){var b=f.createRange();b.selectNodeContents(a),b.collapse(!1),a.childNodes&&a.childNodes[a.childNodes.length-1]&&"br"===a.childNodes[a.childNodes.length-1].nodeName&&(b.startOffset=b.endOffset=b.startOffset-1),f.getSelection().setSingleRange(b)},insertHtml:function(a,b){var h,j,k,l,m,n,o,p=angular.element("<div>"+a+"</div>"),q=f.getSelection().getRangeAt(0),r=d.createDocumentFragment(),s=p[0].childNodes,t=!0;if(s.length>0){for(l=[],k=0;k<s.length;k++)"p"===s[k].nodeName.toLowerCase()&&""===s[k].innerHTML.trim()||3===s[k].nodeType&&""===s[k].nodeValue.trim()||(t=t&&!e.test(s[k].nodeName),l.push(s[k]));for(var u=0;u<l.length;u++)n=r.appendChild(l[u]);!t&&q.collapsed&&/^(|<br(|\/)>)$/i.test(q.startContainer.innerHTML)&&q.selectNode(q.startContainer)}else t=!0,n=r=d.createTextNode(a);if(t)q.deleteContents();else if(q.collapsed&&q.startContainer!==b)if(q.startContainer.innerHTML&&q.startContainer.innerHTML.match(/^<[^>]*>$/i))h=q.startContainer,1===q.startOffset?(q.setStartAfter(h),q.setEndAfter(h)):(q.setStartBefore(h),q.setEndBefore(h));else{if(3===q.startContainer.nodeType&&q.startContainer.parentNode!==b)for(h=q.startContainer.parentNode,j=h.cloneNode(),c.splitNodes(h.childNodes,h,j,q.startContainer,q.startOffset);!g.test(h.nodeName);){angular.element(h).after(j),h=h.parentNode;var v=j;j=h.cloneNode(),c.splitNodes(h.childNodes,h,j,v)}else h=q.startContainer,j=h.cloneNode(),c.splitNodes(h.childNodes,h,j,void 0,void 0,q.startOffset);if(angular.element(h).after(j),q.setStartAfter(h),q.setEndAfter(h),/^(|<br(|\/)>)$/i.test(h.innerHTML.trim())&&(q.setStartBefore(h),q.setEndBefore(h),angular.element(h).remove()),/^(|<br(|\/)>)$/i.test(j.innerHTML.trim())&&angular.element(j).remove(),"li"===h.nodeName.toLowerCase()){for(o=d.createDocumentFragment(),m=0;m<r.childNodes.length;m++)p=angular.element("<li>"),c.transferChildNodes(r.childNodes[m],p[0]),c.transferNodeAttributes(r.childNodes[m],p[0]),o.appendChild(p[0]);r=o,n&&(n=r.childNodes[r.childNodes.length-1],n=n.childNodes[n.childNodes.length-1])}}else q.deleteContents();q.insertNode(r),n&&i.setSelectionToElementEnd(n)}};return i}]).service("taDOM",function(){var a={getByAttribute:function(b,c){var d=[],e=b.children();return e.length&&angular.forEach(e,function(b){d=d.concat(a.getByAttribute(angular.element(b),c))}),void 0!==b.attr(c)&&d.push(b),d},transferChildNodes:function(a,b){for(b.innerHTML="";a.childNodes.length>0;)b.appendChild(a.childNodes[0]);return b},splitNodes:function(b,c,d,e,f,g){if(!e&&isNaN(g))throw new Error("taDOM.splitNodes requires a splitNode or splitIndex");for(var h=document.createDocumentFragment(),i=document.createDocumentFragment(),j=0;b.length>0&&(isNaN(g)||g!==j)&&b[0]!==e;)h.appendChild(b[0]),j++;for(!isNaN(f)&&f>=0&&b[0]&&(h.appendChild(document.createTextNode(b[0].nodeValue.substring(0,f))),b[0].nodeValue=b[0].nodeValue.substring(f));b.length>0;)i.appendChild(b[0]);a.transferChildNodes(h,c),a.transferChildNodes(i,d)},transferNodeAttributes:function(a,b){for(var c=0;c<a.attributes.length;c++)b.setAttribute(a.attributes[c].name,a.attributes[c].value);return b}};return a}),angular.module("textAngular.validators",[]).directive("taMaxText",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e=parseInt(a.$eval(c.taMaxText));if(isNaN(e))throw"Max text must be an integer";c.$observe("taMaxText",function(a){if(e=parseInt(a),isNaN(e))throw"Max text must be an integer";d.$dirty&&d.$validate()}),d.$validators.taMaxText=function(a){var b=angular.element("<div/>");return b.html(a),b.text().length<=e}}}}).directive("taMinText",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e=parseInt(a.$eval(c.taMinText));if(isNaN(e))throw"Min text must be an integer";c.$observe("taMinText",function(a){if(e=parseInt(a),isNaN(e))throw"Min text must be an integer";d.$dirty&&d.$validate()}),d.$validators.taMinText=function(a){var b=angular.element("<div/>");return b.html(a),!b.text().length||b.text().length>=e}}}}),angular.module("textAngular.taBind",["textAngular.factories","textAngular.DOM"]).service("_taBlankTest",[function(){var a=/<(a|abbr|acronym|bdi|bdo|big|cite|code|del|dfn|img|ins|kbd|label|map|mark|q|ruby|rp|rt|s|samp|time|tt|var)[^>]*(>|$)/i;return function(b){return function(c){if(!c)return!0;var d,e=/(^[^<]|>)[^<]/i.exec(c);return e?d=e.index:(c=c.toString().replace(/="[^"]*"/i,"").replace(/="[^"]*"/i,"").replace(/="[^"]*"/i,"").replace(/="[^"]*"/i,""),d=c.indexOf(">")),c=c.trim().substring(d,d+100),/^[^<>]+$/i.test(c)?!1:0===c.length||c===b||/^>(\s|&nbsp;)*<\/[^>]+>$/gi.test(c)?!0:/>\s*[^\s<]/i.test(c)||a.test(c)?!1:!0}}}]).directive("taButton",[function(){return{link:function(a,b,c){b.attr("unselectable","on"),b.on("mousedown",function(a,b){return b&&angular.extend(a,b),a.preventDefault(),!1})}}}]).directive("taBind",["taSanitize","$timeout","$window","$document","taFixChrome","taBrowserTag","taSelection","taSelectableElements","taApplyCustomRenderers","taOptions","_taBlankTest","$parse","taDOM","textAngularManager",function(a,b,f,h,k,l,m,n,o,q,r,s,t,u){return{priority:2,require:["ngModel","?ngModelOptions"],link:function(l,v,w,x){var y,z,A,B,C=x[0],D=x[1]||{},E=void 0!==v.attr("contenteditable")&&v.attr("contenteditable"),F=E||"textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase(),G=!1,H=!1,I=!1,J=w.taUnsafeSanitizer||q.disableSanitizer,K=/^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i,L=/^(8|13|32|46|59|61|107|109|186|187|188|189|190|191|192|219|220|221|222)$/i;void 0===w.taDefaultWrap&&(w.taDefaultWrap="p"),""===w.taDefaultWrap?(A="",B=void 0===c.ie?"<div><br></div>":c.ie>=11?"<p><br></p>":c.ie<=8?"<P>&nbsp;</P>":"<p>&nbsp;</p>"):(A=void 0===c.ie||c.ie>=11?"<"+w.taDefaultWrap+"><br></"+w.taDefaultWrap+">":c.ie<=8?"<"+w.taDefaultWrap.toUpperCase()+"></"+w.taDefaultWrap.toUpperCase()+">":"<"+w.taDefaultWrap+"></"+w.taDefaultWrap+">",B=void 0===c.ie||c.ie>=11?"<"+w.taDefaultWrap+"><br></"+w.taDefaultWrap+">":c.ie<=8?"<"+w.taDefaultWrap.toUpperCase()+">&nbsp;</"+w.taDefaultWrap.toUpperCase()+">":"<"+w.taDefaultWrap+">&nbsp;</"+w.taDefaultWrap+">"),D.$options||(D.$options={});var M=r(B),N=function(a){if(M(a))return a;var b=angular.element("<div>"+a+"</div>");if(0===b.children().length)a="<"+w.taDefaultWrap+">"+a+"</"+w.taDefaultWrap+">";else{var c,d=b[0].childNodes,f=!1;for(c=0;c<d.length&&!(f=d[c].nodeName.toLowerCase().match(e));c++);if(f)for(a="",c=0;c<d.length;c++)if(d[c].nodeName.toLowerCase().match(e))a+=d[c].outerHTML;else{var g=d[c].outerHTML||d[c].nodeValue;a+=""!==g.trim()?"<"+w.taDefaultWrap+">"+g+"</"+w.taDefaultWrap+">":g}else a="<"+w.taDefaultWrap+">"+a+"</"+w.taDefaultWrap+">"}return a};w.taPaste&&(z=s(w.taPaste)),v.addClass("ta-bind");var O;l["$undoManager"+(w.id||"")]=C.$undoManager={_stack:[],_index:0,_max:1e3,push:function(a){return"undefined"==typeof a||null===a||"undefined"!=typeof this.current()&&null!==this.current()&&a===this.current()?a:(this._index<this._stack.length-1&&(this._stack=this._stack.slice(0,this._index+1)),this._stack.push(a),O&&b.cancel(O),this._stack.length>this._max&&this._stack.shift(),this._index=this._stack.length-1,a)},undo:function(){return this.setToIndex(this._index-1)},redo:function(){return this.setToIndex(this._index+1)},setToIndex:function(a){return 0>a||a>this._stack.length-1?void 0:(this._index=a,this.current())},current:function(){return this._stack[this._index]}};var P,Q=l["$undoTaBind"+(w.id||"")]=function(){if(!G&&E){var a=C.$undoManager.undo();"undefined"!=typeof a&&null!==a&&(da(a),T(a,!1),P&&b.cancel(P),P=b(function(){v[0].focus(),m.setSelectionToElementEnd(v[0])},1))}},R=l["$redoTaBind"+(w.id||"")]=function(){if(!G&&E){var a=C.$undoManager.redo();"undefined"!=typeof a&&null!==a&&(da(a),T(a,!1),P&&b.cancel(P),P=b(function(){v[0].focus(),m.setSelectionToElementEnd(v[0])},1))}},S=function(){if(E)return v[0].innerHTML;if(F)return v.val();throw"textAngular Error: attempting to update non-editable taBind"},T=function(a,b,c){I=c||!1,("undefined"==typeof b||null===b)&&(b=!0&&E),("undefined"==typeof a||null===a)&&(a=S()),M(a)?(""!==C.$viewValue&&C.$setViewValue(""),b&&""!==C.$undoManager.current()&&C.$undoManager.push("")):(ca(),C.$viewValue!==a&&(C.$setViewValue(a),b&&C.$undoManager.push(a))),C.$render()};l["updateTaBind"+(w.id||"")]=function(){G||T(void 0,void 0,!0)};var U=function(b){return C.$oldViewValue=a(k(b),C.$oldViewValue,J)};if(v.attr("required")&&(C.$validators.required=function(a,b){return!M(a||b)}),C.$parsers.push(U),C.$parsers.unshift(N),C.$formatters.push(U),C.$formatters.unshift(N),C.$formatters.unshift(function(a){return C.$undoManager.push(a||"")}),F)if(l.events={},E){var V=!1,W=function(c){if(c&&c.trim().length){if(c.match(/class=["']*Mso(Normal|List)/i)){var d=c.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);d=d?d[1]:c,d=d.replace(/<o:p>[\s\S]*?<\/o:p>/gi,"").replace(/class=(["']|)MsoNormal(["']|)/gi,"");var e=angular.element("<div>"+d+"</div>"),f=angular.element("<div></div>"),g={element:null,lastIndent:[],lastLi:null,isUl:!1};g.lastIndent.peek=function(){var a=this.length;return a>0?this[a-1]:void 0};for(var h=function(a){g.isUl=a,g.element=angular.element(a?"<ul>":"<ol>"),g.lastIndent=[],g.lastIndent.peek=function(){var a=this.length;return a>0?this[a-1]:void 0},g.lastLevelMatch=null},i=0;i<=e[0].childNodes.length;i++)if(e[0].childNodes[i]&&"#text"!==e[0].childNodes[i].nodeName&&"p"===e[0].childNodes[i].tagName.toLowerCase()){var j=angular.element(e[0].childNodes[i]),k=(j.attr("class")||"").match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);if(k){if(j[0].childNodes.length<2||j[0].childNodes[1].childNodes.length<1)continue;var n="bullet"===k[1].toLowerCase()||"number"!==k[1].toLowerCase()&&!(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(j[0].childNodes[1].innerHTML)||/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(j[0].childNodes[1].childNodes[0].innerHTML)),o=(j.attr("style")||"").match(/margin-left:([\-\.0-9]*)/i),p=parseFloat(o?o[1]:0),q=(j.attr("style")||"").match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);if(q&&q[2]&&(p=parseInt(q[2])),q&&(!g.lastLevelMatch||q[1]!==g.lastLevelMatch[1])||!k[3]||"first"===k[3].toLowerCase()||null===g.lastIndent.peek()||g.isUl!==n&&g.lastIndent.peek()===p)h(n),f.append(g.element);else if(null!=g.lastIndent.peek()&&g.lastIndent.peek()<p)g.element=angular.element(n?"<ul>":"<ol>"),g.lastLi.append(g.element);else if(null!=g.lastIndent.peek()&&g.lastIndent.peek()>p){for(;null!=g.lastIndent.peek()&&g.lastIndent.peek()>p;)if("li"!==g.element.parent()[0].tagName.toLowerCase()){if(!/[uo]l/i.test(g.element.parent()[0].tagName.toLowerCase()))break;g.element=g.element.parent(),g.lastIndent.pop()}else g.element=g.element.parent();g.isUl="ul"===g.element[0].tagName.toLowerCase(),n!==g.isUl&&(h(n),f.append(g.element))}g.lastLevelMatch=q,p!==g.lastIndent.peek()&&g.lastIndent.push(p),g.lastLi=angular.element("<li>"),g.element.append(g.lastLi),g.lastLi.html(j.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/gi,"")),j.remove()}else h(!1),f.append(j)}var r=function(a){a=angular.element(a);for(var b=a[0].childNodes.length-1;b>=0;b--)a.after(a[0].childNodes[b]);a.remove()};angular.forEach(f.find("span"),function(a){a.removeAttribute("lang"),a.attributes.length<=0&&r(a)}),angular.forEach(f.find("font"),r),c=f.html()}else{if(c=c.replace(/<(|\/)meta[^>]*?>/gi,""),c.match(/<[^>]*?(ta-bind)[^>]*?>/)){if(c.match(/<[^>]*?(text-angular)[^>]*?>/)){var s=angular.element("<div>"+c+"</div>");s.find("textarea").remove();for(var u=t.getByAttribute(s,"ta-bind"),w=0;w<u.length;w++){for(var x=u[w][0].parentNode.parentNode,y=0;y<u[w][0].childNodes.length;y++)x.parentNode.insertBefore(u[w][0].childNodes[y],x);x.parentNode.removeChild(x)}c=s.html().replace('<br class="Apple-interchange-newline">',"")}}else c.match(/^<span/)&&(c=c.replace(/<(|\/)span[^>]*?>/gi,""));c=c.replace(/<br class="Apple-interchange-newline"[^>]*?>/gi,"").replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/gi,"&nbsp;")}/<li(\s.*)?>/i.test(c)&&/(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(c)===!1&&(c=c.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i,"<ul>$&</ul>")),z&&(c=z(l,{$html:c})||c),c=a(c,"",J),m.insertHtml(c,v[0]),b(function(){C.$setViewValue(S()),V=!1,v.removeClass("processing-paste")},0)}else V=!1,v.removeClass("processing-paste")};v.on("paste",l.events.paste=function(a,c){if(c&&angular.extend(a,c),G||V)return a.stopPropagation(),a.preventDefault(),!1;V=!0,v.addClass("processing-paste");var d,e=(a.originalEvent||a).clipboardData;if(e&&e.getData&&e.types.length>0){for(var g="",i=0;i<e.types.length;i++)g+=" "+e.types[i];return/text\/html/i.test(g)?d=e.getData("text/html"):/text\/plain/i.test(g)&&(d=e.getData("text/plain")),W(d),a.stopPropagation(),a.preventDefault(),!1}var j=f.rangy.saveSelection(),k=angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');h.find("body").append(k),k[0].focus(),b(function(){f.rangy.restoreSelection(j),W(k[0].innerHTML),v[0].focus(),k.remove()},0)}),v.on("cut",l.events.cut=function(a){G?a.preventDefault():b(function(){C.$setViewValue(S())},0)}),v.on("keydown",l.events.keydown=function(a,b){if(b&&angular.extend(a,b),a.ctrlKey===!1&&a.metaKey===!1&&9===a.keyCode&&(a.preventDefault(),a.specialKey="TabKey",a.shiftKey&&(a.specialKey="ShiftTabKey"),u.sendKeyCommand(l,a)),!G)if(a.altKey||!a.metaKey&&!a.ctrlKey){if(13===a.keyCode&&!a.shiftKey){var c,d=m.getSelectionElement();if(!d.tagName.match(g))return;var e=angular.element(A);if(/^<br(|\/)>$/i.test(d.innerHTML.trim())&&"blockquote"===d.parentNode.tagName.toLowerCase()&&!d.nextSibling){c=angular.element(d);var f=c.parent();f.after(e),c.remove(),0===f.children().length&&f.remove(),m.setSelectionToElementStart(e[0]),a.preventDefault()}else/^<[^>]+><br(|\/)><\/[^>]+>$/i.test(d.innerHTML.trim())&&"blockquote"===d.tagName.toLowerCase()&&(c=angular.element(d),c.after(e),c.remove(),m.setSelectionToElementStart(e[0]),a.preventDefault())}}else 90!==a.keyCode||a.shiftKey?(90===a.keyCode&&a.shiftKey||89===a.keyCode&&!a.shiftKey)&&(R(),a.preventDefault()):(Q(),a.preventDefault())});var X;if(v.on("keyup",l.events.keyup=function(a,c){if(c&&angular.extend(a,c),9===a.keyCode){var d=m.getSelection();return void(d.start.element===v[0]&&v.children().length&&m.setSelectionToElementStart(v.children()[0]))}if(O&&b.cancel(O),!G&&!K.test(a.keyCode)){if(""!==A&&13===a.keyCode&&!a.shiftKey){for(var e=m.getSelectionElement();!e.tagName.match(g)&&e!==v[0];)e=e.parentNode;if(e.tagName.toLowerCase()!==w.taDefaultWrap&&"li"!==e.tagName.toLowerCase()&&(""===e.innerHTML.trim()||"<br>"===e.innerHTML.trim())){var h=angular.element(A);angular.element(e).replaceWith(h),m.setSelectionToElementStart(h[0])}}var i=S();if(""!==A&&""===i.trim())da(A),m.setSelectionToElementStart(v.children()[0]);else if("<"!==i.substring(0,1)&&""!==w.taDefaultWrap){var j=f.rangy.saveSelection();i=S(),i="<"+w.taDefaultWrap+">"+i+"</"+w.taDefaultWrap+">",da(i),f.rangy.restoreSelection(j)}var k=y!==a.keyCode&&L.test(a.keyCode);X&&b.cancel(X),X=b(function(){T(i,k,!0)},D.$options.debounce||400),k||(O=b(function(){C.$undoManager.push(i)},250)),y=a.keyCode}}),v.on("blur",l.events.blur=function(){H=!1,G?(I=!0,C.$render()):T(void 0,void 0,!0)}),w.placeholder&&(c.ie>8||void 0===c.ie)){var Y;if(!w.id)throw"textAngular Error: An unique ID is required for placeholders to work";Y=i("#"+w.id+".placeholder-text:before",'content: "'+w.placeholder+'"'),l.$on("$destroy",function(){j(Y)})}v.on("focus",l.events.focus=function(){H=!0,v.removeClass("placeholder-text"),ca()}),v.on("mouseup",l.events.mouseup=function(){var a=m.getSelection();a.start.element===v[0]&&v.children().length&&m.setSelectionToElementStart(v.children()[0])}),v.on("mousedown",l.events.mousedown=function(a,b){b&&angular.extend(a,b),a.stopPropagation()})}else{v.on("change blur",l.events.change=l.events.blur=function(){G||C.$setViewValue(S())}),v.on("keydown",l.events.keydown=function(a,b){if(b&&angular.extend(a,b),9===a.keyCode){var c=this.selectionStart,d=this.selectionEnd,e=v.val();if(a.shiftKey){var f=e.lastIndexOf("\n",c),g=e.lastIndexOf("	",c);-1!==g&&g>=f&&(v.val(e.substring(0,g)+e.substring(g+1)),this.selectionStart=this.selectionEnd=c-1)}else v.val(e.substring(0,c)+"	"+e.substring(d)),this.selectionStart=this.selectionEnd=c+1;a.preventDefault()}});var Z=function(a,b){for(var c="",d=0;b>d;d++)c+=a;return c},$=function(a,b){var c="",d=a.childNodes;b++,c+=Z("	",b-1)+a.outerHTML.substring(0,a.outerHTML.indexOf("<li"));for(var e=0;e<d.length;e++)d[e].outerHTML&&(c+="ul"===d[e].nodeName.toLowerCase()||"ol"===d[e].nodeName.toLowerCase()?"\n"+$(d[e],b):"\n"+Z("	",b)+d[e].outerHTML);return c+="\n"+Z("	",b-1)+a.outerHTML.substring(a.outerHTML.lastIndexOf("<"))};C.$formatters.unshift(function(a){var b=angular.element("<div>"+a+"</div>")[0].childNodes;if(b.length>0){a="";for(var c=0;c<b.length;c++)b[c].outerHTML&&(a.length>0&&(a+="\n"),a+="ul"===b[c].nodeName.toLowerCase()||"ol"===b[c].nodeName.toLowerCase()?""+$(b[c],0):""+b[c].outerHTML)}return a})}var _,aa=function(a){return l.$emit("ta-element-select",this),a.preventDefault(),!1},ba=function(a,c){if(c&&angular.extend(a,c),!p&&!G){p=!0;var d;d=a.originalEvent?a.originalEvent.dataTransfer:a.dataTransfer,l.$emit("ta-drop-event",this,a,d),b(function(){p=!1,T(void 0,void 0,!0)},100)}},ca=l["reApplyOnSelectorHandlers"+(w.id||"")]=function(){G||angular.forEach(n,function(a){v.find(a).off("click",aa).on("click",aa)})},da=function(a){v[0].innerHTML=a},ea=!1;C.$render=function(){if(!ea){ea=!0;var a=C.$viewValue||"";I||(E&&H&&(v.removeClass("placeholder-text"),_&&b.cancel(_),_=b(function(){H||(v[0].focus(),m.setSelectionToElementEnd(v.children()[v.children().length-1])),_=void 0},1)),E?(da(w.placeholder?""===a?A:a:""===a?A:a),G?v.off("drop",ba):(ca(),v.on("drop",ba))):"textarea"!==v[0].tagName.toLowerCase()&&"input"!==v[0].tagName.toLowerCase()?da(o(a)):v.val(a)),E&&w.placeholder&&(""===a?H?v.removeClass("placeholder-text"):v.addClass("placeholder-text"):v.removeClass("placeholder-text")),ea=I=!1}},w.taReadonly&&(G=l.$eval(w.taReadonly),G?(v.addClass("ta-readonly"),("textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase())&&v.attr("disabled","disabled"),void 0!==v.attr("contenteditable")&&v.attr("contenteditable")&&v.removeAttr("contenteditable")):(v.removeClass("ta-readonly"),"textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase()?v.removeAttr("disabled"):E&&v.attr("contenteditable","true")),l.$watch(w.taReadonly,function(a,b){b!==a&&(a?(v.addClass("ta-readonly"),("textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase())&&v.attr("disabled","disabled"),void 0!==v.attr("contenteditable")&&v.attr("contenteditable")&&v.removeAttr("contenteditable"),angular.forEach(n,function(a){v.find(a).on("click",aa)}),v.off("drop",ba)):(v.removeClass("ta-readonly"),"textarea"===v[0].tagName.toLowerCase()||"input"===v[0].tagName.toLowerCase()?v.removeAttr("disabled"):E&&v.attr("contenteditable","true"),angular.forEach(n,function(a){v.find(a).off("click",aa)}),v.on("drop",ba)),G=a)})),E&&!G&&(angular.forEach(n,function(a){v.find(a).on("click",aa)}),v.on("drop",ba),v.on("blur",function(){c.webkit&&(d=!0)}))}}}]);var p=!1,q=angular.module("textAngular",["ngSanitize","textAngularSetup","textAngular.factories","textAngular.DOM","textAngular.validators","textAngular.taBind"]),r={};q.constant("taRegisterTool",b),q.value("taTools",r),q.config([function(){angular.forEach(r,function(a,b){delete r[b]})}]),q.run([function(){if(!window.rangy)throw"rangy-core.js and rangy-selectionsaverestore.js are required for textAngular to work correctly, rangy-core is not yet loaded.";if(window.rangy.init(),!window.rangy.saveSelection)throw"rangy-selectionsaverestore.js is required for textAngular to work correctly."}]),q.directive("textAngular",["$compile","$timeout","taOptions","taSelection","taExecCommand","textAngularManager","$window","$document","$animate","$log","$q","$parse",function(a,b,c,d,e,f,g,h,i,j,k,l){
return{require:"?ngModel",scope:{},restrict:"EA",priority:2,link:function(m,n,o,p){var q,r,s,t,u,v,w,x,y,z,A,B=o.serial?o.serial:Math.floor(1e16*Math.random());m._name=o.name?o.name:"textAngularEditor"+B;var C=function(a,c,d){b(function(){var b=function(){a.off(c,b),d.apply(this,arguments)};a.on(c,b)},100)};if(y=e(o.taDefaultWrap),angular.extend(m,angular.copy(c),{wrapSelection:function(a,b,c){"undo"===a.toLowerCase()?m["$undoTaBindtaTextElement"+B]():"redo"===a.toLowerCase()?m["$redoTaBindtaTextElement"+B]():(y(a,!1,b,m.defaultTagAttributes),c&&m["reApplyOnSelectorHandlerstaTextElement"+B](),m.displayElements.text[0].focus())},showHtml:m.$eval(o.taShowHtml)||!1}),o.taFocussedClass&&(m.classes.focussed=o.taFocussedClass),o.taTextEditorClass&&(m.classes.textEditor=o.taTextEditorClass),o.taHtmlEditorClass&&(m.classes.htmlEditor=o.taHtmlEditorClass),o.taDefaultTagAttributes)try{angular.extend(m.defaultTagAttributes,angular.fromJson(o.taDefaultTagAttributes))}catch(D){j.error(D)}o.taTextEditorSetup&&(m.setup.textEditorSetup=m.$parent.$eval(o.taTextEditorSetup)),o.taHtmlEditorSetup&&(m.setup.htmlEditorSetup=m.$parent.$eval(o.taHtmlEditorSetup)),o.taFileDrop?m.fileDropHandler=m.$parent.$eval(o.taFileDrop):m.fileDropHandler=m.defaultFileDropHandler,w=n[0].innerHTML,n[0].innerHTML="",m.displayElements={forminput:angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),html:angular.element("<textarea></textarea>"),text:angular.element("<div></div>"),scrollWindow:angular.element("<div class='ta-scroll-window'></div>"),popover:angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),popoverArrow:angular.element('<div class="arrow"></div>'),popoverContainer:angular.element('<div class="popover-content"></div>'),resize:{overlay:angular.element('<div class="ta-resizer-handle-overlay"></div>'),background:angular.element('<div class="ta-resizer-handle-background"></div>'),anchors:[angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],info:angular.element('<div class="ta-resizer-handle-info"></div>')}},m.displayElements.popover.append(m.displayElements.popoverArrow),m.displayElements.popover.append(m.displayElements.popoverContainer),m.displayElements.scrollWindow.append(m.displayElements.popover),m.displayElements.popover.on("mousedown",function(a,b){return b&&angular.extend(a,b),a.preventDefault(),!1}),m.showPopover=function(a){m.displayElements.popover.css("display","block"),m.reflowPopover(a),i.addClass(m.displayElements.popover,"in"),C(h.find("body"),"click keyup",function(){m.hidePopover()})},m.reflowPopover=function(a){m.displayElements.text[0].offsetHeight-51>a[0].offsetTop?(m.displayElements.popover.css("top",a[0].offsetTop+a[0].offsetHeight+m.displayElements.scrollWindow[0].scrollTop+"px"),m.displayElements.popover.removeClass("top").addClass("bottom")):(m.displayElements.popover.css("top",a[0].offsetTop-54+m.displayElements.scrollWindow[0].scrollTop+"px"),m.displayElements.popover.removeClass("bottom").addClass("top"));var b=m.displayElements.text[0].offsetWidth-m.displayElements.popover[0].offsetWidth,c=a[0].offsetLeft+a[0].offsetWidth/2-m.displayElements.popover[0].offsetWidth/2;m.displayElements.popover.css("left",Math.max(0,Math.min(b,c))+"px"),m.displayElements.popoverArrow.css("margin-left",Math.min(c,Math.max(0,c-b))-11+"px")},m.hidePopover=function(){var a=function(){m.displayElements.popover.css("display",""),m.displayElements.popoverContainer.attr("style",""),m.displayElements.popoverContainer.attr("class","popover-content")};k.when(i.removeClass(m.displayElements.popover,"in",a)).then(a)},m.displayElements.resize.overlay.append(m.displayElements.resize.background),angular.forEach(m.displayElements.resize.anchors,function(a){m.displayElements.resize.overlay.append(a)}),m.displayElements.resize.overlay.append(m.displayElements.resize.info),m.displayElements.scrollWindow.append(m.displayElements.resize.overlay),m.reflowResizeOverlay=function(a){a=angular.element(a)[0],m.displayElements.resize.overlay.css({display:"block",left:a.offsetLeft-5+"px",top:a.offsetTop-5+"px",width:a.offsetWidth+10+"px",height:a.offsetHeight+10+"px"}),m.displayElements.resize.info.text(a.offsetWidth+" x "+a.offsetHeight)},m.showResizeOverlay=function(a){var b=h.find("body");z=function(c){var d={width:parseInt(a.attr("width")),height:parseInt(a.attr("height")),x:c.clientX,y:c.clientY};(void 0===d.width||isNaN(d.width))&&(d.width=a[0].offsetWidth),(void 0===d.height||isNaN(d.height))&&(d.height=a[0].offsetHeight),m.hidePopover();var e=d.height/d.width,f=function(b){var c={x:Math.max(0,d.width+(b.clientX-d.x)),y:Math.max(0,d.height+(b.clientY-d.y))},f=void 0!==o.taResizeForceAspectRatio,g=o.taResizeMaintainAspectRatio,h=f||g&&!b.shiftKey;if(h){var i=c.y/c.x;c.x=e>i?c.x:c.y/e,c.y=e>i?c.x*e:c.y}var j=angular.element(a);j.css("height",Math.round(Math.max(0,c.y))),j.css("width",Math.round(Math.max(0,c.x))),m.reflowResizeOverlay(a)};b.on("mousemove",f),C(b,"mouseup",function(c){c.preventDefault(),c.stopPropagation(),b.off("mousemove",f),m.showPopover(a)}),c.stopPropagation(),c.preventDefault()},m.displayElements.resize.anchors[3].off("mousedown"),m.displayElements.resize.anchors[3].on("mousedown",z),m.reflowResizeOverlay(a),C(b,"click",function(){m.hideResizeOverlay()})},m.hideResizeOverlay=function(){m.displayElements.resize.anchors[3].off("mousedown",z),m.displayElements.resize.overlay.css("display","")},m.setup.htmlEditorSetup(m.displayElements.html),m.setup.textEditorSetup(m.displayElements.text),m.displayElements.html.attr({id:"taHtmlElement"+B,"ng-show":"showHtml","ta-bind":"ta-bind","ng-model":"html","ng-model-options":n.attr("ng-model-options")}),m.displayElements.text.attr({id:"taTextElement"+B,contentEditable:"true","ta-bind":"ta-bind","ng-model":"html","ng-model-options":n.attr("ng-model-options")}),m.displayElements.scrollWindow.attr({"ng-hide":"showHtml"}),o.taDefaultWrap&&m.displayElements.text.attr("ta-default-wrap",o.taDefaultWrap),o.taUnsafeSanitizer&&(m.displayElements.text.attr("ta-unsafe-sanitizer",o.taUnsafeSanitizer),m.displayElements.html.attr("ta-unsafe-sanitizer",o.taUnsafeSanitizer)),m.displayElements.scrollWindow.append(m.displayElements.text),n.append(m.displayElements.scrollWindow),n.append(m.displayElements.html),m.displayElements.forminput.attr("name",m._name),n.append(m.displayElements.forminput),o.tabindex&&(n.removeAttr("tabindex"),m.displayElements.text.attr("tabindex",o.tabindex),m.displayElements.html.attr("tabindex",o.tabindex)),o.placeholder&&(m.displayElements.text.attr("placeholder",o.placeholder),m.displayElements.html.attr("placeholder",o.placeholder)),o.taDisabled&&(m.displayElements.text.attr("ta-readonly","disabled"),m.displayElements.html.attr("ta-readonly","disabled"),m.disabled=m.$parent.$eval(o.taDisabled),m.$parent.$watch(o.taDisabled,function(a){m.disabled=a,m.disabled?n.addClass(m.classes.disabled):n.removeClass(m.classes.disabled)})),o.taPaste&&(m._pasteHandler=function(a){return l(o.taPaste)(m.$parent,{$html:a})},m.displayElements.text.attr("ta-paste","_pasteHandler($html)")),a(m.displayElements.scrollWindow)(m),a(m.displayElements.html)(m),m.updateTaBindtaTextElement=m["updateTaBindtaTextElement"+B],m.updateTaBindtaHtmlElement=m["updateTaBindtaHtmlElement"+B],n.addClass("ta-root"),m.displayElements.scrollWindow.addClass("ta-text ta-editor "+m.classes.textEditor),m.displayElements.html.addClass("ta-html ta-editor "+m.classes.htmlEditor),m._actionRunning=!1;var E=!1;if(m.startAction=function(){return m._actionRunning=!0,E=g.rangy.saveSelection(),function(){E&&g.rangy.restoreSelection(E)}},m.endAction=function(){m._actionRunning=!1,E&&(m.showHtml?m.displayElements.html[0].focus():m.displayElements.text[0].focus(),g.rangy.removeMarkers(E)),E=!1,m.updateSelectedStyles(),m.showHtml||m["updateTaBindtaTextElement"+B]()},u=function(){m.focussed=!0,n.addClass(m.classes.focussed),x.focus(),n.triggerHandler("focus")},m.displayElements.html.on("focus",u),m.displayElements.text.on("focus",u),v=function(a){return m._actionRunning||h[0].activeElement===m.displayElements.html[0]||h[0].activeElement===m.displayElements.text[0]||(n.removeClass(m.classes.focussed),x.unfocus(),b(function(){m._bUpdateSelectedStyles=!1,n.triggerHandler("blur"),m.focussed=!1},0)),a.preventDefault(),!1},m.displayElements.html.on("blur",v),m.displayElements.text.on("blur",v),m.displayElements.text.on("paste",function(a){n.triggerHandler("paste",a)}),m.queryFormatBlockState=function(a){return!m.showHtml&&a.toLowerCase()===h[0].queryCommandValue("formatBlock").toLowerCase()},m.queryCommandState=function(a){return m.showHtml?"":h[0].queryCommandState(a)},m.switchView=function(){m.showHtml=!m.showHtml,i.enabled(!1,m.displayElements.html),i.enabled(!1,m.displayElements.text),m.showHtml?b(function(){return i.enabled(!0,m.displayElements.html),i.enabled(!0,m.displayElements.text),m.displayElements.html[0].focus()},100):b(function(){return i.enabled(!0,m.displayElements.html),i.enabled(!0,m.displayElements.text),m.displayElements.text[0].focus()},100)},o.ngModel){var F=!0;p.$render=function(){if(F){F=!1;var a=m.$parent.$eval(o.ngModel);void 0!==a&&null!==a||!w||""===w||p.$setViewValue(w)}m.displayElements.forminput.val(p.$viewValue),m.html=p.$viewValue||""},n.attr("required")&&(p.$validators.required=function(a,b){var c=a||b;return!(!c||""===c.trim())})}else m.displayElements.forminput.val(w),m.html=w;if(m.$watch("html",function(a,b){a!==b&&(o.ngModel&&p.$viewValue!==a&&p.$setViewValue(a),m.displayElements.forminput.val(a))}),o.taTargetToolbars)x=f.registerEditor(m._name,m,o.taTargetToolbars.split(","));else{var G=angular.element('<div text-angular-toolbar name="textAngularToolbar'+B+'">');o.taToolbar&&G.attr("ta-toolbar",o.taToolbar),o.taToolbarClass&&G.attr("ta-toolbar-class",o.taToolbarClass),o.taToolbarGroupClass&&G.attr("ta-toolbar-group-class",o.taToolbarGroupClass),o.taToolbarButtonClass&&G.attr("ta-toolbar-button-class",o.taToolbarButtonClass),o.taToolbarActiveButtonClass&&G.attr("ta-toolbar-active-button-class",o.taToolbarActiveButtonClass),o.taFocussedClass&&G.attr("ta-focussed-class",o.taFocussedClass),n.prepend(G),a(G)(m.$parent),x=f.registerEditor(m._name,m,["textAngularToolbar"+B])}m.$on("$destroy",function(){f.unregisterEditor(m._name)}),m.$on("ta-element-select",function(a,b){x.triggerElementSelect(a,b)&&m["reApplyOnSelectorHandlerstaTextElement"+B]()}),m.$on("ta-drop-event",function(a,c,d,e){m.displayElements.text[0].focus(),e&&e.files&&e.files.length>0?(angular.forEach(e.files,function(a){try{k.when(m.fileDropHandler(a,m.wrapSelection)||m.fileDropHandler!==m.defaultFileDropHandler&&k.when(m.defaultFileDropHandler(a,m.wrapSelection))).then(function(){m["updateTaBindtaTextElement"+B]()})}catch(b){j.error(b)}}),d.preventDefault(),d.stopPropagation()):b(function(){m["updateTaBindtaTextElement"+B]()},0)}),m._bUpdateSelectedStyles=!1,angular.element(window).on("blur",function(){m._bUpdateSelectedStyles=!1,m.focussed=!1}),m.updateSelectedStyles=function(){var a;A&&b.cancel(A),void 0!==(a=d.getSelectionElement())&&a.parentNode!==m.displayElements.text[0]?x.updateSelectedStyles(angular.element(a)):x.updateSelectedStyles(),m._bUpdateSelectedStyles&&(A=b(m.updateSelectedStyles,200))},q=function(){return m.focussed?void(m._bUpdateSelectedStyles||(m._bUpdateSelectedStyles=!0,m.$apply(function(){m.updateSelectedStyles()}))):void(m._bUpdateSelectedStyles=!1)},m.displayElements.html.on("keydown",q),m.displayElements.text.on("keydown",q),r=function(){m._bUpdateSelectedStyles=!1},m.displayElements.html.on("keyup",r),m.displayElements.text.on("keyup",r),s=function(a,b){b&&angular.extend(a,b),m.$apply(function(){return x.sendKeyCommand(a)?(m._bUpdateSelectedStyles||m.updateSelectedStyles(),a.preventDefault(),!1):void 0})},m.displayElements.html.on("keypress",s),m.displayElements.text.on("keypress",s),t=function(){m._bUpdateSelectedStyles=!1,m.$apply(function(){m.updateSelectedStyles()})},m.displayElements.html.on("mouseup",t),m.displayElements.text.on("mouseup",t)}}}]),q.service("textAngularManager",["taToolExecuteAction","taTools","taRegisterTool",function(a,b,c){var d={},e={};return{registerEditor:function(c,f,g){if(!c||""===c)throw"textAngular Error: An editor requires a name";if(!f)throw"textAngular Error: An editor requires a scope";if(e[c])throw'textAngular Error: An Editor with name "'+c+'" already exists';var h=[];return angular.forEach(g,function(a){d[a]&&h.push(d[a])}),e[c]={scope:f,toolbars:g,_registerToolbar:function(a){this.toolbars.indexOf(a.name)>=0&&h.push(a)},editorFunctions:{disable:function(){angular.forEach(h,function(a){a.disabled=!0})},enable:function(){angular.forEach(h,function(a){a.disabled=!1})},focus:function(){angular.forEach(h,function(a){a._parent=f,a.disabled=!1,a.focussed=!0,f.focussed=!0})},unfocus:function(){angular.forEach(h,function(a){a.disabled=!0,a.focussed=!1}),f.focussed=!1},updateSelectedStyles:function(a){angular.forEach(h,function(b){angular.forEach(b.tools,function(c){c.activeState&&(b._parent=f,c.active=c.activeState(a))})})},sendKeyCommand:function(c){var d=!1;return(c.ctrlKey||c.metaKey||c.specialKey)&&angular.forEach(b,function(b,e){if(b.commandKeyCode&&(b.commandKeyCode===c.which||b.commandKeyCode===c.specialKey))for(var g=0;g<h.length;g++)if(void 0!==h[g].tools[e]){a.call(h[g].tools[e],f),d=!0;break}}),d},triggerElementSelect:function(a,c){var d=function(a,b){for(var c=!0,d=0;d<b.length;d++)c=c&&a.attr(b[d]);return c},e=[],g={},i=!1;c=angular.element(c);var j=!1;if(angular.forEach(b,function(a,b){a.onElementSelect&&a.onElementSelect.element&&a.onElementSelect.element.toLowerCase()===c[0].tagName.toLowerCase()&&(!a.onElementSelect.filter||a.onElementSelect.filter(c))&&(j=j||angular.isArray(a.onElementSelect.onlyWithAttrs)&&d(c,a.onElementSelect.onlyWithAttrs),(!a.onElementSelect.onlyWithAttrs||d(c,a.onElementSelect.onlyWithAttrs))&&(g[b]=a))}),j?(angular.forEach(g,function(a,b){a.onElementSelect.onlyWithAttrs&&d(c,a.onElementSelect.onlyWithAttrs)&&e.push({name:b,tool:a})}),e.sort(function(a,b){return b.tool.onElementSelect.onlyWithAttrs.length-a.tool.onElementSelect.onlyWithAttrs.length})):angular.forEach(g,function(a,b){e.push({name:b,tool:a})}),e.length>0)for(var k=0;k<e.length;k++){for(var l=e[k].tool,m=e[k].name,n=0;n<h.length;n++)if(void 0!==h[n].tools[m]){l.onElementSelect.action.call(h[n].tools[m],a,c,f),i=!0;break}if(i)break}return i}}},e[c].editorFunctions},retrieveEditor:function(a){return e[a]},unregisterEditor:function(a){delete e[a]},registerToolbar:function(a){if(!a)throw"textAngular Error: A toolbar requires a scope";if(!a.name||""===a.name)throw"textAngular Error: A toolbar requires a name";if(d[a.name])throw'textAngular Error: A toolbar with name "'+a.name+'" already exists';d[a.name]=a,angular.forEach(e,function(b){b._registerToolbar(a)})},retrieveToolbar:function(a){return d[a]},retrieveToolbarsViaEditor:function(a){var b=[],c=this;return angular.forEach(this.retrieveEditor(a).toolbars,function(a){b.push(c.retrieveToolbar(a))}),b},unregisterToolbar:function(a){delete d[a]},updateToolsDisplay:function(a){var b=this;angular.forEach(a,function(a,c){b.updateToolDisplay(c,a)})},resetToolsDisplay:function(){var a=this;angular.forEach(b,function(b,c){a.resetToolDisplay(c)})},updateToolDisplay:function(a,b){var c=this;angular.forEach(d,function(d,e){c.updateToolbarToolDisplay(e,a,b)})},resetToolDisplay:function(a){var b=this;angular.forEach(d,function(c,d){b.resetToolbarToolDisplay(d,a)})},updateToolbarToolDisplay:function(a,b,c){if(!d[a])throw'textAngular Error: No Toolbar with name "'+a+'" exists';d[a].updateToolDisplay(b,c)},resetToolbarToolDisplay:function(a,c){if(!d[a])throw'textAngular Error: No Toolbar with name "'+a+'" exists';d[a].updateToolDisplay(c,b[c],!0)},removeTool:function(a){delete b[a],angular.forEach(d,function(b){delete b.tools[a];for(var c=0;c<b.toolbar.length;c++){for(var d,e=0;e<b.toolbar[c].length;e++){if(b.toolbar[c][e]===a){d={group:c,index:e};break}if(void 0!==d)break}void 0!==d&&(b.toolbar[d.group].slice(d.index,1),b._$element.children().eq(d.group).children().eq(d.index).remove())}})},addTool:function(a,b,e,f){c(a,b),angular.forEach(d,function(c){c.addTool(a,b,e,f)})},addToolToToolbar:function(a,b,e,f,g){c(a,b),d[e].addTool(a,b,f,g)},refreshEditor:function(a){if(!e[a])throw'textAngular Error: No Editor with name "'+a+'" exists';e[a].scope.updateTaBindtaTextElement(),e[a].scope.$$phase||e[a].scope.$digest()},sendKeyCommand:function(a,b){angular.forEach(e,function(c){return c.editorFunctions.sendKeyCommand(b)?(a._bUpdateSelectedStyles||a.updateSelectedStyles(),b.preventDefault(),!1):void 0})}}}]),q.directive("textAngularToolbar",["$compile","textAngularManager","taOptions","taTools","taToolExecuteAction","$window",function(a,b,c,d,e,f){return{scope:{name:"@"},restrict:"EA",link:function(g,h,i){if(!g.name||""===g.name)throw"textAngular Error: A toolbar requires a name";angular.extend(g,angular.copy(c)),i.taToolbar&&(g.toolbar=g.$parent.$eval(i.taToolbar)),i.taToolbarClass&&(g.classes.toolbar=i.taToolbarClass),i.taToolbarGroupClass&&(g.classes.toolbarGroup=i.taToolbarGroupClass),i.taToolbarButtonClass&&(g.classes.toolbarButton=i.taToolbarButtonClass),i.taToolbarActiveButtonClass&&(g.classes.toolbarButtonActive=i.taToolbarActiveButtonClass),i.taFocussedClass&&(g.classes.focussed=i.taFocussedClass),g.disabled=!0,g.focussed=!1,g._$element=h,h[0].innerHTML="",h.addClass("ta-toolbar "+g.classes.toolbar),g.$watch("focussed",function(){g.focussed?h.addClass(g.classes.focussed):h.removeClass(g.classes.focussed)});var j=function(b,c){var d;if(d=b&&b.display?angular.element(b.display):angular.element("<button type='button'>"),b&&b["class"]?d.addClass(b["class"]):d.addClass(g.classes.toolbarButton),d.attr("name",c.name),d.attr("ta-button","ta-button"),d.attr("ng-disabled","isDisabled()"),d.attr("tabindex","-1"),d.attr("ng-click","executeAction()"),d.attr("ng-class","displayActiveToolClass(active)"),b&&b.tooltiptext&&d.attr("title",b.tooltiptext),b&&!b.display&&!c._display&&(d[0].innerHTML="",b.buttontext&&(d[0].innerHTML=b.buttontext),b.iconclass)){var e=angular.element("<i>"),f=d[0].innerHTML;e.addClass(b.iconclass),d[0].innerHTML="",d.append(e),f&&""!==f&&d.append("&nbsp;"+f)}return c._lastToolDefinition=angular.copy(b),a(d)(c)};g.tools={},g._parent={disabled:!0,showHtml:!1,queryFormatBlockState:function(){return!1},queryCommandState:function(){return!1}};var k={$window:f,$editor:function(){return g._parent},isDisabled:function(){return"function"!=typeof this.$eval("disabled")&&this.$eval("disabled")||this.$eval("disabled()")||"html"!==this.name&&this.$editor().showHtml||this.$parent.disabled||this.$editor().disabled},displayActiveToolClass:function(a){return a?g.classes.toolbarButtonActive:""},executeAction:e};angular.forEach(g.toolbar,function(a){var b=angular.element("<div>");b.addClass(g.classes.toolbarGroup),angular.forEach(a,function(a){g.tools[a]=angular.extend(g.$new(!0),d[a],k,{name:a}),g.tools[a].$element=j(d[a],g.tools[a]),b.append(g.tools[a].$element)}),h.append(b)}),g.updateToolDisplay=function(a,b,c){var d=g.tools[a];if(d){if(d._lastToolDefinition&&!c&&(b=angular.extend({},d._lastToolDefinition,b)),null===b.buttontext&&null===b.iconclass&&null===b.display)throw'textAngular Error: Tool Definition for updating "'+a+'" does not have a valid display/iconclass/buttontext value';null===b.buttontext&&delete b.buttontext,null===b.iconclass&&delete b.iconclass,null===b.display&&delete b.display;var e=j(b,d);d.$element.replaceWith(e),d.$element=e}},g.addTool=function(a,b,c,e){g.tools[a]=angular.extend(g.$new(!0),d[a],k,{name:a}),g.tools[a].$element=j(d[a],g.tools[a]);var f;void 0===c&&(c=g.toolbar.length-1),f=angular.element(h.children()[c]),void 0===e?(f.append(g.tools[a].$element),g.toolbar[c][g.toolbar[c].length-1]=a):(f.children().eq(e).after(g.tools[a].$element),g.toolbar[c][e]=a)},b.registerToolbar(g),g.$on("$destroy",function(){b.unregisterToolbar(g.name)})}}}])}()}({},function(){return this}());
angular.module('ngKeps', ['textAngular'])

.filter('keys', function() {
  return function(input) {
    if (!input) {
      return [];
    }
    return Object.keys(input);
  };
});


// add sync to restService and socketService


// finish sync
// test new sync code
// look at sync tree defaults
// make db admin flex and more like database
// make ajax content have contentToFind contentToReplace Animation(start with slide up, down, left, right)

angular.module("ngKeps").run(["$templateCache", function($templateCache) {$templateCache.put("../templates/authModal.html","<div class=\"model\" style=\"width:400px\" ng-class=\"{\'shake\': shakeForm}\"><div class=\"\" ng-show=\"!user\"><div class=\"\" ng-show=\"show==\'login\'\"><h4 class=\"modal-title\">Login</h4><hr><form name=\"loginForm\" data-ng-submit=\"signin(\'local\')\"><div class=\"form-group\"><label>Email</label><input type=\"email\" class=\"form-control\" ng-model=\"login.username\" required placeholder=\"Your Email\"></div><div class=\"form-group\"><label>Password</label><input type=\"password\" class=\"form-control\" ng-model=\"login.password\" required placeholder=\"Your Password\"></div><div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-6\"><p class=\"help-block\"><a ng-click=\"showForgottenPassword()\">Forgot password?</a></p></div></div></div><div class=\"alert alert-success alert-dismissible fade in\" ng-show=\"msgs.signedIn\">{{msgs.signedIn}}</div><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.error\">{{msgs.error}}</div><div class=\"form-group no-margin\" ng-if=\"config.oauth.google\"><button type=\"button\" ng-click=\"signin(\'google\')\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Log In With Google</button></div><div class=\"form-group no-margin\" ng-if=\"config.oauth.facebook\"><button type=\"button\" ng-click=\"signin(\'facebook\')\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Log In With Facebook</button></div><div class=\"form-group no-margin\" ng-if=\"config.register\"><button type=\"button\" ng-click=\"showRegister()\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Register</button></div><div class=\"form-group no-margin\"><button type=\"submit\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Log In</button></div></form><!-- form login --></div><div class=\"\" ng-show=\"show==\'register\'\"><h4 class=\"modal-title\">Register</h4><hr><form name=\"registerForm\" data-ng-submit=\"register()\"><div class=\"form-group\"><label>First name</label><input type=\"text\" class=\"form-control\" required ng-model=\"newUser.firstName\" required placeholder=\"first name\"></div><div class=\"form-group\"><label>Last name</label><input type=\"text\" class=\"form-control\" required ng-model=\"newUser.lastName\" required placeholder=\"last name\"></div><div class=\"form-group\"><label>Email</label><input type=\"email\" class=\"form-control\" ng-model=\"newUser.email\" required placeholder=\"Your Email\"></div><div class=\"form-group\"><label>Password</label><input type=\"password\" class=\"form-control\" ng-model=\"newUser.password\" required placeholder=\"Your Password\"></div><div class=\"form-group\"><label>Re-type Password</label><input type=\"password\" class=\"form-control\" ng-model=\"rePassword\" required placeholder=\"Re-type Your Password\"></div><!--Error/success messages --><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.passwordsDontMatch\">Passwords dont match.</div><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.passwordShort\">Password needs to be 7 or more characters.</div><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.formError\">Error in the form.</div><div class=\"alert alert-success alert-dismissible fade in\" ng-show=\"msgs.created\">You are registered!</div><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.emailUsed\">Email has already been used to create an account</div><div class=\"alert alert-danger alert-dismissible fade in\" ng-show=\"msgs.error\">{{msgs.error}}</div><div class=\"white-space-10\"></div><div class=\"form-group no-margin\"><button type=\"button\" class=\"btn btn-default btn-theme\" ng-click=\"showLogin()\">Cancel</button> <button type=\"submit\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Register</button></div></form><!-- form login --><hr><div class=\"text-center color-white\">By creating an account, you agree to {{config.name}}<br><a href=\"#\" class=\"link-white\"><strong>Terms of Service</strong></a> and consent to our <a href=\"#\" class=\"link-white\"><strong>Privacy Policy</strong></a>.</div></div><div class=\"\" ng-show=\"show==\'forgottenPassword\'\"><h4 class=\"modal-title\">Forgot Password</h4><hr><div class=\"form-group\"><label>Enter Your Email</label><input type=\"email\" class=\"form-control\" name=\"text\" placeholder=\"Email\"></div><hr><button type=\"button\" class=\"btn btn-default btn-theme\" ng-click=\"showLogin()\">Cancel</button> <button type=\"submit\" class=\"btn btn-success btn-theme\">Send</button></div><div class=\"\" ng-show=\"show==\'twofactor\'\"><h4 class=\"modal-title\">Two Factor Authentication</h4><hr><div class=\"form-group\"><label>Enter Your Email</label><input type=\"email\" class=\"form-control\" name=\"text\" placeholder=\"Email\"></div><hr><button type=\"button\" class=\"btn btn-default btn-theme\" ng-click=\"showLogin()\">Cancel</button> <button type=\"submit\" class=\"btn btn-success btn-theme\">Send</button></div><div class=\"\" ng-show=\"show==\'resetPassword\'\"><h4 class=\"modal-title\">Reset Password</h4><hr><div class=\"form-group\"><label>Password</label><input type=\"password\" class=\"form-control\" ng-model=\"newUser.password\" required placeholder=\"Your Password\"></div><div class=\"form-group\"><label>Re-type Password</label><input type=\"password\" class=\"form-control\" ng-model=\"rePassword\" required placeholder=\"Re-type Your Password\"></div><hr><button type=\"button\" class=\"btn btn-default btn-theme\" data-dismiss=\"modal\">Close</button> <button type=\"submit\" class=\"btn btn-success btn-theme\">Send</button></div></div><div class=\"col-md-12\" ng-show=\"user\"><p>Looks like your already signed in as {{user.username}}.</p><p><br><a ng-click=\"signout()\">sign out?</a></p></div><div style=\"display:none\"></div></div>");
$templateCache.put("../templates/form.html","<section><div ng-repeat=\"key in kepsData | keys\" ng-init=\"field = kepsData[key]\"><input-item keps-name=\"key\" keps-type=\"field\" keps-model=\"data.value[key]\" keps-label=\"{{ field.label }}\" keps-framework=\"{{kepsFramework}}\" keps-errors=\"kepsErrors[key]\"></div></section>");
$templateCache.put("../templates/bootstrapv3/address.html","<div class=\"row\"><div class=\"col-xs-12\"><span ng-show=\"kepsType.required && !data.subrequired\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label></div></div><div class=\"row\"><div class=\"col-xs-4\"><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.address1\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">Address Line 1</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.address1\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.address1\"></div><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.address2\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">Address Line 2</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.address2\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.address2\"></div><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.city\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">City</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.city\" ng-keydown=\"checkAddress()\" ng-required=\"data.subrequired && kepsType.required.city\"></div></div></div><div class=\"col-xs-4\"><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.region\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">State/Province/Region</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.region\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.region\"></div><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.postal\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">Zip/Postal Code</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.postal\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.postal\"></div><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.country\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">Country</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.country\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.country\"></div></div></div><div class=\"col-xs-4\"><p>Preview</p><br>{{data.value.address1 + \' \' + data.value.address2}}<br>{{data.value.city + \', \' + data.value.region + \' \' + data.value.postal}}<br>{{data.value.country}}</div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/array.html","<div class=\"row\"><div class=\"col-xs-12\"><div class=\"form-group {{kepsGroupClass}}\"><div class=\"{{kepsArrayClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label }}:</label><div class=\"list-group\"><div class=\"list-group-item\" ng-show=\"data.value.length > 0\"><div ng-repeat=\"item in data.value track by $index\"><div style=\"width:5%;margin-left:5%;display:inline-block\"><span>{{($index+1) + \'.\'}}</span></div><div style=\"width:79%;display:inline-block\"><input-item keps-name=\"$index\" keps-label=\"\'\'\" keps-group-class=\"form-horizontal\" keps-type=\"kepsType.subSchema.type\" keps-model=\"data.value[$index]\"></div><div style=\"width: 3%;display: inline-block;margin-right: 7%;line-height: 0px\"><a href=\"\" style=\"float:right\" ng-click=\"removeArrayItem($index)\"><span style=\"color:red;margin-left:15px\" class=\"glyphicon glyphicon-remove\"></span></a></div></div></div><div class=\"list-group-item\"><a href=\"\" style=\"\" title=\"add item\"><span style=\"color:green\" class=\"glyphicon glyphicon-plus-sign\" ng-click=\"addArrayItem()\"></span></a></div></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div></div>");
$templateCache.put("../templates/bootstrapv3/arraymulti.html","<div class=\"row\"><div class=\"col-xs-12\"><p></p><div class=\"form-group {{kepsGroupClass}}\"><div class=\"{{kepsArrayClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"\"><div class=\"list-group\"><div class=\"list-group-item\" ng-repeat=\"item in data.value track by $index\">{{$index + 1}} <a href=\"\" style=\"float:right\" ng-click=\"removeArrayItem($index)\"><span style=\"color:red;margin-left:15px\" class=\"glyphicon glyphicon-remove\"></span> </a><a href=\"\" style=\"float:right\" ng-click=\"showArrayItem[$index] = !showArrayItem[$index]\"><span ng-show=\"showArrayItem[$index]\" style=\"color:blue\" class=\"glyphicon glyphicon-eye-close\"></span> <span ng-show=\"!showArrayItem[$index]\" style=\"color:blue\" class=\"glyphicon glyphicon-eye-open\"></span></a><div ng-show=\"showArrayItem[$index]\"><input-item ng-repeat=\"(name,field) in kepsType.subSchema\" keps-name=\"name\" keps-label=\"{{name}}\" keps-label-class=\"kepsSubLabelClass\" keps-type=\"field\" keps-model=\"item[name]\" keps-framework=\"kepsFramework\" keps-errors=\"data.error[$index]\"></div></div><div class=\"list-group-item\"><a href=\"\" style=\"\" title=\"add item\"><span style=\"color:green\" class=\"glyphicon glyphicon-plus-sign\" ng-click=\"addArrayItem()\"></span></a></div></div></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div></div>");
$templateCache.put("../templates/bootstrapv3/arrayobject.html","<ul class=\"list-group\"><li class=\"list-group-item\" ng-repeat=\"obj in data.value track by $index\"><a href=\"\" style=\"color:inherit\" ng-click=\"data.showArray[$index] = !data.showArray[$index]\">{{$index}} {{data.showArray[$index] ? \'Hide Contents\' : \'Show Contents\'}} </a><a href=\"\" ng-click=\"removeArrayItem($index)\" class=\"badge\"><span class=\"glyphicon glyphicon-remove\"></span> </a><a href=\"\" ng-click=\"addArrayItem()\" class=\"badge\"><span class=\"glyphicon glyphicon-plus\"></span></a><div ng-show=\"data.showArray[$index]\"><form><keps-form keps-name=\"kepsName+\'.\'\" keps-data=\"kepsType[0]\" keps-model=\"data.value[$index]\"></keps-form></form></div></li></ul>");
$templateCache.put("../templates/bootstrapv3/boolean.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"radio\"><label><input type=\"radio\" ng-model=\"data.value\" ng-value=\"{{true}}\" ng-required=\"kepsType.required\" ng-readonly=\"kepsReadonly\"> {{kepsType.choices.split(\',\')[0] || \'true\'}}</label></div><div class=\"radio\"><label><input type=\"radio\" ng-model=\"data.value\" ng-value=\"{{false}}\"> {{kepsType.choices.split(\',\')[1] || \'false\'}}</label></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/date.html","<span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\" style=\"width:200px\"><input type=\"date\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.date\" ng-blur=\"makeTime()\" placeholder=\"yyyy-MM-dd\" ng-readonly=\"kepsReadonly\"></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/datetime.html","<span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\" style=\"width:200px\"><input type=\"date\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.date\" ng-blur=\"makeTime()\" placeholder=\"yyyy-MM-dd\" ng-readonly=\"kepsReadonly\"></div><div class=\"form-group\" style=\"width:200px\"><input type=\"time\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.time\" ng-blur=\"makeTime()\" ng-readonly=\"kepsReadonly\"></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/email.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input type=\"email\" ng-model=\"data.value\" class=\"form-control {{kepsInputClass}}\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.placeholder}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/enum.html","<div class=\"form-group {{kepsGroupClass}}\"><div class=\"row\"><div class=\"col-xs-12\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><select ng-readonly=\"kepsReadonly\" class=\"form-control {{kepsInputClass}}\" ng-model=\"data.value\"><option ng-repeat=\"option in kepsType.options track by $index\" value=\"{{kepsType.options[$index]}}\">{{kepsType.labels[$index] || kepsType.options[$index] }}</option></select><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div>");
$templateCache.put("../templates/bootstrapv3/file.html","<div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-12\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><div class=\"input-group\"><span class=\"input-group-btn\"><span class=\"btn btn-default {{kepsButtonClass}}\" style=\"min-width: 0;padding-left:20px;padding-right:20px;display:inline-block\">Load File <input ng-if=\"kepsAcceptFileTypes\" type=\"file\" accept=\"{{kepsAcceptFileTypes}}\" style=\"position:absolute;opacity:0;top: 0;right: 0;\n		    		min-width: 100%;min-height: 100%\" onchange=\"angular.element(this).scope().fileChanged(event)\"> <input ng-if=\"!kepsAcceptFileTypes\" type=\"file\" style=\"position:absolute;opacity:0;top: 0;right: 0\" onchange=\"angular.element(this).scope().fileChanged(event)\"> </span></span><input type=\"text\" class=\"form-control\" ng-readonly=\"kepsReadonly\" value=\"{{uploadStatus}}\"></div></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div>");
$templateCache.put("../templates/bootstrapv3/geopoint.html","<div class=\"row\"><div class=\"col-xs-5\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\"><label class=\"control-label\">Lat:</label><input ng-readonly=\"kepsReadonly\" type=\"number\" class=\"form-control\" step=\"any\" ng-model=\"data.lat\" ng-keyup=\"testLatLng();errorChecking();\"></div><div class=\"form-group\"><label class=\"control-label\">Lng:</label><input ng-readonly=\"kepsReadonly\" type=\"number\" class=\"form-control\" step=\"any\" ng-model=\"data.lng\" ng-keyup=\"testLatLng();errorChecking();\"></div></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div><div class=\"col-xs-7\"><p>Preview:</p><div id=\"map\" style=\"width:100%;height:200px;margin-top:-5px\"></div></div></div>");
$templateCache.put("../templates/bootstrapv3/html.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><text-angular ng-model=\"data.value\" ng-required=\"kepsType.required\" ta-default-wrap=\"div\" ta-disabled=\"kepsReadonly\"></text-angular><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/image.html","<div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-6\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><div class=\"alert alert-info\" ng-show=\"kepsType.imageUploading\"><i class=\"fa fa-spinner fa-spin\" style=\"font-size:24px\"></i> Uploading</div><div class=\"alert alert-danger\" ng-show=\"kepsType.imageError\">{{kepsType.imageError}}</div><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\" ng-init=\"importImageComputer = true;\" ng-show=\"importImageComputer\"><div class=\"input-group\"><span class=\"input-group-btn\"><span class=\"btn btn-default {{kepsButtonClass}}\" style=\"min-width: 0;padding-left:20px;padding-right:20px;display:inline-block\">Load Image <input type=\"file\" ng-required=\"kepsType.required\" style=\"position:absolute;opacity:0;top: 0;right: 0;\n		    		min-width: 100%;min-height: 100%\" onchange=\"angular.element(this).scope().imageFileChanged(event)\" accept=\"image/*\"> </span></span><input type=\"text\" class=\"form-control\" readonly=\"\" value=\"{{imageStatus}}\"></div><a href=\"\" ng-click=\"removeImage()\" style=\"color:red\">Remove Image</a><!--<a href=\"\" ng-click=\"importImageComputer = false;importImageInternet = true;\">Or... Upload an image from a url.</a>--></div><div class=\"form-group {{kepsGroupClass}}\" ng-show=\"importImageInternet\"><div class=\"input-group\"><span class=\"input-group-btn\"><span class=\"btn btn-default {{kepsButtonClass}}\" style=\"min-width: 0;padding-left:20px;padding-right:20px;display:inline-block\">Import from url <a href=\"\" ng-click=\"getImageUrl()\" style=\"position:absolute;opacity:0;top: 0;right: 0;\n		    		min-width: 100%;min-height: 100%\" onchange=\"angular.element(this).scope().imageFileChanged(event)\"></a> </span></span><input type=\"text\" class=\"form-control\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.placeholder || \'Enter Image url\'}}\" ng-model=\"kepsType.imageUrl\"></div><a href=\"\" ng-click=\"importImageComputer = true;importImageInternet = false;\">Or... Upload a file from your computer</a></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div><div class=\"col-xs-6\"><canvas id=\"{{kepsType.randomCanvasId}}\"></canvas><span ng-show=\"imageData.height && imageData.width\">{{imageData.width + \' X \' + imageData.height}}</span></div></div></div>");
$templateCache.put("../templates/bootstrapv3/multienum.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"checkbox\" ng-repeat=\"opt in kepsType.options\"><label><input type=\"checkbox\" ng-click=\"checkMulti(opt);errorChecking();\" ng-checked=\"inArray(opt)\" ng-readonly=\"kepsReadonly\"> {{opt}}</label></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/number.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input type=\"number\" ng-model=\"data.value\" min=\"{{kepsType.min}}\" max=\"{{kepsType.max}}\" class=\"form-control {{kepsInputClass}}\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.placeholder}}\" numbers-only=\"{{kepsType.round == 0}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/object.html","<span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"row\"><div class=\"col-xs-10 col-xs-offset-1\"><input-item ng-repeat=\"(name,field) in kepsType.subSchema\" keps-name=\"name\" keps-label=\"{{name}}\" keps-type=\"field\" keps-model=\"data.value[name]\" keps-framework=\"kepsFramework\" keps-errors=\"data.error[name]\"></div></div>");
$templateCache.put("../templates/bootstrapv3/phone.html","<style>.iti-flag {background-image: url(\"/lib/intl-tel-input/build/img/flags.png\");}</style><div class=\"row\"><div class=\"col-xs-12\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><input type=\"tel\" id=\"mobile-number\" class=\"form-control {{kepsInputClass}}\" ng-model=\"data.value\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div><script>$(\"#mobile-number\").intlTelInput();</script>");
$templateCache.put("../templates/bootstrapv3/referenceObject.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><!--<input ng-readonly=\"kepsReadonly\" type=\"text\" list=\"{{kepsType.label || kepsName}}\" class=\"form-control {{kepsInputClass}}\" ng-model=\"data.reference\"\n	ng-blur=\"setReferenceData()\"></input>\n    <datalist id=\"{{kepsType.label || kepsName}}\">\n    	{{referenceOptions}}\n    	<option ng-repeat=\"option in referenceOptions\" value=\"{{option[\'name\']}}\" \n    	>{{option[data.displayReferenceAs]}}</option>\n    </datalist>--><select class=\"form-control\" ng-model=\"data.value\"><option ng-repeat=\"reference in referenceOptions\" value=\"{{reference._id}}\">{{reference.name}}</option></select><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/richtext.html","<div class=\"row\"><div class=\"col-xs-12\"><div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><text-angular ng-model=\"data.value\" ng-required=\"kepsType.required\" ta-toolbar=\"richToolbar\" ta-disabled=\"kepsReadonly\"></text-angular><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div>");
$templateCache.put("../templates/bootstrapv3/string.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input type=\"text\" ng-model=\"data.value\" class=\"form-control {{kepsInputClass}}\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.display.placeholder}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/time.html","<div class=\"form-group {{kepsGroupClass}}\" style=\"margin-bottom:10px\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><br><div class=\"col-xs-4\"><select ng-model=\"data.time.hour\" class=\"form-control {{kepsInputClass}}\" placeholder=\"{{kepsType.placeholder}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\" ng-change=\"timeToMs();\"><option ng-repeat=\"time in data.selectHours\" value=\"{{time}}\">{{time}}</option></select></div><div class=\"col-xs-4\"><select ng-model=\"data.time.min\" class=\"form-control {{kepsInputClass}}\" placeholder=\"{{kepsType.placeholder}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\" ng-change=\"timeToMs();\"><option ng-repeat=\"time in data.selectMinutes\" value=\"{{time}}\">{{time}}</option></select></div><div class=\"col-xs-4\"><select ng-model=\"data.time.sign\" class=\"form-control {{kepsInputClass}}\" placeholder=\"{{kepsType.placeholder}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\" ng-change=\"timeToMs();\"><option value=\"AM\">AM</option><option value=\"PM\">PM</option></select></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/url.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input type=\"url\" ng-model=\"data.value\" class=\"form-control {{kepsInputClass}}\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.display.placeholder}}\" ng-readonly=\"kepsReadonly\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/materialize/input.html","<section><div class=\"modal-row\"><label ng-if=\"kepsType.display.label\">{{kepsType.display.label}}:</label><label ng-if=\"!kepsType.display.label\">{{kepsName}}:</label><span ng-show=\"typeError\" style=\"color:red\">Did not find a useable input type, defaulting to string</span><!-- Start listing input types --><div ng-if=\"kepsType.type\"><div ng-if=\"kepsType.type.indexOf(\':\') > -1\"><input type=\"text\" list=\"{{kepsType.type + \'options\'}}\" class=\"form-control\" ng-model=\"data.value\" ng-blur=\"setReferenceData()\"><datalist id=\"{{kepsType.type + \'options\'}}\"><option ng-repeat=\"option in data.options\" value=\"{{option.value}}\"></option></datalist></div><div ng-if=\"kepsType.type === \'string\'\"><input type=\"text\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\" placeholder=\"{{kepsType.display.placeholder}}\"></div><div ng-if=\"kepsType.type === \'number\'\"><input type=\"number\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\"></div><div ng-if=\"kepsType.type === \'boolean\'\"><div class=\"radio-inline\"><label><input type=\"radio\" ng-required=\"kepsType.required\" ng-model=\"data.value\" ng-value=\"true\">True</label></div><div class=\"radio-inline\"><label><input type=\"radio\" ng-required=\"kepsType.required\" ng-model=\"data.value\" ng-value=\"false\">False</label></div></div><div ng-if=\"kepsType.type === \'file\'\"><div class=\"row\"><div class=\"form-group col-xs-6\"><label>Import file from computer</label><input type=\"file\" ng-required=\"kepsType.required\" style=\"margin:15px\" onchange=\"angular.element(this).scope().fileChanged(event)\"></div><div class=\"col-xs-6\"><ul style=\"list-style:none\"><li><strong>File Info</strong></li><li>FileName: {{kepsModel.fileName}}</li><li>Size: {{kepsModel.fileSize}}</li></ul></div></div></div><div ng-if=\"kepsType.type === \'html\'\"><text-angular ng-model=\"data.value\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.display.placeholder}}\" ta-default-wrap=\"div\"></text-angular>{{data.value}}</div><div ng-if=\"kepsType.type === \'datetime\'\"><div class=\"row\"><div class=\"form-group col-xs-6\"><input type=\"date\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.date\" ng-blur=\"makeTime()\" placeholder=\"yyyy-MM-dd\"></div><div class=\"form-group col-xs-6\"><input type=\"time\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.time\" ng-blur=\"makeTime()\"></div></div></div><div ng-if=\"kepsType.type === \'image\'\"><div class=\"row\"><div class=\"form-group col-xs-5\"><div ng-show=\"!import\"><label>Import image from computer:</label><div class=\"btn\"><input type=\"file\" ng-required=\"kepsType.required\" style=\"margin:15px\" onchange=\"angular.element(this).scope().imageFileChanged(event)\" accept=\"image/*\"></div><a href=\"\" ng-click=\"import = true;image.file = \'\'\">Or... Upload an image from a url.</a></div><div ng-show=\"import\"><label>Import image from url:</label><input type=\"text\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.imageUrl\" placeholder=\"Enter image url\"><button style=\"margin-top:5px\" class=\"btn btn-success\" ng-click=\"getImageUrl()\">Grab Image</button><br><a href=\"\" ng-click=\"import = false;\">Or... Upload a file from your computer</a></div></div><div class=\"col-xs-7\"><canvas id=\"{{kepsType.randomCanvasId}}\"></canvas><span ng-show=\"imageData.height && imageData.width\">{{imageData.width + \' X \' + imageData.height}}</span></div></div></div><div ng-if=\"kepsType.type === \'url\'\"><input type=\"url\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\" placeholder=\"{{kepsType.display.placeholder}}\"></div><div ng-if=\"kepsType.type === \'geopoint\'\"><div class=\"col-sm-8\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Lat:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Lng:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\"></div></div></div><div class=\"col-sm-4\">Preview</div></div><div ng-if=\"kepsType.type === \'email\'\"><input type=\"email\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\" placeholder=\"{{kepsType.display.placeholder}}\"></div><div ng-if=\"kepsType.type === \'enum\'\"><select class=\"form-control\" ng-model=\"data.value\" ng-options=\"opt for opt in kepsType.options\"></select></div><div ng-if=\"kepsType.type === \'multi\'\"><select class=\"form-control\" multiple=\"multiple\" ng-multiple=\"true\" ng-model=\"data.value\" ng-options=\"opt for opt in kepsType.options\"></select></div><div ng-if=\"kepsType.type === \'address\'\"><!--http://ipinfo.io/--><div class=\"col-sm-8\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Address Line1:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div><span class=\"help-block\">Street address, P.O. box, company name, c/o</span></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Address Line2:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div><span class=\"help-block\">Apartment, suite, unit, building, floor, etc.</span></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">City:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">State / Province / Region / County:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">ZIP / Postal Code / Postcode:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Country:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div></div></div><div class=\"col-sm-4\">Preview Zoom 17 for address Zoom 9 for city Zoom 5 for state / small country Zoom 4 for country <img class=\"map\" src=\"https://maps.googleapis.com/maps/api/staticmap?center=37.7367,-122.4572&amp;zoom=17&amp;size=200x200&amp;sensor=false\" alt=\"San Francisco, California, United States Map\" title=\"San Francisco, California, United States Map\"></div></div><div ng-if=\"kepsType.type === \'phone\'\"><!---http://jackocnr.com/intl-tel-input.html --> <input type=\"tel\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\" placeholder=\"{{kepsType.display.placeholder}}\"></div><span class=\"help-block\" ng-if=\"kepsType.display.instructions\">{{kepsType.display.instructions}}</span></div></div></section>");}]);
angular.module('ngKeps')
	.config(['$provide', function($provide){
		$provide.decorator('taOptions',['taRegisterTool', 'taToolFunctions', 'taTranslations', '$delegate','$window','$nkModalService',
			function(taRegisterTool, taToolFunctions, taTranslations, taOptions, $window, $nkModalService){
				//add css rule to display wordcount correctly
				document.styleSheets[0].insertRule("#toolbarWC{font-size:10px;}", 1);

				taRegisterTool('keps-pre', {
					display: '<button class="btn btn-default" style="font-size:1em;">pre</button>',
					tooltiptext: taTranslations.pre.tooltip,
					action: function(){
						return this.$editor().wrapSelection("formatBlock", "<PRE>");
					},
					activeState: function(){ return this.$editor().queryFormatBlockState('pre'); }
				});


				taRegisterTool('keps-youtube',{
					iconclass:'fa fa-youtube-play',
					action: function(){ 

						var that = this;
						var selectedElement = document.activeElement;
						var getUrl = function(button){
							var url = document.getElementById('_youtube-input').value;
							if(url && url !== "" && url !== "https://"){
								var ids = url.match(/(\?|&)v=[^&]*/);
								if(ids && ids.length > 0){
									var urlLink = "https://www.youtube.com/embed/" + ids[0].substring(3);
									var embed = '<img class="ta-insert-video" src="https://img.youtube.com/vi/' + ids[0].substring(3) + '/hqdefault.jpg" ta-insert-video="' + urlLink +'"contenteditable="false" allowfullscreen="true" frameborder="0"/>';
									selectedElement.focus();
									that.$editor().wrapSelection('insertHTML', embed, true);
									return; 
								}
							}
						}
						$nkModalService.show({content:"<div style='padding:10px;'><label>Youtube Video URL:</label>" +
													  "<input type='text' id='_youtube-input'></input></div>", source:"div", 
													  close:getUrl,buttons:[{label:'Close',class:'btn btn-default btn-theme'},{label:'submit',class:'btn btn-success btn-theme'}]});
					},
					onElementSelect: {
						element: 'img',
						onlyWithAttrs: ['ta-insert-video'],
						action: taToolFunctions.imgOnSelectAction
					}
				});
				taRegisterTool('keps-image',{
					iconclass:'fa fa-picture-o',
					action:function(){
						var that = this;
						var selectedElement = document.activeElement;
						var angularSelected = angular.element(document.activeElement);
						
						var getImage = function(){
							var file = document.getElementById("_image-input").files[0];
							var reader = new FileReader();

							reader.onloadend = function(){
								var embed = '<img class="ta-insert-image" src="' + reader.result + '"></img>'
								selectedElement.focus();
								that.$editor().wrapSelection('insertImage', reader.result, true);
							}
							if(file){
								reader.readAsDataURL(file);
							}
						}

						$nkModalService.show({content:"<div style='padding:10px;'><label>Upload Image:</label>" +
													  "<input type='file' id='_image-input'></input></div>", source:"div", 
													  close:getImage,buttons:[{label:'Close',class:'btn btn-default btn-theme'},{label:'submit',class:'btn btn-success btn-theme'}]});
					},
					onElementSelect: {
						element: 'img',
						action: taToolFunctions.imgOnSelectAction
					}
				});

				taRegisterTool('keps-link',{
					iconclass:'fa fa-link',
					action: function(){
						var that = this;
						var selectedElement = document.activeElement;

						var addLink = function(){
							var link = document.getElementById("_link-input").value;
							return that.$editor().wrapSelection('createLink', link, true);
						}
				
						$nkModalService.show({content:"<div style='padding:10px;'><label>Add Link:</label>" +
							  "<input type='text' id='_link-input'></input></div>", source:"div", 
								close:addLink,buttons:[{label:'Close',class:'btn btn-default btn-theme'},{label:'submit',class:'btn btn-success btn-theme'}]});
					},
					activeState: function(commonElement){
						if(commonElement) return commonElement[0].tagName === 'A';
						return false;
					},
					onElementSelect: {
						element: 'a',
						action: taToolFunctions.aOnSelectAction
					}
				});

				//FONT SIZE TOOL
		 		var fontSizeMethods = {};
        var addFontSizeMethod = function(font){
        	return	this.$editor().wrapSelection('formatBlock', font);
        };
        fontSizeMethods.h1 = function(){
        	return addFontSizeMethod.call(this, "<h1>");
        };
        fontSizeMethods.h2 = function(){
        	return addFontSizeMethod.call(this, "<h2>");
        };
        fontSizeMethods.h3 = function(){
        	return addFontSizeMethod.call(this, "<h3>");
        };
        fontSizeMethods.h4 = function(){
        	return addFontSizeMethod.call(this, "<h4>");
        };
        fontSizeMethods.h5 = function(){
        	return addFontSizeMethod.call(this, "<h5>");
        };
        fontSizeMethods.h6 = function(){
        	return addFontSizeMethod.call(this, "<h6>");
        };
        fontSizeMethods.p = function(){
        	return addFontSizeMethod.call(this, "<p>");
        };


        var fontSizeTemplate = '';
        fontSizeTemplate += '<div class="btn-group" style="padding:0px;border:0px;"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" ng-mouseup="focusHack()"ng-disabled="isDisabled()"  style="font-size:11px;">';
        fontSizeTemplate += 'Font Size<span class="caret"></span>';
        fontSizeTemplate += '</button>';
        fontSizeTemplate += '<ul class="dropdown-menu" style="position:absolute;background:white;">';
        fontSizeTemplate += '<li><a ng-click="h1()">36pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h2()">30pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h3()">24pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h4()">18pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h5()">14pt</a></li>';
        fontSizeTemplate += '<li><a hg-click="p()">13pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h6()">12pt</a></li>';
        fontSizeTemplate += '</ul></div>';
                fontSizeTemplate += '';
        
        // register the tool with textAngular
        taRegisterTool('keps-fontsize', {
            display: fontSizeTemplate,
            disabled: function(disabled) {
                
                // runs as an init function
                
                // hack to get around the errors thrown by textAngular
                // because it didn't get to store a pointer to the editor,
                // because it's not focused.
                this.focusHack = function() {
                    $('.ta-scroll-window [contenteditable]')[0].focus();
                };
                
                var self = this;
                
                // insert all qtMethods into the scope
                Object.keys(fontSizeMethods).forEach(function(key) {
                    self[key] = fontSizeMethods[key];
                });
                
                this.isDisabled = function() {
                    return disabled;
                };

            },
            action: function(){}
        });

        //ALIGN TEXT DROPDOWN TOOL
        var alignMethods = {};
        var addAlignMethods = function(location){
        	return this.$editor().wrapSelection( location, null);
        };
        alignMethods.center = function(){
        	return addAlignMethods.call(this, "justifyCenter");
        };
        alignMethods.left = function(){
        	return addAlignMethods.call(this, "justifyLeft");
        };       
        alignMethods.right = function(){
        	return addAlignMethods.call(this, "justifyRight");
        };
        alignMethods.indent = function(){
        	return addAlignMethods.call(this, "indent");
        };
        alignMethods.outdent = function(){
        	return addAlignMethods.call(this, "outdent");
        };

        var alignTemplate = '<div class="btn-group" style="padding:0px;border:0px;"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" ng-mouseup="focusHack()" ng-disabled="isDisabled()" style="font-size:11px;">';
            alignTemplate += 'Text Alignment<span class="caret"></span>';
            alignTemplate += '</button>';
            alignTemplate += '<ul class="dropdown-menu" style="position:absolute;background:white;">';
            alignTemplate += '<li><a ng-click="left()">Align Left</a></li>';
            alignTemplate += '<li><a ng-click="center()">Align Center</a></li>';
            alignTemplate += '<li><a ng-click="right()">Align Right</a></li>';
            alignTemplate += '<li><a ng-click="indent()">Indent</a></li>';
            alignTemplate += '<li><a ng-click="outdent()">Outdent</a></li>';            
            alignTemplate += '</ul></div>';
			
        taRegisterTool('keps-alignment', {
            display: alignTemplate,
            disabled: function(disabled) {
                this.focusHack = function() {
                    $('.ta-scroll-window [contenteditable]')[0].focus();
                };
                
                var self = this;
                
                // insert all qtMethods into the scope
                Object.keys(alignMethods).forEach(function(key) {
                    self[key] = alignMethods[key];
                });
                
                this.isDisabled = function() {
                    return disabled;
                };

            },
            action: function(){}
        });

				taOptions.toolbar = [
			      ['keps-pre'], ['keps-fontsize'],['quote','bold', 'italics', 'underline', 'strikeThrough'], ['keps-alignment'],
			      [ 'ul', 'ol', 'redo', 'undo', 'clear'],['html','keps-youtube','keps-link', 'keps-image']
  				];
        		return taOptions;
			}

		]);
	}]);
angular.module('ngKeps')
  .directive('authorizationmodal',['$nkAuthService', '$window', '$rootScope',
    function($nkAuthService, $window, $rootScope){
      return {
        restrict: 'E',
        
        templateUrl:'../templates/authModal.html',        

        scope: {
        },

        controller:function($scope){
          $scope.config = $rootScope.config;
          $scope.user = $nkAuthService.getUser();
          $scope.show = 'login';          $scope.login = {};
          $scope.signin = function(provider) {
            $nkAuthService.loginWithProvider(provider, $scope.login)
            .then(function(data){
              $scope.msgs = {};
              $scope.msgs.signedIn = 'Signed In!';
              setTimeout(function() {
                $window._ngkeps_model_hide();                
              }, 1500);
            },function(err){  
              console.log(err);
              $scope.msgs = {};
              $scope.msgs.error = err.errors[0].friendly;
            });
          };
          $scope.signout = function(){
            $nkAuthService.logout();
            location.href = "/";
          };
          $scope.register = function(){
            $scope.msgs = {};
            if($scope.registerForm.$valid){
              if($scope.newUser.password === $scope.rePassword){
                if($scope.newUser.password.length > 7) {
                  $nkAuthService.signupWithProvider('local', $scope.newUser)
                  .then(function(user){
                    console.log(user);
                    $scope.msgs.created = true;
                    setTimeout(function() {
                      $window._ngkeps_model_hide();
                    }, 1500);
                  }, function(err){
                    if(err.data.errors[0].message == 'DuplicateKey'){
                      $scope.msgs.emailUsed = true;
                    }else{
                      $scope.msgs = {error: err.data.errors[0].friendly};
                    }
                    console.log('ERR', err);            
                  });
                }else{
                  $scope.msgs.passwordShort = true;
                }
              }else{
                $scope.msgs.passwordsDontMatch = true;
              }
            }else{
              $scope.msgs.formError = true;
            }
          };
          $scope.showLogin = function() {
            $scope.show = 'login';
          };
          $scope.showRegister = function() {
            $scope.show = 'register';
          };
          $scope.showForgottenPassword = function() {
            $scope.show = 'forgottenPassword';
          };
          $scope.showTwoFactor = function() {
            $scope.show = 'twofactor';
          };
        }
      };
    }
  ]);
angular.module('ngKeps')
	.directive('kepsForm',['$nkDataService',
		function($nkDataService){
			return {
				restrict: 'E',
				
				templateUrl:'../templates/form.html',

				scope: {
					kepsData:'=',
					kepsModel:'=',
					kepsName:'=',
					kepsErrors:'=',
					kepsFramework:'@'
				},
				link:function(scope, element, attrs){
					scope.data = {};
					scope.kepsErrors = {};

			    	if (scope.kepsModel) {
			      		scope.data.value = scope.kepsModel;
			    	}

			    	scope.$watch('data.value', function(newVal) {
		      			if (typeof newVal !== 'undefined'){
		        			scope.kepsModel = newVal; 
		      			}
			    	});
			    	scope.$watch('kepsModel', function(newVal){
			          	if(typeof newVal !== 'undefined' && scope.data.value !== newVal){
			        		scope.data.value = newVal;
			        	}
			      	});
				}
			};
		}
	]);
angular.module('ngKeps')
.directive('inputItem',['$nkDataService', '$http', '$compile', '$parse', '$templateCache','$window','$timeout', 'imageInputService', 'validatorService',
  function($nkDataService, $http, $compile, $parse, $templateCache, $window, $timeout, imageInputService, validatorService){
    return {
      restrict: 'E',
      
      /*kepsType: OBJECT: 
      Property- displayAs: Optional, used for modifying reference types
      Property- displayType: Optional, will define field type, set to type if not provided
      Property- options: Optional, array of id/value that matches the reference type

      Property- name: Not Optional, will be used as label if no displayAs
      Property- type: Not Optional, will be field type if no displayType provided
      Property- model: Not Optional, value or false if not a reference field*/

      scope:{
        kepsType:'&',
        kepsModel:'=',
        kepsName:'&',
        kepsGroupClass:'@',
        kepsInputClass:'@',
        kepsLabelClass:'@',
        kepsSubLabelClass:'@',
        kepsButtonClass:'@',
        kepsLabel:'@',
        kepsInstructions:'@',
        kepsErrors:'=?',
        kepsHideErrors:'&',
        kepsFramework:'@',
        kepsReadonly:'@'
      },

      link: function(scope,element,attrs){
        //setup display object
        if(scope.hasOwnProperty('kepsErrors')){
          scope.kepsErrors = {};
        }
        if(typeof scope.kepsType === 'function'){
          scope.kepsType = scope.kepsType();
        }

        if(typeof scope.kepsType === 'string'){
          scope.kepsType = {type:scope.kepsType};
        }
        if(typeof scope.kepsName === 'function'){
          scope.kepsName = scope.kepsName();
        }
        //resolve label value
        if(scope.kepsLabel === "''"){
          scope.kepsType.label = '';
        }else if(typeof scope.kepsLabel !== 'undefined' && scope.kepsLabel.length > 0){
          scope.kepsType.label = scope.kepsLabel;
        }else if(scope.kepsType){
          if(!scope.kepsType.label || scope.kepsType.label === ''){
            scope.kepsType.label = scope.kepsName;
          }
        }else{
          if(scope.kepsType){
            scope.kepsType.label = scope.kepsName;
          }else{
            scope.kepsType = {};
            scope.kepsType.label = scope.kepsName;
          }
        }
        //resolve instructions value
        if(scope.kepsInstructions === ''){
          scope.kepsType.instructions = '';
        }else if(typeof scope.kepsInstructions !== 'undefined'){
          scope.kepsType.instructions = scope.kepsInstructions;
        }else if(!scope.kepsType.hasOwnProperty('instructions')){
          scope.kepsType.instructions = '';
        }

        //setup data watch object
        scope.data = {};
        scope.data.id = Math.random();
        if(typeof scope.kepsType.required === 'object') {
          scope.data.subrequired = true;
        }
        if (scope.kepsModel) {
          if (scope.kepsType.type && scope.kepsType.type === 'image') {
            scope.data.value = scope.kepsModel;
          } else if (scope.kepsType.type && scope.kepsType.type === 'file') {
            scope.data.value = scope.kepsModel;
          } else if (scope.kepsType.type && scope.kepsType.type === 'datetime') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
            scope.data.time = new Date(scope.kepsModel);
          } else if (scope.kepsType.type && scope.kepsType.type === 'date') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
          } else {
            scope.data.value = scope.kepsModel;            
          }
        }
        
        //deep watch
        if(scope.kepsType.type === 'array' || scope.kepsType.type === 'multienum'){
          scope.$watch('data.value', function(newVal) {
            if (typeof newVal !== 'undefined') {
              scope.kepsModel = newVal; 
            } else if (typeof scope.kepsType.default !== 'undefined') {
              scope.kepsModel = scope.kepsType.default;
            } else if(typeof newVal === 'undefined'){
              delete scope.kepsModel;
            }
          }, true);   
        //regular watch     
        }else{
          scope.$watch('data.value', function(newVal) {
            if (typeof newVal !== 'undefined') {
              scope.kepsModel = newVal; 
            } else if (typeof scope.kepsType.default !== 'undefined') {
              scope.kepsModel = scope.kepsType.default;
            }else if(typeof newVal === 'undefined'){
              delete scope.kepsModel;
            }
          });
        }
        scope.$watch('kepsModel', function(newVal){
          if(typeof newVal !== 'undefined' && scope.data.value !== newVal){
            scope.data.value = newVal;
            if (scope.kepsType.type === 'image') {
              imageInputService(scope);
            }
          }else if(typeof newVal === 'undefined'){
            delete scope.data.value;
          }
        });

        /*setup template stuff for different css frameworks
        var framework = $parse(attrs.data)(scope);
        if (framework !== 'bootstrapv3' &&
            framework !== 'materialize') {
          framework = 'bootstrapv3';
        }*/
        if(typeof scope.kepsFramework === 'function'){
          scope.kepsFramework = scope.kepsFramework();
        }
        var framework = scope.kepsFramework ? scope.kepsFramework : 'bootstrapv3';
        if(typeof framework !== 'string'){
          framework = 'bootstrapv3';
        }
        if(framework !== 'materialize' && framework !== 'bootstrapv3'){
          framework = 'bootstrapv3';
        }
        var loadTemplate = function(type) {
          if(type.slice(0,1) === ':'){
            $http.get("../templates/"+framework+'/referenceObject.html', {cache: $templateCache}).success(function(tplContent){
              element.replaceWith($compile(tplContent)(scope));
            });
          }else{
            $http.get("../templates/"+framework+'/'+type+'.html', {cache: $templateCache}).success(function(tplContent){
              element.replaceWith($compile(tplContent)(scope));                
            }); 
          }
        };

        //catch bad/incomplete models
        if (typeof scope.kepsType.type !== 'undefined') {
          scope.kepsType.type = scope.kepsType.type.toLowerCase();
          if (typeof scope.kepsType.default !== 'undefined' && typeof scope.data.value === 'undefined') {
            scope.data.value = scope.kepsType.default;
          }

          //add new types here
          var itemTypes=["html","url","geopoint","email","datetime","date","richtext","phone",
                         "image","file","string","number","boolean","enum","multienum","address",
                         "array", "arraymulti", "object", "time"];
         
          //resolve weird types
          if(scope.kepsType.type.slice(0,1) === ':'){
            loadTemplate(scope.kepsType.type);
          }else if(scope.kepsType.type.slice(0,1) === '_'){
            getModelSchema(function(err, schema){
              scope.kepsType.type = "object";
              scope.kepsType.subSchema = removeUneditableFields(schema);
              loadTemplate(scope.kepsType.type);
            });
          }else if(itemTypes.indexOf(scope.kepsType.type) === -1){
            scope.typeError = true;
            scope.kepsType.type = "string";
          }else{
            if(scope.kepsType.type === 'array'){
              if(typeof scope.kepsType.subSchema === 'string'){
                scope.kepsType.subSchema = {type:scope.kepsType.subSchema};
              }else{
                var size = 0;
                for(var x in scope.kepsType.subSchema){
                  size++;
                }
                size > 1 ? scope.kepsType.type = 'arraymulti' : scope.kepsType.type = 'array';
              }
            }
            
            loadTemplate(scope.kepsType.type);
            
          }
        }else{
          scope.kepsType.type = "string";
          loadTemplate(scope.kepsType.type) ;
        }
      
        function removeUneditableFields(schema){
          var blacklist = ['_id','_createdAt','_updatedAt', '_seed', '_v'];
          var newSchema = {};
          for(var x in schema){
            if(blacklist.indexOf(x) > -1){

            }else{
              newSchema[x] = schema[x];
            }
          }
          return newSchema;
        }
        /*#### END PREPROCESSING/ERROR CHECKING. REST OF CODE IS IN TYPE SPECIFIC BLOCKS #####*/
    


        //#### TYPE: REFERENCE STUFF #####
        if (typeof scope.kepsType.type !== 'undefined' && scope.kepsType.type.indexOf(':') === 0) {
          var referenceType = scope.kepsType.type.slice(1);
          $http.get($nkDataService.apiPrefix + 'models')
          .then(function(models){
            for(var x in models.data){
              if(x.toLowerCase() === referenceType.toLowerCase()){
                referenceType = x;
                if(models.data[x].properties){
                  if(models.data[x].properties.displayAs){
                    scope.data.displayReferenceAs = models.data[x].properties.displayAs;
                    return getReferenceData(referenceType, scope.data.displayReferenceAs);
                  }
                }
                if(models.data[x].schema.name){
                  scope.data.displayReferenceAs = 'name';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                if(models.data[x].schema.title){
                  scope.data.displayReferenceAs = 'title';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                if(models.data[x].schema.displayName){
                  scope.data.displayReferenceAs = 'displayName';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                scope.data.displayReferenceAs = '_id';
                return getReferenceData(referenceType, scope.data.displayReferenceAs);
              }
            }
          });
          var getReferenceData = function(referenceType, displayAs){
            $http.get($nkDataService.apiPrefix + 'rest/' + referenceType + "s")
            .then(function(data){
              scope.referenceOptions = [];
              for(var i = 0; i < data.data.length; i++){
                scope.referenceOptions.push({_id:data.data[i]._id, name:data.data[i][displayAs]});
              }
              if(scope.kepsModel){
                scope.data.value = scope.kepsModel;
                for(var i=0;i<scope.referenceOptions.length;i++){
                  if(scope.kepsModel === scope.referenceOptions[i]._id){
                    scope.data.reference = scope.referenceOptions[displayAs];
                  }
                }
              }
            });
          };/*
          scope.setReferenceData = function(){
            for(var i=0;i<scope.referenceOptions.length;i++){
              if(scope.referenceOptions[i][scope.data.displayReferenceAs] === scope.data.reference){
                scope.data.value = scope.referenceOptions[i]._id;
              }
            }
          };*/
        }
    
        /*### Mongoose Validation Type (model leads with _ or _?) ###*/
        function getModelSchema(cb){
          var referenceType;
          if(scope.kepsType.type[1] === '?'){
            referenceType = scope.kepsType.type.slice(2);
          }else{
            referenceType = scope.kepsType.type.slice(1);
          }
          $http.get($nkDataService.apiPrefix + 'models')
          .then(function(models){
            for(var x in models.data){
              if(x.toLowerCase() === referenceType || x === referenceType){
                return cb(null,models.data[x].schema);
              }
            }
          }, function(err){
            console.error(err);
            return cb(err);
          });
        }

        /*### TYPE: TIME STUFF ###*/
        if(scope.kepsType.type === 'time'){
          //populate select dropdowns
          scope.data.time = {};
          scope.data.selectHours = [];
          scope.data.selectMinutes = [];
          for(var i = 1; i < 13; i++){
            scope.data.selectHours.push(i);
          }
          for(i = 0; i < 60; i++){
            scope.data.selectMinutes.push(i);
          }

          if(scope.kepsModel && scope.kepsModel > 0){
            var minutes = scope.kepsModel / 60000;
            var hour = Math.floor(minutes/60);
            minutes = minutes % 60;
            var sign;
            if(hour === 0){
              sign = 'AM';
            }else if(hour < 12){
              sign = 'AM';
            }else if(hour > 11){
              sign = 'PM';
              hour = hour - 12;
            }
            scope.data.time.hour = hour;
            scope.data.time.minutes = minutes;
            scope.data.time.sign = sign; 
          }

          scope.timeToMs = function(){
            var time = 0;
            var hour, minute;
            if(!scope.data.time.hour){
              scope.data.time.hour = 0;
            }
            if(!scope.data.time.min){
              scope.data.time.min = 0;
            }
            if(!scope.data.time.sign){
              scope.data.time.sign = 'AM';
            }
            hour = Number(scope.data.time.hour);
            min = Number(scope.data.time.min);
            if(scope.data.time.sign === 'AM' && hour === 12){
              hour = 0;
            }else if(scope.data.time.sign === 'PM' && hour < 12){
              hour = hour + 12;
            }else{
            }
            minute = min || 0;
            time = hour * 60 + minute;
            scope.data.value = time * 60 * 1000;
          }

        }

        /*### TYPE: DATETIME STUFF ###*/
        //blur function to combine date/time strings to ms number
        if (scope.kepsModel) {
          if (scope.kepsType.type === 'datetime') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
            scope.data.time = new Date(scope.kepsModel);
          } else if (scope.kepsType.type === 'date') {
            //changing date ms number to display as date/time fields
            scope.data.value = scope.kepsModel;
            scope.data.date = new Date(scope.kepsModel);
          } else {
            scope.data.value = scope.kepsModel;            
          }
        }
        scope.makeTime = function(){
          if(scope.data.time && scope.data.date){
            scope.kepsModel = 
             new Date(scope.data.date.toString().slice(0,15) + scope.data.time.toString().slice(15)).getTime();

          }else{
            scope.kepsModel = new Date(scope.data.date).getTime();
          }
        };

        /*### TYPE: ARRAY stuff ###*/
        var i, len;
        if(scope.kepsType.type === 'array'){
          scope.data.value = scope.kepsModel || []; 
          scope.showArrayItem = [];
          len = scope.data.value.length;
          for (i = 0; i < len; i++) {
            scope.showArrayItem.push(false);
          }        
        }else if(scope.kepsType.type === 'arraymulti'){
          scope.data.value = scope.kepsModel || [];
          scope.showArrayItem = [];
          len = scope.data.value.length;
          for(i = 0; i < len; i++){
            scope.showArrayItem.push(false);
          }  
        }
        scope.addArrayItem = function(){
          var size = 0;
          for(var x in scope.kepsType.subSchema){
            size++;
          }
          if(size > 1){
            var obj = {};
            for (var i in scope.kepsType.subSchema) {
              if (scope.kepsType.subSchema[i].default) {
                obj[i] = scope.kepsType.subSchema[i].default;
              }
            }
            scope.showArrayItem[scope.data.value.length] = true;
            scope.data.value.push(JSON.parse(JSON.stringify(obj)));          
          }else{
            scope.showArrayItem[scope.data.value.length] = true;
            scope.data.value.push('');
          }
        };

        scope.removeArrayItem = function(index){
          scope.data.value.splice(index,1);
        };


        /*### TYPE: IMAGE STUFF ###*/
        if (scope.kepsType.type === 'image') {
          imageInputService(scope);
        }

        /*### TYPE: FILE stuff ###*/
        if(scope.kepsType.type === "file"){
          fileInputService(scope);
        }


        /*###TYPE: GEOPOINT stuff ###*/
        if(scope.kepsType.type === "geopoint"){
          geopointInputService(scope);
        }

       
        /*####TYPE: multi stuff####*/
        if(scope.kepsType.type==='multienum'){

          if(Array.isArray(scope.kepsModel)){
            scope.data.value = scope.kepsModel;
          } else{
            scope.data.value = [];
          }
          scope.checkMulti=function(opt){
            var ind = scope.data.value.indexOf(opt);
            if (ind > -1){
              scope.data.value.splice(ind, 1);
            } else {
              scope.data.value.push(opt);
            }
          };
          scope.inArray = function(specialty){
            if(scope.data.value.indexOf(specialty) > -1){
              return true;
            }else{
              return false;
            }
          }
        }
    

        /*### TYPE address stuff ###*/
       /* var timeoutPromise;
        scope.checkAddress = function(evt){
          if(!scope.data.value) scope.data.value = {};
          
          if(scope.data.value.address1 && scope.data.value.city && scope.data.value.region){
            if(scope.data.value.address1.length > 3 && scope.data.value.city.length > 2 && scope.data.value.region.length > 0){
              if(timeoutPromise){
                $timeout.cancel(timeoutPromise);
              }

              timeoutPromise = $timeout(function(){
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + scope.data.value.address1 + ',+' + scope.data.value.city + ',+' + scope.data.value.region)
                  .then(function(mapInfo){

                    if(mapInfo.status === 200){
                      var addressInfo = mapInfo.data.results[0].address_components;
                      for(var x in addressInfo){
                        if(addressInfo[x].types[0] === 'postal_code'){
                          scope.data.value.postal = addressInfo[x].long_name;
                          if(scope.kepsFramework === 'materialize') document.getElementById('zipLabel').className = "active";
                        } else if(addressInfo[x].types[0] === 'country'){
                          scope.data.value.country = addressInfo[x].long_name;
                          if(scope.kepsFramework === 'materialize') document.getElementById('countryLabel').className = "active";
                        }
                      }
                      $window.initMapAddress = function(){
                        var latLng = new google.maps.LatLng( mapInfo.data.results[0].geometry.location.lat,
                                                             mapInfo.data.results[0].geometry.location.lng);

                        var addressMap = new google.maps.Map(document.getElementById('addressMap'),
                          {
                            center:latLng,
                            zoom:8
                          });
                        var marker = new google.maps.Marker(
                          {
                            position: latLng,
                            map: addressMap,
                          });
                      };
                      if(typeof(google) === 'undefined'){
                        var s = document.createElement('script');
                        s.src = "https://maps.googleapis.com/maps/api/js?callback=initMapAddress";
                        document.body.appendChild(s);
                      }else{
                        initMapAddress();
                      }
                    }
                    scope.data.value.lat = mapInfo.data.results[0].geometry.location.lat;
                    scope.data.value.lng = mapInfo.data.results[0].geometry.location.lng;

                  });
              }, 1000);

            }
          }
        };*/


        /*### TYPE richtext stuff ###*/
        if(scope.kepsType.type === 'richtext'){
          scope.richToolbar = [ ['keps-fontsize','bold', 'italics', 'underline', 'strikeThrough','keps-alignment','wordcount']
          ];
        }

        /*ERROR CHECKING*/
        scope.errorChecking = function(){
          scope.kepsErrors = {};
          switch(scope.kepsType.type){
            case('string'):return validatorService.stringValidation(scope);
            case('number'):return validatorService.numberValidation(scope);
            case('image'):return validatorService.fileValidation(scope);
            case('richText'):return validatorService.richTextValidation(scope);
            case('geopoint'):return validatorService.geopointValidation(scope);
            case('multienum'):return validatorService.multiValidation(scope);
            case('email'):return validatorService.emailValidation(scope);
          }
        };
      }
    };
  }]);
angular.module('ngKeps')
.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text && typeof text === 'string') {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }else if(typeof text === "number"){
                    ngModelCtrl.$setViewValue(text);
                    ngModelCtrl.$render();
                    return text;
                }else{
                    return undefined;
                }
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
angular.module('ngKeps')

.service('$nkAnalyticsService', ['$timeout', '$nkDataService',
  
  function($timeout, $nkDataService) {

    var publicMembers = {};
    var protectedMembers = {};

    protectedMembers.queue = [];
    protectedMembers.interval = 10000;


    // look in localstorage for user, if not found add the sessionID to tmpUserId;

    publicMembers.event = function(eventName, properties) {
      var trackObj = {
        action: 'track',
        event: name,
        properties: data,
        timestamp: (new Date()).toISOString()
      };
      if (userId) {
        trackObj.userId = userId;
      } else {
        trackObj.sessionId = sessionId;
      }
      queue.push(trackObj);
      // console.log('Tracking event', name, 'with data', data);
    };

    publicMembers.identify = function(key, traits) {
      var trackObj = {
        action: 'identify',
        traits: data,
        timestamp: (new Date()).toISOString()
      };
      if (key && key !== '') {
        userId = key;
        trackObj.userId = userId;
      } else {
        trackObj.userId = 'anonymousId';
      }
      queue.push(trackObj);
    };

    publicMembers.setInterval = function(interval) {
      protectedMembers.interval = interval;
    };

    protectedMembers.flush = function() {
      if (queue.length > 0) {
        var batchObj = {
          batch: queue,
        };
        var reqObj = JSON.parse(JSON.stringify(batchObj));
        queue = [];

        $http.post('/segment_io/import', reqObj)
        .then(function(){
          }, function(){
          });
      }

      protectedMembers.flushTimeout();
    };

    protectedMembers.flushTimeout = function() {
      $timeout(function() {
        protectedMembers.flush();
      }, protectedMembers.interval);
    };

    protectedMembers.flushTimeout();

    return publicMembers;
  }
]);

(function() {
var logoutHref = null;
var rootScope = {};
var apiPrefix = '/api/v1/';

angular.module('ngKeps').provider('$nkAuthService', [function () {

  this.setApiPrefix = function(value) {
    apiPrefix = value;
  };

  this.setLogoutHref = function(value) {
    logoutHref = value;
  };

  this.$get = [
  
  '$http',
  '$location',
  '$window',
  '$q',
  '$nkDataService',
  '$nkModalService',
  '$rootScope',
  '$compile',

  function($http, $location, $window, $q, $nkDataService, $nkModalService, $rootScope, $compile) {
    var publicMembers = {};
    var user = false;
    var webalias = $location.host();
    
    publicMembers.showModal = function(cb) {
      if (user) {
        cb(user);
      } else {
        newElement = $compile("<authorizationmodal></authorizationmodal>")($rootScope);
        $nkModalService.show({content:newElement, source:'angular-element', close:function() {
          cb(user);
        }});        
      }
    };

    publicMembers.start = function(scope){
      rootScope = scope;
      window.$http = $http;
      var userDeferred = $q.defer();
      try{
        user = JSON.parse($window.localStorage[webalias+'-user']);
      } catch (e){}
      if(user){
        $http.get(apiPrefix + 'users/me')
        .then(function(response){
          user = response.data;
          if (!user) {
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(user));
            userDeferred.resolve(user);
            scope.user = user;
          }
        }, function(err){
          if (!user) {
            userDeferred.reject(user);          
          } else {
            delete $window.localStorage[webalias + '-user'];
            if (logoutHref) {
              $location.href = logoutHref;
            }
          }
        });
        scope.user = user;
        userDeferred.resolve(user);
      }
      var parser = document.createElement('a');
      parser.href = apiPrefix;

      $http.get(parser.origin + '/api/config')
      .then(function(response){
        $rootScope.config = response.data;
      }, function(err){
        alert('server down');
      });
      return userDeferred.promise;
    };

    publicMembers.getUser = function(){
      return user;
    };

    publicMembers.loginWithProvider = function(provider, data) {
      var loginDeferred = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signin', data)
        .then(function(data) {
          if(data.data === false){
            loginDeferred.reject();
          }else{
            var usr = data.data;
            usr.expiration = Date.now();
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(usr));
            user = usr;
            rootScope.user = user;
            loginDeferred.resolve(usr);
          }
        }, function(err) {
          loginDeferred.reject(err.data);
        });
      } else {
        location.href = apiPrefix+'oauths/'+provider;
      }

      return loginDeferred.promise;
    };

    publicMembers.signupWithProvider = function(provider, data) {
      var loginDeferred = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signup', data)
        .then(function(success) {
          var usr = success.data;
          if (usr === false) {
            loginDeferred.reject();
          } else {
            usr.expiration = Date.now();
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(usr));
            user = usr;
            rootScope.user = user;
            loginDeferred.resolve(usr);
            }
          }, function(err) {
            loginDeferred.reject(err);        
          });
      } else {
        location.href = '/auth/'+provider;
      }
     
     return loginDeferred.promise;
    };

    publicMembers.logout =function(){
      delete $window.localStorage[webalias + '-user'];
      user = false;
    };

    publicMembers.getPaymentToken = function(){
      var token = $q.defer();
      $nkDataService.get("customers/token")
      .then(function(success){
        token.resolve(success.data);
      }, function(err){
        token.reject(err);
      });
      return token.promise;
    };

    publicMembers.checkout = function(){
      var transaction = $q.defer();
      $nkDataService.post("customers/checkoutWithPaymentMethod")
      .then(function(success){
        transaction.resolve(success.data);
      }, function(err){
        transaction.reject(err);
      });
      return transaction.promise;
    };

    publicMembers.checkPaymentMethod = function(){
      var method = $q.defer();
      $nkDataService.get('customers/checkPaymentMethod')
      .then(function(success){
        method.resolve(success.data);
      }, function(err){
        method.reject(err);
      });
      return method.promise;
    };

    publicMembers.firstTimeCheckout = function(nonce){
      var checkout = $q.defer();
      $nkDataService.post('customers/firstTimeCheckout', {'payment_method_nonce':nonce})
      .then(function(success){
        checkout.resolve(success.data);
      }, function(err){
        checkout.rejeoct(err);
      });
      return checkout.promise;
    };

    return publicMembers;
  }];
  
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
    var webalias = $location.host();

    return {
       request: function (config) {
          config.headers = config.headers || {};
          try{
            user = JSON.parse($window.localStorage[webalias+'-user']);
            if (user.token) {
               config.headers.Authorization = 'Bearer ' + user.token;
            }
          } catch (e){}

          return config;
       },
       response: function(res) {
        // should be urlPrefix
        var url = document.createElement('a');
        url.href = res.config.url;
        var prefixurl = document.createElement('a');
        prefixurl.href = apiPrefix;
        if (url.href.indexOf(prefixurl.href) === 0) {
          console.log(res.config.url);
          if (res.headers('x-user-token-refresh')) {
            try{
                $window.localStorage.setItem(webalias+'-user', res.headers('x-user-token-refresh'));
                rootScope.user = JSON.parse(res.headers('x-user-token-refresh'));
            } catch(err){
              alert(err);
            }
          }
        }
        return res;
       },
       responseError: function (response) {
         if (response.status === 401) {
            delete $window.localStorage[webalias + '-user'];
            if (logoutHref) {
              $location.href = logoutHref;
            }
         }
         return $q.reject(response);
       }
    };
  }]);
}])

.run(['$nkAuthService', '$rootScope', function($nkAuthService, $rootScope) {
  $nkAuthService.start($rootScope);
}]);

})();

angular.module('ngKeps')

.service('$nkCacheService', [
  
  function() {

    // add last updated time to cahce objects
    
    var publicMembers = {};
    var protectedMembers = {};
    var storage = {
      get: function(key) {
        return JSON.parse(localStorage.getItem(key));
      },
      set: function(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
      },
      check: function(key) {
        return (typeof localStorage.getItem(key) !== 'undefined' && localStorage.getItem(key) !== null);
      }
    };

    var objects;
    var indexLoaded = 0;
    var objectsLoaded = 0;

    publicMembers.storage = storage;

    protectedMembers.init = function() {
      if (storage.check('objects')) {
        var objs = storage.get('objects');
        if (variable.constructor === Array) {
          publicMembers.loadCache(objs);
        }
      }
    };

    /**
      * @method clearCache
      */
    publicMembers.clearCache = function() {
      localStorage.clear();
      loc = location.href;
      loc = loc.substr(0, loc.indexOf('#'));
      location.href = loc;
    };

    /**
      * @method loadCacheObj
      */
    publicMembers.loadCacheObj = function(type, id) {
      if (storage.check(type+'-'+id)) {
        try {
          var obj = storage.get(type+'-'+id);
          objects[type].objects[id] = obj;
          objectsLoaded++;
        } catch (e) {
          console.log('Error on parse', e);
          console.log(type+'-'+id, storage.get(type+'-'+id));
        }
      } else {
        console.log('Object', type+'-'+id, ' in index but not cache');
      }
    };

    /**
      * @method loadCacheType
      */
    publicMembers.loadCacheType = function(type) {
      objects[type] = {'objects':{}, 'schema':{}, 'objectCallbacks':[], 'index':[], 'collection':[]};
      if (!(storage.check(type+'-count'))) {
        storage.set(type+'-count', 0);
      }
      if (storage.check(type+'-index')) {
        try {
          objects[type].index = storage.get(type+'-index');
          indexLoaded++;
          for (var j = 0; j < objects[type].index.length; j++) {
            publicMembers.loadCacheObj(type, objects[type].index[j]);
          }
        } catch (e) {
          console.log('Error on index parse', e);
          console.log(type+'-index', storage.get(type+'-index'));
        }
      }
    };

    /**
      * @method loadCache
      */
    publicMembers.loadCache = function(objectsArr) {
      for (var i = 0; i < objectsArr.length; i++) {
        publicMembers.loadCacheType(objectsArr[i]);
      }
      console.log('finished loading cache', indexLoaded, 'indexes loaded', objectsLoaded, 'objects loaded', (JSON.stringify(localStorage).length/2500000)+'% of cache used');
    };

    /**
      * @method inCache
      */
    publicMembers.inCache = function(type, id) {
      if (id in objects[type].objects) {
        return true;
      } else {
        return false;
      }
    };

    /**
      * @method addObj
      */
    publicMembers.addObj = function(type, obj, dt, pending) {
      object._pending = pending;
      if (object._id in objects[objectType].objects) {
        objects[objectType].objects[object._id] = angular.extend(objects[objectType].objects[object._id], object);
      } else {
        objects[objectType].objects[object._id] = object;
      }
      protectedMembers.runObjectCallbacks(objectType, objects[objectType].objects[object._id]);
      if (!('objects-'+objectType+'-'+object._id in localStorage)) {
        localStorage.objectsCount = parseInt(localStorage.objectsCount)+1;
        localStorage[objectType+'Count'] = parseInt(localStorage[objectType+'Count'])+1;
      }
      localStorage['objects-'+objectType+'-'+object._id] = JSON.stringify(objects[objectType].objects[object._id]);
      if (objects[objectType].index.indexOf(object._id) === -1) {
        objects[objectType].index.push(object._id);
        localStorage['objects-'+objectType+'-index'] = JSON.stringify(objects[objectType].index);
      }
      if (serverdt !== false) {
        localStorage['objects-'+objectType+'-dt'] = serverdt;
      }
      return objects[objectType].objects[object._id]
    };

    /**
      * @method addArray
      */
    publicMembers.addArray = function(type, arr, dt, pending) {
      var output = [];
      for (var i = 0; i < array.length; i++) {
        publicMembers.addObject(type, arr[i], dt, pending);
        output.push(objects[objectType].objects[array[i]._id]);
      }
      return output;
    };

    /**
      * @method removeObj
      */
    publicMembers.removeObj = function(type, id, dt) {
      if (id in objects[type].objects) {
        delete objects[type].objects[id];
      }
      if ('objects-'+type+'-'+id in localStorage) {
        localStorage.objectsCount = parseInt(localStorage.objectsCount)-1;
        localStorage[type+'-count'] = parseInt(localStorage[type+'-count'])-1;
        delete localStorage[type+'-'+id]
      }
      var ind = objects[type].index.indexOf(id);
      if (ind != -1) {
        objects[type].index = objects[type].index.splice(ind, 1);
        localStorage[type+'-index'] = JSON.stringify(objects[type].index);
      }
      if (serverdt !== false) {
        localStorage[type+'-dt'] = dt;
      }
    };

    /**
      * @method getObj
      */
    publicMembers.getObj = function(type, id) {
      return objects[type].objects[id];
    };

    /**
      * @method getObjCount
      */
    publicMembers.getObjCount = function(type) {
      if (type in objects) {
        return objects[type].count;
      } else {
        return 0;
      }
    };

    /**
      * @method getObjectIndex
      */
    publicMembers.getObjectIndex = function(type) {
      if (type in objects) {
        return objects[type].index;
      } else {
        return [];
      }
    };

    /**
      * @method getCollection
      */
    publicMembers.getCollection = function(type) {
      if (type in objects) {
        return objects[type].collection;
      } else {
        return [];
      }
    };

    /**
      * @method getSyncObject
      */
    publicMembers.getSyncObject = function(type, id) {
      var output = {};
      if (typeof id !== 'undefined') {
        if (type in objects && id in objects[type].objects) {
          output[type] = {};
          output[type][id] = objects[type].objects[id];
        }
      } else if (typeof type !== 'undefined' && type in objects) {
        output[type] = {};
        for (var i = objects[type].collection.length - 1; i >= 0; i--) {
          output[type][objects[type].collection[i]._id] = objects[type].collection[i]._v;
        }
      } else {
        for (var x in objects) {
          output[x] = {};
          for (var i = objects[x].collection.length - 1; i >= 0; i--) {
            output[x][objects[x].collection[i]._id] = objects[x].collection[i]._v;
          }          
        }
      }
      return output;
    };

     /**
      * @method getTypes
      */
    publicMembers.getTypes = function() {
      var output = [];
      for (var x in objects) {
        output.push(x);
      }
      return output;
    };   

     /**
      * @method getTypes
      */
    publicMembers.addType = function(name, schema) {
      if (type in objects) {
        // update schema
      } else {
        // add type
      }
    };   


    /**
      * @method loadPostProcessObject
      */
    publicMembers.loadPostProcessObject = function(objectType, callback) {
      dataServiceReadyDeferred.promise.then(function() {
        objects[objectType].objectCallbacks.push(callback);
      });
    };

    protectedMembers.runObjectCallbacks = function(objectType, object) {
      var deferred = $q.defer();
      var promises = [];
      for (var i = 0; i < objects[objectType].objectCallbacks.length; i++) {
        promises.push(objects[objectType].objectCallbacks[i](object));
      }
      $q.all(promises).then(function() {
        deferred.resolve();
      });
      return deferred.promise;
    };

    protectedMembers.init();

    return publicMembers;
  }
]);

angular.module('ngKeps')

.service('$nkDataService',['$nkSocketService', '$nkRestService', function($socket, $rest){
  if (!$socket.error) {
    return $socket;
  } else {
    return $rest;
  }
}]);

"use strict";

angular.module('ngKeps')

.service('$nkModalService', [

  '$window',
  '$document',

  function($window, $document) {
    var closecb = null;

    var overlay;
    var content_fixed;
    var popbox;
    var overlay_wrapper;


    function on(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function() {
                handler.call(el);
            });
        }
    }

/*
<overlay_wrapper>
    <overlay>
</
<content_fixed>
    <popbox>
</
*/

    function init() {
        overlay = $document[0].createElement('div');
        content_fixed = $document[0].createElement('div');
        popbox = $document[0].createElement('div');
        overlay_wrapper = $document[0].createElement('div');
        content_fixed.id = 'ngkeps_content_fixed';
        content_fixed.setAttribute('style', 'position:fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);opacity:1;z-index:2003;background-color:white; border-radius: 6px;padding: 20px 30px;');
        popbox.id = 'ngkeps_popbox';
        overlay_wrapper.id = "ngkeps_overlay_wrapper";
        overlay_wrapper.setAttribute('style', 'position:absolute;top:0;bottom:0;left:0;right:0;z-index:2002;');
        overlay.id = "ngkeps_overlay";
        overlay.setAttribute('style', 'position:fixed;top:0;bottom:0;left:0;right:0;opacity:0.3;width:100%;height:100%;background-color:black;z-index:2002;');
        overlay_wrapper.appendChild(overlay);
        content_fixed.appendChild(popbox);
        $document[0].body.appendChild(overlay_wrapper);
        $document[0].body.appendChild(content_fixed);
        overlay_wrapper.style.display = 'none';
        overlay.style.display = 'none';
        content_fixed.style.display = 'none';
        overlay_wrapper.addEventListener('click', hide);
        on($window, 'keypress', function(e) {
            //kill pop if button is ESC ;)
            if (e.keyCode == 27) {
                hide();
            }
        });
    }

    var show = function(config) {
        if (config) {
            var html = '<button type="button" class="close" onclick="window._ngkeps_model_hide(\'top_close\')" style="border: 1px solid #fff;border-radius: 15px;width: 32px;height: 32px;right: 0px;position: absolute;outline: none;color: #fff;transition: all 0.6s ease 0s;-webkit-transition: all 0.6s ease 0s;-moz-transition: all 0.6s ease 0s;-o-transition: all 0.6s ease 0s;-ms-transition: all 0.6s ease 0s;-webkit-backface-visibility: hidden;opacity: 0.6;filter: alpha(opacity=60);top: -40px;margin-top: -2px;"><span style="position: relative;top: -2px;">x</span></button>';

            if (typeof config.class == 'string' && config.class) {
                popbox.setAttribute('class', config.class);
            }
            if (config.keepLayout && (!config.class)) {
                popbox.setAttribute('style', 'position:relative;height:300px;width:300px;background-color:white;opacity:1;');
            }

            if (typeof config.content == 'string' && config.content && config.source == 'html') {
                html += config.content;
            }

            if (typeof config.content == 'string' && config.content && config.source == 'div') {
                html += $document[0].getElementById(config.content) ? $document[0].getElementById(config.content).innerHTML : config.content;
            }
            var buttons = '';
            if (config.buttons) {
                for (var i = 0; i < config.buttons.length; i++) {
                    if (typeof config.buttons[i] === 'object') {
                       buttons += '<button onclick="window._ngkeps_model_hide(\''+config.buttons[i].label+'\')" class="'+config.buttons[i].class+'" style="margin-left: 10px;">'+config.buttons[i].label+'</button>';
                    } else if (typeof config.buttons[i] === 'string') {
                       buttons += '<button onclick="window._ngkeps_model_hide(\''+config.buttons[i]+'\')" class="btn" style="margin-left: 10px;">'+config.buttons[i]+'</button>';
                    }
                }                
            }
            if (buttons !== '') {
                html += '<div style="text-align: right;padding-top: 10px;margin-top: 10px;">'+buttons+'</div>';
            }
            popbox.innerHTML = html;
            if (config.content && config.source === 'element') {
                popbox.appendChild(config.content);
            }
            if (config.content && config.source === 'angular-element') {
                angular.element(popbox).append(config.content);
            }

        }
        overlay_wrapper.style.display = '';
        overlay.style.display = '';
        content_fixed.style.display = '';
        closecb = config.close;
    };

    var hide = $window._ngkeps_model_hide = function(button) {
        overlay_wrapper.style.display = 'none';
        overlay.style.display = 'none';
        content_fixed.style.display = 'none';
        if (closecb) {
            closecb(button);
        }
    };

    //init on window loaded
    init();

    return {
        show:show,
        hide:hide
    };
}]);
angular.module('ngKeps').provider('$nkRestService', function () {
  var apiPrefix = '/api/v1/';

  this.setApiPrefix = function(value) {
    apiPrefix = value;
  };

  this.$get = ['$http', '$q', "$nkCacheService",  function($http, $q, $cacheService) {
    var publicMembers = {};
    var protectedMembers = {};
    //cache will store objects keyed by:
    //1. list of items keyed by name of db
    //2. single item keyed by objectId
    //3. list of items keyed by name of db concat with query
    var cache = {};

    publicMembers.apiPrefix = apiPrefix;
    
    var inCache = function(objectType, condition, type){
      //no query or id, return full list of objects or nothing
      if(!condition){
        if(cache[objectType]){
          return cache[objectType];
        }else{
          return false;
        }       
      }
      //data is keyed by objectID
      else if(type === 'id'){
        if(cache[condition]){
          return cache[condition];
        }else{
          return false;
        }
      //data is keyed by objectType + query
      }else if(type === 'query'){
        var key = objectType + JSON.stringify(condition);
        if(cache[key]){
          return cache[key];
        }else{
          return false;
        }
      }
    };

    /**
    * @method create - http Post to server
    */
    publicMembers.post = publicMembers.create = function(objectType, object) {
      var defer = $q.defer(); 
      $http.post(apiPrefix + objectType, object)
      .then(function(data) {
        defer.resolve(data.data);
      }, function(err) {
        defer.reject(err);
      });      
      return defer.promise;
    };

    /**
    * @method update
    */
    publicMembers.put = publicMembers.update = function(objectType, object) {
      var defer = $q.defer();
      $http.put(apiPrefix + objectType + '/' + object._id, object)
      .then(function(data){
        defer.resolve(data.data);    
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    /**
    * @method delete
    */
    publicMembers.delete = function(objectType, object) {
      var defer = $q.defer();
      var query;
      if(object && typeof object === 'object'){
        query = apiPrefix + objectType + "/" + object._id;
      }else if(typeof object === 'string'){
        query = apiPrefix + objectType + "/" + object;
      }else{
        query = apiPrefix + objectType;
      }
      $http.delete(query)
      .then(function(data){
        defer.resolve(data.data);      
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    /**
    * @method read - http get object by Id
    * 
    */
    //will get objectID item if provided or get all if no object ID
    publicMembers.get = publicMembers.read = function(objectType, objectId, useCache) {

      var defer = $q.defer();
      //get all items from model
      if (!objectId) {
        if(!useCache || !cacheData.hasOwnProperty(objectType)){
          $http.get(apiPrefix + objectType)
          .then(function(data){
            defer.resolve(data);
            cache[objectType] = data;
          }, function(err){
            defer.reject(err);
          });
        }else{
          defer.resolve(cacheData[objectType]);
        }
      //get specific id from model
      } else {
        var cacheData = false;
        //check if specific objectId exists in cache
        if(useCache === 'undefined' || useCache === true){
          cacheData = inCache(objectType, objectId, 'id');
        }
        if(cacheData){
          defer.resolve(cacheData);
        }else{
          $http.get(apiPrefix + objectType + '/' + objectId)
          .then(function(data){
            defer.resolve(data);
            cache[objectId] = data;       
          },function(err){
            defer.reject(err);
          });
        }        
      }
      return defer.promise;
    };

    /**
    * @method Query - http get single item from DB
    * @property query - hash where each item appended as key=value to url
    */
    publicMembers.query = function(objectType, query, useCache) {
      var defer = $q.defer();
      var cacheData = false;
      if(useCache === 'undefined' || useCache === true){
        cacheData = inCache(objectType, query, 'query');
      }
      if(cacheData){
        defer.resolve(cacheData);
      }else{
        var url = apiPrefix + objectType;
        if(query){
          url += '?query=' + JSON.stringify(query);
        }
        $http.get(url)
        .then(function(data){
          defer.resolve(data.data);
          if(query){
            var key = objectType + JSON.stringify(query);
            cache[key] = data;
          }else{
            cache[objectType] = data;
          }
        }, function(err){         
          defer.reject(err);
        });
      }
      return defer.promise; 
    };

    publicMembers.graphql = function(q) {
      var defer = $q.defer();
      //get all items from model
      $http.get(apiPrefix + 'graphqls?q=' + q)
      .then(function(data){
        defer.resolve(data);
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    /**
    * @method runCommand
    */
    publicMembers.call = function(cmd, data) {
      var defer = $q.defer();

      var method = cmd.substr(0, cmd.indexOf('.')).toLowerCase();
      cmd = cmd.substr(cmd.indexOf('.')+1);
      var objectType = cmd.substr(0, cmd.indexOf('.'));
      cmd  = cmd.substr(cmd.indexOf('.')+1);
  
      if (typeof data === 'undefined') {
        data = {};
      }

      var url = apiPrefix + objectType + 's/' + cmd;
      if (objectType in data) {
        var restId;
        if (typeof data[objectType] === 'object' && '_id' in data[objectType]) {
          restId = data[objectType]._id;
        } else {
          restId = data[objectType]; 
          delete data[objectType];
        }
        url = apiPrefix + objectType + 's/' + restId + '/' + cmd;
      }

      if (method === 'get' || method === 'delete') {
        var serialize = function(obj, prefix) {
          var str = [];
          for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
              var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
              str.push(typeof v == "object" ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
          }
          return str.join("&");
        };
        url += '?' + serialize(data);
        $http[method](url)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      } else if (method === 'post' || method === 'put') {
        $http[method](url, data)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      } else {
        $http.get(url)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      }
/*
      $http.post(apiPrefix + 'kepscall', {cmd:cmd, data:data})
        .then(function(data){
          defer.resolve(data.data);
        }, function(err){         
          defer.reject(err);
        });

*/
      return defer.promise; 
    };

    /**
     * @method sync
     */
    publicMembers.sync = function(type, id) {
      var defer = $q.defer();

      if (typeof type !== 'undefined') {
        var data = $cacheService.getSyncObject(type, id);
        $http.post('/' + type + '/sync', data).success(function(data){
          // add data to cache
          defer.resolve();
        }).error(function(){
          defer.reject();
          console.log('Get - Failed to retrieve data');
        });
      } else {
        var types = $cacheService.getTypes;
        var promises = [];
        for (var i = types.length - 1; i >= 0; i--) {
          promises.push(publicMembers.sync(types[i]));
        }
        $q.all(promises).then(function() {
          defer.resolve();
        });
      }

      return defer.promise;
    };

    publicMembers.loginWithProvider = function(provider, data) {
      var defer = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signin', data)
        .then(function(data) {
          defer.resolve(data.data);
        }, function(err) {
          defer.reject(err.data);
        });
      } else {
        location.href = '/auth/'+provider;
      }

      return defer.promise;
    };

    publicMembers.signupWithProvider = function(provider, data) {
      var defer = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signup', data)
        .then(function(data) {
          defer.resolve(data.data);
        }, function(err) {
          defer.reject(err.data);
        });
      } else {
        location.href = '/auth/'+provider;
      }

      return defer.promise;
    };

    /**
     * @method loadPostProcessObject
     */
    publicMembers.loadPostProcessObject = $cacheService.loadPostProcessObject;

    return publicMembers;
  }];
  
});
angular.module('ngKeps')

.service('$nkSchemaService',['$nkDataService', function($data){
}]);

angular.module('ngKeps')

.service('$nkSocketService', [

  '$window',
  '$timeout',
  '$q',
  '$nkCacheService',

  function($window, $timeout, $q, $cacheService) {
    if (!$window.io) {
      return {'error':'socket.io not available'};
    }

    var publicMembers = {};
    var protectedMembers = {};

    var socket;
    var backendVersion = 0;
    var supportedBackendVersions = 1;
    
    var socketCommands = [];
    var requests = {};
    var webalias = '';

    var requestId = 0;
    var reconnection_delay = 2000;
    var reconnectInterval;
    var reconnectingEnabled = true;
    var appScope;
    var initalConnectionTimeout;

    var loadUserDeferred = null;
    var socketConnectedDeferred = null;
    var loginDeferred = null;
    var pendingRequests = {};
    var offlineRequests = [];

    var lastRequestSent;
    var lastRequestReceived;
    var numberOfOutstandingRequests = 0;
    var numberOfRequests = 0;
    var cacheHit = 0;
    var storageCacheHit = 0;
    var duplicateRequest = 0;
    var requestsReceived = [];
    $window.socket = socket;

    var nestedLoadingRequests = [];
    var loadingObjects = false;

    var serviceStartedDeferred = $q.defer();
    var logoutCallback = function() {};
    var resync = false;


    // add object before run callbacks
    // Strip out none schema fields before caching objects
    // add mutable, pendable, offlineable to schemas
    // in schema's override _id, _created, _updated

    /**
     * @method getStatus
     */
    publicMembers.getStatus = function() {
      var output = {};
      output.lastRequestSent = lastRequestSent;
      output.lastRequestReceived = lastRequestReceived;
      output.numberOfOutstandingRequests = numberOfOutstandingRequests;
      output.numberOfRequests = numberOfRequests;
      output.cacheHit = cacheHit;
      output.requestsReceived = requestsReceived;
      output.duplicateRequest = duplicateRequest;
      return output;
    };

    /**
     * @method clearCache
     */
    publicMembers.clearCache = function(everything) {
      var loc;
      if (everything) {
        $cacheService.clearCache();
      } else {
        $cacheService.clearCache();
      }
    };

    /**
     * @method connect
     */
    publicMembers.start = function(scope, weba, version) {
      socketConnectedDeferred = $q.defer();

      appScope = scope;
      webalias = weba;
      appScope.connected = false;
      appScope.reconnect = false;
      appScope.cacheLoaded = false;
      supportedBackendVersions = version;
      
      serviceStartedDeferred.resolve();

      protectedMembers.setupSocket();

      return socketConnectedDeferred.promise;
    };

    /**
     * @method loginWithProvider
     */
    publicMembers.loginWithProvider = function(provider, data) {
      if (loginDeferred === null) {
        loginDeferred = $q.defer();
      }
      socketConnectedDeferred.promise.then(function() {
        socket.emit('login', {provider:provider, data:data, device:appScope.device});
      });
      return loginDeferred.promise;
    };

    /**
     * @method logout
     */
    publicMembers.logout = function() {
      socketConnectedDeferred.promise.then(function() {
        socket.emit('logout.me', {device:appScope.device});
      });
    };


    /**
     * @method add
     */
    publicMembers.add = function(objectType, object) {
      var cmd = 'post.'+objectType+'.create';
      var deferred = $q.defer();

      if (!('_id' in object)) {
        object._id = uuid.v4().replace(/-/g, '').substring(0, 24);
      }
      object._pending = true;
      protectedMembers.addObject(objectType, object, false, true);

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, {objectType:objectType, object:object, reqKey: reqKey});
          } else {
            deferred.reject('No create command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'post',
            payload: {
              objectType:objectType,
              object:object
            },
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method update
     */
    publicMembers.update = function(objectType, object) {
      var cmd = 'put.'+objectType+'.update';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            var obj = {
              objectType:objectType,
              object:object,
              reqKey: reqKey
            };
            obj[objectType] = object._id;
            socket.emit(cmd, obj);
          } else {
            deferred.reject('No update command on server');
          }
        } else {
          var payload = {
            objectType:objectType,
            object:object
          };
          payload[objectType] = object._id;
          offlineRequests.push({
            method:cmd,
            restMethod:'put',
            payload: payload,
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method delete
     */
    publicMembers.delete = function(objectType, object) {
      var cmd = 'delete.'+objectType+'.delete';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit('delete.object', {objectType:objectType, object:object, reqKey: reqKey});
          } else {
            deferred.reject('No delete command on server');
          }
        } else {
          console.log('TODO can not delete objects while offline');
          deferred.reject('TODO can not delete objects while offline');
        }
      });
      return deferred.promise;
    };

    /**
     * @method get
     */
    publicMembers.get = function(objectType, objectId) {
      var cmd = 'get.'+objectType+'.read';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (objectType in objects) {
          if (objectId in objects[objectType].objects) {
            cacheHit++;
            deferred.resolve(objects[objectType].objects[objectId]);
          } else if ('objects-'+objectType+'-'+objectId in localStorage && !appScope.connected) {
            storageCacheHit++;
            deferred.resolve(JSON.parse(localStorage['objects-'+objectType+'-'+objectId]));
            console.log('Warning: Object requested before cache loaded', objectType+'-'+objectId);
            /*
            // not necessary yet
            offlineRequests.push({
              method:'track',
              restMethod:'get',
              methodLong:'track.object',
              objectType:objectType,
              objectId:objectId,
              deferred: null
            });
            */
          } else if (pendingRequests[cmd+'-'+objectType+'-'+objectId]){
            duplicateRequest++;
            return pendingRequests[cmd+'-'+objectType+'-'+objectId];
          } else if (loadingObjects) {
            nestedLoadingRequests.push({
              objectType:objectType,
              objectId:objectId,
              deferred:deferred
            });
          } else {  
            pendingRequests[cmd+'-'+objectType+'-'+objectId] = deferred.promise;
            var payload = {
              objectType:objectType
            };
            payload[objectType] = objectId;

            if (appScope.connected) {
              if (socketCommands.indexOf(cmd)) {
                payload.reqKey = protectedMembers.getReqKey(cmd, deferred);
                socket.emit(cmd, payload);
              } else {
                deferred.reject('No read command on server');
              }
            } else {
              offlineRequests.push({
                method:cmd,
                restMethod:'get',
                payload: payload,
                deferred: deferred
              });
            }
          }
        } else {
          deferred.reject('Not registered for object type '+objectType);
        }
      });
      return deferred.promise;
    };

    /**
     * @method getIds
     */
    publicMembers.getArray = function(objectType, objectIds) {
      // TODO look up each in cache and then only request the ones needed
      var cmd = 'get.'+objectType+'.read';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        var payload = {
          objectType:objectType
        };
        payload[objectType] = objectIds;

        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            payload.reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, payload);
          } else {
            deferred.reject('No read command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'read',
            payload: payload,
            deferred: deferred
          });
        }
      });

      return requests[reqKey].promise;
    };

    /**
     * @method getQuery
     */
    publicMembers.getQuery = function(objectType, query) {
      var cmd = 'get.'+objectType+'.query';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, {objectType:objectType, query:query, reqKey: reqKey});
          } else {
            deferred.reject('No query command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'get',
            payload: {
              objectType:objectType,
              query:query
            },
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method localQuery
     */
    publicMembers.localQuery = function(objectType, query) {
      var deferred = $q.defer();
      serviceStartedDeferred.promise.then(function() {
        var output = [];
        for (var i in objects[objectType].objects) {
          /*
          var add = false;
          if (query) {
            var path;
            var count = 0;
            for (path in query) {
              count++;
              var values = findValues(obj, path);
              var i;
              var reject = false;
              for (i = 0; i < values.length; i++) {
                if (values[i] === query[path]) {
                  add++;
                  break;
                }
              }
            }
            if (add === count) {
              add = true;
            } else {
              add = false;
            }
          } else {
            add = true;
          }
          if (add) {
            */
            output.push(objects[objectType].objects[i]);
          //}
        }
        deferred.resolve(output);
      });
      return deferred.promise;
    };

    /**
     * @method runCommand
     */
    publicMembers.runCommand = function(cmd, data) {
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            data.reqKey = protectedMembers.getReqKey('callback', deferred);
            console.log('*** emit', cmd, data);
            socket.emit(cmd, data);
          } else {
            deferred.reject('No command "' + cmd + '"on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'callback',
            payload: data,
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };  

    /**
     * @method loadPostProcessObject
     */
    publicMembers.loadPostProcessObject = $cacheService.loadPostProcessObject;

    /**
     * @method sync
     */
    publicMembers.sync = function(user) {
      var payload = {};
      payload.objects = $cacheService.getSyncObject();
      if (user) {
        payload.user = user;
      }
      socket.emit('sync', payload);
    };

    protectedMembers.findValues = function(obj, key, path, memo) {
      _.isArray(memo) || (memo = []);
      _.isString(path) || (path = '');
      _.forOwn(obj, function(val, i) {
        if (path+i === key) {
          memo.push(val);
        } else {
          findValues(val, key, (_.isArray(obj) ? path : path+i+'.'), memo);
        }
      });
      return memo;
    };

    protectedMembers.initalConnect = function() {
      console.log('trying to connect');
      if (socket) {
        socket.io.connect();
      } else {      
        $window.socket = socket = io.connect('http://'+webalias+'/',{
          'sync disconnect on unload': false,
          'reconnect': false,
          'transports': ['websocket', 'polling']
        });
      }
      initalConnectionTimeout = $timeout(function() {
        if (!appScope.connected) {
          reconnectingEnabled = false;
          if(reconnectInterval) {
            clearInterval(reconnectInterval);
          }
          // if (offlinemode) {
            protectedMembers.initalConnect();
          //} else {
          //  socketConnectedDeferred.reject();            
          //}
        }
      }, 15000);
    };

    protectedMembers.addObjects = function(objects, serverdt) {
      var deferred = $q.defer();
      var promises = [];
      var i, j;
      nestedLoadingRequests = [];
      loadingObjects = true;

      for (i in objects) {
        for (j = 0; j < objects[i].length; j++) {
          promises.push(protectedMembers.addObject(i, objects[i][j], serverdt, false));
        }
      }

      if (nestedLoadingRequests.length > 0) {
        protectedMembers.runNestedLoadingRequests();
      }

      $q.all(promises).then(function() {
        loadingObjects = false;
        deferred.resolve();
      });
      return deferred.promise;
    };

    protectedMembers.runNestedLoadingRequests = function() {
      for (var i = 0; i < nestedLoadingRequests.length; i++) {
        var req = nestedLoadingRequests[i];
        if (req.objectId in objects[req.objectType].objects) {
          req.deferred.resolve(objects[req.objectType].objects[req.objectId]);
        } else {
          publicMembers.get(req.objectType, req.objectId).then(function(obj) {
            req.deferred.resolve(obj)
          });
        }
      }
    };

    protectedMembers.getReqKey = function(msg, deferred) {
      var key = msg+'-'+socket.io.engine.id+'-'+requestId;
      requests[key] = deferred;
      lastRequestSent = key;
      requestId++;
      numberOfRequests++;
      numberOfOutstandingRequests++;
      return key;
    };

    protectedMembers.processReqKey = function(reqKey, payload, objectType) {
      if (reqKey in requests) {
        lastRequestReceived = reqKey;
        requests[reqKey].resolve(payload);
        numberOfOutstandingRequests--;
        delete requests[reqKey];
        if (objectType === 'objects') {
          requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' objects');
        } else if (objectType === 'callback') {
          requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' callback');
        } else if (typeof payload === 'object') {
          if (Object.prototype.toString.call(payload) === '[object Array]') {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' array');
          } else if ('_id' in payload) {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' '+payload._id);
          } else {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' unknown');
          }
        } else {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' unknown');
        }
      }
    };

    protectedMembers.rejectReqKey = function(reqKey, reason) {
      if (reqKey in requests) {
        lastRequestReceived = reqKey;
        requests[reqKey].reject(payload);
        numberOfOutstandingRequests--;
        delete requests[reqKey];
      }
    };

    protectedMembers.flushOfflineRequests = function() {
      if (offlineRequests.length > 0) {
        var i;
        for (i = 0; i < offlineRequests.length; i++) {
          var o = offlineRequests[i];
          if (o.objectType in objects && o.objectId in objects[o.objectType].objects && o.restMethod === 'get') {
            if (o.deferred !== null) {
              o.deferred.resolve(objects[o.objectType].objects[o.objectId]);                
            }
          } else {
            if (socketCommands.indexOf(o.method)) {  
              var reqKey = protectedMembers.getReqKey(o.method, o.deferred);
              o.payload.reqKey = reqKey;
              socket.emit(o.method, o.payload);
            } else {
              o.deferred.reject('Command not on server');
            }
          }
        }
      }
      offlineRequests = [];
    };

    protectedMembers.setupSocket = function() {
      protectedMembers.initalConnect();
      socket.on('error', function (data) {
        console.error('Socket Error', JSON.stringify(data));
      });
      socket.on('disconnect', function (data) {
        appScope.connected = false;
        resync = true;
        if (reconnectingEnabled) {
          reconnectInterval = setInterval(function() {
            socket.io.connect();
          }, reconnection_delay);
        }
      });
      socket.on('reconnect', function (data) {
      });
      socket.on('reconnecting', function (data) {
        if (reconnectingEnabled) {
          appScope.reconnect = true;
        }
      });
      socket.on('connect', function (data) {
        console.log('connected');
        if(reconnectInterval) {
          clearInterval(reconnectInterval);
        }
        $timeout.cancel(initalConnectionTimeout);

        socket.emit('client.register', {'device':appScope.device});

        appScope.$safeApply(function() {
          appScope.connected = true;
          if (resync && appScope.user) {
            publicMembers.loadUser();
          }
          appScope.reconnect = false;
        });
      });
      socket.on('client.objects', function (data) {
        backendVersion = data.backendVersion;
        if (backendVersion > supportedBackendVersions) {
          socketConnectedDeferred.reject('backendVersion');
        } else {
          for (var i in data.objects) {
            $cacheService.addType(i, data.objects[i].schema);
          }
          $cacheService.storage.set('commands', data.commands);
          socketCommands = data.commands;
          socketConnectedDeferred.resolve();
          publicMembers.sync();
        }
      });
      socket.on('err', function (data) {
        if (data.func.indexOf('get.me') !== -1) {
          loadUserDeferred.reject();
          if (resync) {
            resync = false;
            logoutCallback();
          }
        }
        if (data.reqKey) {
          protectedMembers.rejectReqKey(data.reqKey, data.message);
        }
        console.error('Socket Server Error', JSON.stringify(data));
      });

      socket.on('get.me', function (data) {
        resync = false;
        appScope.user = data.user;
        objects.user.objects[data.user._id] = data.user;
        protectedMembers.addObject('user', data.user, data.dt, false);

        if (data.objects) {
          protectedMembers.addObjects(data.objects, data.dt).then(function() {
            protectedMembers.flushOfflineRequests();
            loadUserDeferred.resolve();
          });  
        } else {
          protectedMembers.flushOfflineRequests();
          loadUserDeferred.resolve();
        }
      });

      socket.on('login.successful', function (data) {
        loginDeferred.resolve(data);
        publicMembers.sync();
      });
      socket.on('login.unsuccessful', function (data) {
        loginDeferred.resolve(false);
      });

      socket.on('remove', function (data) {
        if (data.objectType in objects) {
          protectedMembers.removeObject(data.objectType, data.object, data.dt);
          if (data.reqKey) {
            protectedMembers.processReqKey(data.reqKey, objects[data.objectType].objects[data.object._id], data.objectType);
          }
        }
      });

      socket.on('update', function (data) {
        if (data.objectType in objects) {
          if ('object' in data) {
            if (Object.prototype.toString.call(data.object) === '[object Array]') {
              var output = protectedMembers.addArray(data.objectType, data.object);
              if (data.reqKey) {
                protectedMembers.processReqKey(data.reqKey, output, data.objectType);
              }
            } else {
              protectedMembers.addObject(data.objectType, data.object, data.dt, false);
              if (data.reqKey) {
                protectedMembers.processReqKey(data.reqKey, objects[data.objectType].objects[data.object._id], data.objectType);
                var cmd = data.reqKey.substring(0, data.reqKey.indexOf('-'));
                if (cmd+'-'+data.objectType+'-'+data.objectId in pendingRequests) {
                  delete pendingRequests[cmd+'-'+data.objectType+'-'+data.objectId];              
                }
              }
            }
          }
        }
        if ('objects' in data) {
          protectedMembers.addObjects(data.objects, data.dt).then(function() {
            if (data.reqKey) {
              protectedMembers.processReqKey(data.reqKey, output, 'objects');
            }
          });
        }
      });

      socket.on('callback', function (data) {
        if (data.reqKey) {
          protectedMembers.processReqKey(data.reqKey, data.payload, 'callback');
        }
      });

    };

    return publicMembers;

  }
 ]);



/*
Socket security code, too be implemented later, please remove winston and underscore if you can
+ remove timeout so users can get through login screen

var _ = require('underscore');
var winston = require('winston');

function forbidConnections(nsp) {
  //Set a listener so connections from unauthenticated sockets are not
  //considered when emitting to the namespace. The connections will be
  //restored after authentication succeeds.

  nsp.on('connection', function(socket){
    if (!socket.auth) {
      winston.debug("removing socket from", nsp.name);
      delete nsp.connected[socket.id];
    }
  });
}

function restoreConnection(nsp, socket) {
  // If the socket attempted a connection before authentication, restore it.
  if(_.findWhere(nsp.sockets, {id: socket.id})) {
    winston.debug("restoring socket to", nsp.name);
    nsp.connected[socket.id] = socket;
  }
}

module.exports = function(io, config){
  //Adds connection listeners to the given socket.io server, so clients
  //are forced to authenticate before they can receive events.

  var config = config || {};
  var timeout = config.timeout || 1000;
  var postAuthenticate = config.postAuthenticate || function(){};

  _.each(io.nsps, forbidConnections);
  io.on('connection', function(socket){
    
    socket.auth = false;
    socket.on('authentication', function(data){
      
      config.authenticate(data, function(err, success){
        if (success) {
          winston.debug("Authenticated socket ", socket.id);
          socket.auth = true;
          _.each(io.nsps, function(nsp) {
            restoreConnection(nsp, socket);
          });
          socket.emit('authenticated');
          return postAuthenticate(socket, data);
        }
        socket.disconnect('unauthorized', {err: err});
      });

    });

    setTimeout(function(){
      //If the socket didn't authenticate after connection, disconnect it
      if (!socket.auth) {
        winston.debug("Disconnecting socket ", socket.id);
        socket.disconnect('unauthorized');
      }
    }, timeout);

  });
}
*/
/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('fileInputService',['validatorService',
  function(validatorService){
    return function(scope) {
      scope.fileChanged = function(evt){
        scope.uploadStatus = 'Checking...';
        var valid = validatorService.fileValidation(scope, evt.target.files[0]);
        if(valid){
          scope.uploadStatus = 'Uploading...';
          var formdata = new FormData();
          formdata.append('file', evt.target.files[0]);
          var request = new XMLHttpRequest();
          request.onreadystatechange = function(){
            if(request.readyState === 4){
              scope.kepsModel= JSON.parse(request.responseText);
              scope.uploadStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
              scope.$apply();
            }
          };
          request.open('POST', '/admin/upload/file', true);
          request.send(formdata);
        }
      };
      if(scope.kepsType.fileTypes && Array.isArray(scope.kepsType.fileTypes)){
        scope.kepsAcceptFileTypes = scope.kepsType.fileTypes[0];
        for(var i = 1; i < scope.kepsType.fileTypes.length;i++){
          scope.kepsAcceptFileTypes += "," + scope.kepsType.fileTypes[i];
        }
      }
    };
  }]);

/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('geopointInputService',[
  function(){
    return function(scope) {
      if(scope.kepsModel){
        scope.data.value = scope.kepsModel;
        scope.data.lat = scope.kepsModel[0];
        scope.data.lng = scope.kepsModel[1];
      }
      var firstMapRun = true;
      var map;
      var marker;

      scope.testLatLng = function(){
        if(scope.data.lat <= 85 && scope.data.lat >= -85  &&
           scope.data.lng <= 180 && scope.data.lng >= -180){

          if(scope.data.lat && scope.data.lng && firstMapRun){
            var initMap = function(){
              var latLng = new google.maps.LatLng(scope.data.lat, scope.data.lng);
              map = new google.maps.Map(document.getElementById('map'),
                {
                  center:latLng,
                  zoom:6
                }
              );
              marker = new google.maps.Marker(
                {
                  position: latLng,
                  map: map,
                }
              );
              firstMapRun = false;
            };
            if(typeof(google) === 'undefined'){
              var s = document.createElement('script');
              s.src = window.location.protocol + "//maps.googleapis.com/maps/api/js?callback=initMap";
              document.body.appendChild(s);
            }else{
              initMap();
            }

          }else{
            if(scope.data.lat && scope.data.lng){
              var latLng = new google.maps.LatLng(scope.data.lat, scope.data.lng);
              marker.setMap(null);
              marker = new google.maps.Marker({
                position:latLng,
                map:map
              });
              map.setCenter(marker.getPosition());
              scope.data.value = [scope.data.lat, scope.data.lng];
            }
          }
        }
      };
    };
  }]);

/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('imageInputService',['validatorService',
  function(validatorService){
    return function(scope) {
      scope.kepsType.randomCanvasId = Math.ceil(Math.random() * 9999);
      if(typeof scope.kepsModel === 'object'){
        if(scope.kepsModel.absoluteFilePath !== 'undefined'){
          // TODO add filename to file input
          var img = new Image();
          img.src = scope.kepsModel.filePath;
          img.onload = function(){
            scope.drawToCanvas(img);
          };
        }
      }

      scope.imageFileChanged = function(evt){
        if(validatorService.fileValidation(scope, evt.target.files[0])){
          var formdata = new FormData();
          scope.kepsType.imageError = false;
          var filetype;
          var ctx;  

          if(evt.target.files[0].name.includes('.jpg')){
            filetype ="image/jpg";
          }else if(evt.target.files[0].name.includes('.png')){
            filetype = "image/png";
          }else{
            window.alert('image filetype not recognized');
          }

          if(scope.kepsType.size && scope.kepsType.size < evt.target.files[0].size){
            scope.$apply(function(){
              scope.kepsType.imageUploading = false;
              scope.kepsType.imageError = "File size exceeds maximum allowed: " + scope.kepsType.size +"B";
            });
            return;
          }
            
          //draw image preview
          var img = new Image();
          img.src = URL.createObjectURL(evt.target.files[0]);

          img.onload = function() {
            scope.drawToCanvas(img);
            scope.imageStatus = 'Uploading...';
            formdata.append('file', evt.target.files[0]);
            formdata.append('data', evt.target.files[0]);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function(){
              if(request.readyState === 4){
                if(request.status !== 200 && request.status !== 304){
                  if(request.status === 413){
                    scope.$apply(function(){
                     scope.kepsType.imageError = "Error uploading image: Image rejected due too image size:   " + request.responseText; 
                    });
                  }else{
                    scope.$apply(function(){
                      scope.kepsType.imageError = "Error uploading image: " + request.status + ": " + request.responseText;
                    });
                  }
                }else{
                  scope.$apply(function() {
                    scope.kepsType.imageUploading = false;
                    scope.kepsModel = JSON.parse(request.responseText);
                    scope.imageStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
                  });
                }
              }
            };
            request.open('POST', '/admin/upload/image', true);
            request.send(formdata);
          };
        }
      };
      scope.getImageUrl = function(){
        if(scope.kepsType.imageUrl && scope.kepsType.imageUrl.match(/(\S+\.[^/\s]+(\/\S+|\/|))/g)){
          
          var canvas = document.getElementById(scope.kepsType.randomCanvasId);
          var filetype;
          var ctx;  
          var img = new Image();
          img.src = scope.kepsType.imageUrl;
          img.onload = function(){
            scope.imageStatus = 'Uploading...';
            //send url to backend, get image data
            var formdata = new FormData();
            formdata.append('url', scope.kepsType.imageUrl);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function(){
              if(request.readyState === 4){
                scope.$apply(function() {
                  scope.kepsModel = JSON.parse(request.responseText);
                  scope.imageStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
                });
              }
            };
            request.open('POST', '/admin/upload/image', true);
            request.send(formdata);
        
            scope.drawToCanvas(img);
          };
        }
      };
      scope.drawToCanvas = function(img, canvasId){
        var width = document.createAttribute('width');
        var height = document.createAttribute('height'); 
        var canvas = document.getElementById(scope.kepsType.randomCanvasId);
        var ctx;
        //scale images reasonably
          if(img.width > img.height){ 
            width.value =  (img.width > 300)  ? 300 : img.width;
            height.value = (img.width > 300)  ? img.height/img.width * 300 : img.height;
          }else if(img.height > img.width){
            height.value = (img.height > 300) ? 300 : img.height;
            width.value =  (img.height > 300) ? img.width/img.height * 300 : img.width;
        }

        canvas.setAttributeNode(width);
        canvas.setAttributeNode(height);
        ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,width.value,height.value);
        ctx.fillStyle = "black";
        ctx.font = "bold 16px serif";
        ctx.fillText(img.height + ' X ' + img.width, width.value*0.05, height.value - 5);
      };

      scope.removeImage = function(){
        var canvas = document.getElementById(scope.kepsType.randomCanvasId);
        var ctx = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;

        var img = ctx.createImageData(width, height);
        for (var i = img.data.length; --i >= 0; ){          
          img.data[i] = 0;
        }
        ctx.putImageData(img,0,0);
        delete scope.kepsModel;
      }

    };
  }]);
'use strict';


angular.module('ngKeps')
.service('validatorService',[
  function(){
    var stringValidation = function(scope){
      scope.errorMsg = false;
      
      if(scope.kepsType.match){
        var regex;
        if(typeof scope.kepsType.match === 'string'){
          regex = new RegExp(scope.kepsType.match);
        }else{
          return;
        }
        console.log(regex.test(scope.data.value));
        if(!regex.test(scope.data.value)){
          if(scope.kepsErrors){scope.kepsErrors.pattern = 'Input does not match pattern';}
          return scope.errorMsg = 'Input does not match pattern';
        }
      }

      if(scope.kepsType.maxlength){
        if(scope.data.value.length > scope.kepsType.maxlength){
          if(scope.kepsErrors){scope.kepsErrors.maxlength = 'Input must be shorter than ' + scope.kepsType.maxlength;}; 
          return scope.errorMsg = 'Input must be shorter than ' + scope.kepsType.maxlength; 
        }
      }

      if(scope.kepsType.minlength){
        if(scope.data.value.length < scope.kepsType.minlength){
           if(scope.kepsErrors){scope.kepsErrors.minlength = 'Input must be longer than ' + scope.kepsType.minlength;}
          return scope.errorMsg = 'Input must be longer than ' + scope.kepsType.minlength;
        }
      }
    };

    var numberValidation = function(scope){
      scope.errorMsg = false;
      if(scope.data.value === undefined){
        scope.errorMsg = "Invalid value";
        if(typeof scope.kepsType.max === 'number') scope.errorMsg += ", value must be less than or equal to " + scope.kepsType.max;
        if(typeof scope.kepsType.min === 'number') scope.errorMsg += ", value must be greater than or equal to " + scope.kepsType.min;
        return scope.errorMsg;
      }else{
        if(typeof scope.kepsType.max === 'number'){
          if(scope.data.value > scope.kepsType.max){
            if(scope.kepsErrors){scope.kepsErrors.max = 'Number must be smaller than '  + scope.kepsType.max;}
            return scope.errorMsg = 'Number must be smaller than '  + scope.kepsType.max;
          }
        }
        if(typeof scope.kepsType.min === 'number'){
          if(scope.data.value < scope.kepsType.min){
            if(scope.kepsErrors){scope.kepsErrors.min = 'Number must be bigger than ' + scope.kepsType.min};
            return scope.errorMsg = 'Number must be bigger than ' + scope.kepsType.min;
          }
        }
      }


    };

    var fileValidation = function(scope, file){
      if(scope.kepsType.hasOwnProperty('filetype')){
        if(file.type !== scope.kepsType.filetype){
          if(scope.kepsErrors){scope.kepsErrors.filetype = ' Incorrect filetype:' + file.type + ' , must be of type ' + scope.kepsType.filetype ;}
          scope.errorMsg = ' Incorrect filetype:' + file.type + ' , must be of type ' + scope.kepsType.filetype ;
          scope.$apply();
          return false;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxsize')){
        if(file.size > scope.kepsType.maxsize){
          if(scope.kepsErrors){scope.kepsErrors.maxsize = 'File size too large, max size ' + scope.kepsType.maxsize;}
          scope.errorMsg = 'File size too large, max size ' + scope.kepsType.maxsize;
          scope.$apply();
          return false;
        }
      }
      return true;
    };

    var geopointValidation = function(scope){
      scope.errorMsg = false
      if(scope.kepsType.hasOwnProperty('minlat')){
        if(scope.data.value.lat < scope.kepsType.minlat){
          if(scope.kepsErrors){scope.kepsErrors.minlat = 'Latitude must be greater than ', scope.kepsType.minlat;}
          return scope.errorMsg = 'Latitude must be greater than ' + scope.kepsType.minlat;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxlat')){
        if(scope.data.value.lat > scope.kepsType.maxlat){
          if(scope.kepsErrors){scope.kepsErrors.maxlat = 'Latitude must be less than ', scope.kepsType.maxlat;}
          return scope.errorMsg = 'Latitude must be less than ' + scope.kepsType.maxlat;
        }
      }
      if(scope.kepsType.hasOwnProperty('minlng')){
        if(scope.data.value.lng < scope.kepsType.minlng){
          if(scope.kepsErrors){scope.kepsErrors.minlng = 'Longitude must be greater than ', scope.kepsType.minlng;}
          return scope.errorMsg = 'Longitude must be greater than ' + scope.kepsType.minlng;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxlng')){
        if(scope.data.value.lng > scope.kepsType.maxlng){
          if(scope.kepsErrors){scope.kepsErrors.maxlng = 'Latitude must be less than ', scope.kepsType.maxlng;}
          return scope.errorMsg = 'Longitude must be less than ' + scope.kepsType.maxlng;
        }
      }
    };

    var emailValidation = function(scope){
      scope.errorMsg = '';
      var reg = /@/
      if(reg.test(scope.data.value)){

      }else{
        if(scope.kepsErrors){scope.kepsErrors.emailInvalid = 'Invalid email format';}
        return scope.errorMsg = 'Invalid email format';
      }
    };

    var multiValidation = function(scope){
      scope.errorMsg = '';

      if(scope.kepsType.maxpicked || scope.kepsType.minpicked){
        var test = scope.data.value.length > 0 ? scope.data.value.split(',').length : 0;
        if(test > scope.kepsType.maxpicked){
          if(scope.kepsErrors){
            scope.kepsErrors.maxpicked= 'Too many selected maximum selections allowed ' + scope.kepsType.maxpicked;
          }
          return scope.errorMsg = 'Too many selected maximum selections allowed ' + scope.kepsType.maxpicked;
        }
        if(test < scope.kepsType.minpicked){
          if(scope.kepsErrors){
            scope.kepsErrors.maxpicked= 'Too few selected minimum selections allowed ' + scope.kepsType.minpicked;
          }
          return scope.errorMsg = 'Too few selected minimum selections allowed ' + scope.kepsType.minpicked;

        }
      }
    };

    return {
      stringValidation:stringValidation,
      numberValidation:numberValidation,
      fileValidation:fileValidation,
      geopointValidation:geopointValidation,
      emailValidation:emailValidation,
      multiValidation:multiValidation
    };
  }]);
/*
	Inserts non-essential dependencies into the dom after page is fully loaded
*/
//ADD DEPENDENCYS HERE IF MORE ARE NEEDED
var kepsAsyncDependencies = [];
	             //'/lib/intl-tel-input/lib/libphonenumber/build/utils.js',
	            //'/lib/intl-tel-input/build/js/intlTelInput.min.js'];

//resolve location of ngkeps, so src attribute points to correct path
var findScripts = document.scripts;
var ngKepsLocation;
for(var i = 0; i < findScripts.length; i++){
	if(findScripts[i].src.indexOf("ngkeps") > -1){
		ngKepsLocation = findScripts[i].src.slice(0, findScripts[i].src.indexOf("ngkeps") + 6);
	}
}

var addKepsDependency = function(src){
	var s = document.createElement('script');
	s.setAttribute("src", src);
	document.body.appendChild(s);
}
document.addEventListener("DOMContentLoaded", function(event){
	for(var i = 0; i < kepsAsyncDependencies.length; i++){
		addKepsDependency(ngKepsLocation+kepsAsyncDependencies[i]);
	}
});

