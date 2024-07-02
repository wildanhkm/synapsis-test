import React, { FC } from 'react';

type ProfileImageProps = {
  name: string;
};

const ProfileImage: FC<ProfileImageProps> = ({ name }) => {
  const nameSplitted = name.split(' ');
  const firstNameInitial = nameSplitted[0] ? nameSplitted[0][0] : '';
  const lastNameInitial = nameSplitted[1] ? nameSplitted[1][0] : '';

  return (
    <span className="flex justify-center items-center w-[40px] h-[40px] bg-[brown] text-white text-lg rounded-full font-bold">
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};
export default ProfileImage;
