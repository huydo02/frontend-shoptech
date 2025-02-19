import { Alert, Button, Flex, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
const ChatBotAI = () => {
    const [openChat, setOpenChat] = useState(true);
    const inputRef = useRef();
    const [chatMessage, setChatMessage] = useState([]);
    const userInfo = useSelector((state) => state.auth.userInfo || []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = inputRef.current?.value
        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
        }
        const newMessage = { role: "user", content };
        console.log(newMessage)
        setChatMessage((prev) => [...prev, newMessage]);
        try {
            const res = await fetch("https://backend-shoptech.onrender.com/chat/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ message: content }),
            });
            const data = await res.json();
            if (data.status === 200) {
                const assistantMessage = { role: "assistant", content: data.response };
                console.log(data)
                setChatMessage((prev) => [...prev, assistantMessage]);
            } else {
                // AlertError('Thêm sản phẩm không thành công.');
            }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    console.log(inputRef)


    return (
        <>
            <div className='chatbot-icon-modal' onClick={() => setOpenChat(!openChat)}>
                <Tooltip title="Trợ lý AI" placement="left" color={'red'} key={'red'} style={{ zIndex: 119999 }}>
                    <img src="https://thumbs.dreamstime.com/b/chatbot-icon-vector-support-collection-thin-line-outline-illustration-linear-symbol-use-web-mobile-apps-logo-print-142853010.jpg"
                        alt="" style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                </Tooltip>

            </div>
            <div className={`box-message-ai ${openChat ? '' : 'show'} `}>
                <div className='box-message-ai__top'>
                    <div className='box__logo' style={{ display: 'flex', alignItems: 'center' }}>

                        <img
                            src="https://lienquan.garena.vn/wp-content/uploads/2024/05/25e974e952adeaf416ea2bf3c751f7c05a4df884a0bf41.jpg"
                            alt=""
                            style={{ width: '35px', height: '35px', borderRadius: '50%', marginRight: 5 }}

                        />
                        <div>
                            <h1><b>Trợ lý ảo Teeme</b></h1>
                            <h1 style={{ fontSize: 11, color: '#f2f2f2' }}>Giải đáp mọi câu hỏi về công nghệ</h1>
                        </div>
                    </div>
                    <div className='box__close' onClick={() => setOpenChat(true)}>
                        <CloseOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
                    </div>
                </div>
                <div className='box-message-ai__center'>
                    {userInfo.length <= 0 ? (
                        <Flex justify={'center'} align={'center'}>
                            <Alert
                                style={{ marginTop: 20 }}
                                message="Chatbot"
                                description="Bạn cần đăng nhập để dùng tính năng này"
                                type="warning"
                                showIcon
                            />
                        </Flex>
                    ) : (
                        (userInfo?.chat || []).concat(chatMessage).map((chat, index) => (
                            // (chat.role === 'user')
                            chat.role === 'user' ? (
                                <div className='message__role-chat' key={index} style={{ flexDirection: 'row-reverse' }}>
                                    <div className='message__role-chat__avatar'>
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfD7wShELxTwempY89oORR9opWTBU-xKu-Cw&s"
                                            alt=""
                                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                        />
                                    </div>
                                    <div className='message__role-chat__input' style={{
                                        marginRight: 3,
                                        //  color: 'white', backgroundColor: "#1aa3ff"
                                    }}>
                                        {chat.content}
                                    </div>
                                </div>
                            ) : (
                                <div className='message__role-chat' key={index}>
                                    <div className='message__role-chat__avatar'>
                                        <img
                                            src="https://lienquan.garena.vn/wp-content/uploads/2024/05/25e974e952adeaf416ea2bf3c751f7c05a4df884a0bf41.jpg"
                                            alt=""
                                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}

                                        />
                                    </div>
                                    <div className='message__role-chat__input' style={{ backgroundColor: '#f2f2f2', }}>
                                        {chat.content}
                                    </div>
                                </div>
                            )

                        ))
                    )}
                    { }


                </div>
                <div className='box-message-ai__bottom'>
                    {userInfo.length <= 0 ? (
                        null
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', Width: '100%', height: '100%', alignItems: 'center', justifyItems: 'center' }}>
                            <input type="text"
                                ref={inputRef}
                                name='message' placeholder='Hỏi trợ lý ảo Teeme để được tư vấn'
                            />
                            {/* <button type='submit'> <SendOutlined style={{ color: '#de1c32' }} /></button> */}
                            <Button htmlType="submit" type='submit' icon={<SendOutlined style={{ color: '#de1c32' }} />} />
                        </form>
                    )}

                </div>
            </div>
        </>

    )
}

export default ChatBotAI