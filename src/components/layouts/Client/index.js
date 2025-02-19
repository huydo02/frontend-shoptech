import React from "react";
import Header from "./Header";
import Content from "./MainContent/Home";
import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom";
import '../../../asset/client.css';

import ClientLayout from "../../../layouts-routes/Client.layout";
import ChatBotAI from "./chatbot/chat";
const Client = () => {

    return (
        <>
            <div className="mainBody-theme">
                <Link href="" className="site-overlay" id="over-background"></Link>

                <div className="mainBody-theme-container">
                    <Header />
                    <main className="wrapperMain_content">
                        <ClientLayout />
                        <ChatBotAI />
                    </main>
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Client;