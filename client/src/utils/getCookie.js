// Function to get the value of a specific cookie by name
export default function getCookie(cookieName) {
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');

    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }

  // Return null if the cookie is not found
  return null;
}