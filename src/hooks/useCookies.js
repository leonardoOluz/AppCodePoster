export const useCookies = () => {
    /* eslint-disable no-undef */
    const setCookie = (acessToken) => {
        document.cookie = `appCodePoster=${acessToken};path=/`;
    }

    const getCookie = () => {
        return document.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith(`appCodePoster=`))
            ?.split('=')[1];
    }

    const removeCookie = () => {
        document.cookie = `appCodePoster=; expires=Thu, 01 Jan 1970 00:00:00`;
    }

    return {
        setCookie,
        getCookie,
        removeCookie,
    };

}