export const reset = (formData, initData) => {
    Object.keys(formData).forEach(item => {
        formData[item] = initData[item]
    })
}
