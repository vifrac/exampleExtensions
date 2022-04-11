(function () {
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
  document.body.style.border = '5px solid red';
  learningSession.lesson = document.getElementsByClassName(
    'Header-course-info-content'
  );

  document.body.style.border = '5px solid green';

  learningSession.course = document.querySelector(
    '.Header-course-info-content a h2'
  );
  learningSession.lesson = document.querySelector('.Header-class-title h1');
  learningSession.duration = document.querySelector('.vjs-duration-display');
  learningSession.linkLesson = document.querySelector('.vjs-duration-display');
  learningSession.startLesson = Date.now();
  learningSession.startComments = Date.now();
  learningSession.endLesson = Date.now();
  // const Icon = document.querySelector('.Hero-badge img');
  // console.log(`Icon: ${Icon.src} ~ Cover: ${Cover.content}`);
  console.log(learningSession.course.textContent);
  console.log(learningSession.lesson.textContent);
  console.log(learningSession.duration.textContent);
  console.log(learningSession.duration.baseURI);
  console.log(learningSession.startLesson);
  console.log(learningSession.startComments);
  console.log(learningSession.endLesson);
  console.log(learningSession);
})();
