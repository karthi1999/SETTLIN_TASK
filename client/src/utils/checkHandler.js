// Email vaildation
const isValidEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
  return emailRegex.test(email);
};

// Phone number validation
const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export {
  isValidEmail,
  isValidPhone,
};
