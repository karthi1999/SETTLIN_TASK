
const setCookie = (session_uuid) => {
  // Set expiration time to one day from now
  const expirationTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  // Create a cookie string
  const cookieString = `wt_s_id=${session_uuid};; expires=${expirationTime.toUTCString()}; path=/`;

  // Set the cookie
  document.cookie = cookieString;
}

export default setCookie;
