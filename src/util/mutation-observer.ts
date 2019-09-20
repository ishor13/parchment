let mutationObserverType: typeof MutationObserver = MutationObserver;

export function getMutationObserverType(): typeof MutationObserver {
	return mutationObserverType;
}

export function setMutationObserverType(overrideType: typeof MutationObserver): void {
	mutationObserverType = overrideType;
}
