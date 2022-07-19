import { ElMessage } from 'element-plus'

export const message = (msg, type) => {
    ElMessage({
        message: msg,
        type
    })
}