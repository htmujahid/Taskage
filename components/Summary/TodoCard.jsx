import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../Common/Wrapper";
import FlexWrapper from "../Layouts/FlexWrapper";
import Text from "../Typography/Text";
function TodoCard({ count }) {
    return (
        <React.Fragment>
            <Wrapper>
                <FlexWrapper type={1}>
                    <div>
                        <Image
                            src="/assets/images/todo.png"
                            width={48}
                            height={48}
                            alt="todo"
                        />
                    </div>
                    <div className="flex-1">
                        <Text type={4}>Todo: {count}</Text>
                    </div>
                    <div>
                        <Link href="/todos">
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

export default TodoCard;
