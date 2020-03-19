let auth = firebase.auth();
const sessCookiesColl = 'sessCookies';
const userDataColl = 'userData';

let db = firebase.firestore();

/****************Ex reading all from doc in db***************************/
const consoleLogAllFrom = (docName) {
    db.collection(docName).get()
    .then( (querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        })
    })
    .catch((e) => {
        console.log('Error message ' + e);
    });
};

consoleLogAllFrom(userDataColl);
/****************Ex reading all from doc in db***************************/

/****************Ex writing to db.collection(docName) ***************************/
//Values is going to be a key value pair string
const addTo = (docName, values) => {
    db.collection(docName).add(values)
        .then(function(docRef) {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
            console.log('Error adding document: ', error);
        })
}

addTo(userDataColl, {key: 'value'});
/****************Ex writing to db.collection(docName) ***************************/

//Javascript file used to collect all info from the user

function loadHandler() {
    //GET THE ELEMENTS THAT YOU WANT TO ADD EVENT LISTENERS TO
        //Ex: let el = document.querySelector('#hereBtn');
        //console.log("Inside loadHandler\n");
        let navItem = document.querySelector('.page-nav');

    //ADD EVENT LISTENERS TO THOSE ELEMENTS
        //Ex: el.addEventListener('click', clickHandler);
        // navItem.addEventListener('click', pageNavClickAction);
        // headerTitle.addEventListener('click', headerTitleListener);
        window.addEventListener('load', reportStaticData);
        window.addEventListener('resize', reportWindowSize);
        window.addEventListener('load', reportPerformanceData);
        attachPurgeButton();
        window.addEventListener('beforeunload', reportRedirectStart);
        window.addEventListener('unload', reportRedirectEnd);
}


//WRITE THE FUNCTIONS TO DO WHAT YOU WANT TO DO

// function pageNavClickAction(e) {
//     console.log("Inside pageNavClickAction");
//     let clickedId = e.target.value;

//     console.log(clickedId + " was clicked!");   
// }

// function headerTitleListener(e) {
//     let clickedId = e.target.id;
//     console.log("Clicky my name: " + clickedId);
// }

function attachPurgeButton(){
    let urlReportedFrom = window.location.href;
    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let but = document.getElementById('purge-button')
        but.addEventListener('click', purgeAction);
    }
}

function purgeAction(){
    window.localStorage.clear();
    //could clear the table as well, if I had time
}

function reportStaticData() {
    reportAgentStringData();
    reportUserLanguageData();
    reportCookiesOn();
    reportJavascriptOn();
    reportImagesOn();
    reportCSSOn();
    reportAvailableScreenDimensions();
    reportWindowSize();
    reportEffectiveConnectionType();
}

let allValues = {
    userAgent: navigator.userAgent,
    userLang: navigator.language,
    userCookie: navigator.cookieEnabled,
    javascript: reportJavascriptOn(),
    image: reportImagesOn(),
    css: reportCSSOn(),
    dim: reportAvailableScreenDimensions(),
    windowSize: reportWindowSize(),
    connection: navigator.connection.effectiveType,
    navStart: performance.timing.navigationStart,
    unloadEventStart: performance.timing.unloadEventStart,
    unloadEventEnd: performance.timing.unloadEventEnd,
    redirectStart: performance.timing.redirectStart,
    redirectEnd: performance.timing.redirectEnd,
    fetchStart: performance.timing.fetchStart,
    domainLookUpStart: performance.timing.domainLookupStart,
    domainLookupEnd: performance.timing.domainLookupEnd,
    connectStart: performance.timing.connectStart,
    conectEnd: performance.timing.connectEnd,
    secureConnectionStart: performance.timing.secureConnectionStart,
    reuestStart: performance.timing.requestStart,
    responseStart: performance.timing.responseStart,
    responseEnd: performance.timing.responseEnd,
    domLoading: performance.timing.domLoading,
    domInteractive: performance.timing.domInteractive,
    ontentLoadEventStart: performance.timing.domContentLoadedEventStart,
    contentLoadedEventEnd: performance.timing.domContentLoadedEventEnd,
    loadEventStart: performance.timing.loadEventStart,
    loadEventEnd: performance.timing.loadEventEnd
}



function reportAgentStringData() {

    let userAgentString = navigator.userAgent;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');

    if(inReporterPage){
        let userAgentValEl = document.getElementById('static-user-agent-string');
        userAgentValEl.innerHTML = userAgentString;
        let userAgentTimeReportedEl = document.getElementById('static-user-agent-string-time');
        userAgentTimeReportedEl.innerHTML = timeReported; 
        
        let userAgentUrlEl = document.getElementById('static-user-agent-string-url');
        userAgentUrlEl.innerHTML = urlReportedFrom;
    }
        
    let agentStringObj = {
        value : userAgentString,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('userAgent', JSON.stringify(agentStringObj));
}

function reportUserLanguageData() {
    let userLang = navigator.language;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');

    if(inReporterPage){
        let userLangEl = document.getElementById('static-user-language');
        userLangEl.innerHTML = userLang; 

        let userLangTimeEl = document.getElementById('static-user-language-time');
        userLangTimeEl.innerHTML = timeReported; 

        let userLangUrlEl = document.getElementById('static-user-language-url');
        userLangUrlEl.innerHTML = urlReportedFrom;
    }
    
    let userLangObj = {
        value : userLang,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom,
    }

    window.localStorage.setItem('userLanguage', JSON.stringify(userLangObj));
}

function reportCookiesOn() {
    let isEnabled = navigator.cookieEnabled;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');

    if(inReporterPage){
        let cookiesOnEl = document.getElementById('static-cookies-on');
        cookiesOnEl.innerHTML = isEnabled;

        let cookiesOnTimeEl = document.getElementById('static-cookies-on-time');
        cookiesOnTimeEl.innerHTML = timeReported; 

        let cookiesOnTimeUrlEl = document.getElementById('static-cookies-on-url');
        cookiesOnTimeUrlEl.innerHTML = urlReportedFrom;
    }

    let cookiesOnObj = {
        value : isEnabled,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('cookiesOn', JSON.stringify(cookiesOnObj));
}

function reportJavascriptOn() {
    let noScriptPEl = document.querySelector('.test-js-on-p');

    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;
    let enabled = false;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    
    let javascriptOnEl = document.querySelector('.test-javascript-on');
    let javascriptOnVal = '' + javascriptOnEl.value;
    if(javascriptOnVal == 'undefined'){
        enabled = true;
    }
    
    if(inReporterPage){
        javascriptOnEl.innerHTML = enabled;

        let javascriptOnTimeEl = document.getElementById('static-javascript-on-time');
        javascriptOnTimeEl.innerHTML = timeReported;

        let javascriptOnUrlEl = document.getElementById('static-javascript-on-url');
        javascriptOnUrlEl.innerHTML = urlReportedFrom;
    }

    let javascriptOnObj = {
        value : enabled,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom 
    }

    window.localStorage.setItem('javascriptOn', JSON.stringify(javascriptOnObj));

    return enabled;
}

function reportImagesOn() {
    let imagesOnImageEl = document.querySelector('.test-image-on');
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;
    let enabled = imagesOnImageEl.naturalWidth > 0 ? true : false;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');

    if(inReporterPage){
        imagesOnImageEl.outerHTML = enabled;

        let imagesOnTimeEl = document.getElementById('static-images-on-time');
        imagesOnTimeEl.innerHTML = timeReported;
        
        let imagesOnUrlEl = document.getElementById('static-images-on-url');
        imagesOnUrlEl.innerHTML = urlReportedFrom;
    }
    else{
        imagesOnImageEl.outerHTML = '';
    }

    let imagesOnObj = {
        value : enabled,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('imagesOn', JSON.stringify(imagesOnObj));

    return enabled;
}

function reportCSSOn(){

    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    let cssOnImageEl = document.querySelector('.test-css-on');
    let enabled = (cssOnImageEl.width == 123456 && cssOnImageEl.height == 654321) ? true : false;

    if(inReporterPage){
        cssOnImageEl.outerHTML = enabled;

        let cssOnTimeEl = document.getElementById('static-css-on-time');
        cssOnTimeEl.innerHTML = timeReported;

        let cssOnUrlEl = document.getElementById('static-css-on-url');
        cssOnUrlEl.innerHTML = urlReportedFrom;
    }
    else{
        cssOnImageEl.outerHTML = '';
    }

    let cssOnObj = {
        value : enabled,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('cssOn', JSON.stringify(cssOnObj));
}

function reportAvailableScreenDimensions() {
    let availWidth = screen.width;
    let availHeight = screen.height;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');

    if(inReporterPage){
        let availScreenDimEl = document.getElementById('static-avail-screen-dim');
        availScreenDimEl.innerHTML = 'Width: ' + availWidth + ', Height: ' + availHeight;

        let availScreenDimTimeEl = document.getElementById('static-avail-screen-dim-time');
        availScreenDimTimeEl.innerHTML = timeReported;

        let availScreenDimUrlEl = document.getElementById('static-avail-screen-dim-url');
        availScreenDimUrlEl.innerHTML = urlReportedFrom;
    }

    let availScreenDimObj = {
        width : availWidth,
        height : availHeight,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('availableScreenDimensions', JSON.stringify(availScreenDimObj));
    let bothVal = [availWidth, availHeight];
    return bothVal;
}

function reportWindowSize() {
    let windowWidth = window.outerWidth;
    let windowHeight = window.outerHeight;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage) {
        let windowSizeEl = document.getElementById('static-window-size');
        windowSizeEl.innerHTML = 'Width: ' + windowWidth + ", Height: " + windowHeight;

        let windowSizeTimeEl = document.getElementById('static-window-size-time');
        windowSizeTimeEl.innerHTML = timeReported;

        let windowSizeUrlEl = document.getElementById('static-window-size-url');
        windowSizeUrlEl.innerHTML = urlReportedFrom;
    }

    let windowSizeObj = {
        width : windowWidth,
        height : windowHeight,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('windowSize', JSON.stringify(windowSizeObj));

    let bothVal = [windowWidth, windowHeight];
    return bothVal;
}

function reportEffectiveConnectionType() {
    let effConnType = navigator.connection.effectiveType;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage) {
        let effectiveConnectionTypeEl = document.getElementById('static-effective-connection-type');
        effectiveConnectionTypeEl.innerHTML = effConnType;

        let effectiveConnectionTypeTimeEl = document.getElementById('static-effective-connection-type-time');
        effectiveConnectionTypeTimeEl.innerHTML = timeReported;

        let effectiveConnectionTypeUrlEl = document.getElementById('static-effective-connection-type-url');
        effectiveConnectionTypeUrlEl.innerHTML = urlReportedFrom;
    }

    let effectiveConnectionTypeObj = {
        value : effConnType,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('effectiveConnectionType', JSON.stringify(effectiveConnectionTypeObj));
}

function reportPerformanceData() {
    reportNavStart();
    reportUnloadEventStart();
    reportUnloadEventEnd();
    reportRedirectStart();
    reportRedirectEnd();
    reportFetchStart();
    reportDomainLookupStart();
    reportDomainLookupEnd();
    reportConnectStart();
    reportConnectEnd();
    reportSecureConnectionStart();
    reportRequestStart();
    reportResponseStart();
    reportResponseEnd();
    reportDOMLoading();
    reportDOMInteractive();
    reportDOMContentLoadedEventStart();
    reportDOMContentLoadedEventEnd();
    reportDOMComplete();
    reportLoadEventStart();
    reportLoadEventEnd();
}

function reportNavStart() {
    let result = performance.timing.navigationStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;


    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-nav-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('navStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportUnloadEventStart() {
    let result = performance.timing.unloadEventStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;


    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-unload-event-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('unloadEventStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportUnloadEventEnd() {
    let result = performance.timing.unloadEventEnd;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;


    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-unload-event-end');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('unloadEventEnd-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportRedirectStart() {
    let result = performance.timing.redirectStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-redirect-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('redirectStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}
function reportRedirectEnd() {
    let result = performance.timing.redirectEnd;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-redirect-end');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('redirectEnd-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportFetchStart() {
    let result = performance.timing.fetchStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-fetch-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('fetchStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportDomainLookupStart() {
    let result = performance.timing.domainLookupStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-domain-lookup-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('domainLookupStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportDomainLookupEnd() {
    let result = performance.timing.domainLookupEnd;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-domain-lookup-end');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('domainLookupEnd-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportConnectStart() {
    let result = performance.timing.connectStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-connect-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('connectStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportConnectEnd() {
    let result = performance.timing.connectEnd;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-connect-end');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('connectEnd-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));

}

function reportSecureConnectionStart() {
    let result = performance.timing.secureConnectionStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-secure-connection-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('secureConnectionStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportRequestStart() {
    let result = performance.timing.requestStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-request-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('requestStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportResponseStart() {
    let result = performance.timing.responseStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-response-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('responseStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportResponseEnd() {
    let result = performance.timing.responseEnd;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-response-end');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('responseEnd-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));

}

function reportDOMLoading() {
    let result = performance.timing.domLoading;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-dom-loading');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('domLoading-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportDOMInteractive() {
    let result = performance.timing.domInteractive;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-dom-interactive');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('domInteractive-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));

}

function reportDOMContentLoadedEventStart() {
    let result = performance.timing.domContentLoadedEventStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-dom-content-loaded-event-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('domContentLoadedEventStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportDOMContentLoadedEventEnd() {
    let result = performance.timing.domContentLoadedEventEnd;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-dom-content-loaded-event-end');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('domContentLoadedEventEnd-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportDOMComplete() {
    let result = performance.timing.domContentLoadedEventEnd;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-dom-complete');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('domContentLoadedEventEnd-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));
}

function reportLoadEventStart() {
    let result = performance.timing.loadEventStart;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-load-event-start');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('loadEventStart-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));

}

function reportLoadEventEnd() {
    let result = performance.timing.loadEventEnd;
    let timeReported = new Date().toTimeString();
    let urlReportedFrom = window.location.href;

    let inReporterPage = urlReportedFrom.includes('reporter_test.html');
    if(inReporterPage){
        let el = document.getElementById('perf-load-event-end');
        el.innerHTML = result;
    }

    let obj = {
        value : result,
        timeAcquired : timeReported,
        urlAcquired : urlReportedFrom
    }

    window.localStorage.setItem('loadEventEnd-' + timeReported + '-' + urlReportedFrom, JSON.stringify(obj));

}




//Final
window.addEventListener('DOMContentLoaded', loadHandler);