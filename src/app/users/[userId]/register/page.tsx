import { getUser } from "@/app/lib/actions/user.action";
import RegisterForm from "@/components/forms/registerForm";
import Image from "next/image";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamsProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="user"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />
          <p className="copyright py-12">
            © 2024 : sys_mng
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        width={1000}
        height={1000}
        alt="user"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;

/* 
  <div className='flex h-screen max-h-screen' >
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Image
          src={'/assets/icons/logo-full.svg'}
          alt='logo'
          height={1000}
          width={1000}
          className='mb-12 h-10- w-fit'
          />
        </div>
      </section>
    </div> */
