import TweenLite from 'gsap';
import './pagesNavigation.scss';

const slideInForward = ($element, completeCallBack) => TweenLite.fromTo(
  $element, 0.3,
  { x: '100%', opacity: 1 },
  { x: '0%', opacity: 1, onComplete: completeCallBack },
);
const slideOutForward = ($element, completeCallBack) => TweenLite.fromTo(
  $element, 0.3,
  { x: '0%', opacity: 1 },
  { x: '-10%', opacity: 0.7, onComplete: completeCallBack },
);
const slideInBackward = ($element, completeCallBack) => TweenLite.fromTo(
  $element, 0.3,
  { x: '-10%', opacity: 0.7 },
  { x: '0%', opacity: 1, onComplete: completeCallBack },
);
const slideOutBackward = ($element, completeCallBack) => TweenLite.fromTo(
  $element, 0.3,
  { x: '0%', opacity: 1 },
  { x: '100%', opacity: 1, onComplete: completeCallBack },
);

const animateIn = (direction, $element, done) => {
  if (direction === 'forward') slideInForward($element, done);
  else if (direction === 'backward') slideInBackward($element, done);
};
const animateOut = (direction, $element, done) => {
  if (direction === 'forward') slideOutForward($element, done);
  else if (direction === 'backward') slideOutBackward($element, done);
};

/** @ngInject */
function pagesNavigationAnimation($rootScope) {
  let direction = 'forward';
  $rootScope.$on('backward', () => { direction = 'backward'; });
  $rootScope.$on('forward', () => { direction = 'forward'; });

  const enter = ($element, done) => animateIn(direction, $element, done);
  const leave = ($element, done) => animateOut(direction, $element, done);
  const addClass = ($element, className, done) => {
    if (className === 'active') enter($element, done);
    else done();
  };
  const beforeRemoveClass = ($element, className, done) => {
    if (className === 'active') leave($element, done);
    else done();
  };

  return {
    enter, leave, addClass, beforeRemoveClass,
  };
}

/** @ngInject */
const handleStateChange = ($rootScope, $state) => {
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
    if ($state.previous === toState) $rootScope.$emit('backward');
    else $rootScope.$emit('forward');
    $state.previous = fromState;
  });
};

const pagesNavigationAnimationModule = angular
  .module('animations.pagesNavigationAnimation', [])
  .animation('.animation-pages-navigation', pagesNavigationAnimation)
  .run(handleStateChange)
  .name;

export default pagesNavigationAnimationModule;
