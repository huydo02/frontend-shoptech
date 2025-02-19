import { Alert } from 'antd'
import Lottie from 'lottie-react'
import React from 'react'
import animation from '../../../loading/CatError.json'


const Error = () => {
    return (
        <>
            <section className="content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: "red" }}>
                <Alert
                    message="Không có quyền!"
                    description="Bạn không có quyền truy cập trang này. Vui lòng quay lại!"
                    type="error"
                    style={{ marginTop: 20 }}
                    showIcon

                />
                <div style={{ height: '100vh', marginTop: 20 }}>
                    <Lottie animationData={animation} style={{ width: 300 }} loop />
                </div>
            </section>
        </>
    )
}

export default Error