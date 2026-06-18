function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,_=f?f.emptyScript:"",g=m.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!c(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const r=this.constructor;if(!1===i&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??b)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[$("elementProperties")]=new Map,w[$("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+P,O=`<${M}>`,T=document,k=()=>T.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,R="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,G=T.createTreeWalker(T,129);function J(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,h=0;for(;h<s.length&&(n.lastIndex=h,c=n.exec(s),null!==c);)h=n.lastIndex,n===H?"!--"===c[1]?n=L:void 0!==c[1]?n=z:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=o??H,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?j:'"'===c[3]?D:I):n===D||n===I?n=j:n===L||n===z?n=H:(n=j,o=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===H?s+O:l>=0?(i.push(a),s.slice(0,l)+C+s.slice(l)+P+d):s+P+(-2===l?e:d)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Y.createElement(c,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=l[r++],s=i.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?et:"?"===n[1]?st:"@"===n[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],k()),G.nextNode(),a.push({type:2,index:++o});i.append(t[e],k())}}}else if(8===i.nodeType)if(i.data===M)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:o}),t+=P.length-1}o++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===q)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);G.currentNode=i;let o=G.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=G.nextNode(),r++)}return G.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Y.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Q(this.O(k()),this.O(k()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=Z(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Z(this,i[s+n],e,n),a===q&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===q)return;const s=this._$AH,i=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(Y,Q),(A.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Q(e.insertBefore(k(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},dt=(t=ht,e,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}const mt="off",ft="frio",_t="calor",gt="aerothermal-temperature-control";var $t,vt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}($t||($t={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(vt||(vt={}));const bt=[{name:"name",selector:{text:{}}},{name:"mode_select",required:!0,selector:{entity:{domain:"input_select"}}},{name:"thermostat_heat",required:!0,selector:{entity:{domain:"climate"}}},{name:"thermostat_cool",required:!0,selector:{entity:{domain:"climate"}}},{name:"water_climate",required:!0,selector:{entity:{domain:"climate"}}},{name:"pump_switch",selector:{entity:{domain:"switch"}}},{name:"inertia_sensor",selector:{entity:{domain:"sensor"}}}],yt={name:"Nombre",mode_select:"input_select de modo (off/calor/frio)",thermostat_heat:"Termostato CALOR (generic_thermostat)",thermostat_cool:"Termostato FRIO (generic_thermostat)",water_climate:"Climate del motor LG",pump_switch:"Rele de la bomba (opcional)",inertia_sensor:"Sensor de inercia (opcional)"};let wt=class extends at{constructor(){super(...arguments),this._computeLabel=t=>yt[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${bt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p class="hint">
        Los <b>presets</b> y <b>show_modes</b> se configuran en YAML (ver README).
      </p>
    `:W}_valueChanged(t){!function(t,e,s,i){i=i||{},s=null==s?{}:s;var o=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});o.detail=s,t.dispatchEvent(o)}(this,"config-changed",{config:t.detail.value})}};wt.styles=n`
    .hint {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-top: 8px;
    }
  `,t([pt({attribute:!1})],wt.prototype,"hass",void 0),t([ut()],wt.prototype,"_config",void 0),wt=t([lt("aerothermal-temperature-control-editor")],wt),console.info("%c AEROTHERMAL-TEMPERATURE-CONTROL %c v1.1.2 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: #1c1c1c; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:gt,name:"Aerothermal Temperature Control",description:"Termostato de suelo radiante + control del motor de aerotermia (LG)",preview:!0});const At=[{label:"Fuera",preset:"away",icon:"mdi:home-export-outline"},{label:"Confort",preset:"comfort",icon:"mdi:sofa"},{label:"Eco",preset:"eco",icon:"mdi:leaf"},{label:"En Casa",preset:"home",icon:"mdi:home"},{label:"Dormir",preset:"sleep",icon:"mdi:bed"}],xt={off:{icon:"mdi:power",label:"Apagado",option:mt},cool:{icon:"mdi:snowflake",label:"Frio",option:ft},heat:{icon:"mdi:fire",label:"Calor",option:_t}};function Et(t,e,s,i){const o=(i-90)*Math.PI/180;return{x:t+s*Math.cos(o),y:e+s*Math.sin(o)}}function St(t,e,s,i,o){const r=Et(t,e,s,o),n=Et(t,e,s,i),a=o-i<=180?"0":"1";return`M ${r.x} ${r.y} A ${s} ${s} 0 ${a} 0 ${n.x} ${n.y}`}const Ct=220;let Pt=class extends at{constructor(){super(...arguments),this._dragging=!1,this._dragTemp=null,this._boundMove=t=>this._onPointerMove(t),this._boundUp=()=>this._onPointerUp()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointermove",this._boundMove),window.removeEventListener("pointerup",this._boundUp)}static async getConfigElement(){return document.createElement("aerothermal-temperature-control-editor")}static getStubConfig(){return{name:"Aerotermia",mode_select:"input_select.aerotermia_modo",thermostat_heat:"climate.suelo_radiante_calor",thermostat_cool:"climate.suelo_radiante_frio",water_climate:"climate.bomba_de_calor_aire_agua_2",pump_switch:"switch.socket_garaje_aerotermia_bomba",inertia_sensor:"",show_modes:["off","cool","heat"]}}setConfig(t){if(!t.mode_select)throw new Error("Falta 'mode_select'");if(!t.thermostat_heat)throw new Error("Falta 'thermostat_heat'");if(!t.thermostat_cool)throw new Error("Falta 'thermostat_cool'");if(!t.water_climate)throw new Error("Falta 'water_climate'");this.config={show_modes:["off","cool","heat"],presets:At,...t}}getCardSize(){return 5}shouldUpdate(t){return t.has("config")||t.has("hass")||t.has("_dragging")||t.has("_dragTemp")}get modeState(){const t=this.hass.states[this.config.mode_select];return t?t.state:"off"}get isOff(){return this.modeState===mt}get activeThermostatId(){return this.modeState===ft?this.config.thermostat_cool:this.config.thermostat_heat}get activeThermostat(){return this.hass.states[this.activeThermostatId]}get accentColor(){return this.isOff?"var(--disabled-text-color, #6f6f6f)":this.modeState===ft?"var(--state-climate-cool-color, #2b9af9)":"var(--state-climate-heat-color, #ff8100)"}render(){if(!this.hass||!this.config)return W;const t=this.activeThermostat;if(!t)return F`<ha-card
        ><div class="warn">
          Entidad no encontrada: ${this.activeThermostatId}
        </div></ha-card
      >`;const e=Number(t.attributes.min_temp??12),s=Number(t.attributes.max_temp??30),i=Number(t.attributes.temperature??e),o=null!=this._dragTemp?this._dragTemp:i,r=t.attributes.current_temperature,n=t.attributes.hvac_action??"idle",a=t.attributes.preset_mode,c=Math.min(1,Math.max(0,(o-e)/(s-e))),l=Ct+280*c,h=Et(100,100,80,l),d=this.isOff?"Apagado":"heating"===n?"Calentando":"cooling"===n?"Enfriando":this.modeState===ft?"Frio":"Calor";return F`
      <ha-card style="--accent:${this.accentColor}">
        <div class="header">
          <span class="title">${this.config.name??"Aerotermia"}</span>
        </div>

        <!-- DIAL -->
        <div class="dial-wrap">
          <svg
            viewBox="0 0 200 200"
            class="dial ${this.isOff?"off":""}"
            @pointerdown=${this._onPointerDown}
          >
            <path class="track" d=${St(100,100,80,Ct,500)} />
            ${this.isOff?W:F`<path
                  class="value"
                  style="stroke:${this.accentColor}"
                  d=${St(100,100,80,Ct,l)}
                />`}
            ${this.isOff?W:F`<circle
                  class="handle"
                  style="stroke:${this.accentColor}"
                  cx=${h.x}
                  cy=${h.y}
                  r="10"
                />`}
          </svg>
          <div class="dial-center">
            <div class="preset-name">${d}</div>
            <div class="target">
              ${this.isOff?"--":o.toFixed(1)}<span class="unit">°C</span>
            </div>
            ${null!=r?F`<div class="current">
                  <ha-icon icon="mdi:thermometer"></ha-icon> ${r} °C
                </div>`:W}
            <div class="adjust">
              <button
                class="round"
                ?disabled=${this.isOff}
                @click=${()=>this._stepThermostat(-1)}
              >
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button
                class="round"
                ?disabled=${this.isOff}
                @click=${()=>this._stepThermostat(1)}
              >
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
          </div>
        </div>

        ${this._renderWaterBlock()} ${this._renderPresets(a)}
        ${this._renderModes()}
      </ha-card>
    `}_renderWaterBlock(){const t=this.hass.states[this.config.water_climate];if(!t)return F`<div class="warn small">
        Climate LG no encontrado: ${this.config.water_climate}
      </div>`;const e=t.attributes.temperature,s=this.config.inertia_sensor&&this.hass.states[this.config.inertia_sensor]?this.hass.states[this.config.inertia_sensor].state:t.attributes.current_temperature,i=t.attributes.hvac_action??t.state,o="heating"===i||"cooling"===i,r=this.config.pump_switch?this.hass.states[this.config.pump_switch]:void 0,n="on"===r?.state;return F`
      <div class="section">
        <div class="section-title">
          <ha-icon icon="mdi:heat-pump"></ha-icon> Motor / Impulsion (LG)
        </div>
        <div class="row">
          <span class="label">Objetivo agua</span>
          <div class="row-right">
            <button class="round sm" @click=${()=>this._stepWater(-1)}>
              <ha-icon icon="mdi:minus"></ha-icon>
            </button>
            <span class="value-num">${null!=e?e:"--"} °C</span>
            <button class="round sm" @click=${()=>this._stepWater(1)}>
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>
        </div>
        <div class="row">
          <span class="label">Impulsion / inercia</span>
          <div class="row-right">
            <span class="value-num">${null!=s?s:"--"} °C</span>
            <span class="chip ${o?"on":""}">
              <ha-icon icon="mdi:heat-pump-outline"></ha-icon>
              ${o?"activo":"reposo"}
            </span>
          </div>
        </div>
        ${r?F`<div class="row">
              <span class="label">Bomba suelo</span>
              <span class="chip ${n?"on":""}">
                <ha-icon icon="mdi:pump"></ha-icon>
                ${n?"en marcha":"parada"}
              </span>
            </div>`:W}
      </div>
    `}_renderPresets(t){const e=this.config.presets??At;return F`
      <div class="presets">
        ${e.map(e=>F`
            <button
              class="preset ${t===e.preset?"active":""}"
              ?disabled=${this.isOff}
              title=${e.label}
              @click=${()=>this._setPreset(e.preset)}
            >
              ${e.icon?F`<ha-icon icon=${e.icon}></ha-icon>`:W}
              <span>${e.label}</span>
            </button>
          `)}
      </div>
    `}_renderModes(){const t=this.config.show_modes??["off","cool","heat"];return F`
      <div class="modes">
        ${t.map(t=>{const e=xt[t];if(!e)return W;const s=this.modeState===e.option;return F`
            <button
              class="mode ${s?"active":""}"
              title=${e.label}
              @click=${()=>this._setMode(e.option)}
            >
              <ha-icon icon=${e.icon}></ha-icon>
            </button>
          `})}
      </div>
    `}_step(t,e){const s=this.hass.states[t];if(!s)return;const i=Number(s.attributes.target_temp_step??.5),o=Number(s.attributes.temperature??s.attributes.min_temp??20),r=Number(s.attributes.min_temp??-1/0),n=Number(s.attributes.max_temp??1/0),a=Math.min(n,Math.max(r,o+e*i));this.hass.callService("climate","set_temperature",{entity_id:t,temperature:Number(a.toFixed(1))})}_stepThermostat(t){this.isOff||this._step(this.activeThermostatId,t)}_stepWater(t){this._step(this.config.water_climate,t)}_setPreset(t){this.isOff||this.hass.callService("climate","set_preset_mode",{entity_id:this.activeThermostatId,preset_mode:t})}_setMode(t){this.hass.callService("input_select","select_option",{entity_id:this.config.mode_select,option:t})}_onPointerDown(t){this.isOff||(t.preventDefault(),this._dragging=!0,this._updateFromPointer(t),window.addEventListener("pointermove",this._boundMove),window.addEventListener("pointerup",this._boundUp))}_onPointerMove(t){this._dragging&&this._updateFromPointer(t)}_onPointerUp(){this._dragging&&(this._dragging=!1,window.removeEventListener("pointermove",this._boundMove),window.removeEventListener("pointerup",this._boundUp),null!=this._dragTemp&&this.hass.callService("climate","set_temperature",{entity_id:this.activeThermostatId,temperature:this._dragTemp}),this._dragTemp=null)}_updateFromPointer(t){const e=this.renderRoot.querySelector("svg.dial"),s=this.activeThermostat;if(!e||!s)return;const i=e.getBoundingClientRect(),o=t.clientX-(i.left+i.width/2),r=t.clientY-(i.top+i.height/2);let n,a=180*Math.atan2(r,o)/Math.PI+90;a<0&&(a+=360),n=a>=Ct&&a<=360?(a-Ct)/280:a>=0&&a<=140?(a+360-Ct)/280:a-140<Ct-a?1:0,n=Math.min(1,Math.max(0,n));const c=Number(s.attributes.min_temp??12),l=Number(s.attributes.max_temp??30),h=Number(s.attributes.target_temp_step??.5);let d=c+n*(l-c);d=Math.min(l,Math.max(c,Math.round(d/h)*h)),this._dragTemp=Number(d.toFixed(2))}};Pt.styles=n`
    ha-card {
      padding: 12px 12px 16px;
      color: var(--primary-text-color);
    }
    .header {
      text-align: center;
      padding: 4px 0 0;
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
      max-width: 260px;
      margin: 0 auto;
      aspect-ratio: 1 / 1;
    }
    .dial {
      width: 100%;
      height: 100%;
      touch-action: none;
      cursor: pointer;
    }
    .dial.off {
      cursor: default;
    }
    .track {
      fill: none;
      stroke: var(--divider-color, #3a3a3a);
      stroke-width: 12;
      stroke-linecap: round;
    }
    .value {
      fill: none;
      stroke: var(--accent);
      stroke-width: 12;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }
    .handle {
      fill: #fff;
      stroke: var(--accent);
      stroke-width: 3;
      cursor: grab;
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
      font-size: 0.95rem;
      color: var(--accent);
      font-weight: 600;
    }
    .target {
      font-size: 2.8rem;
      font-weight: 300;
      line-height: 1;
    }
    .target .unit {
      font-size: 1.1rem;
      vertical-align: super;
      margin-left: 2px;
    }
    .current {
      font-size: 0.9rem;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .current ha-icon {
      --mdc-icon-size: 16px;
    }
    .adjust {
      display: flex;
      gap: 24px;
      margin-top: 8px;
      /* reactivar el puntero solo en los botones +/- */
      pointer-events: auto;
    }
    button.round {
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      background: var(--secondary-background-color, #2a2a2a);
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button.round.sm {
      width: 30px;
      height: 30px;
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
    .section-title {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
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
      margin-top: 12px;
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
  `,t([pt({attribute:!1})],Pt.prototype,"hass",void 0),t([ut()],Pt.prototype,"config",void 0),t([ut()],Pt.prototype,"_dragging",void 0),t([ut()],Pt.prototype,"_dragTemp",void 0),Pt=t([lt(gt)],Pt);export{Pt as AerothermalCard};
