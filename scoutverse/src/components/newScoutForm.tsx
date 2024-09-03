"use client";

import { Label, TextInput, Select, Datepicker, Button } from "flowbite-react";
import { HiMail, HiOutlineArrowRight } from "react-icons/hi";
import * as yup from "yup";
import { useAppDispatch } from "../redux/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import scoutService from "../services/scout";
import { ScoutData } from "../redux/types";
import { createNewScout } from "../redux/slices/scoutSlice";

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
    id: yup.string().nullable(),
    firstname: yup.string().required("Required"),
    lastname: yup.string().required("Required"),
    khoump: yup.string().required("Required"),
    dob: yup.date().required("Required"),
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
        formState: { errors },
    } = useForm<ScoutData>({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    const handleSubmitNewScout = ({
        firstname,
        lastname,
        khoump,
        dob,
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
        dispatch(
            createNewScout({
                firstname: firstname,
                lastname: lastname,
                khoump: khoump,
                dob: dob,
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
                            {...register("firstname")}
                        />
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
                            {...register("lastname")}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Khoump" value="Khoump" />
                        </div>
                        <Select required className="w-full">
                            <option>Mogli</option>
                            <option value="">Kylig</option>
                            <option value="">Ardzvig</option>
                            <option value="">Ari</option>
                            <option value="">Arenoush</option>
                            <option value="">Yerets</option>
                            <option value="">Barmanouhi</option>
                            <option value="">Kerakouyn</option>
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="dob" value="Date of Birth" />
                        </div>
                        <Datepicker className="w-full" />
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
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="City" />
                        </div>
                        <TextInput
                            id="street"
                            type="text"
                            placeholder=""
                            required
                            className="w-full"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="state" value="State" />
                        </div>
                        <TextInput
                            id="state"
                            type="text"
                            placeholder="CA"
                            required
                            disabled
                            className="w-full"
                        />
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
                        />
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
                        />
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
                        />
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
                        />
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
                        />
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
                        />
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
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="size" value="T-Shirt Size" />
                        </div>
                        <Select required className="w-full">
                            <option value="YS">Youth Small</option>
                            <option value="YM">Youth Medium</option>
                            <option value="YL">Youth Large</option>
                            <option value="AS">Adult Small</option>
                            <option value="AM">Adult Medium</option>
                            <option value="AL">Adult Large</option>
                            <option value="AXL">Adult XL</option>
                            <option value="AXXL">Adult XXL</option>
                        </Select>
                    </div>
                    <div className="mx-auto">
                        <Button
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 "
                            size="md"
                            pill
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
