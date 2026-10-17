function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,_=m.trustedTypes,f=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!c(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??b)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+T,P=`<${C}>`,k=document,O=()=>k.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,R="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,H=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=q(1),F=q(2),V=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,J=k.createTreeWalker(k,129);function K(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=I;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===I?"!--"===c[1]?n=L:void 0!==c[1]?n=z:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=o??I,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?H:'"'===c[3]?j:D):n===j||n===D?n=H:n===L||n===z?n=I:(n=H,o=void 0);const d=n===H&&t[e+1].startsWith("/>")?" ":"";r+=n===I?i+P:l>=0?(s.push(a),i.slice(0,l)+M+i.slice(l)+T+d):i+T+(-2===l?e:d)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=X(t,e);if(this.el=Z.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(M)){const e=l[r++],i=s.getAttribute(t).split(T),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?ot:"@"===n[1]?rt:it}),s.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(T),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),J.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(T,t+1));)a.push({type:7,index:o}),t+=T.length-1}o++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===V)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);J.currentNode=s;let o=J.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=J.nextNode(),r++)}return J.currentNode=k,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Q(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Q(this,s[i+n],e,n),a===V&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===G?t=G:t!==G&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class rt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===V)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Z,et),(x.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},ut=(t=pt,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return mt({...t,state:!0,attribute:!1})}var ft,gt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ft||(ft={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gt||(gt={}));var vt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o};const $t="off",bt="frio",yt="calor",wt="auto",xt="aerothermal-temperature-control",At=[{name:"name",selector:{text:{}}},{name:"mode_select",required:!0,selector:{entity:{domain:"input_select"}}},{name:"thermostat_heat",required:!0,selector:{entity:{domain:"climate"}}},{name:"thermostat_cool",required:!0,selector:{entity:{domain:"climate"}}},{name:"water_climate",required:!0,selector:{entity:{domain:"climate"}}},{name:"current_sensor",selector:{entity:{domain:"sensor"}}},{name:"pump_switch",selector:{entity:{domain:"switch"}}},{name:"inertia_sensor",selector:{entity:{domain:"sensor"}}},{name:"lock_entity",selector:{entity:{domain:"input_boolean"}}},{name:"auto_mode_automations",selector:{entity:{domain:"automation",multiple:!0}}}],Et={name:"Nombre",mode_select:"input_select de modo (off/calor/frio)",thermostat_heat:"Termostato CALOR (generic_thermostat)",thermostat_cool:"Termostato FRIO (generic_thermostat)",water_climate:"Climate del motor LG",current_sensor:"Sensor temperatura zona (real, opcional)",pump_switch:"Rele de la bomba (opcional)",inertia_sensor:"Sensor de inercia (opcional)",lock_entity:"Bloqueo de los modos automaticos (input_boolean, opcional)",auto_mode_automations:"Automatizaciones de los modos automaticos (calor y frio, opcional)"};let St=class extends lt{constructor(){super(...arguments),this._computeLabel=t=>Et[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${At}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p class="hint">
        Los <b>presets</b> y <b>show_modes</b> se configuran en YAML (ver README).
      </p>
    `:G}_valueChanged(t){const e=t.detail.value;vt(this,"config-changed",{config:e})}};St.styles=n`
    .hint {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-top: 8px;
    }
  `,t([mt({attribute:!1})],St.prototype,"hass",void 0),t([_t()],St.prototype,"_config",void 0),St=t([dt("aerothermal-temperature-control-editor")],St),console.info("%c AEROTHERMAL-TEMPERATURE-CONTROL %c v1.9.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: #1c1c1c; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:xt,name:"Aerothermal Temperature Control",description:"Termostato de suelo radiante + control del motor de aerotermia (LG)",preview:!0});const Mt=[{label:"Fuera",preset:"away",icon:"mdi:home-export-outline"},{label:"Confort",preset:"comfort",icon:"mdi:sofa"},{label:"Eco",preset:"eco",icon:"mdi:leaf"},{label:"En Casa",preset:"home",icon:"mdi:home"},{label:"Dormir",preset:"sleep",icon:"mdi:bed"}],Tt={off:{icon:"mdi:power",label:"Apagado",option:$t},cool:{icon:"mdi:snowflake",label:"Frio",option:bt},heat:{icon:"mdi:fire",label:"Calor",option:yt},auto:{icon:"mdi:autorenew",label:"Auto",option:wt}};function Ct(t,e,i,s){const o=(s-90)*Math.PI/180;return{x:t+i*Math.cos(o),y:e+i*Math.sin(o)}}function Pt(t,e,i,s,o){const r=Ct(t,e,i,o),n=Ct(t,e,i,s),a=o-s<=180?"0":"1";return`M ${r.x} ${r.y} A ${i} ${i} 0 ${a} 0 ${n.x} ${n.y}`}const kt=210,Ot=300,Ut=80;let Nt=class extends lt{constructor(){super(...arguments),this._dragging=!1,this._dragTemp=null,this._lgOpen=!1,this._pendingTemp=null,this._saving=!1,this._entryIds={},this._valueAngle=0,this._dragPointerId=null,this._boundMove=t=>this._onPointerMove(t),this._boundUp=()=>this._onPointerUp(),this._toggleLg=()=>{this._lgOpen=!this._lgOpen}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this._boundMove),window.removeEventListener("pointerup",this._boundUp),window.removeEventListener("pointercancel",this._boundUp),window.clearTimeout(this._saveTimer)}static async getConfigElement(){return document.createElement("aerothermal-temperature-control-editor")}static getStubConfig(){return{name:"Aerotermia",mode_select:"input_select.aerotermia_modo",thermostat_heat:"climate.suelo_radiante_calor",thermostat_cool:"climate.suelo_radiante_frio",water_climate:"climate.bomba_de_calor_aire_agua_2",current_sensor:"sensor.temperatura_termostato",pump_switch:"switch.socket_garaje_aerotermia_bomba",inertia_sensor:"",lock_entity:"input_boolean.bloquear_termostato",auto_mode_automations:["automation.aerotermia_modos_automaticos_calor","automation.aerotermia_aprender_ritmo_de_calentamiento","automation.aerotermia_vacaciones"],show_modes:["off","cool","heat","auto"]}}setConfig(t){if(!t.mode_select)throw new Error("Falta 'mode_select'");if(!t.thermostat_heat)throw new Error("Falta 'thermostat_heat'");if(!t.thermostat_cool)throw new Error("Falta 'thermostat_cool'");if(!t.water_climate)throw new Error("Falta 'water_climate'");this.config={show_modes:["off","cool","heat","auto"],presets:Mt,...t}}getCardSize(){return this.hass&&this.config&&this.isOff?2:5}shouldUpdate(t){return t.has("config")||t.has("hass")||t.has("_dragging")||t.has("_dragTemp")||t.has("_lgOpen")||t.has("_pendingTemp")}willUpdate(){if(null!=this._pendingTemp&&!this._saving&&this.hass&&this.config){const t=this.activeThermostat?.attributes.temperature;null!=t&&Number(t)===this._pendingTemp&&(this._pendingTemp=null)}}get modeState(){const t=this.hass.states[this.config.mode_select];return t?t.state:"off"}get isOff(){return this.modeState===$t}get isAuto(){return this.modeState===wt}get isHeat(){return this.modeState===yt}get autoModes(){return this.isHeat||this.modeState===bt?(this.config.auto_mode_automations??[]).map(t=>this.hass.states[t]).filter(t=>!!t):[]}get dialDisabled(){return this.isOff||this.isAuto}get activeThermostatId(){return this.modeState===bt?this.config.thermostat_cool:this.config.thermostat_heat}get activeThermostat(){return this.hass.states[this.activeThermostatId]}get accentColor(){return this.isOff?"#6f7176":this.isAuto?"#43a047":this.modeState===bt?"#2b9af9":"#ff8100"}render(){if(!this.hass||!this.config)return G;const t=this.activeThermostat;if(!t)return W`<ha-card
        ><div class="warn">
          Entidad no encontrada: ${this.activeThermostatId}
        </div></ha-card
      >`;const e=Number(t.attributes.min_temp??12),i=Number(t.attributes.max_temp??30),s=Number(t.attributes.temperature??e),o=null!=this._dragTemp?this._dragTemp:this._pendingTemp??s,r=this.config.current_sensor&&this.hass.states[this.config.current_sensor]?this.hass.states[this.config.current_sensor].state:void 0,n=null!=r&&"unknown"!==r&&"unavailable"!==r?r:t.attributes.current_temperature;if(this.isOff)return this._renderOff(n);const a=t.attributes.hvac_action??"idle",c=t.attributes.preset_mode,l=Math.min(1,Math.max(0,(o-e)/(i-e))),h=kt+l*Ot;this._valueAngle=h%360;const d=Ct(100,100,Ut,h),p=this.accentColor,u=this.modeState===bt?"#15578f":"#9c4e00",m=`grad-${this.modeState}`,_=Number(n),f=null==n||isNaN(_)?null:Math.min(1,Math.max(0,(_-e)/(i-e))),g=null!=f?kt+f*Ot:null,v=null!=g?Ct(100,100,Ut,g):null,$=null!=g?Math.min(h,g):kt,b=null!=g?Math.max(h,g):h,y=Math.trunc(o),w=Math.abs(Math.round(10*(o-y))),x=this.isAuto?"Auto":"heating"===a?"Calentando":"cooling"===a?"Enfriando":this.modeState===bt?"Frio":"Calor";return W`
      <ha-card style="--accent:${this.accentColor}">
        <div class="header">
          <span class="title">${this.config.name??"Aerotermia"}</span>
          ${this._renderLock()}
        </div>

        <!-- DIAL -->
        <div class="dial-wrap">
          <svg
            viewBox="0 0 200 200"
            class="dial ${this.dialDisabled?"off":""}"
            @pointerdown=${this._onPointerDown}
          >
<defs>
              <linearGradient id=${m} x1="0" y1="0" x2="1" y2="1">
                ${this.modeState===bt?F`<stop offset="0%" stop-color="#5cc6ff" /><stop
                        offset="100%"
                        stop-color="#1f7fd6"
                      />`:F`<stop offset="0%" stop-color="#ffb454" /><stop
                        offset="100%"
                        stop-color="#e8730a"
                      />`}
              </linearGradient>
            </defs>
            <path class="track" d=${Pt(100,100,Ut,kt,510)} />
            ${this.dialDisabled?G:F`
                  <!-- glow difuminado detras del aro -->
                  <path
                    class="glow"
                    style="stroke:${p}"
                    d=${Pt(100,100,Ut,$,b)}
                  />
                  <path
                    class="value"
                    style="stroke:url(#${m})"
                    d=${Pt(100,100,Ut,$,b)}
                  />
                  ${v?F`<circle
                        class="curdot"
                        style="fill:${u}"
                        cx=${v.x}
                        cy=${v.y}
                        r="4"
                      />`:G}
                  <circle
                    class="handle"
                    style="stroke:${p}"
                    cx=${d.x}
                    cy=${d.y}
                    r="8"
                  />
                `}
          </svg>
          <div class="dial-center">
            <div class="preset-name">${x}</div>
            <div class="target">
              ${this.dialDisabled?W`<span class="int">--</span>`:W`<span class="int">${y}</span
                    ><span class="frac"
                      ><span class="unit">°C</span
                      ><span class="dec">,${w}</span></span
                    >`}
            </div>
            ${null!=n?W`<div
                  class="current clickable"
                  title="Ver histórico"
                  @click=${()=>this._openMoreInfo(this.config.current_sensor||this.activeThermostatId)}
                >
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  ${String(n).replace(".",",")} °C
                </div>`:G}
            <div class="adjust">
              <button
                class="round"
                ?disabled=${this.dialDisabled}
                @click=${()=>this._stepThermostat(-1)}
              >
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button
                class="round"
                ?disabled=${this.dialDisabled}
                @click=${()=>this._stepThermostat(1)}
              >
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
          </div>
        </div>

        ${this._renderWaterBlock(c)}
        ${this._renderModes()}
      </ha-card>
    `}_renderLock(){const t=this.config.lock_entity,e=t?this.hass.states[t]:void 0;if(!e)return G;const i="on"===e.state;return W`<button
      class="lock ${i?"on":""}"
      title=${i?"Modos automáticos bloqueados: no cambian el preset":"Modos automáticos permitidos"}
      @click=${()=>this.hass.callService("input_boolean","toggle",{entity_id:t})}
    >
      <ha-icon icon=${i?"mdi:lock":"mdi:lock-open-variant-outline"}></ha-icon>
    </button>`}_renderOff(t){return W`
      <ha-card class="compact" style="--accent:${this.accentColor}">
        <div class="off-row">
          <ha-icon class="off-icon" icon="mdi:power"></ha-icon>
          <div class="off-text">
            <span class="title">${this.config.name??"Aerotermia"}</span>
            <span class="off-state">Apagado</span>
          </div>
          ${null!=t?W`<span
                class="off-current clickable"
                title="Ver histórico"
                @click=${()=>this._openMoreInfo(this.config.current_sensor||this.activeThermostatId)}
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
                ${String(t).replace(".",",")} °C
              </span>`:G}
        </div>
        ${this._renderModes()}
      </ha-card>
    `}_renderWaterBlock(t){const e=this.hass.states[this.config.water_climate];if(!e)return W`<div class="warn small">
        Climate LG no encontrado: ${this.config.water_climate}
      </div>`;const i=e.attributes.temperature,s=this.config.inertia_sensor&&this.hass.states[this.config.inertia_sensor]?this.hass.states[this.config.inertia_sensor].state:e.attributes.current_temperature,o=e.attributes.hvac_action??e.state,r="heating"===o||"cooling"===o,n=this.config.pump_switch?this.hass.states[this.config.pump_switch]:void 0,a="on"===n?.state,c=t=>null!=t?String(t).replace(".",","):"--",l=`Agua ${c(i)}° · Impulsión ${c(s)}°`;return W`
      <div class="section ${this._lgOpen?"open":""}">
        <button
          class="section-toggle"
          aria-expanded=${this._lgOpen?"true":"false"}
          @click=${this._toggleLg}
        >
          <ha-icon icon="mdi:heat-pump"></ha-icon>
          <span class="section-label"
            >${this._lgOpen?"Motor / Impulsión (LG)":l}</span
          >
          ${this._lgOpen?G:W`<ha-icon
                  class="status ${r?"on":""}"
                  title=${r?"Motor activo":"Motor en reposo"}
                  icon="mdi:heat-pump-outline"
                ></ha-icon>
                ${n?W`<ha-icon
                      class="status ${a?"on":""}"
                      title=${a?"Bomba en marcha":"Bomba parada"}
                      icon="mdi:pump"
                    ></ha-icon>`:G}
                ${this._renderAutoStatus()} ${this._renderPresetStatus(t)}`}
          <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
        </button>
        ${this._lgOpen?W`${this._renderWaterRows(i,s,r,n,a)}
            ${this._renderPresets(t)} ${this._renderAutoRow()}`:G}
      </div>
    `}_renderWaterRows(t,e,i,s,o){return W`
        <div class="row">
          <span class="label">Objetivo agua</span>
          <div class="row-right">
            <button class="round sm" @click=${()=>this._stepWater(-1)}>
              <ha-icon icon="mdi:minus"></ha-icon>
            </button>
            <span class="value-num">${null!=t?t:"--"} °C</span>
            <button class="round sm" @click=${()=>this._stepWater(1)}>
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>
        </div>
        <div class="row">
          <span class="label">Impulsion / inercia</span>
          <div class="row-right">
            <span
              class="value-num clickable"
              title="Ver histórico"
              @click=${()=>this._openMoreInfo(this.config.inertia_sensor||this.config.water_climate)}
              >${null!=e?e:"--"} °C</span
            >
            <span class="chip ${i?"on":""}">
              <ha-icon icon="mdi:heat-pump-outline"></ha-icon>
              ${i?"activo":"reposo"}
            </span>
          </div>
        </div>
        ${s?W`<div class="row">
              <span class="label">Bomba suelo</span>
              <span class="chip ${o?"on":""}">
                <ha-icon icon="mdi:pump"></ha-icon>
                ${o?"en marcha":"parada"}
              </span>
            </div>`:G}
    `}_autoModesOn(t){return t.length>0&&t.every(t=>"on"===t.state)}_renderAutoStatus(){const t=this.autoModes;if(!t.length)return G;const e=this._autoModesOn(t);return W`<ha-icon
      class="status ${e?"on":""}"
      title=${e?"Modos automáticos activados":"Modos automáticos desactivados"}
      icon="mdi:calendar-clock"
    ></ha-icon>`}_renderPresetStatus(t){const e=(this.config.presets??Mt).find(e=>e.preset===t);return e?.icon?W`<ha-icon class="status on" title=${`Preset: ${e.label}`} icon=${e.icon}></ha-icon>`:G}_renderAutoRow(){const t=this.autoModes;if(!t.length)return G;const e=this._autoModesOn(t);return W`<div class="row">
      <span class="label">Modos automáticos</span>
      <ha-switch .checked=${e} @change=${e=>this._setAutoModes(t,e)}></ha-switch>
    </div>`}_setAutoModes(t,e){const i=e.target.checked;this.hass.callService("automation",i?"turn_on":"turn_off",{entity_id:t.map(t=>t.entity_id)})}_renderPresets(t){const e=this.hass.states[this.activeThermostatId]?.attributes.preset_modes;if(!e)return G;const i=(this.config.presets??Mt).filter(t=>e.includes(t.preset));return i.length?W`
      <div class="presets">
        ${i.map(e=>W`
            <button
              class="preset ${t===e.preset?"active":""}"
              ?disabled=${this.isOff}
              title=${e.label}
              @click=${()=>this._setPreset(e.preset)}
            >
              ${e.icon?W`<ha-icon icon=${e.icon}></ha-icon>`:G}
              <span>${e.label}</span>
            </button>
          `)}
      </div>
    `:G}_renderModes(){const t=this.config.show_modes??["off","cool","heat","auto"];return W`
      <div class="modes">
        ${t.map(t=>{const e=Tt[t];if(!e)return G;const i=this.modeState===e.option;return W`
            <button
              class="mode ${i?"active":""}"
              title=${e.label}
              @click=${()=>this._setMode(e.option)}
            >
              <ha-icon icon=${e.icon}></ha-icon>
            </button>
          `})}
      </div>
    `}_step(t,e){const i=this.hass.states[t];if(!i)return;const s=Number(i.attributes.target_temp_step??.5),o=Number(i.attributes.temperature??i.attributes.min_temp??20),r=Number(i.attributes.min_temp??-1/0),n=Number(i.attributes.max_temp??1/0),a=Math.min(n,Math.max(r,o+e*s));this.hass.callService("climate","set_temperature",{entity_id:t,temperature:Number(a.toFixed(1))})}_stepThermostat(t){if(this.dialDisabled)return;const e=this.activeThermostat;if(!e)return;const i=Number(e.attributes.target_temp_step??.5),s=this._pendingTemp??Number(e.attributes.temperature??e.attributes.min_temp??20),o=Number(e.attributes.min_temp??-1/0),r=Number(e.attributes.max_temp??1/0);this._setTarget(Number(Math.min(r,Math.max(o,s+t*i)).toFixed(1)))}_setTarget(t){const e=this.activeThermostatId,i=this.activeThermostat?.attributes.preset_mode;i&&"none"!==i?(this._pendingTemp=t,window.clearTimeout(this._saveTimer),this._saveTimer=window.setTimeout(()=>this._flushPresetTemp(e,i),1200)):this.hass.callService("climate","set_temperature",{entity_id:e,temperature:t})}async _flushPresetTemp(t,e){if(this._saving)return;const i=this._pendingTemp;if(null!=i){this._saving=!0;try{await this._savePresetTemp(t,e,i),await this.hass.callService("climate","set_preset_mode",{entity_id:t,preset_mode:e})}catch(e){console.warn("aerothermal: no se pudo guardar la temperatura del preset",e),await this.hass.callService("climate","set_temperature",{entity_id:t,temperature:i})}finally{this._saving=!1}null!=this._pendingTemp&&this._pendingTemp!==i?this._flushPresetTemp(t,e):this.requestUpdate()}}async _savePresetTemp(t,e,i){let s=this._entryIds[t];if(!s){const e=await this.hass.callWS({type:"config/entity_registry/get",entity_id:t});if(!e.config_entry_id)throw new Error(`${t} sin config entry`);s=this._entryIds[t]=e.config_entry_id}const o=(t=[])=>{const e={};for(const i of t){const t=i.description?.suggested_value;void 0!==t&&(e[i.name]=t)}return e},r=await this.hass.callApi("POST","config/config_entries/options/flow",{handler:s}),n=`config/config_entries/options/flow/${r.flow_id}`;try{let t=r;"init"===t.step_id&&(t=await this.hass.callApi("POST",n,o(t.data_schema)));const s=`${e}_temp`;if("presets"!==t.step_id||!t.data_schema?.some(t=>t.name===s))throw new Error(`options flow sin ${s}`);const a=await this.hass.callApi("POST",n,{...o(t.data_schema),[s]:i});if("create_entry"!==a.type)throw new Error(`options flow: ${a.type}`)}catch(t){throw await this.hass.callApi("DELETE",n).catch(()=>{}),t}}_stepWater(t){this._step(this.config.water_climate,t)}_setPreset(t){this.isOff||this.hass.callService("climate","set_preset_mode",{entity_id:this.activeThermostatId,preset_mode:t})}_setMode(t){this.hass.callService("input_select","select_option",{entity_id:this.config.mode_select,option:t})}_onPointerDown(t){if(this.dialDisabled)return;const e=this.renderRoot.querySelector("svg.dial");if(!e)return;const i=e.getBoundingClientRect();if(!i.width||!i.height)return;const s=i.width/200,o=t.clientX-(i.left+i.width/2),r=t.clientY-(i.top+i.height/2),n=Math.hypot(o,r),a=Ut*s;if(Math.abs(n-a)>21*s)return;let c=180*Math.atan2(r,o)/Math.PI+90;c<0&&(c+=360);let l=Math.abs(c-this._valueAngle);if(l>180&&(l=360-l),!(l>22)){t.preventDefault(),this._dragging=!0,this._dragPointerId=t.pointerId;try{e.setPointerCapture(t.pointerId)}catch(t){}window.addEventListener("pointermove",this._boundMove),window.addEventListener("pointerup",this._boundUp),window.addEventListener("pointercancel",this._boundUp)}}_openMoreInfo(t){t&&this.hass?.states[t]&&vt(this,"hass-more-info",{entityId:t})}_onPointerMove(t){this._dragging&&(t.cancelable&&t.preventDefault(),this._updateFromPointer(t))}_onPointerUp(){if(!this._dragging)return;if(this._dragging=!1,window.removeEventListener("pointermove",this._boundMove),window.removeEventListener("pointerup",this._boundUp),window.removeEventListener("pointercancel",this._boundUp),null!=this._dragPointerId){const t=this.renderRoot.querySelector("svg.dial");try{t?.releasePointerCapture(this._dragPointerId)}catch(t){}this._dragPointerId=null}const t=this._dragTemp;this._dragTemp=null,null!=t&&this._setTarget(t)}_updateFromPointer(t){const e=this.renderRoot.querySelector("svg.dial"),i=this.activeThermostat;if(!e||!i)return;const s=e.getBoundingClientRect(),o=t.clientX-(s.left+s.width/2),r=t.clientY-(s.top+s.height/2);let n,a=180*Math.atan2(r,o)/Math.PI+90;a<0&&(a+=360),n=a>=kt&&a<=360?(a-kt)/Ot:a>=0&&a<=140?(a+360-kt)/Ot:a-140<kt-a?1:0,n=Math.min(1,Math.max(0,n));const c=Number(i.attributes.min_temp??12),l=Number(i.attributes.max_temp??30),h=Number(i.attributes.target_temp_step??.5);let d=c+n*(l-c);d=Math.min(l,Math.max(c,Math.round(d/h)*h)),this._dragTemp=Number(d.toFixed(2))}};Nt.styles=n`
    ha-card {
      padding: 12px 12px 16px;
      color: var(--primary-text-color);
    }
    .header {
      position: relative;
      text-align: center;
      padding: 4px 0 0;
      min-height: 28px;
    }
    .lock {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      opacity: 0.6;
    }
    .lock ha-icon {
      --mdc-icon-size: 20px;
    }
    .lock.on {
      color: var(--accent);
      background: var(--secondary-background-color, #2a2a2a);
      opacity: 1;
    }
    .title {
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .warn {
      padding: 16px;
      color: var(--error-color, #db4437);
    }
    .warn.small {
      padding: 6px 12px;
      font-size: 0.85em;
    }

    /* DIAL */
    .dial-wrap {
      position: relative;
      width: 100%;
      max-width: 300px;
      margin: 4px auto 0;
      aspect-ratio: 1 / 1;
    }
    .dial {
      width: 100%;
      height: 100%;
      /* none: el gesto sobre el dial no lo roba el scroll del navegador, asi el
         arrastre de la bolita funciona en cualquier direccion en movil. El
         hit-test solo inicia el arrastre al agarrar la bolita; el resto de la
         tarjeta sigue desplazandose con normalidad. */
      touch-action: none;
      cursor: default;
    }
    .dial.off {
      cursor: default;
    }
    .track {
      fill: none;
      stroke: var(--divider-color, #38393d);
      stroke-width: 18;
      stroke-linecap: round;
    }
    .glow {
      fill: none;
      stroke-width: 18;
      stroke-linecap: round;
      opacity: 0.45;
      filter: blur(6px);
    }
    .value {
      fill: none;
      stroke-width: 18;
      stroke-linecap: round;
    }
    .curdot {
      opacity: 0.95;
    }
    .handle {
      fill: #fff;
      stroke-width: 3;
      cursor: grab;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
    }
    .dial-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      /* dejar pasar el puntero al aro SVG para poder arrastrar */
      pointer-events: none;
    }
    .preset-name {
      font-size: 1.05rem;
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 2px;
    }
    .target {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      line-height: 1;
    }
    .target .int {
      font-size: 3.6rem;
      font-weight: 300;
      letter-spacing: -1px;
    }
    .target .frac {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 8px;
      margin-left: 2px;
    }
    .target .unit {
      font-size: 1.05rem;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .target .dec {
      font-size: 1.7rem;
      font-weight: 300;
    }
    .current {
      font-size: 0.95rem;
      color: var(--accent);
      display: flex;
      align-items: center;
      gap: 3px;
      margin-top: 2px;
    }
    .current ha-icon {
      --mdc-icon-size: 16px;
    }
    .clickable {
      cursor: pointer;
    }
    .current.clickable {
      pointer-events: auto;
      border-radius: 6px;
      padding: 1px 6px;
    }
    .current.clickable:hover,
    .value-num.clickable:hover {
      opacity: 0.7;
    }
    .adjust {
      display: flex;
      gap: 24px;
      margin-top: 8px;
      /* reactivar el puntero solo en los botones +/- */
      pointer-events: auto;
    }
    button.round {
      border: 2px solid var(--divider-color, #46494d);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      cursor: pointer;
      background: transparent;
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button.round ha-icon {
      --mdc-icon-size: 22px;
    }
    button.round.sm {
      width: 30px;
      height: 30px;
      border-width: 2px;
    }
    button.round:disabled {
      opacity: 0.35;
      cursor: default;
    }

    /* SECCION LG */
    .section {
      margin-top: 10px;
      border-top: 1px solid var(--divider-color, #3a3a3a);
      padding-top: 10px;
    }
    .section-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 32px;
      padding: 0;
      border: none;
      background: transparent;
      font: inherit;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
      cursor: pointer;
      text-align: left;
    }
    .section-toggle > ha-icon {
      --mdc-icon-size: 18px;
    }
    .section-label {
      flex: 1;
      font-variant-numeric: tabular-nums;
    }
    .section-toggle .status {
      opacity: 0.45;
    }
    .section-toggle .status.on {
      color: var(--accent);
      opacity: 1;
    }
    .section-toggle .chevron {
      transition: transform 0.2s ease;
    }
    .section.open .section-toggle .chevron {
      transform: rotate(180deg);
    }
    .section.open .section-toggle {
      margin-bottom: 4px;
    }

    /* VISTA APAGADA */
    ha-card.compact {
      padding: 12px;
    }
    .off-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 4px;
    }
    .off-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
      background: var(--secondary-background-color, #2a2a2a);
      border-radius: 50%;
      padding: 9px;
    }
    .off-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      line-height: 1.25;
    }
    .off-text .title {
      color: var(--primary-text-color);
    }
    .off-state {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .off-current {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 1.05rem;
      font-variant-numeric: tabular-nums;
    }
    .off-current ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
    }
    .off-current:hover {
      opacity: 0.7;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
    }
    .label {
      font-size: 0.9rem;
    }
    .row-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .value-num {
      min-width: 56px;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.78rem;
      padding: 2px 8px;
      border-radius: 12px;
      background: var(--secondary-background-color, #2a2a2a);
      color: var(--secondary-text-color);
    }
    .chip ha-icon {
      --mdc-icon-size: 15px;
    }
    .chip.on {
      background: var(--accent);
      color: #fff;
    }

    /* PRESETS */
    .presets {
      display: flex;
      gap: 6px;
      margin: 8px 0 4px;
      flex-wrap: wrap;
    }
    .preset {
      flex: 1 1 0;
      min-width: 56px;
      border: 1px solid var(--divider-color, #3a3a3a);
      border-radius: 10px;
      background: transparent;
      color: var(--primary-text-color);
      padding: 6px 4px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      font-size: 0.72rem;
    }
    .preset ha-icon {
      --mdc-icon-size: 20px;
    }
    .preset.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }
    .preset:disabled {
      opacity: 0.35;
      cursor: default;
    }

    /* MODOS */
    .modes {
      display: flex;
      gap: 6px;
      margin-top: 10px;
      background: var(--secondary-background-color, #2a2a2a);
      border-radius: 14px;
      padding: 4px;
    }
    .mode {
      flex: 1;
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      padding: 8px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mode.active {
      background: var(--accent);
      color: #fff;
    }
  `,t([mt({attribute:!1})],Nt.prototype,"hass",void 0),t([_t()],Nt.prototype,"config",void 0),t([_t()],Nt.prototype,"_dragging",void 0),t([_t()],Nt.prototype,"_dragTemp",void 0),t([_t()],Nt.prototype,"_lgOpen",void 0),t([_t()],Nt.prototype,"_pendingTemp",void 0),Nt=t([dt(xt)],Nt);export{Nt as AerothermalCard};
