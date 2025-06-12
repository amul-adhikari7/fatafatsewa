"use client";
import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Custom hook for debouncing function calls
 */
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * Custom hook for lazy loading images
 */
export function useLazyLoad(options = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsLoaded(true);
        observer.disconnect();
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isLoaded];
}

/**
 * Custom hook for measuring component render time
 */
export function useRenderTime(componentName) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      if (process.env.NODE_ENV === "development") {
        console.debug(`${componentName} render time: ${endTime - startTime}ms`);
      }
    };
  }, [componentName]);
}

/**
 * Cache manager for API responses and expensive computations
 */
export const ComputeCache = {
  _cache: new Map(),
  _maxSize: 100,

  get(key) {
    const item = this._cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this._cache.delete(key);
      return null;
    }

    return item.value;
  },

  set(key, value, ttlMs = 60000) {
    if (this._cache.size >= this._maxSize) {
      const firstKey = this._cache.keys().next().value;
      this._cache.delete(firstKey);
    }

    this._cache.set(key, {
      value,
      expiry: Date.now() + ttlMs,
    });
  },

  clear() {
    this._cache.clear();
  },
};

/**
 * Request throttler for API calls
 */
export const RequestThrottler = {
  _queue: new Map(),
  _inProgress: new Set(),
  _defaultDelay: 1000,

  async throttle(key, fn, delay = this._defaultDelay) {
    if (this._inProgress.has(key)) {
      return new Promise((resolve, reject) => {
        if (!this._queue.has(key)) {
          this._queue.set(key, []);
        }
        this._queue.get(key).push({ resolve, reject });
      });
    }

    try {
      this._inProgress.add(key);
      const result = await fn();

      setTimeout(() => {
        this._inProgress.delete(key);
        const pending = this._queue.get(key);
        if (pending) {
          pending.forEach(({ resolve }) => resolve(result));
          this._queue.delete(key);
        }
      }, delay);

      return result;
    } catch (error) {
      this._inProgress.delete(key);
      const pending = this._queue.get(key);
      if (pending) {
        pending.forEach(({ reject }) => reject(error));
        this._queue.delete(key);
      }
      throw error;
    }
  },
};
