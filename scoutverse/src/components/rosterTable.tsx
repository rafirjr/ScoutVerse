import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { useAppDispatch } from "../redux/hooks";
import { ScoutPayload } from "../redux/types";
import { Button, Modal } from "flowbite-react";
import {
    selectScoutState,
    setCurrentScoutID,
} from "../redux/slices/scoutSlice";
import { useState } from "react";
import ScoutInfoModal from "./scoutInfoModal";
import { useSelector } from "react-redux";

interface RosterTableProps {
    scouts: ScoutPayload[];
}

const RosterTable: React.FC<RosterTableProps> = ({ scouts }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const scoutState = useSelector(selectScoutState);
    const [openModal, setOpenModal] = useState(false);

    const handleViewScout = (scoutID: string) => {
        dispatch(setCurrentScoutID(scoutID));
        setOpenModal(true);
        //navigate("/scoutinfo");
    };

    return (
        <div className="flex">
            <div className="flex-col lg:w-1/4"></div>
            <div className=" bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-5/6 h-fit md:w-3/4 lg:mr-36">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>First Name</Table.HeadCell>
                        <Table.HeadCell>Last Name</Table.HeadCell>
                        <Table.HeadCell>Khoump</Table.HeadCell>
                        <Table.HeadCell>DOB</Table.HeadCell>
                        {/* <Table.HeadCell>Address</Table.HeadCell> */}
                        <Table.HeadCell>Parent Name</Table.HeadCell>
                        <Table.HeadCell>Parent Email</Table.HeadCell>
                        <Table.HeadCell>Parent Number</Table.HeadCell>
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
                                {/* <Table.Cell>
                                    {`${scout.street} \n ${scout.city}, ${scout.state} ${scout.zip_code}`}
                                </Table.Cell> */}
                                <Table.Cell>{scout.parent_name}</Table.Cell>
                                <Table.Cell>{scout.parent_email}</Table.Cell>
                                <Table.Cell>{scout.parent_number}</Table.Cell>
                                <Button
                                    className="mx-auto mt-2"
                                    pill
                                    size="sm"
                                    color="blue"
                                    onClick={() => handleViewScout(scout.id)}
                                >
                                    View
                                </Button>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
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
            </div>
        </div>
    );
};

export default RosterTable;
