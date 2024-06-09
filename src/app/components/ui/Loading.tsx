import Image from "next/image";

const Loading = (props: any) => {
  return (
    <Image src="load.svg" alt="Loading" width={25} height={25} {...props} />
  );
};

export default Loading;
