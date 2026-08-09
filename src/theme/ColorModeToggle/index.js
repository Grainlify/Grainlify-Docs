/**
 * Swizzled from @docusaurus/theme-classic (eject) to replace Infima's instant
 * light/dark flip with the same diagonal-wipe, golden-glow View Transition
 * animation used by Grainlify-Frontend's useThemeToggleAnimation hook, so
 * the toggle feels like the same product across the app and the docs site.
 */
import React, {useRef} from 'react';
import clsx from 'clsx';
import {flushSync} from 'react-dom';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import IconSystemColorMode from '@theme/Icon/SystemColorMode';
import styles from './styles.module.css';

// The order of color modes is defined here, and can be customized with swizzle
function getNextColorMode(colorMode, respectPrefersColorScheme) {
  // 2-value transition
  if (!respectPrefersColorScheme) {
    return colorMode === 'dark' ? 'light' : 'dark';
  }
  // 3-value transition
  switch (colorMode) {
    case null:
      return 'light';
    case 'light':
      return 'dark';
    case 'dark':
      return null;
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}
function getColorModeLabel(colorMode) {
  switch (colorMode) {
    case null:
      return translate({
        message: 'system mode',
        id: 'theme.colorToggle.ariaLabel.mode.system',
        description: 'The name for the system color mode',
      });
    case 'light':
      return translate({
        message: 'light mode',
        id: 'theme.colorToggle.ariaLabel.mode.light',
        description: 'The name for the light color mode',
      });
    case 'dark':
      return translate({
        message: 'dark mode',
        id: 'theme.colorToggle.ariaLabel.mode.dark',
        description: 'The name for the dark color mode',
      });
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}
function getColorModeAriaLabel(colorMode) {
  return translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the color mode toggle',
    },
    {
      mode: getColorModeLabel(colorMode),
    },
  );
}
function CurrentColorModeIcon() {
  // 3 icons are always rendered for technical reasons
  // We use "data-theme-choice" to render the correct one
  // This must work even before React hydrates
  return (
    <>
      <IconLightMode
        aria-hidden
        className={clsx(styles.toggleIcon, styles.lightToggleIcon)}
      />
      <IconDarkMode
        aria-hidden
        className={clsx(styles.toggleIcon, styles.darkToggleIcon)}
      />
      <IconSystemColorMode
        aria-hidden
        className={clsx(styles.toggleIcon, styles.systemToggleIcon)}
      />
    </>
  );
}
// Brand gold, matches --ifm-color-primary / --gl-glass-border in custom.css.
const GLOW_COLOR = '201, 152, 58';

// easeOutExpo (easings.net) - the "expo-out" curve a diagonal wipe like this
// is usually paired with: fast start, long soft settle.
const EASE_OUT_EXPO = 'cubic-bezier(0.19, 1, 0.22, 1)';

function ColorModeToggle({
  className,
  buttonClassName,
  respectPrefersColorScheme,
  value,
  onChange,
}) {
  const isBrowser = useIsBrowser();
  const buttonRef = useRef(null);

  // Diagonal-wipe reveal: a triangle anchored at the top-left corner, its
  // two legs growing well past the viewport so the hypotenuse sweeps across
  // the screen as a straight diagonal edge before the triangle swallows it
  // whole. The gold glow is a `filter: drop-shadow()` on the pseudo-element
  // itself, not a separate DOM overlay - `::view-transition-*`
  // pseudo-elements render in the browser's top layer, above *any* normal
  // DOM node regardless of z-index, so a bare `<div>` glow would be
  // invisible for the whole transition.
  const handleClick = () => {
    const next = getNextColorMode(value, respectPrefersColorScheme);
    const supportsViewTransition =
      typeof document.startViewTransition === 'function';
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!buttonRef.current || !supportsViewTransition || prefersReducedMotion) {
      onChange(next);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        onChange(next);
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            'polygon(0% 0%, 0% 0%, 0% 0%)',
            'polygon(0% 0%, 100% 0%, 0% 100%)',
            'polygon(0% 0%, 200% 0%, 0% 200%)',
          ],
          filter: [
            `drop-shadow(0 0 0px rgba(${GLOW_COLOR}, 0))`,
            `drop-shadow(0 0 36px rgba(${GLOW_COLOR}, 0.55))`,
            `drop-shadow(0 0 8px rgba(${GLOW_COLOR}, 0))`,
          ],
        },
        {
          duration: 2000,
          easing: EASE_OUT_EXPO,
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        ref={buttonRef}
        className={clsx(
          'clean-btn',
          styles.toggleButton,
          !isBrowser && styles.toggleButtonDisabled,
          buttonClassName,
        )}
        type="button"
        onClick={handleClick}
        disabled={!isBrowser}
        title={getColorModeLabel(value)}
        aria-label={getColorModeAriaLabel(value)}>
        <CurrentColorModeIcon />
      </button>
    </div>
  );
}
export default React.memo(ColorModeToggle);
