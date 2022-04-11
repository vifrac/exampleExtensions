var App = App || {};
window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

App.popup = (() => {
  function init() {
    getCurrentTime();
    addEventHandlers();
    validateWebsite();
    insertData();
  }

  function getCurrentTime() {
    let learningSession = {
      platform: '',
      topic: '',
      linkLesson: '',
      leson: '',
      dutarionVideo: '',
      startLesson: '',
      endLesson: '',
      endComments: '',
    };

    const currentTime = new Date();
    document.getElementById('start_lesson').value = currentTime;
    document.getElementById('lesson').value = 'title of lesson';
  }

  function addEventHandlers() {
    // const logoEl = document.getElementById('logo-item');
    // logoEl.addEventListener('click', function () {
    //   window.open('https://codigofacilito.com/', '_blanck');
    // });
    // const linkEl = document.getElementById('goto-courses');
    // linkEl.addEventListener('click', function () {
    //   window.open('https://codigofacilito.com/courses', '_blanck');
    // });
  }

  function validateWebsite() {
    const errorDiv = document.getElementById('error');
    const currentWeb = document.getElementById('current-website');
    browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      console.log(url, ' - ', url.includes('platzi'));
      if (url.includes('platzi')) {
        errorDiv.className = '';
      } else {
        errorDiv.className = 'error';
      }
      currentWeb.innerHTML = url;
    });
  }

  function insertData() {
    let learningSession = {
      platform: '',
      topic: '',
      course: '',
      linkLesson: '',
      leson: '',
      dutarionVideo: '',
      startLesson: '',
      endLesson: '',
      endComments: '',
    };
  }

  init();
})();
