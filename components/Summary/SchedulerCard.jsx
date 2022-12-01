import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../Common/Wrapper";
import FlexWrapper from "../Layouts/FlexWrapper";
import Text from "../Typography/Text";

function TaskCard({ count }) {
    return (
        <React.Fragment>
            <Wrapper>
                <FlexWrapper type={1}>
                    <div>
                        <Image
                            src="/assets/images/schedule.png"
                            width={50}
                            height={50}
                            alt="schedule"
                        />
                    </div>
                    <div className="flex-1">
                        <Text type={4}>Pending: {count}</Text>
                    </div>
                    <div>
                        <Link href="/scheduler">
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

export default TaskCard;
