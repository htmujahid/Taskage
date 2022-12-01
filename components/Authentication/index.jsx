import React, { useState } from "react";
import Link from "next/link";

import { signIn } from "next-auth/react";

import Brandmark from "../common/Brandmark";

import FormWrapper from "../Form/FormWrapper";
import Form from "../Form/Form";
import Password from "../Form/Password";
import Email from "../Form/Email";
import Checkbox from "../Form/Checkbox";
import Submit from "../Form/Submit";
import LinkButton from "../Typography/LinkButton";
import Text from "../Typography/Text";
import Heading from "../Typography/Heading";
import Wrapper from "./Wrapper";
import FullScreen from "../Common/FullScreen";
import Full from "../Common/Full";

function index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            return;
        }

        const user = {
            email,
            password,
        };

        const result = await signIn("credentials", {
            redirect: false,
            email: user.email,
            password: user.password,
        });

        if (result.error) {
            alert("Invalid credentials");
        }
    }

    return (
        <FullScreen>
            <Brandmark className={"mb-32 opacity-50"} />
            <Wrapper>
                <Heading type={1}>Sign in to your account</Heading>
                <Form onSubmit={handleSubmit}>
                    <Email
                        email={email}
                        setEmail={setEmail}
                        placeholder="Email"
                        required
                    />
                    <Password
                        password={password}
                        setPassword={setPassword}
                        placeholder="Password"
                        required
                    />

                    <FormWrapper type={1} className="mb-3">
                        <Full>
                            <Checkbox
                                check={remember}
                                setCheck={setRemember}
                                label="Remember me"
                            />
                        </Full>
                        <Full className={"text-right"}>
                            <LinkButton href="/">Forget Password?</LinkButton>
                        </Full>
                    </FormWrapper>
                    <Full className="w-full mb-3">
                        <Submit>Log in</Submit>
                    </Full>
                    <Full>
                        <Text type={2}>
                            Don’t have an account yet?{" "}
                            <LinkButton href="signup">Sign up</LinkButton>
                        </Text>
                    </Full>
                </Form>
            </Wrapper>
        </FullScreen>
    );
}

export default index;
