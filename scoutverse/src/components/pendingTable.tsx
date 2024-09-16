import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { useAppDispatch } from "../redux/hooks";
import { ScoutPayload } from "../redux/types";
import { Button, Modal } from "flowbite-react";
import {
    editScout,
    selectScoutState,
    setCurrentScoutID,
} from "../redux/slices/scoutSlice";
import { useState } from "react";
import ScoutInfoModal from "./scoutInfoModal";
import { useSelector } from "react-redux";
import { IoEye, IoEyeOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

interface PendingTableProps {
    scouts: ScoutPayload[];
}

const PendingTable: React.FC<PendingTableProps> = ({ scouts }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const scoutState = useSelector(selectScoutState);
    const [openModal, setOpenModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);

    const handleViewScout = (scoutID: string) => {
        dispatch(setCurrentScoutID(scoutID));
        setOpenModal(true);
        //navigate("/scoutinfo");
    };

    const handleActivateScout = () => {
        const scout = scoutState.allScouts.find(
            (scout) => scout.id === scoutState.currentScoutID
        );
        if (scout && scoutState.currentScoutID) {
            dispatch(
                editScout(scoutState.currentScoutID, {
                    first_name: scout.first_name,
                    last_name: scout.last_name,
                    khoump: scout.khoump,
                    date_of_birth: scout.date_of_birth,
                    street: scout.street,
                    city: scout.city,
                    state: scout.state,
                    zip_code: scout.zip_code,
                    contact_number: scout.contact_number,
                    contact_email: scout.contact_email,
                    parent_name: scout.parent_name,
                    parent_number: scout.parent_number,
                    parent_email: scout.parent_email,
                    allergies: scout.allergies,
                    size: scout.size,
                    status: "ACTIVE",
                })
            );
        } else {
            console.log("No scout found on pending table");
        }

        setActivateModal(false);
    };

    const handleActivateModal = (scoutID: string) => {
        dispatch(setCurrentScoutID(scoutID));
        setActivateModal(true);
    };

    return (
        <div className="flex">
            <div className="flex-col lg:w-1/4"></div>
            <div className=" bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-5/6 h-fit md:w-3/4 lg:mr-36">
                <div className="overflow-x-auto w-full">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>First Name</Table.HeadCell>
                            <Table.HeadCell>Last Name</Table.HeadCell>
                            <Table.HeadCell>Khoump</Table.HeadCell>
                            <Table.HeadCell>DOB</Table.HeadCell>
                            <Table.HeadCell>Activate</Table.HeadCell>
                            <Table.HeadCell>Details</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {scouts.map((scout, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{scout.first_name}</Table.Cell>
                                    <Table.Cell>{scout.last_name}</Table.Cell>
                                    <Table.Cell>{scout.khoump}</Table.Cell>
                                    <Table.Cell>
                                        {scout.date_of_birth
                                            .toString()
                                            .substring(0, 10)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className=""
                                            pill
                                            size="sm"
                                            color="green"
                                            onClick={() =>
                                                handleActivateModal(scout.id)
                                            }
                                        >
                                            <FaRegCheckCircle />
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell className="">
                                        <Button
                                            className=""
                                            pill
                                            size="sm"
                                            color="blue"
                                            onClick={() =>
                                                handleViewScout(scout.id)
                                            }
                                        >
                                            <IoEyeOutline size={20} />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>

                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    {scoutState.currentScoutID ? (
                        <ScoutInfoModal
                            currentScoutID={scoutState.currentScoutID}
                            allScouts={scoutState.allScouts}
                        />
                    ) : (
                        <div>No Scout ID</div>
                    )}
                </Modal>

                <Modal
                    show={activateModal}
                    onClose={() => setActivateModal(false)}
                >
                    <Modal.Header>Activate Scout</Modal.Header>
                    <Modal.Body>
                        Make sure scout has completed new membership application
                        on Homenetmen.net
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            pill
                            size="xl"
                            color="green"
                            onClick={handleActivateScout}
                        >
                            Activate
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default PendingTable;
