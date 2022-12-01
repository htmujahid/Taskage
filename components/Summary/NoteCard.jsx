import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wrapper from "../Common/Wrapper";
import FlexWrapper from "../Layouts/FlexWrapper";
import Text from "../Typography/Text";
function NoteCard({ count }) {
    return (
        <React.Fragment>
            <Wrapper>
                <FlexWrapper type={1}>
                    <div>
                        <Image
                            src="/assets/images/notes.png"
                            width={50}
                            height={50}
                            alt="notes"
                        />
                    </div>
                    <div className="flex-1">
                        <div>
                            <Text type={4}>Total: {count}</Text>
                        </div>
                    </div>
                    <div>
                        <Link href="/notes">
                            <Image
                                src="/assets/icons/linking.svg"
                                width={20}
                                height={20}
                                alt="linking"
                            />
                        </Link>
                    </div>
                </FlexWrapper>
            </Wrapper>
        </React.Fragment>
    );
}

export default NoteCard;
