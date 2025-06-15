const observer = new MutationObserver((_mutations, obs) => {
	const testSuiteSelector = document
		.querySelector("#fcc_test_suite_wrapper")
		?.shadowRoot?.querySelector("#test-suite-selector");

	if (testSuiteSelector) {
		testSuiteSelector.value = "javascript-calculator";
		const changeEvent = new Event("change", { bubbles: true });
		testSuiteSelector.dispatchEvent(changeEvent);
		obs.disconnect();
	}
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
});
