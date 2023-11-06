import React from "react";

const Account = () => {
  return (
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
              />
            </div>
          </div>
          <div className="">
            <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
              Company Ven<span className="text-[#dd0000]">*</span>
            </p>
            <div className="mb-[16px]">
              <input
                type="text"
                className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
                placeholder="Company Ven"
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
              />
            </div>
          </div>
          <div className="">
            <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
              Company Name<span className="text-[#dd0000]">*</span>
            </p>
            <div className="mb-[16px]">
              <input
                type="text"
                className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
                placeholder="Company Name"
              />
            </div>
          </div>
        </div>
        <div className="">
          <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
            Country<span className="text-[#dd0000]">*</span>
          </p>
          <div className="mb-[16px]">
            <input
              type="text"
              className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
              placeholder="Country"
            />
          </div>
        </div>
        <button className="w-full h-[56px] text-center bg-[#fddb00] rounded-full font-sans font-semibold text-[16px] leading-[24px] text-[#121212]">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Account;
