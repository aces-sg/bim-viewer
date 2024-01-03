import React, { useState, useEffect } from "react";
import { API, Amplify } from "aws-amplify";
import { set, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { User } from "@/API";
import { getUser } from "@/graphql/queries";
import { getCurrentUser } from "@/components/Auth/auth";
import { updateUser, createUser } from "@/graphql/mutations";
import { awsConfig } from "@/awsConfig";

Amplify.configure(awsConfig);

interface UpdateUserInput {
  name: string;
  phone: string;
  email: string;
  company: string;
}

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const { register, handleSubmit, setValue } = useForm();

  async function getUserDetails() {
    try {
      let res = await getCurrentUser();
      let userDetails: any = await API.graphql({
        query: getUser,
        variables: {
          id: res.sub,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      setUser(userDetails.data.getUser);
    } catch (err) {
      console.log("failed to get user", err);
    }
  }

  async function updateUserInput(input: any) {
    try {
      let res: any = await API.graphql({
        query: updateUser,
        variables: {
          input: {
            ...input,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (err) {
      console.log("failed to update user", err);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("company", user.company);
      setValue("manager", user.manager);
      setValue("phone", user.phone);
      // Set other fields if necessary
    }
  }, [user, setValue]);

  return (
    <form onSubmit={handleSubmit(data => updateUserInput(data))}>
      <div className="bg-white w-full min-h-full">
        <div className="max-w-[600px] mx-auto px-[15px] py-[70px]">
          <h3 className="font-sans font-semibold text-[20px] leading-[30px] text-[#121212] text-center mb-[20px]">
            Account
          </h3>
          <div className="bg-[#fddb00] w-[60px] h-[60px] mx-auto mb-[20px] flex items-center justify-center rounded-full font-sans font-semibold text-[14px] leading-[21px] text-[#000] cursor-pointer">
            AN
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-[28px]">
            <div className="">
              <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
                Name<span className="text-[#dd0000]">*</span>
              </p>
              <div className="mb-[16px]">
                <input
                  type="text"
                  className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
                  placeholder="Name"
                  {...register("name")}
                />
              </div>
            </div>
            <div className="">
              <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
                Phone<span className="text-[#dd0000]">*</span>
              </p>
              <div className="mb-[16px]">
                <input
                  type="number"
                  className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
                  placeholder="Phone"
                  {...register("phone")}
                />
              </div>
            </div>
            <div className="">
              <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
                Email<span className="text-[#dd0000]">*</span>
              </p>
              <div className="mb-[16px]">
                <input
                  type="email"
                  className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
            </div>
            <div className="">
              <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
                Company UEN<span className="text-[#dd0000]">*</span>
              </p>
              <div className="mb-[16px]">
                <input
                  type="text"
                  className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
                  placeholder="Company UEN"
                  {...register("company")}
                />
              </div>
            </div>
            <div className="">
              <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
                Account Manager<span className="text-[#dd0000]">*</span>
              </p>
              <div className="mb-[16px]">
                <input
                  type="text"
                  className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
                  placeholder="Account Manager"
                  {...register("manager")}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-[56px] text-center bg-[#fddb00] rounded-full font-sans font-semibold text-[16px] leading-[24px] text-[#121212] mt-2"
          >
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default Account;
