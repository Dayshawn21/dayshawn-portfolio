# Motion refinement

Focal moment: selecting a SportApp stage draws its incoming connector in 320ms. The selected stage and reached connections remain visibly cobalt afterward. At tablet/phone widths the existing compact diagram omits connectors; stage selection and detail feedback still work.

Continuity: explanatory text settles by 4px over 220ms, beginning at readable 65% opacity. Explanations share a grid cell so the tallest one reserves space and selection does not shift following content. The sticky header uses a measured offset so section anchors remain visible. A 220ms underline and cobalt text identify the current section while scrolling.

Feedback: actionable arrow/download icons move only 2–3px on hover or keyboard focus with a fine pointer, using the existing 180ms feedback timing. Button colors and focus outlines remain intact.

Budget: no new dependencies, no looping effects, no repeated section entrances, no hidden default content. CSS handles animation. Passive scroll listeners batch at most one four-section measurement per animation frame; React updates only when the active section changes. Observers and listeners are cleaned up.

Accessibility: all pipeline controls remain native buttons; only the selected explanation is exposed to assistive technology. Reduced motion removes drawing, displacement, smooth scrolling and transitions while retaining immediate colors, selection and active-section indicators.

Assets: browser capture is unavailable and the public SportApp repository has no interface screenshots. No generated substitute or unsupported chart is used. Add real screenshots when supplied.
