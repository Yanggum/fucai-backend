function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])([A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){8,}$/;
    return re.test(password);
}

function validateRegisterInput(data) {
    const errors = {};

    if (!validateEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (!validatePassword(data.password)) {
        errors.password = 'Password is invalid';
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
        throw errors;
    }
}

module.exports = {
    validateEmail,
    validatePassword,
    validateRegisterInput
};
