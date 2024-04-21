const regexUsername = /^(?!.*\.{2})[a-z0-9_]{3,30}$/;
const regexWebSite = /^(https?|ftp):\/\/[^\s/$.?#]+(\/[^\s]*)?$/;

export { regexUsername, regexWebSite };