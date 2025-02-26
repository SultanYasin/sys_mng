import { Button } from "@/components/ui/button";
import styles from "@/app/styles/Main/Main.module.css";
import Image from "next/image";
import UserForm from "@/components/forms/UserForm";
import Link from "next/link";
export default function Home() {

return (
  <div className="flex h-screen max-h-screen">
    {/*    {isAdmin && <PasskeyModal />} */}

    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[496px]">
        <Image
          src="/assets/icons/logo-full.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="mb-12 h-10 w-fit"
        />

        <UserForm />

        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 CarePluse
          </p>
          <Link href="/?admin=true" className="text-green-500">
            Admin
          </Link>
        </div>
      </div>
    </section>

    <Image
      src="/assets/images/services.jpg"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[50%]"
    />
  </div>
);
}


/*   return (
    <div className={styles.container}>
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px] ">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="user"
            className={styles.img}
          />
          <UserForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="">© 2024 : sys_mng</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/services.jpg" 
        width={1000}
        height={1000}
        alt="user"
        className="side-img max-w-[50%]"
      />

    </div>
  );
}
 */