let learningSession = {};

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

  return hoursMinutesSeconds.join(':');
}

function splitTime(time, target, option) {
  let timeSplit = time.split(':');
  switch (timeSplit.length) {
    case 2:
      timeSplit.unshift('00');
      break;

    case 3:
      break;

    default:
      console.log(timeSplit);
      break;
  }

  // console.log(timeSplit, target, option);

  // let dateFromBegin = new Date('1/1/1970 00:00:00');
  let dateFromBegin = new Date(target);
  // console.log(dateFromBegin);
  dateFromBegin.setHours(
    parseInt(timeSplit[0]),
    parseInt(timeSplit[1]),
    parseInt(timeSplit[2])
  );
  // console.log(dateFromBegin);

  switch (option) {
    case 'startLesson':
      // console.log(learningSession.startLesson);
      learningSession.startLesson = dateFromBegin.getTime();
      // console.log(learningSession.startLesson);
      break;

    case 'endLesson':
      // console.log(learningSession.startLesson);
      learningSession.endLesson = dateFromBegin.getTime();
      // console.log(learningSession.startLesson);
      break;

    case 'endComments':
      // console.log(learningSession.startLesson);
      learningSession.endComments = dateFromBegin.getTime();
      // console.log(learningSession.startLesson);
      break;

    default:
      break;
  }
}

function OnMessage(request, sender, sendResponse) {
  console.log(request, ' - ', sender.envType);
  // console.log(request.dataForLesson);

  switch (sender.envType) {
    case 'content_child':
      // console.log('Message from the content script: ' + request.greeting);
      console.log(request.method);

      switch (request.method) {
        case 'lessonInformation':
          learningSession = request.dataFromLesson;
          break;

        case 'lessonInformationUpdate':
          // learningSession = request.dataFromLesson;
          console.log(request.dataFromLesson);
          console.log(learningSession.linkLesson);
          console.log(request.dataFromLesson.linkLesson);

          if (
            learningSession.linkLesson === request.dataFromLesson.linkLesson &&
            learningSession.durationVideo !==
              request.dataFromLesson.durationVideo
          ) {
            learningSession.durationVideo =
              request.dataFromLesson.durationVideo;
            learningSession.stringDurationVideo =
              request.dataFromLesson.stringDurationVideo;
            console.log('update');
          }

          break;

        default:
          break;
      }

      //console.log(learningSession);
      sendResponse({
        response: 'Response from background script' + learningSession,
        method: 'method: + ' + request.method + ' info from back ',
        data: learningSession,
      });

      break;
    case 'addon_child':
      //console.log(learningSession);
      switch (request.method) {
        case 'startLesson-button':
          learningSession.startLesson = Date.now();
          break;

        case 'start_lesson-update-button':
          splitTime(
            request.dataForLesson.updateTime,
            learningSession.startLesson,
            'startLesson'
          );
          break;

        case 'endLesson-button':
          learningSession.endLesson = Date.now();
          break;

        case 'end_lesson-update-button':
          splitTime(
            request.dataForLesson.updateTime,
            learningSession.endLesson,
            'endLesson'
          );
          break;

        case 'endComments-button':
          learningSession.endComments = Date.now();
          break;

        case 'end_comments-update-button':
          splitTime(
            request.dataForLesson.updateTime,
            learningSession.endComments,
            'endComments'
          );
          break;

        case 'comments-update-button':
          learningSession.comments = request.dataForLesson.comments;
          break;

        case 'test-button':
          // learningSession.durationVideo = Date.now();
          //console.log(learningSession);
          learningSession = {};
          //console.log(learningSession);
          // //console.log(currentTime());
          // getHoursMinutesSeconds(currentTime());
          break;
        case 'save-button':
          saveJSON();
          function saveJSON() {
            //console.log('saveJson');
            //console.log(learningSession.startLesson);
            //console.log(learningSession.startLesson != undefined);
            if (learningSession.startLesson != undefined) {
              let pathFile = 'storageToolProductivity/';
              let fileName = pathFile + learningSession.startLesson + '.json';
              // Create a blob of the data
              // var fileToSave = new Blob([JSON.stringify(learningSession)], {
              //   type: 'application/json',
              // });
              // // Save the file
              // saveAs(fileToSave, fileName);
              // //console.log(JSON.stringify(learningSession, undefined, 2));
              browser.downloads.download({
                url: URL.createObjectURL(
                  new Blob([JSON.stringify(learningSession)], {
                    type: 'application/binary',
                  })
                ),
                filename: fileName,
                conflictAction: 'uniquify',
              });
              // window.open(
              //   URL.createObjectURL(
              //     new Blob([JSON.stringify(learningSession)], {
              //       type: 'application/binary',
              //     })
              //   )
              // );
              //console.log(fileName);
            } else {
              //console.log('startlesson sin data');
            }
          }
          break;

        default:
          break;
      }

      sendResponse({
        method: 'method: + ' + request.method + ' info from back ',
        data: learningSession,
      });

      break;

    default:
      sendResponse({
        response: 'Response from background script, without info from sender',
        method: 'method: + ' + request.method + ' info from back ',
        data: learningSession,
      });
      break;
  }
}

browser.runtime.onMessage.addListener(OnMessage);

// // function handleMessage(request, sender, sendResponse) {
// //   //console.log('Message from the content script: ' + request.greeting);
// //   //console.log(request.dataFromLesson);
// //   sendResponse({ response: 'Response from background script' });
// // }

// // browser.runtime.onMessage.addListener(handleMessage);

// function getInfoFromLearningPlatform(request, sender, sendResponse) {
//   if (request.method == 'getStatus') {
//     //console.log(request.data);
//     sendResponse({
//       method: 'method:info from back ',
//       data: 'data:info from back',
//     });
//   }
// }
// // browser.runtime.onMessage.addListener(getInfoFromLearningPlatform);

// // browser.runtime.onMessage.addListener(notify);

// // function notify(message) {
// //   //console.log('testnotification bg');
// //   browser.notifications.create({
// //     type: 'basic',
// //     iconUrl: browser.extension.getURL('link.png'),
// //     title: 'You clicked a link!',
// //     message: message.url,
// //   });
// // }

// // function letsDoThis(data) {
// //   browser.notifications.create({
// //     type: 'basic',
// //     title: 'ping',
// //     mesagge: 'yes we did it',
// //   });
// // }

// // browser.runtime.onMessage.addListener(letsDoThis);

// // 'use strict';
// // function onError(error) {
// //   console.error(`Error: ${error}`);
// // }

// // function sendMessageToTabs(tabs) {
// //   for (let tab of tabs) {
// //     browser.tabs
// //       .sendMessage(tab.id, { greeting: 'Hi from background script' })
// //       .then((response) => {
// //         //console.log('Message from the content script:');
// //         //console.log(response.response);
// //       })
// //       .catch(onError);
// //   }
// // }

// // browser.browserAction.onClicked.addListener(() => {
// //   browser.tabs
// //     .query({
// //       currentWindow: true,
// //       active: true,
// //     })
// //     .then(sendMessageToTabs)
// //     .catch(onError);
// // });
