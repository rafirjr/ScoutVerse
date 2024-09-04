"use client";

import { Label, TextInput, Select, Button } from "flowbite-react";
import { HiMail, HiOutlineArrowRight } from "react-icons/hi";
import * as yup from "yup";
import { useAppDispatch } from "../redux/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ScoutData } from "../redux/types";
import { createNewScout } from "../redux/slices/scoutSlice";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// interface InputValues {
//     firstname: string;
//     lastname: string;
//     khoump: string;
//     dob: Date;
//     street: string;
//     city: string;
//     state: string;
//     zip_code: string;
//     contact_number: string;
//     contact_email: string;
//     parent_name: string;
//     parent_email: string;
//     allergies: string;
//     size: string;
// }

const validationSchema = yup.object({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    khoump: yup.string().required("Required"),
    date_of_birth: yup.date().required("Required"),
    street: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zip_code: yup.string().required("Required"),
    contact_number: yup.string().required("Required"),
    contact_email: yup.string().required("Required"),
    parent_name: yup.string().required("Required"),
    parent_email: yup.string().required("Required"),
    parent_number: yup.string().required("Required"),
    allergies: yup.string().required("Required"),
    size: yup.string().required("Required"),
});

const NewScoutForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ScoutData>({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    const handleSubmitNewScout = ({
        first_name,
        last_name,
        khoump,
        date_of_birth,
        street,
        city,
        state,
        zip_code,
        contact_number,
        contact_email,
        parent_name,
        parent_email,
        parent_number,
        allergies,
        size,
    }: ScoutData) => {
        console.log({
            first_name,
            last_name,
            khoump,
            date_of_birth,
            street,
            city,
            state,
            zip_code,
            contact_number,
            contact_email,
            parent_name,
            parent_email,
            parent_number,
            allergies,
            size,
        });
        dispatch(
            createNewScout({
                first_name: first_name,
                last_name: last_name,
                khoump: khoump,
                date_of_birth: date_of_birth,
                street: street,
                city: city,
                state: state,
                zip_code: zip_code,
                contact_number: contact_number,
                contact_email: contact_email,
                parent_name: parent_name,
                parent_number: parent_number,
                parent_email: parent_email,
                allergies: allergies,
                size: size,
            })
        );
        navigate("/dashboard");
    };

    const navigate = useNavigate();

    return (
        <div className="flex">
            <div className="flex-col lg:w-1/4"></div>
            <div className=" bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-5/6 h-fit md:w-3/4 lg:mr-20">
                <form
                    onSubmit={handleSubmit(handleSubmitNewScout)}
                    className="flex max-w flex-col gap-4 p-4"
                    action=""
                >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstname" value="First Name" />
                        </div>
                        <TextInput
                            id="firstname"
                            type="text"
                            placeholder=""
                            required
                            className="w-full"
                            {...register("first_name")}
                        />
                        {errors.first_name && (
                            <p style={{ color: "red" }}>
                                {errors.first_name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lasttname" value="Last Name" />
                        </div>
                        <TextInput
                            id="lastname"
                            type="text"
                            placeholder=""
                            required
                            className="w-full"
                            {...register("last_name")}
                        />
                        {errors.last_name && (
                            <p style={{ color: "red" }}>
                                {errors.last_name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Khoump" value="Khoump" />
                        </div>
                        <Select
                            required
                            className="w-full"
                            {...register("khoump")}
                        >
                            <option value="mogle">Mogli</option>
                            <option value="kylig">Kylig</option>
                            <option value="ardzvig">Ardzvig</option>
                            <option value="ari">Ari</option>
                            <option value="arenoush">Arenoush</option>
                            <option value="yerets">Yerets</option>
                            <option value="barmanouhi">Barmanouhi</option>
                            <option value="kerakouyn">Kerakouyn</option>
                        </Select>
                        {errors.khoump && (
                            <p style={{ color: "red" }}>
                                {errors.khoump.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="dob" value="Date of Birth" />
                        </div>
                        <ReactDatePicker
                            selected={watch("date_of_birth")}
                            onChange={(date) =>
                                setValue("date_of_birth", date as Date)
                            }
                            dateFormat="yyyy-MM-dd"
                            className="w-full rounded-md"
                            placeholderText="YYYY-MM-DD"
                        />
                        {errors.date_of_birth && (
                            <p style={{ color: "red" }}>
                                {errors.date_of_birth.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="street" value="Street" />
                        </div>
                        <TextInput
                            id="street"
                            type="text"
                            placeholder=""
                            required
                            className="w-full"
                            {...register("street")}
                        />
                        {errors.street && (
                            <p style={{ color: "red" }}>
                                {errors.street.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="City" />
                        </div>
                        <TextInput
                            id="city"
                            type="text"
                            placeholder=""
                            required
                            className="w-full"
                            {...register("city")}
                        />
                        {errors.city && (
                            <p style={{ color: "red" }}>
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="state" value="State" />
                        </div>
                        <input
                            type="hidden"
                            {...register("state")}
                            value="CA"
                        />
                        <TextInput
                            id="state"
                            type="text"
                            placeholder="CA"
                            value="CA"
                            required
                            disabled
                            className="w-full"
                            {...register("state")}
                        />
                        {errors.state && (
                            <p style={{ color: "red" }}>
                                {errors.state.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="zipcode" value="Zip Code" />
                        </div>
                        <TextInput
                            id="zipcode"
                            type="text"
                            required
                            className="w-full"
                            {...register("zip_code")}
                        />
                        {errors.zip_code && (
                            <p style={{ color: "red" }}>
                                {errors.zip_code.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="contactnumber"
                                value="Scout Phone Number"
                            />
                        </div>
                        <TextInput
                            id="contact_number"
                            type="text"
                            placeholder=""
                            className="w-full"
                            {...register("contact_number")}
                        />
                        {errors.contact_email && (
                            <p style={{ color: "red" }}>
                                {errors.contact_email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="contactemail" value="Scout Email" />
                        </div>
                        <TextInput
                            id="contact_email"
                            type="email"
                            placeholder=""
                            rightIcon={HiMail}
                            className="w-full"
                            {...register("contact_email")}
                        />
                        {errors.contact_email && (
                            <p style={{ color: "red" }}>
                                {errors.contact_email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="parentname" value="Parent Name" />
                        </div>
                        <TextInput
                            id="parentname"
                            type="text"
                            placeholder=""
                            required
                            className="w-full"
                            {...register("parent_name")}
                        />
                        {errors.parent_name && (
                            <p style={{ color: "red" }}>
                                {errors.parent_name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="parentemail" value="Parent Email" />
                        </div>
                        <TextInput
                            id="parentemail"
                            type="email"
                            placeholder=""
                            required
                            rightIcon={HiMail}
                            className="w-full"
                            {...register("parent_email")}
                        />
                        {errors.parent_email && (
                            <p style={{ color: "red" }}>
                                {errors.parent_email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="parentnumber"
                                value="Parent Phone Number"
                            />
                        </div>
                        <TextInput
                            id="parentnumber"
                            type="text"
                            placeholder=""
                            required
                            className="w-full"
                            {...register("parent_number")}
                        />
                        {errors.parent_number && (
                            <p style={{ color: "red" }}>
                                {errors.parent_number.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="allergies" value="Allergies" />
                        </div>
                        <TextInput
                            id="allergies"
                            type="text"
                            placeholder=""
                            required
                            defaultValue={"N/A"}
                            className="w-full"
                            {...register("allergies")}
                        />
                        {errors.allergies && (
                            <p style={{ color: "red" }}>
                                {errors.allergies.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="size" value="T-Shirt Size" />
                        </div>
                        <Select
                            required
                            className="w-full"
                            {...register("size")}
                        >
                            <option value="YS">Youth Small</option>
                            <option value="YM">Youth Medium</option>
                            <option value="YL">Youth Large</option>
                            <option value="AS">Adult Small</option>
                            <option value="AM">Adult Medium</option>
                            <option value="AL">Adult Large</option>
                            <option value="AXL">Adult XL</option>
                            <option value="AXXL">Adult XXL</option>
                        </Select>
                        {errors.size && (
                            <p style={{ color: "red" }}>
                                {errors.size.message}
                            </p>
                        )}
                    </div>
                    <div className="mx-auto">
                        <Button
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 "
                            size="md"
                            pill
                            type="submit"
                        >
                            Submit
                            <HiOutlineArrowRight className="h-6 w-6" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewScoutForm;
