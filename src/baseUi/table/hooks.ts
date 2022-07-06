import { ElMessage, ElMessageBox } from 'element-plus'

export const handleClose = (showFlag) => {
    ElMessageBox.confirm(
        '确保工作保存之后再关闭侧滑?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            showFlag.value = false
        })
}