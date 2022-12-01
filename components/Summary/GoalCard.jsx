import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wrapper from "../Common/Wrapper";
import FlexWrapper from "../Layouts/FlexWrapper";
import Text from "../Typography/Text";
function GoalCard({ count }) {
    return (
        <React.Fragment>
            <Wrapper>
                <FlexWrapper type={1}>
                    <div>
                        <Image
                            src="/assets/images/target.png"
                            width={50}
                            height={50}
                            alt="target"
                        />
                    </div>
                    <div className="flex-1">
                        <Text type={4}>Unaccomplished: {count}</Text>
                    </div>
                    <div>
                        <Link href="/goals">
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

export default GoalCard;
