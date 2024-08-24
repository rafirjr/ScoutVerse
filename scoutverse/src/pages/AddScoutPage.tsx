"use client";

import React from "react";
import Sidebar from "../components/sidebar";
import Topnav from "../components/topnav";
import { Label, TextInput, Select, Datepicker } from "flowbite-react";
import { HiMail } from "react-icons/hi";

const AddScout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            <Topnav />
            <Sidebar />
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>

            <div className="border-t- bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-1/2 h-fit">
                <form className="flex max-w-md flex-col gap-4 p-4" action="">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstname" value="First Name" />
                        </div>
                        <TextInput
                            id="firstname"
                            type="text"
                            placeholder=""
                            required
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
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Khoump" value="Khoump" />
                        </div>
                        <Select required>
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
                        <Datepicker />
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
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="zipcode" value="Zip Code" />
                        </div>
                        <TextInput id="zipcode" type="text" required />
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
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="size" value="T-Shirt Size" />
                        </div>
                        <Select required>
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
                </form>
            </div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
        </div>
    );
};

export default AddScout;
