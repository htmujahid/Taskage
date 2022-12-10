import React, { useState } from "react";

import { signIn } from "next-auth/react";

import Brandmark from "@/components/Common/Brandmark";

import Form from "@/components/Form/Form";
import Email from "@/components/Form/Email";
import Submit from "@/components/Form/Submit";
import Heading from "@/components/Typography/Heading";
import Wrapper from "./Wrapper";
import FullScreen from "@/components/Common/FullScreen";
import Full from "@/components/Common/Full";
import GoogleSignIn from "./GoogleSignIn";
import Separator from "./Separator";
import Notify from "./Notify";

function Signin() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim()) {
            return;
        }

        setIsLoading(true);
        const result = await signIn("email", {
            redirect: false,
            email: email,
        });
        setIsLoading(false);
        setNotify(true);
        if (result.error) {
            console.log(result.error);
        }
    }

    return (
        <FullScreen>
            <Brandmark className={"mb-32 opacity-50"} />
            {!notify ? (
                <Wrapper>
                    <Heading type={1} className="mb-6 text-center">
                        Sign in to your account
                    </Heading>
                    <GoogleSignIn />
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
            ) : (
                <Notify />
            )}
        </FullScreen>
    );
}

export default Signin;
