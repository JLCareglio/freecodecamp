function initializeTestSuiteObserver(): void {
	const observer = new MutationObserver(
		(_mutations: MutationRecord[], obs: MutationObserver) => {
			const testSuiteSelector = document
				.querySelector("#fcc_test_suite_wrapper")
				?.shadowRoot?.querySelector(
					"#test-suite-selector",
				) as HTMLSelectElement | null;

			if (testSuiteSelector) {
				testSuiteSelector.value = "drum-machine";
				const changeEvent = new Event("change", { bubbles: true });
				testSuiteSelector.dispatchEvent(changeEvent);
				obs.disconnect();
			}
		},
	);

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
}

export default initializeTestSuiteObserver;
