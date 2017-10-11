import $ from 'jquery';
import { TweenLite, TimelineLite } from 'gsap';

const fadeIn = $element => TweenLite.from($element, 0.3, { backgroundColor: 'rgba(18, 30, 46, 0)' });

const fadeOut = $element => TweenLite.to($element, 0.3, { backgroundColor: 'rgba(18, 30, 46, 0)' });

const slideIn = $element => TweenLite.from($element, 0.3, { x: '-100%' });

const slideOut = $element => TweenLite.to($element, 0.3, { x: '-100%' });

const animateIn = ($element, onComplete) => {
  const modalBlockout = $('.modal-menu-blockout', $element);
  const modalContent = $('.modal-menu-content', $element);

  const timeline = new TimelineLite({ onComplete });
  timeline.add(fadeIn(modalBlockout), 0);
  timeline.add(slideIn(modalContent), 0.1);
  timeline.play();
};

const animateOut = ($element, onComplete) => {
  const modalBlockout = $('.modal-menu-blockout', $element);
  const modalContent = $('.modal-menu-content', $element);

  const timeline = new TimelineLite({ onComplete });
  timeline.add(slideOut(modalContent), 0);
  timeline.add(fadeOut(modalBlockout), 0.1);
  timeline.play();
};

export default function modalMenuAnimation() {
  return {
    enter: animateIn,
    leave: animateOut,
  };
}
