import { ElMessageBox, ElMessage } from 'element-plus'

export const message = (msg, type) => {
    ElMessage({
        message: msg,
        type
    })
}

export const messageBox = (msg, func) => {
    ElMessageBox.confirm(
        msg,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            func()
        })
}