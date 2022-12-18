import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
function GoogleSignIn() {
    return (
        <button
            className="bg-gray-50 border border-gray-300 w-full h-11 mb-3 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none hover:bg-gray-100 flex items-center justify-center gap-2"
            onClick={() => signIn("google")}
        >
            <Image
                src="/assets/icons/google.svg"
                alt="google"
                width={24}
                height={24}
            />
            Continue with Google
        </button>
    );
}

export default GoogleSignIn;
