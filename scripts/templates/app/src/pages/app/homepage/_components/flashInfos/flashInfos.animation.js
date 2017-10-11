import { TweenLite, TimelineLite, Linear } from 'gsap';

const scrollLeft = ($element, duration, startX) => TweenLite.fromTo(
  $element, duration,
  { x: `${startX}%` },
  { x: '-100%', ease: Linear.easeNone },
);

const animateIn = ($element) => {
  // Get children lenght
  const itemsLength = $element.children().length;

  // Set $element width
  $element.css('width', `${itemsLength * 100}%`);

  // Init Tween animation
  const scrollingTween = scrollLeft($element, 5 * itemsLength, 100 / itemsLength);

  // Init Timeline animation
  const timeline = new TimelineLite();
  // Repeat animation infinitly
  timeline.eventCallback('onComplete', timeline.restart);
  // Add scroll tween
  timeline.add(scrollingTween);
  // Start animation
  timeline.play();
};

export default function flashInfosAnimation() {
  const enter = ($element, done) => {
    animateIn($element);
    done();
  };

  return { enter };
}
