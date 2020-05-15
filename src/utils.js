export function toLocaleString(num) {
    if(typeof((num-0)) === 'number') {
        return (num-0).toLocaleString('en-US')
    } else {
        return
    }
} 

export function resetLocaleString(str) {
    return str.split(',').join('') - 0
}

export function pxTovw(px) {
    return px / 1080 *  window.innerWidth * 0.5625
}
