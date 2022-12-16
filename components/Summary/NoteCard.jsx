import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Wrapper from "@/components/Common/Wrapper";
import FlexWrapper from "@/components/Layouts/FlexWrapper";
import Text from "@/components/Typography/Text";
function NoteTaking({ count }) {
    return (
        <React.Fragment>
            <Wrapper>
                <FlexWrapper type={1}>
                    <div>
                        <Image
                            src="/assets/images/notes.png"
                            width={48}
                            height={48}
                            alt="book"
                        />
                    </div>
                    <div className="flex-1">
                        <Text type={4}>Notes: {0}</Text>
                    </div>
                    <div>
                        <Link href="/app/notes">
                            <Image
                                src="/assets/icons/linking.svg"
                                width={16}
                                height={16}
                                alt="linking"
                            />
                        </Link>
                    </div>
                </FlexWrapper>
            </Wrapper>
        </React.Fragment>
    );
}

export default NoteTaking;
