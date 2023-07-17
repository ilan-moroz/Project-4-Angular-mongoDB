import { UserModel } from "../Models/Store";

// check if email or idNumber already exists in database
export const checkExistingUser = async (email: string, idNumber: number) => {
  const existingUser = await UserModel.findOne({
    $or: [{ email: email }, { idNumber: idNumber }],
  });
  return existingUser;
};
