import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Wrapper from "../Common/Wrapper";
import FlexWrapper from "../Layouts/FlexWrapper";
import Text from "../Typography/Text";
function ReadingCard({ count }) {
    return (
        <React.Fragment>
            <Wrapper>
                <FlexWrapper type={1}>
                    <div>
                        <Image
                            src="/assets/images/book.png"
                            width={48}
                            height={48}
                            alt="book"
                        />
                    </div>
                    <div className="flex-1">
                        <Text type={4}>Reading: {count}</Text>
                    </div>
                    <div>
                        <Link href="/readings">
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

export default ReadingCard;
