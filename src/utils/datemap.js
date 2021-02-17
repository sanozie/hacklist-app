/**
 * Returning date corresponding to set keys
 * @param {'week' | 'mon' | '3mon' | '6mon' } key
 */
export default function dateMap(key) {
    let date = new Date()
    let queryDate
    switch(key) {
        case 'week':
            queryDate = date.setDate(date.getDate() - 7)
            break;
        case 'mon':
            queryDate = date.setMonth(date.getMonth() - 1)
            break;
        case '3mon':
            queryDate = date.setMonth(date.getMonth() - 3)
            break;
        case '6mon':
            queryDate = date.setMonth(date.getMonth() - 6)
            break;
    }

    return queryDate
}
