import { Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ScoutPayload } from "../redux/types";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

interface ScoutInfoModalProps {
    currentScoutID: string;
    allScouts: ScoutPayload[];
}

const ScoutInfoModal: React.FC<ScoutInfoModalProps> = ({
    currentScoutID,
    allScouts,
}) => {
    const navigate = useNavigate();
    const currentScout = allScouts.find((scout) => scout.id === currentScoutID);

    const handleEditScout = () => {
        navigate("/editscout");
    };

    return (
        <>
            <Modal.Header>
                {currentScout?.first_name + " " + currentScout?.last_name}
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <h1 className="font-bold">Date of Birth</h1>
                        <p>
                            {currentScout?.date_of_birth
                                .toString()
                                .substring(0, 10)}
                        </p>
                    </div>
                    <div>
                        <h1 className="font-bold">Khoump</h1>
                        <p>{currentScout?.khoump}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">Address</h1>
                        <p>{`${currentScout?.street} \n ${currentScout?.city}, ${currentScout?.state} ${currentScout?.zip_code}`}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">Contact Number</h1>
                        <p>{currentScout?.contact_number}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">Contact Email</h1>
                        <p>{currentScout?.contact_email}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">Parent Name</h1>
                        <p>{currentScout?.parent_name}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">Parent Email</h1>
                        <p>{currentScout?.parent_email}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">Parent Number</h1>
                        <p>{currentScout?.parent_number}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">Allergies</h1>
                        <p>{currentScout?.allergies}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">T-Shirt Size</h1>
                        <p>{currentScout?.size}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-center">
                <Button
                    pill
                    color="blue"
                    size="xl"
                    onClick={() => handleEditScout()}
                >
                    <FaRegEdit />
                </Button>
                <Button pill color="red" size="xl">
                    <RiDeleteBin5Line />
                </Button>
            </Modal.Footer>
        </>
    );
};

export default ScoutInfoModal;
