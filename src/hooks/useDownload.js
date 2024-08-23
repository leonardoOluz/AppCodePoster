import { toPng, toSvg, toJpeg } from 'html-to-image';
import { useRef, useCallback } from 'react';

export const useDownload = () => {
    const ref = useRef(null)

    const clickPng = useCallback(() => {

        if (ref.current === null) {
            return
        }

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `my-projeto-code.png`
                link.href = dataUrl
                link.click()
            })
            .catch((error) => {
                console.log(error)
            })
    }, [ref])

    const clickJpeg = useCallback(() => {

        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `my-projeto-code.jpeg`
                link.href = dataUrl
                link.click()
            })
            .catch((error) => {
                console.log(error)
            })
    }, [ref])

    const clickJSvg = useCallback(() => {

        if (ref.current === null) {
            return
        }

        toSvg(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `my-projeto-code.svg`
                link.href = dataUrl
                link.click()
            })
            .catch((error) => {
                console.log(error)
            })
    }, [ref])

    return {
        clickPng,
        clickJpeg,
        clickJSvg,
        ref,
    }
}