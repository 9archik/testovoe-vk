import React, { useState, useEffect, useRef } from 'react';

// creating the custom useInterval hook
export function useInterval(callback: () => any, delay: number | null) {
	const savedCallback = useRef<() => any | null>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function func() {
			if (savedCallback?.current) savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(func, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}