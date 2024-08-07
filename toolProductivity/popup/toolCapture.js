//console.log("toolCapture");
let paths = {
  rootUrl: "https://platzi.com",
  courseUrl: "/curso",
  lessonUrl: "/home/clases",
  testLessonUrl: "/2920-javascript-testing/47892-que-es-el-testing/",
};

let currentUrl;
function getCurrentWindowTabsA() {
  return browser.tabs.query({ currentWindow: true });
}

function openMyPage() {
  function getCurrentWindowTabs() {
    return browser.tabs.query({ currentWindow: true });
  }

  let tabIsActive = false;

  getCurrentWindowTabs().then((tabs) => {
    for (let tab of tabs) {
      if (!tabIsActive) {
        tabIsActive = tab.url.includes(paths.rootUrl + paths.lessonUrl)
          ? true
          : false;
      }
    }

    if (!tabIsActive) {
      browser.tabs.create({
        url: paths.rootUrl + paths.lessonUrl + paths.testLessonUrl,
      });
    }

    // let tabActive = tabs.find((element) => element.active === true);
    // currentUrl = tabActive.url.replace('https://platzi.com/clases', '');
  });
}
openMyPage();

dataForLesson = {};
updateTimeStamp = "";

function currentTime() {
  let time = Date.now();
  return time;
}

function getHoursMinutesSeconds(time) {
  let timeStamp = new Date(time);
  let hoursMinutesSeconds = ([hour, minutes, seconds] = [
    timeStamp.getHours().toString(),
    timeStamp.getMinutes().toString(),
    timeStamp.getSeconds().toString(),
  ]);

  let validateHoursMinutesSeconds = hoursMinutesSeconds.map((element) => {
    let validation = "0";
    return element.length < 2 ? validation.concat(element) : element;
  });

  return validateHoursMinutesSeconds.join(":");
}

function splitTime(time) {
  let timeSplit = time.split(":");
  switch (timeSplit.length) {
    case 2:
      timeSplit.unshift("00");
      break;

    case 3:
      break;

    default:
      //console.log(timeSplit);
      break;
  }

  let dateFromBegin = new Date("1/1/1970 00:00:00");
  dateFromBegin.setHours(
    parseInt(timeSplit[0]),
    parseInt(timeSplit[1]),
    parseInt(timeSplit[2])
  );

  dataForLesson.durationVideo = dateFromBegin.getTime();
  // return dataForLesson.durationVideo;
}

(() => {
  function notifyExtension(e) {
    //console.log(e);
    //console.log(e.target.id);
    if (e) {
      switch (e.target.id) {
        case "start_lesson-update-button":
          dataForLesson.updateTime =
            document.getElementById("start_lesson").value;
          break;
        case "end_lesson-update-button":
          dataForLesson.updateTime =
            document.getElementById("end_lesson").value;
          break;
        case "end_comments-update-button":
          dataForLesson.updateTime =
            document.getElementById("end_comments").value;
          break;
        case "comments-update-button":
          dataForLesson.comments = document.getElementById("comments").value;
          break;
        default:
          break;
      }
    }

    browser.runtime.sendMessage(
      { method: e.target.id, dataForLesson, currentUrl },
      function (res) {
        //console.log(res);
        dataForLesson = res.data;

        document.getElementById("course").value = dataForLesson.course;
        document.getElementById("lesson").value = dataForLesson.lesson;

        document.getElementById("duration_video").value =
          getHoursMinutesSeconds(dataForLesson.durationVideo);

        document.getElementById("start_lesson").value = getHoursMinutesSeconds(
          dataForLesson.startLesson
        );

        document.getElementById("end_lesson").value = getHoursMinutesSeconds(
          dataForLesson.endLesson
        );

        document.getElementById("end_comments").value = getHoursMinutesSeconds(
          dataForLesson.endComments
        );

        document.getElementById("comments").value = dataForLesson.comments;

        return true;
      }
    );
  }

  document
    .getElementById("platzi-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("duration_video-update-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("startLesson-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("start_lesson-update-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("endLesson-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("end_lesson-update-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("endComments-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("end_comments-update-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("comments-update-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("test-button")
    .addEventListener("click", notifyExtension);

  document
    .getElementById("save-button")
    .addEventListener("click", notifyExtension);

  // notifyExtension(e);

  // function notifyExtension(e) {
  //   if (e.target.tagName != 'A') {
  //     return;
  //   }
  //   //console.log('testnotification');
  //   browser.runtime.sendMessage({ url: e.target.href });
  // }

  // function handleResponse(message) {
  //   //console.log(`Message from the background script:  ${message.response}`);
  // }

  // function handleError(error) {
  //   //console.log(`Error: ${error}`);
  // }

  // function notifyBackgroundPage(e) {
  //   let sending = browser.runtime.sendMessage({
  //     greeting: 'Greeting from the content script from vifrac',
  //   });
  //   sending.then(handleResponse, handleError);
  // }

  // window.addEventListener('click', notifyBackgroundPage);
  // document
  //   .getElementById('platzi-button')
  //   .addEventListener('click', notifyBackgroundPage);

  // document.getElementById('platzi-button').addEventListener('click', function () {
  //   alert(132);
  //   browser.runtime.sendMessage({
  //     action: 'notify',
  //   });
  // });

  // var App = App || {};
  // window.browser = (function () {
  //   return window.msBrowser || window.browser || window.chrome;
  // })();

  // App.popup = (() => {
  //   function init() {
  //     getCurrentTime();
  //     addEventHandlers();
  //     validateWebsite();
  //     insertData();
  //   }

  //   function getCurrentTime() {
  //     let learningSession = {
  //       platform: '',
  //       topic: '',
  //       linkLesson: '',
  //       leson: '',
  //       dutarionVideo: '',
  //       startLesson: '',
  //       endLesson: '',
  //       endComments: '',
  //     };

  //     const currentTime = new Date();
  //     document.getElementById('start_lesson').value = currentTime;
  //     document.getElementById('lesson').value = 'title of lesson';
  //   }

  //   function addEventHandlers() {
  //     // const logoEl = document.getElementById('logo-item');
  //     // logoEl.addEventListener('click', function () {
  //     //   window.open('https://codigofacilito.com/', '_blanck');
  //     // });
  //     // const linkEl = document.getElementById('goto-courses');
  //     // linkEl.addEventListener('click', function () {
  //     //   window.open('https://codigofacilito.com/courses', '_blanck');
  //     // });
  //   }

  //   function validateWebsite() {
  //     const errorDiv = document.getElementById('error');
  //     const currentWeb = document.getElementById('current-website');
  //     browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  //       let url = tabs[0].url;
  //       //console.log(url, ' - ', url.includes('platzi'));
  //       if (url.includes('platzi')) {
  //         errorDiv.className = '';
  //       } else {
  //         errorDiv.className = 'error';
  //       }
  //       currentWeb.innerHTML = url;
  //     });
  //   }

  //   function insertData() {
  //     let learningSession = {
  //       platform: '',
  //       topic: '',
  //       course: '',
  //       linkLesson: '',
  //       leson: '',
  //       dutarionVideo: '',
  //       startLesson: '',
  //       endLesson: '',
  //       endComments: '',
  //     };
  //   }

  //   init();
  // })();

  function init() {
    started = { target: { id: "platzi-button" } };
    getCurrentWindowTabsA().then((res, rej) => {
      tabs = res;
      tabActive = tabs.find((element) => element.active === true);
      currentUrl = tabActive.url.replace(paths.rootUrl + paths.lessonUrl, "");
      started.target.test = currentUrl;
      notifyExtension(started);
    });
  }

  init();
})();
