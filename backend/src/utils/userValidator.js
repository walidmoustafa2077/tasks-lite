
function IsExist(userEmail, userList) {
    return userList.some(user => user.email === userEmail);
}

function ValidateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function ValidatePassword(password) {
    // Password must be at least 6 characters long
    return password && password.length >= 6;
}

export { IsExist, ValidateEmail, ValidatePassword };
