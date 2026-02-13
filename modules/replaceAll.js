export function replaceAllEl(element) {
    return String(element).replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
