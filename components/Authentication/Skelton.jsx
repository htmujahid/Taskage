import React from "react";
import FullScreen from "@/components/Common/FullScreen";
import Brandmark from "@/components/Common/Brandmark";
import Wrapper from "./Wrapper";
function Skelton() {
    return (
        <FullScreen>
            <Brandmark className={"mb-32 opacity-50"} />
            <Wrapper className="animate-pulse">
                <div className="w-48 h-6 sm:h-8 bg-gray-200 rounded mb-6 mx-auto"></div>
                <div className="w-full h-11 bg-gray-100 rounded-lg mb-3 mx-auto"></div>
                {/* <Separator />
            <Form onSubmit={handleSubmit}>
                <Email
                    email={email}
                    setEmail={setEmail}
                    placeholder="Email"
                    required
                />
                <Full className="w-full mb-3">
                    <Submit isLoading={isLoading}>
                        Continue with Email
                    </Submit>
                </Full>
            </Form> */}
            </Wrapper>
        </FullScreen>
    );
}

export default Skelton;
