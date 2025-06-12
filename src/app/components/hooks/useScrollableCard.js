"use client";
import { useState, useCallback, useRef } from "react";

export const useScrollableCard = (onClick) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const startTimeRef = useRef(0);
  const isTouchActiveRef = useRef(false);

  // Constants for touch interaction
  const minSwipeDistance = 10; // Reduced to make scrolling more responsive
  const maxTapDuration = 200; // Maximum duration for a tap in milliseconds

  const onTouchStart = useCallback((e) => {
    isTouchActiveRef.current = true;
    startTimeRef.current = Date.now();
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      scrollLeft: e.currentTarget.scrollLeft,
    });
  }, []);

  const onTouchMove = useCallback(
    (e) => {
      if (!touchStart || !isTouchActiveRef.current) return;

      const xDiff = touchStart.x - e.targetTouches[0].clientX;
      const yDiff = Math.abs(touchStart.y - e.targetTouches[0].clientY);

      // If vertical movement is significant, let the browser handle it
      if (yDiff > Math.abs(xDiff)) return;

      // Prevent default only if horizontal scrolling
      e.preventDefault();
      const container = e.currentTarget;
      container.scrollLeft = touchStart.scrollLeft + xDiff;

      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    },
    [touchStart]
  );

  const onTouchEnd = useCallback(
    (e) => {
      if (!touchStart || !isTouchActiveRef.current) return;

      const touchDuration = Date.now() - startTimeRef.current;
      const isQuickTouch = touchDuration < maxTapDuration;

      if (!touchEnd) {
        // If no movement registered and it was a quick touch, treat as click
        if (isQuickTouch) {
          onClick(e);
        }
      } else {
        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        const isMinimalMovement =
          Math.abs(distanceX) < minSwipeDistance &&
          Math.abs(distanceY) < minSwipeDistance;

        // Trigger click only if it was a quick touch with minimal movement
        if (isQuickTouch && isMinimalMovement) {
          onClick(e);
        }
      }

      isTouchActiveRef.current = false;
      setTouchStart(null);
      setTouchEnd(null);
    },
    [touchStart, touchEnd, onClick]
  );

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      style: { touchAction: "pan-y pinch-zoom" },
    },
  };
};
