import { useState, useEffect } from "react";
import { Checkbox, Label, TextInput, Button, Spinner } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { Toaster, toast } from "react-hot-toast";
import { useRegisterMutation } from "../featured/auth/authApi";

function Singup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully register");
    }
    if (isError) {
      toast.error(error?.data || error?.message || "Opps something went wrong");
    }
  }, [isSuccess, isError, error]);

  //  Singup From submit handler

  const singupFormSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password not match");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-black">
        <div className="w-[95%] rounded-md  md:w-[400px] shadow-lg bg-white p-10">
          <form onSubmit={singupFormSubmitHandler}>
            <div className="flex justify-center items-center mb-10">
              <h4 className="text-2xl font-bold">Singup</h4>
            </div>
            <div className="mb-3">
              <div className="mb-2 block ">
                <Label htmlFor="name1" value="Name *" />
              </div>
              <TextInput
                type="text"
                rightIcon={BiSolidUserAccount}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Email *" />
              </div>
              <TextInput
                name="email"
                id="email1"
                type="email"
                rightIcon={HiMail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>

            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Password *" />
              </div>
              <TextInput
                name="password"
                id="password1"
                type="password"
                rightIcon={MdPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Confirm Password *" />
              </div>
              <TextInput
                name="password"
                id="password1"
                type="password"
                rightIcon={MdPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-5 flex items-center gap-2">
              <Checkbox id="remember" required />
              <Label htmlFor="remember">
                i agree with the terms and conditions
              </Label>
            </div>
            <div>
              <Button
                disabled={isLoading}
                type="submit"
                gradientMonochrome="info"
                className="w-full"
              >
                {isLoading ? (
                  <Spinner aria-label="Default status example" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default Singup;
