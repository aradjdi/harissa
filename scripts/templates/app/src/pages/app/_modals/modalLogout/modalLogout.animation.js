import $ from 'jquery';
import { TweenLite, TimelineLite } from 'gsap';

const fadeIn = $element => TweenLite.from($element, 0.3, { backgroundColor: 'rgba(18, 30, 46, 0)' });

const fadeOut = $element => TweenLite.to($element, 0.3, { backgroundColor: 'rgba(18, 30, 46, 0)' });

const scaleIn = $element => TweenLite.from($element, 0.3, { scaleX: 0, scaleY: 0, opacity: 0 });

const scaleOut = $element => TweenLite.to($element, 0.3, { scaleX: 0, scaleY: 0, opacity: 0 });

const animateIn = ($element, onComplete) => {
  const modalBlockout = $('.modal-logout-blockout', $element);
  const modalContent = $('.modal-logout-content', $element);

  const timeline = new TimelineLite({ onComplete });
  timeline.add(fadeIn(modalBlockout), 0);
  timeline.add(scaleIn(modalContent), 0.1);
  timeline.play();
};

const animateOut = ($element, onComplete) => {
  const modalBlockout = $('.modal-logout-blockout', $element);
  const modalContent = $('.modal-logout-content', $element);

  const timeline = new TimelineLite({ onComplete });
  timeline.add(scaleOut(modalContent), 0);
  timeline.add(fadeOut(modalBlockout), 0.1);
  timeline.play();
};

export default function modalLogoutAnimation() {
  return {
    enter: animateIn,
    leave: animateOut,
  };
}
