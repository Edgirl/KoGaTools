const PROFILE_PATH_MAIN = /^\/profile\/\d+\/$/;
const isMainProfilePage = PROFILE_PATH_MAIN.test(location.pathname);

const getHQImageURL = url => {
    return url.includes("placeholder")
        ? "https:" + url.slice(5, -2)
        .replace("medium_64x64", "large_330x451")
        .replace("medium_350x194", "large_600x240")
        : `https:${url.slice(5, -14).replace("cache","images")}.png`;
};