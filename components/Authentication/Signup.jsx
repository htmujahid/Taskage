import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Brandmark from "../Common/Brandmark";

import Input from "../Form/Input";
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
import GoogleSignIn from "./GoogleSignIn";
import Separator from "./Separator";

function SignupComponent() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [terms, setTerms] = useState(false);

    const router = useRouter();
    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !username.trim() ||
            !email.trim() ||
            !password.trim() ||
            !passwordConfirm.trim()
        ) {
            return;
        }

        if (password !== passwordConfirm) {
            return;
        }

        const user = {
            username,
            email,
            password,
        };

        await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((res) => {
            if (res.status === 201) {
                setUsername("");
                setEmail("");
                setPassword("");
                setPasswordConfirm("");
                router.push("/auth/login");
            } else if (res.status === 409) {
                alert("User already exists");
            } else if (res.status === 422) {
                alert("Invalid input");
            } else {
                alert("Something went wrong");
            }
        });
    }

    return (
        <FullScreen>
            <Brandmark className={"mb-32 opacity-50"} />

            <Wrapper>
                <Heading type={1} className="mb-6 text-center">
                    Sign up to your account
                </Heading>
                <GoogleSignIn />
                <Separator />
                <Form onSubmit={handleSubmit}>
                    <Input
                        text={username}
                        setText={setUsername}
                        placeholder="Username"
                        required
                    />
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
                    <Password
                        password={passwordConfirm}
                        setPassword={setPasswordConfirm}
                        placeholder="Confirm Password"
                        required
                    />
                    <Checkbox
                        label={"I accept the Terms and Conditions"}
                        check={terms}
                        setCheck={setTerms}
                        required
                    />
                    <Full className={"my-3"}>
                        <Submit>Sign up</Submit>
                    </Full>
                    <Text type={1}>
                        Already have an account?{" "}
                        <LinkButton href="login">Log in</LinkButton>
                    </Text>
                </Form>
            </Wrapper>
        </FullScreen>
    );
}

export default SignupComponent;
