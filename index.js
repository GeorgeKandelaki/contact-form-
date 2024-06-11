const inputs = document.querySelectorAll("input");
const btnSubmit = document.querySelector(".submit");

const inputsArr = Array.from(inputs);
const checkBoxes = inputsArr.filter((inp) =>
	inp.classList.contains("checkbox")
);

const successBox = document.querySelector(".success-box");
const labelCb = document.querySelector(".cb-error");
const cbConsent = document.querySelector("#consent");

// This function toggles the error message and styling based on the type ('add' or 'remove')
const toggleError = (el, type, message = "") => {
	el.classList[type]("error-input");
	const errorEl = el.parentElement.querySelector(".error");
	if (errorEl) errorEl.textContent = message;
};

// This function checks if an input field is blank, toggles the error, and returns a boolean
const checkBlank = (el) => {
	if (el.value.trim() === "") {
		toggleError(el, "add", "This field is required");
		return true;
	}
	toggleError(el, "remove");
	return false;
};

// This function validates the email format and toggles the error
const validateEmail = (inp) => {
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!inp.value.match(mailformat)) {
		toggleError(inp, "add", "Please enter a valid email address");
		return false;
	}
	toggleError(inp, "remove");
	return true;
};

// This function unchecks all checkboxes in the array
const uncheck = (cbs) => cbs.forEach((cb) => (cb.checked = false));

// This function sets the error message for a label
const setError = (label, message = "") => {
	label.textContent = message;
};

// This function checks if any checkbox is checked and if consent is given, and sets error messages accordingly
const checkCb = (cbs, consent) => {
	let isValid = true;
	const consentErrorLabel = consent.parentElement.nextElementSibling;

	const isChecked = cbs.some((cb) => cb.checked);
	if (!isChecked) {
		setError(labelCb, "Please select at least one checkbox");
		isValid = false;
	} else {
		setError(labelCb);
	}

	if (!consent.checked) {
		setError(
			consentErrorLabel,
			"To submit this form, please consent to being contacted"
		);
		isValid = false;
	} else {
		setError(consentErrorLabel);
	}

	return isValid;
};

// This function shows the success message modal
const showSuccess = (el) => {
	el.classList.add("modal-active");
	setTimeout(() => el.classList.remove("modal-active"), 3000);
};

// Event listener for checkbox interactions
document.querySelector(".query").addEventListener("click", (e) => {
	uncheck(checkBoxes);
	if (e.target.classList.contains("checkbox")) e.target.checked = true;
});

// Event listener for form submission
btnSubmit.addEventListener("click", (e) => {
	e.preventDefault();

	let formIsValid = true;

	// Validate text and email inputs
	inputs.forEach((inp) => {
		if (inp.type === "text" || inp.type === "email") {
			if (checkBlank(inp)) formIsValid = false;
			if (inp.type === "email" && !validateEmail(inp))
				formIsValid = false;
		}
	});

	// Validate checkboxes and consent
	if (!checkCb(checkBoxes, cbConsent)) formIsValid = false;

	// If the form is valid, show the success message
	if (formIsValid) showSuccess(successBox);
});
