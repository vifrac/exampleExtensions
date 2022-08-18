let currentLessonUpdate = {
  id: '',
  linkLesson: '',
  durationVideo: '',
  stringDurationVideo: '',
};

let learningSession = {
  id: '',
  platform: '',
  topic: '',
  course: '',
  linkLesson: '',
  lesson: '',
  durationVideo: '',
  stringDurationVideo: '',
  startLesson: '',
  comments: '',
  takeNotes: false,
};

function currentTime() {
  let time = Date.now();
  return time;
}

function getHoursMinutesSeconds(time) {
  let timeStamp = new Date(time);
  let hoursMinutesSeconds = ([hour, minutes, seconds] = [
    timeStamp.getHours(),
    timeStamp.getMinutes(),
    timeStamp.getSeconds(),
  ]);
  //console.log(hoursMinutesSeconds.join(':'));
  return hoursMinutesSeconds.join(':');
}

function splitTime(time, option) {
  // console.log(time);
  let timeSplit = time.split(':');
  switch (timeSplit.length) {
    case 2:
      timeSplit.unshift('00');
      break;

    case 3:
      break;

    default:
      break;
  }

  let dateFromBegin = new Date('1/1/1970 00:00:00');
  dateFromBegin.setHours(
    parseInt(timeSplit[0]),
    parseInt(timeSplit[1]),
    parseInt(timeSplit[2])
  );

  switch (option) {
    case 'loadDataOrigin':
      learningSession.durationVideo = dateFromBegin.getTime();
      break;
    case 'updateDurationVideo':
      currentLessonUpdate.durationVideo = dateFromBegin.getTime();
      return 'isUpdatedDurationVideo';

    default:
      break;
  }

  // console.log(option);
  // console.log(currentLessonUpdate.durationVideo);
}

(function () {
  let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(stateCheck);
      //console.log('document ready');

      // //console.log(document.readyState === 'complete');
      document.body.style.border = '5px solid green';

      infoTest = document.querySelector('.vjs-big-play-button');
      infoTest2 = document.querySelector(
        '#vjs_video_3 > div.vjs-control-bar > button.vjs-play-control.vjs-control'
      );

      //console.log(infoTest);
      //console.log(infoTest2);

      learningSession.course = document.querySelector(
        '.Header-course-info-content a h2'
      ).textContent;

      // learningSession.lesson = document.getElementsByClassName(
      //   'Header-course-info-content'
      // );

      learningSession.lesson = document.querySelector(
        '.Header-class-title h1'
      ).textContent;

      learningSession.stringDurationVideo = document.querySelector(
        '.vjs-duration-display'
      )?.textContent;

      // learningSession.linkLesson = document.querySelector(
      //   '.vjs-duration-display'
      // )?.baseURI;

      learningSession.linkLesson = window.location.href;
      learningSession.id = learningSession.linkLesson.replace(
        'https://platzi.com/clases',
        ''
      );

      learningSession.startLesson = Date.now();

      // const Icon = document.querySelector('.Hero-badge img');
      // //console.log(`Icon: ${Icon.src} ~ Cover: ${Cover.content}`);
      // //console.log(learningSession.course.textContent);
      // //console.log(learningSession.lesson);
      // //console.log(learningSession.duration.textContent);
      // //console.log(learningSession.duration.baseURI);
      // //console.log(learningSession.startLesson);
      // //console.log(learningSession.startComments);
      // //console.log(learningSession.endLesson);
      // //console.log(learningSession);

      function handleResponse(message) {
        //console.log(`Message from the background script:  ${message.response}`);
      }

      function handleError(error) {
        //console.log(`Error: ${error}`);
      }

      function notifyBackgroundPage(e) {
        // console.log(e);
        if (learningSession.stringDurationVideo != undefined) {
          splitTime(learningSession.stringDurationVideo, 'loadDataOrigin');
        }

        let dataObjectTranfer = {};
        let dataSession = '';
        let typeOfMethod = '';
        switch (e) {
          case 'loadDataOrigin':
            dataSession = JSON.parse(JSON.stringify(learningSession));
            typeOfMethod = 'lessonInformation';
            break;
          case 'updateDurationVideo':
            dataSession = JSON.parse(JSON.stringify(currentLessonUpdate));
            typeOfMethod = 'lessonInformationUpdate';
            break;

          default:
            break;
        }

        // console.log(JSON.stringify(dataSession));
        // console.log(typeOfMethod);

        // let dataSession = JSON.parse(JSON.stringify(learningSession));
        let sending = browser.runtime.sendMessage({
          greeting: 'Greeting from the content script',
          dataFromLesson: dataSession,
          method: typeOfMethod,
        });
        sending.then(handleResponse, handleError);
      }

      notifyBackgroundPage('loadDataOrigin');

      function sendDurationVideo() {
        currentLinkLesson = window.location.href;
        // validate if is same source of lesson
        // console.log(learningSession.linkLesson);
        // console.log(current.linkLesson);
        // console.log(learningSession.linkLesson === current.linkLesson);
        // if (learningSession.linkLesson === current.linkLesson) {
        //   //
        //   console.log(learningSession.linkLesson === current.linkLesson);
        // } else {
        //   console.log('no es la misma pagina');
        // }

        stringDurationVideoOrigin = learningSession.stringDurationVideo;
        stringDurationVideoOriginIsEmpty = false;
        videoOriginWithoutTime = false;

        // validar que no sea undefined, null, '', ' ',
        if (!stringDurationVideoOrigin?.trim()?.length > 0) {
          stringDurationVideoOriginIsEmpty = true;
        }

        //validar que no origen no tenga tiempos en '0:0'
        comparationTime = ['0', '00', '0:0', '0:00', '00:00', '00:00:00'];
        compareTime = (element) => element === stringDurationVideoOrigin;
        videoOriginWithoutTime = comparationTime.some(compareTime);

        // extraer tiempo actual del video
        stringDurationVideoUpdate = document.querySelector(
          '.vjs-duration-display'
        )?.textContent;

        // validar que el timepo tiene formato adecuado y es diferente del tiempo guardado previamente
        if (
          stringDurationVideoUpdate != undefined &&
          stringDurationVideoUpdate.includes(':') &&
          learningSession.stringDurationVideo !== stringDurationVideoUpdate
        ) {
          // console.log('tiene :');
          stringDurationArray = stringDurationVideoUpdate.split(':');

          isNumber = (n) => (isNaN(n) ? 0 : n);
          stringDurationIsnumber = stringDurationArray.reduce(
            (a, b) => isNumber(parseInt(a)) + isNumber(parseInt(b))
          );

          // console.log(
          //   learningSession.stringDurationVideo,
          //   stringDurationIsnumber,
          //   stringDurationVideoUpdate
          // );
          if (stringDurationIsnumber > 0) {
            // console.log('here');
            // 1. comprobar la carga del dato correcto en formato correcto
            // 2. enviar solo ese dato para actualizar solo el tiempo del video
            isUpdateDurationVideo = splitTime(
              stringDurationVideoUpdate,
              'updateDurationVideo'
            );

            // console.log('es....', isUpdateDurationVideo);

            if (isUpdateDurationVideo === 'isUpdatedDurationVideo') {
              currentLessonUpdate.id = currentLinkLesson.replace(
                'https://platzi.com/clases',
                ''
              );

              currentLessonUpdate.linkLesson = currentLinkLesson;
              currentLessonUpdate.stringDurationVideo =
                stringDurationVideoUpdate;
              notifyBackgroundPage('updateDurationVideo');
            }

            // console.log(JSON.stringify(currentLessonUpdate));
          }
        } else {
          console.log(
            'stringDurationVideoUpdate sin datos a actualizar',
            learningSession.stringDurationVideo,
            stringDurationVideoUpdate
          );
        }
      }

      window.addEventListener('click', sendDurationVideo);
    } else {
      //console.log('document is not ready');
    }
  }, 100);
})();
