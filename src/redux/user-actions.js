export const setUserData = (payload) => ({ type: 'SET_USER_DATA', payload })
export const setUserError = (payload) => ({ type: 'SET_USER_ERROR', payload })

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        'max-age': 3600,
        ...options,
    }

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    for (const optionKey in options) {
        updatedCookie += `; ${optionKey}`
        const optionValue = options[optionKey]
        if (optionValue !== true) {
            updatedCookie += `=${optionValue}`
        }
    }

    document.cookie = updatedCookie
}

export function deleteCookie(name) {
    setCookie(name, '', {
        'max-age': -1,
    })
}

export const getUser = async (token) =>
    await fetch('https://blog.kata.academy/api/user', {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
        },
    }).then((res) => {
        if (res.ok) return res.json()
    })
