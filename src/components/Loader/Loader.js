import { TailSpin } from 'react-loader-spinner';

export function Loader () {
  return (
    <TailSpin
      height={150}
      width={150}
      color="#374fdd"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#162aa6"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  );
};