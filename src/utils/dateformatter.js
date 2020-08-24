export default function dateFormatter(date) {
    let dater = new Date(date)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dater)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dater)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dater)
    return `${da}-${mo}-${ye}`
}