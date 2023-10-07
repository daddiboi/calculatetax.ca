// analytics.js

(function (window, document, script, url, r, tag, firstScriptTag) {
    window['GoogleAnalyticsObject'] = r;
    window[r] = window[r] || function () {
      (window[r].q = window[r].q || []).push(arguments);
    };
    window[r].l = 1 * new Date();
    tag = document.createElement(script),
    firstScriptTag = document.getElementsByTagName(script)[0];
    tag.async = 1;
    tag.src = url;
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  );
  
  ga('create', 'G-4FNBKBKNHX', 'auto');
  ga('send', 'pageview');


  //2. Obtain Google Analytics Tracking ID:
  //Replace 'UA-XXXXXXXXX-Y' with your actual Google Analytics Tracking ID.