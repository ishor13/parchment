let mutationObserverType: typeof MutationObserver = MutationObserver;

export function getMutationObserverType(): typeof MutationObserver {
	return mutationObserverType;
}

export function setMutationObserverType(overrideType: typeof MutationObserver): void {
	mutationObserverType = overrideType;
}

// Calling "setMutationObserverType" doesn't work as expected since Parchment is bundled with quill
if ('MutationObserverOverride' in window) {
	setMutationObserverType((window as any)['MutationObserverOverride']);
}
