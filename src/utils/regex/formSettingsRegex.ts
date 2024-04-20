const regexUsername = /^(?!.*\.{2})[a-z0-9_]+(?:\.[a-z0-9_]+)*$/;
const regexWebSite = /^(https?:\/\/)?([\w-]+\.)*[\w-]+(\.[a-z]{2,})+(\.[a-z]{2,})?$/;


export { regexUsername, regexWebSite };