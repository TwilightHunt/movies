import { UserDto } from '../dto/user.dto';

export const userTransformer = (userDto: UserDto) => {
  return {
    login: userDto.login,
    firstname: userDto.firstname,
    lastname: userDto.lastname,
  };
};
